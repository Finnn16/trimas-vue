<template>
  <div class="article-container">
    <h1>Artikel Terbaru</h1>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Memuat artikel...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="retryFetch">Coba Lagi</button>
    </div>

    <!-- Articles Grid -->
    <div v-else-if="articles.length > 0" class="article-grid">
      <div
          v-for="article in articles"
          :key="article.id"
          class="article-card"
          @click="openArticle(article)"
      >
        <div class="article-image">
          <img
              v-if="article.gambar && article.gambar !== '-'"
              :alt="article.judul"
              :src="article.gambar"
              @error="handleImageError"
          />
          <div v-else class="no-image">
            <span>📰</span>
          </div>
        </div>

        <div class="article-content">
          <h2 class="article-title">{{ article.judul }}</h2>
          <p class="article-date">
            📅 {{ formatDate(article.tanggal_terbit) }}
          </p>
          <p v-if="article.excerpt" class="article-excerpt">
            {{ article.excerpt }}
          </p>
        </div>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else class="no-data">
      <p>Tidak ada artikel yang tersedia saat ini.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      error: null,
      loading: false,
      spreadsheetId: "17woNBxM9mpcMdQdn5Ybabz3fujgQOBbvZ4DrJWE0zGA"
    };
  },

  async created() {
    await this.fetchArticles();
  },

  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = null;

      try {
        console.log("🔄 Memulai pengambilan data artikel...");

        // Mencoba beberapa endpoint Google Sheets
        const endpoints = [
          `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=0`,
          `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv`,
          `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=Sheet1`
        ];

        let success = false;

        for (let i = 0; i < endpoints.length && !success; i++) {
          try {
            console.log(`🌐 Mencoba endpoint ${i + 1}:`, endpoints[i]);

            const response = await this.fetchWithTimeout(endpoints[i], 10000);

            if (response.ok) {
              const csvText = await response.text();
              console.log("✅ Data CSV berhasil diambil");

              const parsedData = this.parseCSVData(csvText);

              if (parsedData.length > 0) {
                this.articles = parsedData;
                success = true;
                console.log(`📊 Berhasil memuat ${parsedData.length} artikel`);
              }
            }
          } catch (endpointError) {
            console.log(`❌ Endpoint ${i + 1} gagal:`, endpointError.message);
          }
        }

        if (!success) {
          throw new Error("Semua endpoint gagal diakses");
        }

      } catch (error) {
        console.error("💥 Error mengambil data:", error);
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchWithTimeout(url, timeout = 8000) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Accept': 'text/csv,text/plain,*/*',
            'Cache-Control': 'no-cache'
          }
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    },

    parseCSVData(csvText) {
      try {
        console.log("🔍 Parsing data CSV...");

        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
          throw new Error("Data CSV kosong atau tidak valid");
        }

        // Parse header
        const headers = this.parseCSVLine(lines[0])
            .map(h => h.toLowerCase().trim().replace(/[^a-z0-9_]/g, '_'));

        console.log("📋 Headers ditemukan:", headers);

        const articles = [];

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = this.parseCSVLine(lines[i]);

            if (values.length >= headers.length) {
              const article = {};

              headers.forEach((header, index) => {
                article[header] = values[index] ? values[index].trim() : '';
              });

              // Validasi artikel memiliki data minimal
              if (article.id && article.judul) {
                articles.push({
                  id: article.id,
                  judul: article.judul,
                  tanggal_terbit: article.tanggal_terbit || new Date().toISOString().split('T')[0],
                  gambar: article.gambar || '',
                  link_isi_artikel: article.link_isi_artikel || '',
                  excerpt: this.createExcerpt(article.judul)
                });
              }
            }
          }
        }

        console.log(`✨ Berhasil parse ${articles.length} artikel`);
        return articles;

      } catch (error) {
        console.error("❌ Error parsing CSV:", error);
        throw new Error(`Gagal memproses data: ${error.message}`);
      }
    },

    parseCSVLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++; // Skip next quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }

      result.push(current);
      return result;
    },

    createExcerpt(title) {
      if (title && title.length > 80) {
        return title.substring(0, 80) + '...';
      }
      return title;
    },

    formatDate(dateString) {
      try {
        if (!dateString || dateString === '-') {
          return 'Tanggal tidak tersedia';
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
          return dateString;
        }

        return new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(date);
      } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
      }
    },

    handleImageError(event) {
      event.target.style.display = 'none';
      event.target.parentElement.innerHTML = '<div class="no-image"><span>🖼️</span></div>';
    },

    openArticle(article) {
      if (article.link_isi_artikel && article.link_isi_artikel !== '-') {
        window.open(article.link_isi_artikel, '_blank');
      } else {
        // Fallback ke rute internal jika ada
        this.$router?.push(`/article/${article.id}`);
      }
    },

    handleError(error) {
      if (error.name === 'AbortError') {
        this.error = '⏱️ Koneksi timeout. Pastikan internet Anda stabil dan coba lagi.';
      } else if (error.message.includes('Failed to fetch')) {
        this.error = '🌐 Tidak dapat mengakses data. Periksa:\n• Koneksi internet\n• Spreadsheet sudah dipublikasikan\n• Firewall tidak memblokir akses';
      } else {
        this.error = `❌ ${error.message}`;
      }
    },

    async retryFetch() {
      await this.fetchArticles();
    }
  }
};
</script>

<style scoped>
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 20px 0;
  white-space: pre-line;
}

.retry-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.retry-btn:hover {
  background-color: #1565c0;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.article-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.article-image {
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 3rem;
  color: #bbb;
}

.article-content {
  padding: 20px;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.article-excerpt {
  color: #777;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 768px) {
  .article-container {
    padding: 15px;
  }

  .article-container h1 {
    font-size: 1.5rem;
  }

  .article-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .article-content {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .article-container {
    padding: 10px;
  }

  .article-image {
    height: 160px;
  }
}
</style>
