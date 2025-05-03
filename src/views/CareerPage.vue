<template>
  <div class="career-page">
    <h1 class="title">Temukan Peluang Karir Anda</h1>
    <p class="subtitle">
      Bergabung dengan perusahaan kami yang bergerak di bidang garment industry,
      khususnya golf apparel dan seragam rumah sakit.
    </p>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="jobs.length === 0" class="loading">
      Memuat data... Atau periksa konsol untuk log detail.
    </div>
    <div v-else class="job-list">
      <div v-for="job in jobs" :key="job.ID" class="job-card">
        <h3>{{ job.Title }}</h3>
        <p>{{ job.Department }}</p>
        <a :href="`/job-detail/${job.ID}`" class="details-link">Selengkapnya</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CareerPage",
  data() {
    return {
      jobs: [],
      error: null,
      rawData: null,
    };
  },
  async created() {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgkjmUSVoYCO6Q-Q9CYwp0D0QzbvVGjlS8dDeSyMWUIcTOqGrQuTyL7tym8kuHdzC2fi-dFr_G_RVI/pub?output=csv";

    try {
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(
          "Gagal mengambil data. Pastikan URL CSV valid dan spreadsheet sudah dipublikasikan."
        );
      }
      const csvText = await response.text();
      this.rawData = csvText;
      console.log("Raw CSV Data:", csvText);
      this.jobs = this.csvToArray(csvText);
      if (this.jobs.length === 0) {
        this.error =
          "Data kosong. Pastikan spreadsheet memiliki kolom ID, Title, Department, Link, Qualifications, dan JobDescription.";
      }
    } catch (error) {
      this.error = `Error: ${error.message}`;
      console.error("Error fetching job data:", error);
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
            obj[header] = currentRow[index] || "-";
          });
          result.push(obj);
        }
        currentRow = [];
      }
      console.log("Parsed Jobs:", result);
      return result;
    },
  },
};
</script>

<style scoped>
.career-page {
  padding: 20px;
  text-align: center;
}
.title {
  font-size: 2.5rem;
  color: #2c3e50;
}
.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
}
.job-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.job-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.job-card h3 {
  margin: 0 0 10px;
  color: #2c3e50;
}
.job-card p {
  margin: 0 0 10px;
  color: #7f8c8d;
}
.details-link {
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
}
.details-link:hover {
  text-decoration: underline;
}
.error-message {
  color: red;
  margin: 20px 0;
}
.loading {
  color: #7f8c8d;
  margin: 20px 0;
}
</style>
