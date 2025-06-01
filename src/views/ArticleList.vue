<template>
  <div>
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
          <p class="publish-date">
            Diterbitkan pada: {{ formatDate(article.tanggal_terbit) }}
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
    const spreadsheetId = "17woNBxM9mpcMdQdn5Ybabz3fujgQOBbvZ4DrJWE0zGA";
    const sheetName = "Sheet1";

    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

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
        const requiredColumns = [
          "id",
          "judul",
          "tanggal_terbit",
          "gambar",
          "link_isi_artikel",
        ];
        const hasRequiredColumns = requiredColumns.every((col) =>
          parsedArticles[0].hasOwnProperty(col.toLowerCase().replace(/ /g, "_"))
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
      const headers = rows[0]
        .split(",")
        .map((header) => header.trim().toLowerCase().replace(/ /g, "_"));
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
            obj[header] = currentRow[index] || "-";
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
  },
};
</script>

<style scoped>
.article-list {
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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
  min-height: 450px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.article-item img {
  max-width: 100%;
  max-height: 200px;
  height: auto;
  margin-bottom: 10px;
  object-fit: contain;
  object-position: center;
  border-radius: 4px;
}

.article-item h2 {
  margin-top: 0;
  margin-bottom: 2px;
  text-align: center;
}

.publish-date {
  color: #777;
  font-size: 0.8em;
  margin-bottom: 10px;
  text-align: center;
}
</style>
