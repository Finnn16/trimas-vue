<template>
  <div class="article-container">
    <!-- SVG Shape Abstrak untuk Background Area Putih -->
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

      <!-- Debug Info (hapus di production) -->
      <div v-if="debugMode" class="debug-info">
        <h3>🔧 Debug Information:</h3>
        <p><strong>Spreadsheet ID:</strong> {{ spreadsheetId }}</p>
        <p><strong>Attempts:</strong> {{ attemptCount }}</p>
        <p><strong>Last URL:</strong> {{ lastAttemptedUrl }}</p>
        <button @click="toggleDebug">Hide Debug</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>{{ loadingMessage }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        <h3>⚠️ Gagal Memuat Data</h3>
        <p>{{ error }}</p>

        <div class="error-actions">
          <button class="retry-btn" @click="retryFetch">🔄 Coba Lagi</button>
          <button class="test-btn" @click="useTestData">📝 Gunakan Data Test</button>
          <button class="debug-btn" @click="showDebug">🔧 Show Debug</button>
        </div>

        <details class="troubleshoot">
          <summary>🛠️ Panduan Troubleshooting</summary>
          <ol>
            <li>Pastikan Google Sheets sudah dipublikasikan ke web</li>
            <li>Pastikan sharing permission "Anyone with the link"</li>
            <li>Cek koneksi internet Anda</li>
            <li>Coba disable VPN/Proxy jika ada</li>
            <li>Coba refresh halaman</li>
          </ol>
        </details>
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
                v-if="article.gambar && article.gambar !== '-' && !article.imageError"
                :alt="article.judul"
                :src="article.gambar"
                loading="lazy"
                @error="handleImageError(article)"
            />
            <div v-else class="no-image">
              <span>📰</span>
            </div>
          </div>

          <div class="article-content">
            <h2 class="article-title">{{ article.judul }}</h2>
            <p class="article-date">📅 {{ formatDate(article.tanggal_terbit) }}</p>
            <div class="article-meta">
              <span class="article-id">ID: {{ article.id }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="no-data">
        <h3>📋 Tidak Ada Data</h3>
        <p>Tidak ada artikel yang tersedia saat ini.</p>
        <button class="test-btn" @click="useTestData">📝 Muat Data Test</button>
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
      loadingMessage: "Memuat artikel...",
      spreadsheetId: "17woNBxM9mpcMdQdn5Ybabz3fujgQOBbvZ4DrJWE0zGA",
      debugMode: false,
      attemptCount: 0,
      lastAttemptedUrl: "",
      testDataUsed: false
    };
  },

  async created() {
    await this.fetchArticles();
  },

  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = null;
      this.attemptCount = 0;
      this.testDataUsed = false;

      console.log("🚀 Memulai pengambilan data artikel...");

      // Berbagai strategi untuk mengakses Google Sheets
      const strategies = [
        {
          name: "Direct CSV Export",
          url: `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=0`,
          method: "fetch"
        },
        {
          name: "Alternative CSV Export",
          url: `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv`,
          method: "fetch"
        },
        {
          name: "GViz Query",
          url: `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=Sheet1`,
          method: "fetch"
        },
        {
          name: "Public CSV",
          url: `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/pub?output=csv`,
          method: "fetch"
        },
        {
          name: "CORS Proxy 1",
          url: `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=0`)}`,
          method: "fetch"
        },
        {
          name: "CORS Proxy 2",
          url: `https://corsproxy.io/?${encodeURIComponent(`https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/export?format=csv&gid=0`)}`,
          method: "fetch"
        }
      ];

      for (const strategy of strategies) {
        try {
          this.attemptCount++;
          this.loadingMessage = `Mencoba ${strategy.name}... (${this.attemptCount}/${strategies.length})`;
          this.lastAttemptedUrl = strategy.url;

          console.log(`🔄 Strategi ${this.attemptCount}: ${strategy.name}`);
          console.log(`🌐 URL: ${strategy.url}`);

          const csvData = await this.fetchWithStrategy(strategy);

          if (csvData) {
            const parsedData = this.parseCSVData(csvData);

            if (parsedData.length > 0) {
              this.articles = parsedData;
              this.loading = false;
              console.log(`✅ Berhasil dengan ${strategy.name}! Data: ${parsedData.length} artikel`);
              return;
            }
          }

        } catch (error) {
          console.log(`❌ ${strategy.name} gagal:`, error.message);

          // Jeda sebentar sebelum mencoba strategi berikutnya
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // Jika semua strategi gagal
      this.handleAllStrategiesFailed();
    },

    async fetchWithStrategy(strategy) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(strategy.url, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Accept': 'text/csv,text/plain,*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          mode: 'cors',
          credentials: 'omit'
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();

        if (!text || text.trim().length < 10) {
          throw new Error("Response kosong atau tidak valid");
        }

        return text;

      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    },

    parseCSVData(csvText) {
      try {
        console.log("📊 Parsing CSV data...");
        console.log("📄 CSV preview:", csvText.substring(0, 200));

        const lines = csvText.trim().split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          throw new Error("CSV tidak memiliki data yang cukup");
        }

        // Parse header
        const headers = this.parseCSVLine(lines[0])
            .map(h => h.toLowerCase().trim().replace(/[^a-z0-9_]/g, '_'));

        console.log("📋 Headers:", headers);

        const articles = [];

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          const values = this.parseCSVLine(lines[i]);

          if (values.length >= headers.length) {
            const article = {};

            headers.forEach((header, index) => {
              article[header] = values[index] ? values[index].trim() : '';
            });

            // Validasi dan format artikel
            if (article.id && article.judul) {
              articles.push({
                id: article.id,
                judul: article.judul,
                tanggal_terbit: article.tanggal_terbit || new Date().toISOString().split('T')[0],
                gambar: article.gambar || '',
                link_isi_artikel: article.link_isi_artikel || '',
                imageError: false
              });
            }
          }
        }

        console.log(`✨ Berhasil parse ${articles.length} artikel`);
        return articles;

      } catch (error) {
        console.error("❌ Error parsing CSV:", error);
        throw error;
      }
    },

    parseCSVLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
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

    handleAllStrategiesFailed() {
      this.loading = false;
      this.error = `Tidak dapat mengakses data dari Google Sheets setelah ${this.attemptCount} percobaan.`;
      console.error("💥 Semua strategi gagal");
    },

    // Test data untuk fallback
    useTestData() {
      console.log("📝 Menggunakan data test...");
      this.articles = [
        {
          id: "1",
          judul: "Artikel Test 1 - Teknologi Terbaru",
          tanggal_terbit: "2024-01-15",
          gambar: "https://via.placeholder.com/300x200/4CAF50/white?text=Tech+News",
          link_isi_artikel: "#",
          imageError: false
        },
        {
          id: "2",
          judul: "Artikel Test 2 - Tips Programming",
          tanggal_terbit: "2024-01-10",
          gambar: "https://via.placeholder.com/300x200/2196F3/white?text=Programming",
          link_isi_artikel: "#",
          imageError: false
        },
        {
          id: "3",
          judul: "Artikel Test 3 - Design Trends",
          tanggal_terbit: "2024-01-05",
          gambar: "",
          link_isi_artikel: "#",
          imageError: false
        }
      ];
      this.error = null;
      this.testDataUsed = true;
      console.log("✅ Data test dimuat");
    },

    formatDate(dateString) {
      try {
        if (!dateString || dateString === '-') return 'Tanggal tidak tersedia';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        return new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(date);
      } catch (error) {
        return dateString;
      }
    },

    handleImageError(article) {
      article.imageError = true;
      this.$forceUpdate();
    },

    openArticle(article) {
      if (article.link_isi_artikel && article.link_isi_artikel !== '-' && article.link_isi_artikel !== '#') {
        window.open(article.link_isi_artikel, '_blank');
      } else {
        alert(`Artikel: ${article.judul}\nBelum ada link artikel yang tersedia.`);
      }
    },

    async retryFetch() {
      await this.fetchArticles();
    },

    showDebug() {
      this.debugMode = true;
    },

    toggleDebug() {
      this.debugMode = !this.debugMode;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}

.article-container {
  position: relative;
  min-height: 100vh;
  padding: 0;
  overflow-x: hidden;
}

.abstract-background {
  position: absolute;
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
  padding: 30px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.debug-info {
  background: rgba(240, 248, 255, 0.9);
  border: 1px solid #0066cc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-family: monospace;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.debug-info h3 {
  margin: 0 0 10px 0;
  color: #0066cc;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.spinner {
  border: 4px solid rgba(52, 152, 219, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
  background: rgba(255, 235, 238, 0.9);
  border: 1px solid #f44336;
  border-radius: 12px;
  padding: 30px;
  margin: 20px 0;
  text-align: center;
  backdrop-filter: blur(10px);
}

.error h3 {
  color: #d32f2f;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.error-actions {
  margin: 25px 0;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.retry-btn, .test-btn, .debug-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.retry-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.test-btn {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
}

.test-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.debug-btn {
  background: linear-gradient(135deg, #607d8b, #546e7a);
  color: white;
}

.debug-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(96, 125, 139, 0.3);
}

.troubleshoot {
  margin-top: 25px;
  text-align: left;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.troubleshoot summary {
  cursor: pointer;
  font-weight: bold;
  color: #1976d2;
  font-size: 1.1rem;
}

.troubleshoot ol {
  margin: 15px 0 0 20px;
  line-height: 1.6;
}

.no-data {
  text-align: center;
  padding: 60px 20px;
  background: rgba(245, 245, 245, 0.9);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.no-data h3 {
  color: #666;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.article-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(224, 224, 224, 0.3);
  backdrop-filter: blur(10px);
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.article-image {
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
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
  transform: scale(1.08);
}

.no-image {
  font-size: 3.5rem;
  color: #bbb;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-content {
  padding: 25px;
}

.article-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-date {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.article-meta {
  font-size: 0.85rem;
  color: #95a5a6;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 20px 15px 15px;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .article-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .retry-btn, .test-btn, .debug-btn {
    width: 200px;
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
    padding: 15px 10px 10px;
  }

  .page-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }

  .article-image {
    height: 160px;
  }

  .article-content {
    padding: 15px;
  }

  .article-title {
    font-size: 1.1rem;
  }
}

/* Tablet Responsive */
@media (min-width: 769px) and (max-width: 1024px) {
  .content-wrapper {
    padding: 25px 20px 15px;
  }

  .page-title {
    font-size: 2.2rem;
    margin-bottom: 35px;
  }

  .article-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }
}
</style>