<template>
  <div v-if="loading">Memuat artikel...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="article-detail">
    <h1>{{ article.judul }}</h1>
    <p class="publish-date">
      Diterbitkan pada: {{ formatDate(article.tanggal_terbit) }}
    </p>
    <div v-html="articleContent" class="article-body"></div>
  </div>
</template>

<script>
import { google } from "googleapis";

export default {
  name: "ArticleDetail",
  data() {
    return {
      articleContent: "",
      loading: false,
      error: null,
      googleDocsApiKey: "AIzaSyCz_kM4eePUuGnE_JznJLrH9VwIycPwElY", // Ganti dengan API key Anda
      article: null,
    };
  },
  async mounted() {
    this.loading = true;
    const articleId = this.$route.params.id; // Jika Anda menggunakan Vue Router

    // Cari artikel berdasarkan ID dari array articles di parent component (ArticleList)
    this.article = this.$parent.articles.find(
      (article) => article.id === articleId
    );

    if (this.article && this.article.link_isi_artikel) {
      try {
        const docId = this.extractDocumentId(this.article.link_isi_artikel);
        const docs = google.docs({
          version: "v1",
          auth: this.googleDocsApiKey,
        });
        const response = await docs.documents.get({
          documentId: docId,
          fields:
            "body.content(paragraph.elements(textRun,inlineObjectElement))",
        });

        this.articleContent = this.processGoogleDocsContent(
          response.data.body.content
        );
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
    processGoogleDocsContent(content) {
      let html = "";
      content.forEach((item) => {
        if (item.paragraph) {
          item.paragraph.elements.forEach((element) => {
            if (element.textRun) {
              const text = element.textRun.content.replace(/\n/g, "<br>");
              let tag = "p";
              let style = "";
              if (element.textRun.textStyle) {
                if (element.textRun.textStyle.bold) {
                  tag = "strong";
                }
                if (element.textRun.textStyle.italic) {
                  style += "font-style: italic;";
                }
                if (element.textRun.textStyle.underline) {
                  style += "text-decoration: underline;";
                }
              }
              html += `<${tag} style="${style}">${text}</${tag}>`;
            } else if (element.inlineObjectElement) {
              const objectId = element.inlineObjectElement.inlineObjectId;
              // Anda perlu mengambil informasi objek inline secara terpisah untuk mendapatkan URL gambar
              // Ini memerlukan permintaan API tambahan ke docs.documents.get dengan includeInlineObjectIds
              // Untuk contoh sederhana ini, kita akan tampilkan placeholder
              html += "<div>[Gambar dari Google Docs]</div>";
            }
          });
        }
      });
      return html;
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
