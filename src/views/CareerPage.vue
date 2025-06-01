<template>
  <div class="career-page">
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

    <h1 class="title">Discover Your Career Opportunities</h1>
    <p class="subtitle">
      Join our thriving company in the garment industry, where innovation meets
      excellence. We are committed to fostering a supportive work environment
      where every team member can grow professionally and personally. With our
      strong mentorship program, continuous learning opportunities, and
      inclusive culture, we ensure that your career journey with us will be both
      rewarding and meaningful.
    </p>

    <!-- Section Narasi -->
    <div class="why-join-section">
      <!-- SVG Shape Abstrak untuk Section Why Join Us -->
      <svg
        class="abstract-shape"
        preserveAspectRatio="none"
        viewBox="0 0 1000 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0 C300 100, 700 300, 1000 200 L1000 400 L0 400 Z"
          fill="rgba(255, 255, 255, 0.1)"
        />
        <path
          d="M0 100 C200 200, 600 50, 1000 300 L1000 400 L0 400 Z"
          fill="rgba(255, 255, 255, 0.15)"
        />
      </svg>

      <h2 class="why-join-title">Why Join Us?</h2>
      <p class="why-join-text">
        At Trimas SGI - Sarana Garment Industry, we are more than just a garment
        company specializing in golf apparel and hospital uniforms. We are a
        community driven by a passion to
        <strong>create a better life for all</strong>. Our
        <strong>vision</strong> is to become the world's premier choice for
        flexible and innovative garment solutions, delivering excellence through
        sustainable profit growth and high-quality products—our
        <strong>mission</strong>. Our <strong>core values</strong> of quality,
        care, and commitment guide us in crafting a workplace where your skills
        and ambitions can thrive.
      </p>
      <p class="why-join-text">Join us to be part of a team that:</p>
      <ul class="join-benefits">
        <li>Innovates in designing and producing world-class garments.</li>
        <li>Contributes to a sustainable future with every stitch.</li>
        <li>Supports your growth with a caring and inclusive environment.</li>
        <li>
          Makes a positive impact on lives globally through our dedication to
          excellence.
        </li>
      </ul>
      <p class="why-join-text">
        Take the first step towards a rewarding career—<a
          href="#"
          class="apply-now"
          >apply today</a
        >
        and help us shape a better tomorrow!
      </p>
    </div>

    <!-- Daftar Lowongan -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="jobs.length === 0" class="loading">
      Memuat data... Atau periksa konsol untuk log detail.
    </div>
    <div v-else class="job-list">
      <div v-for="job in jobs" :key="job.ID" class="job-card">
        <div class="job-content">
          <h3>{{ job.Title }}</h3>
          <p>{{ job.Department }}</p>
        </div>
        <div class="job-link">
          <a :href="`/job-detail/${job.ID}`" class="details-link">Read More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Script tetap sama seperti sebelumnya
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}
.career-page {
  position: relative;
  padding: 20px;
  text-align: center;
}

.abstract-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.title {
  position: relative;
  font-size: 2.5rem;
  color: #2c3e50;
  z-index: 1;
}

.subtitle {
  position: relative;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
  z-index: 1;
}

.why-join-section {
  position: relative;
  max-width: 800px;
  margin: 0 auto 40px;
  padding: 20px;
  background-color: #1e2a44;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #fff;
  overflow: hidden;
  z-index: 1;
  font-family: "montserrat", sans-serif;
}

.abstract-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.why-join-title {
  position: relative;
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 15px;
  z-index: 1;
  font-family: "montserrat", sans-serif;
}

.why-join-text {
  position: relative;
  font-size: 1rem;
  color: #d1d5db;
  line-height: 1.6;
  text-align: left;
  z-index: 1;
}

.why-join-text strong {
  color: #fff;
}

.join-benefits {
  position: relative;
  list-style-type: disc;
  padding-left: 20px;
  margin: 10px 0;
  color: #d1d5db;
  z-index: 1;
}

.join-benefits li {
  margin: 5px 0;
}

.apply-now {
  color: #1e2a44;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.apply-now:hover {
  background-color: #d1d5db;
  text-decoration: none;
}

.job-card {
  height: auto; /* Mengatur tinggi menjadi auto agar menyesuaikan konten */
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex; /* Menggunakan flex untuk mengatur tata letak internal */
  flex-direction: column; /* Menyusun elemen internal secara vertikal */
  justify-content: space-between;
  align-items: flex-start; /* Mengatur alignment item ke kiri */
  margin: 10px;
  width: 250px; /* Tetapkan lebar tetap */
}

.job-content {
  margin-bottom: 10px; /* Memberikan jarak antara konten dan link */
  text-align: left; /* Mengatur teks ke kiri */
}

.job-card h3 {
  margin: 0 0 5px;
  font-size: 1.2rem;
  color: #2c3e50;
}

.job-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.job-link {
  margin-top: auto; /* Mendorong link ke bagian bawah */
  width: 100%; /* Membuat link selebar card */
  text-align: right; /* Mengatur teks link ke kanan */
}

.job-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
  justify-content: flex-start; /* Mengatur alignment item ke kiri */
}

.details-link {
  color: #7f8c8d;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
}

.details-link:hover {
  color: #2a3b5f;
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  margin: 20px 0;
  font-size: 1rem;
}

.loading {
  color: #7f8c8d;
  margin: 20px 0;
  font-size: 1rem;
}

/* Media Queries untuk Handphone (< 768px) */
@media (max-width: 767px) {
  .title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .why-join-section {
    max-width: 100%;
    padding: 15px;
    margin-bottom: 20px;
  }

  .why-join-title {
    font-size: 1.5rem;
  }

  .why-join-text {
    font-size: 0.9rem;
  }

  .job-list {
    flex-direction: column;
    align-items: center;
  }

  .job-card {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .job-link {
    text-align: right;
  }

  .job-card h3 {
    font-size: 1rem;
  }

  .job-card p {
    font-size: 0.8rem;
  }

  .details-link {
    font-size: 0.8rem;
  }

  .error-message,
  .loading {
    font-size: 0.9rem;
  }
}

/* Media Queries untuk Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  .why-join-section {
    max-width: 90%;
    padding: 18px;
  }

  .why-join-title {
    font-size: 1.6rem;
  }

  .why-join-text {
    font-size: 0.95rem;
  }

  .job-list {
    justify-content: flex-start;
  }

  .job-card {
    width: 200px; /* Ukuran tetap untuk tablet */
    height: 200px;
    padding: 12px;
  }

  .job-card h3 {
    font-size: 1.1rem;
  }

  .job-card p {
    font-size: 0.85rem;
  }

  .details-link {
    font-size: 0.85rem;
  }

  .error-message,
  .loading {
    font-size: 0.95rem;
  }
}
</style>
