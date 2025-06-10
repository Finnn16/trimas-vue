Berikut adalah kode yang sudah direvisi sesuai kebutuhan Anda: ## **Struktur
Spreadsheet yang Diperlukan:** | Judul | Gambar | Tanggal Rilis | Link Google
Docs | |-------|--------|---------------|------------------| | Tutorial Vue.js
Dasar | https://example.com/image1.jpg | 2024-01-15 |
https://docs.google.com/document/d/xxx/edit | | CSS Grid Layout |
https://example.com/image2.jpg | 2024-01-12 |
https://docs.google.com/document/d/yyy/edit | ## **Kode Vue.js yang Direvisi:**
```vue
<template>
  <div class="article-container">
    <!-- SVG Shape Abstrak untuk Background -->
    <svg
      class="abstract-background"
      preserveAspectRatio="none"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 200 C300 100, 700 300, 1200 150 L1200 600 L0 600 Z"
        fill="rgba(30, 42, 68, 0.1)"
      />
      <path
        d="M0 300 C200 400, 600 200, 1200 350 L1200 600 L0 600 Z"
        fill="rgba(30, 42, 68, 0.15)"
      />
    </svg>

    <div class="content-wrapper">
      <h1 class="page-title">Artikel Terbaru</h1>

      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Memuat artikel...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        <h3>⚠️ Gagal Memuat Data</h3>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchArticles">🔄 Coba Lagi</button>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles.length > 0" class="article-grid">
        <div
          v-for="article in articles"
          :key="article.id"
          class="article-card"
          @click="openArticle(article)"
        >
          <!-- Article Image -->
          <div class="article-image">
            <img
              :src="article.gambar"
              :alt="article.judul"
              @error="handleImageError"
              loading="lazy"
            />
            <div class="image-overlay">
              <span class="read-more">Baca Artikel</span>
            </div>
          </div>

          <div class="article-content">
            <h2 class="article-title">{{ article.judul }}</h2>
            <p class="article-date">
              <svg class="date-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ formatDate(article.tanggal_rilis) }}
            </p>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="no-data">
        <h3>📋 Tidak Ada Artikel</h3>
        <p>Belum ada artikel yang tersedia saat ini.</p>
      </div>
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
      spreadsheetId:
        "e/2PACX-1vSCH_k-gs8KgjIQQXwS1tmKFWdrrejVwljZMr5STCiuqCDC7x6hKw7vL5_LUrEimlaFn9fJ4HtkhVmc", // Ganti dengan ID spreadsheet Anda
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
        const csvUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/pub?output=csv`;

        const response = await fetch(csvUrl);

        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.status}`);
        }

        const csvText = await response.text();
        this.articles = this.parseCSV(csvText);

        if (this.articles.length === 0) {
          this.error = "Tidak ada data artikel yang ditemukan.";
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    parseCSV(csvText) {
      const lines = csvText.trim().split("\n");
      if (lines.length < 2) return [];

      // Ambil header dan bersihkan
      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));

      const articles = [];

      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCSVLine(lines[i]);

        if (values.length >= 3) {
          const article = {
            id: i,
            judul: values[0] || "Tanpa Judul",
            gambar:
              values[1] ||
              "https://via.placeholder.com/400x250/e5e7eb/6b7280?text=No+Image",
            tanggal_rilis: values[2] || "",
            link_google_docs: values[3] || "",
          };

          // Hanya tambahkan jika ada judul
          if (article.judul && article.judul !== "Tanpa Judul") {
            articles.push(article);
          }
        }
      }

      return articles;
    },

    parseCSVLine(line) {
      const result = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current.trim());
      return result.map((item) => item.replace(/^"|"$/g, ""));
    },

    formatDate(dateString) {
      if (!dateString) return "Tanggal tidak tersedia";

      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        return new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);
      } catch {
        return dateString;
      }
    },

    openArticle(article) {
      if (article.link_google_docs) {
        // Konversi link edit ke link view yang bisa dibaca publik
        const viewLink = article.link_google_docs.replace("/edit", "/pub");
        window.open(viewLink, "_blank");
      } else {
        alert(`Artikel "${article.judul}" belum memiliki link dokumen.`);
      }
    },

    handleImageError(event) {
      event.target.src =
        "https://via.placeholder.com/400x250/e5e7eb/6b7280?text=Gambar+Tidak+Tersedia";
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

.article-container {
  position: relative;
  min-height: 100vh;
  padding: 0;
  overflow-x: hidden;
  background-color: #f8f9fa;
}

.abstract-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #374151;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(209, 213, 219, 0.3);
}

.spinner {
  border: 3px solid rgba(156, 163, 175, 0.3);
  border-top: 3px solid #6b7280;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  background: rgba(254, 242, 242, 0.9);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.error h3 {
  color: #dc2626;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.retry-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  background: #6b7280;
  color: white;
  margin-top: 15px;
}

.retry-btn:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.article-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(209, 213, 219, 0.3);
  backdrop-filter: blur(10px);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(107, 114, 128, 0.15);
  border-color: rgba(156, 163, 175, 0.4);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
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

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(55, 65, 81, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .image-overlay {
  opacity: 1;
}

.read-more {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.article-card:hover .read-more {
  background: white;
  color: #374151;
}

.article-content {
  padding: 24px;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #131314;
  margin-bottom: 16px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-date {
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.date-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.no-data {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(209, 213, 219, 0.3);
}

.no-data h3 {
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.no-data p {
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .article-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .article-image {
    height: 180px;
  }

  .article-content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 15px 10px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .article-image {
    height: 160px;
  }

  .article-content {
    padding: 16px;
  }

  .article-title {
    font-size: 1.1rem;
  }
}

/* Tablet Responsive */
@media (min-width: 769px) and (max-width: 1024px) {
  .content-wrapper {
    padding: 25px 20px;
  }

  .page-title {
    font-size: 2.2rem;
    margin-bottom: 35px;
  }

  .article-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }

  .article-image {
    height: 200px;
  }
}
</style>
