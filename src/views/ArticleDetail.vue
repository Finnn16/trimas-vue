<template>
  <div v-if="loading">Memuat artikel...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="article-detail">
    <h1>{{ article.judul }}</h1>
    <p class="publish-date">
      Diterbitkan pada: {{ formatDate(article.tanggal_terbit) }}
    </p>
    <div class="article-body" v-html="articleContent"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArticleDetail",
  data() {
    return {
      articleContent: "",
      loading: false,
      error: null,
      article: null,
    };
  },
  async mounted() {
    this.loading = true;
    const articleId = this.$route.params.id;

    this.article = this.$parent.articles.find(
        (article) => article.id === articleId
    );

    if (this.article && this.article.link_isi_artikel) {
      try {
        const docId = this.extractDocumentId(this.article.link_isi_artikel);
        if (!docId) {
          throw new Error("ID dokumen Google Docs tidak valid");
        }

        // Use the export=format=html feature of Google Docs
        const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;

        const response = await axios.get(exportUrl);

        // The response is already in HTML format, but we can process it if needed
        this.articleContent = this.processHtmlContent(response.data);
      } catch (err) {
        this.error = `Gagal mengambil konten dari Google Docs: ${err}`;
        console.error("Gagal mengambil konten dari Google Docs:", err);
      } finally {
        this.loading = false;
      }
    } else {
      this.error =
          "Artikel tidak ditemukan atau link Google Docs tidak tersedia.";
      this.loading = false;
    }
  },
  methods: {
    extractDocumentId(url) {
      const regex = /\/d\/([a-zA-Z0-9-_]+)\//;
      const match = url.match(regex);
      return match ? match[1] : null;
    },
    // This method is no longer needed as we're getting HTML directly from Google Docs
    // Keeping a simplified version for potential future use or customization
    processHtmlContent(htmlContent) {
      // You can add any custom processing here if needed
      return htmlContent;
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
.article-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.article-detail h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.publish-date {
  color: #777;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.article-body {
  line-height: 1.8;
}

.article-body strong {
  font-weight: bold;
}

.article-body em {
  font-style: italic;
}

.article-body u {
  text-decoration: underline;
}

/* Anda perlu menambahkan gaya lebih lanjut untuk heading, list, dan gambar jika diperlukan */
</style>
