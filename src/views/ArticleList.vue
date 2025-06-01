<template>
  <div>
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

    <h1>Artikel Terbaru</h1>
    <div v-if="loading">Memuat artikel...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="article-list">
      <a
        v-for="article in articles"
        :key="article.id"
        :href="`/article/${article.id}`"
        class="article-item-link"
      >
        <div class="article-item">
          <img
            :src="article.gambar"
            :alt="article.judul"
            v-if="article.gambar"
          />
          <h2>{{ article.judul }}</h2>
          <p>Diterbitkan pada: {{ formatDate(article.tanggal_terbit) }}</p>
          <p v-if="article.isi_artikel">
            {{ truncateText(article.isi_artikel, 100) }}...
          </p>
        </div>
      </a>
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
    };
  },
  async created() {
    this.loading = true;
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQzL6wvuG1wUDQ1asBT9Nwflf1aUqHn0VWvstSlzkZUaHuQpgY2oQp5sNfJpHdHD-K1iW_qrVCkFAtY/pub?output=csv";

    try {
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(
          "Gagal mengambil data artikel. Pastikan URL CSV valid dan spreadsheet sudah dipublikasikan."
        );
      }
      const csvText = await response.text();
      const parsedArticles = this.csvToArray(csvText);
      if (parsedArticles && parsedArticles.length > 0) {
        // Validasi keberadaan kolom-kolom penting
        const requiredColumns = [
          "id",
          "judul",
          "tanggal_terbit",
          "isi_artikel",
          "gambar",
        ];
        const hasRequiredColumns = requiredColumns.every((col) =>
          parsedArticles[0].hasOwnProperty(col)
        );

        if (hasRequiredColumns) {
          this.articles = parsedArticles;
        } else {
          this.error = `Struktur data tidak valid. Pastikan ada kolom: ${requiredColumns.join(
            ", "
          )}.`;
        }
      } else {
        this.error =
          "Data artikel kosong atau tidak valid. Pastikan spreadsheet memiliki data dengan header yang benar.";
      }
    } catch (error) {
      this.error = `Error: ${error.message}`;
      console.error("Error fetching article data:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    csvToArray(csvText) {
      const rows = csvText.trim().split("\n");
      if (rows.length < 2) return [];
      const headers = rows[0].split(",").map((header) => header.trim());
      const result = [];
      let inQuotes = false;
      let currentRow = [];
      let currentField = "";

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 0; j < row.length; j++) {
          if (row[j] === '"' && (j === 0 || row[j - 1] !== "\\")) {
            inQuotes = !inQuotes;
          } else if (row[j] === "," && !inQuotes) {
            currentRow.push(currentField.trim());
            currentField = "";
          } else {
            currentField += row[j];
          }
        }
        if (!inQuotes && currentField.trim()) {
          currentRow.push(currentField.trim());
          currentField = "";
        }
        if (
          currentRow.length === headers.length &&
          currentRow.some((cell) => cell)
        ) {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header.toLowerCase().replace(/ /g, "_")] =
              currentRow[index] || "-";
          });
          result.push(obj);
        }
        currentRow = [];
      }
      console.log("Parsed Articles:", result);
      return result;
    },
    formatDate(dateString) {
      try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);
      } catch (error) {
        console.error("Gagal memformat tanggal:", error);
        return dateString;
      }
    },
    truncateText(text, length) {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    },
  },
};
</script>

<style scoped>
.abstract-background {
  position: absolute;
  top: 50%; /* Posisikan titik tengah SVG di tengah vertikal parent */
  left: 50%; /* Posisikan titik tengah SVG di tengah horizontal parent */
  transform: translate(
    -50%,
    -50%
  ); /* Geser SVG ke kiri dan atas sebesar setengah lebarnya dan tingginya agar benar-benar di tengah */
  width: 80%; /* Sesuaikan lebar SVG sesuai kebutuhan Anda */
  height: 400px; /* Sesuaikan tinggi SVG sesuai kebutuhan Anda */
  z-index: -1; /* Letakkan di belakang konten */
}

.article-list {
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative; /* Agar konten berada di atas background abstrak */
  background-color: white; /* Tambahkan background putih untuk konten agar tetap terbaca di atas shape */
  border-radius: 8px; /* Tambahkan border-radius agar sesuai dengan box artikel */
  overflow: hidden; /* Untuk memastikan shape tidak keluar dari border-radius */
}

.article-item-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  min-height: 300px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.article-item img {
  max-width: 100%;
  max-height: 200px;
  height: auto;
  margin-bottom: 10px;
  object-fit: contain;
  object-position: center;
}

.article-item h2 {
  margin-top: 0;
  margin-bottom: 5px;
  text-align: center;
}

.article-item p {
  margin-bottom: 5px;
  text-align: center;
}

.article-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
