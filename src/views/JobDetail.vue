<template>
  <div class="job-detail-page">
    <h1 class="title">Detail Posisi</h1>
    <div v-if="job" class="job-detail">
      <h2>{{ job.Title }}</h2>
      <p><strong>Departemen:</strong> {{ job.Department }}</p>
      <p><strong>Kualifikasi:</strong></p>
      <ul>
        <li
          v-for="(qual, index) in splitQualifications(job.Qualifications)"
          :key="index"
        >
          {{ qual }}
        </li>
      </ul>
      <p><strong>Job Desk:</strong></p>
      <ul>
        <li
          v-for="(task, index) in splitJobDescription(job.JobDescription)"
          :key="index"
        >
          {{ task }}
        </li>
      </ul>
      <a :href="job.Link" class="apply-link">Lamar Sekarang</a>
    </div>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="loading">Memuat detail...</div>
  </div>
</template>

<script>
export default {
  name: "JobDetail",
  data() {
    return {
      job: null,
      error: null,
      jobs: [],
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
      console.log("Raw CSV Data (JobDetail):", csvText);
      this.jobs = this.csvToArray(csvText);
      console.log("Parsed Jobs (JobDetail):", this.jobs);
      const jobId = this.$route.params.id;
      this.job = this.jobs.find((job) => String(job.ID) === String(jobId));
      if (!this.job) {
        this.error = `Posisi dengan ID ${jobId} tidak ditemukan.`;
      }
    } catch (error) {
      this.error = `Error: ${error.message}`;
      console.error("Error fetching job detail:", error);
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
      return result;
    },
    splitQualifications(qualifications) {
      return qualifications
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
    },
    splitJobDescription(description) {
      return description
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
    },
  },
};
</script>

<style scoped>
.job-detail-page {
  padding: 20px;
  text-align: center;
}
.title {
  font-size: 2.5rem;
  color: #2c3e50;
}
.job-detail {
  max-width: 800px;
  margin: 20px auto;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.job-detail h2 {
  color: #2c3e50;
  margin-top: 0;
}
.job-detail p {
  color: #7f8c8d;
  margin: 10px 0;
}
.job-detail ul {
  list-style-type: disc;
  padding-left: 20px;
  color: #7f8c8d;
}
.job-detail ul li {
  margin: 5px 0;
}
.apply-link {
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
}
.apply-link:hover {
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
