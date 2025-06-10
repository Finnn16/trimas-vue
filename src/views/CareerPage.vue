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
        d="M0 300 C200 400, 600 200,   1200 350 L1200 600 L0 600 Z"
        fill="rgba(30, 42, 68, 0.15)"
      />
    </svg>

    <div class="content-wrapper">
      <h1 class="page-title">Discover Your Career Opportunities</h1>
      <p class="subtitle">
        Join our thriving company in the garment industry, where innovation
        meets excellence. We are committed to fostering a supportive work
        environment where every team member can grow professionally and
        personally. With our strong mentorship program, continuous learning
        opportunities, and inclusive culture, we ensure that your career journey
        with us will be both rewarding and meaningful.
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
          At Trimas SGI - Sarana Garment Industry, we are more than just a
          garment company specializing in golf apparel and hospital uniforms. We
          are a community driven by a passion to
          <strong>create a better life for all</strong>. Our
          <strong>vision</strong> is to become the world's premier choice for
          flexible and innovative garment solutions, delivering excellence
          through sustainable profit growth and high-quality products—our
          <strong>mission</strong>. Our <strong>core values</strong> of quality,
          care, and commitment guide us in crafting a workplace where your
          skills and ambitions can thrive.
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
            class="apply-now"
            href="#"
            >apply today</a
          >
          and help us shape a better tomorrow!
        </p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="error">
        <h3>⚠️ Gagal Memuat Data Lowongan</h3>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="retryFetch">🔄 Coba Lagi</button>
      </div>

      <!-- Loading State -->
      <div v-else-if="jobs.length === 0 && !error" class="loading">
        <div class="spinner"></div>
        <p>Memuat data lowongan kerja...</p>
      </div>

      <!-- Job Cards Grid -->
      <div v-else class="job-grid">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="job-card"
          @click="openJobDetail(job)"
        >
          <!-- Job Icon Section (menggantikan foto) -->
          <div class="job-icon">
            <div class="icon-container">
              <span class="job-emoji">💼</span>
              <div class="department-badge">{{ job.department }}</div>
            </div>
          </div>

          <!-- Job Content -->
          <div class="job-content">
            <h2 class="job-title">{{ job.title }}</h2>
            <p class="job-department">🏢 {{ job.department }}</p>
            <div class="job-meta">
              <span class="job-id">ID: {{ job.id }}</span>
            </div>
          </div>
        </div>
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
      loading: false,
    };
  },

  async created() {
    await this.fetchJobs();
  },

  methods: {
    async fetchJobs() {
      this.loading = true;
      this.error = null;

      const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5Qv234SiVIEasFXGciUTaRqzEAZJR1sR8817TcDLo-WJqTAzm4qU-LqyRxB-elkKL3KiKRDN3Crle/pub?output=csv";

      try {
        console.log("🔄 Mengambil data lowongan kerja...");

        const response = await fetch(csvUrl, {
          method: "GET",
          headers: {
            Accept: "text/csv,text/plain,*/*",
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: Gagal mengambil data. Pastikan URL CSV valid dan spreadsheet sudah dipublikasikan.`
          );
        }

        const csvText = await response.text();
        console.log("📄 Raw CSV Data:", csvText.substring(0, 200));

        this.jobs = this.csvToArray(csvText);

        if (this.jobs.length === 0) {
          this.error =
            "Data kosong. Pastikan spreadsheet memiliki kolom ID, Title, Department, Link, Qualifications, dan JobDescription.";
        } else {
          console.log(`✅ Berhasil memuat ${this.jobs.length} lowongan kerja`);
        }
      } catch (error) {
        this.error = `Error: ${error.message}`;
        console.error("❌ Error fetching job data:", error);
      } finally {
        this.loading = false;
      }
    },

    csvToArray(csvText) {
      const rows = csvText.trim().split("\n");
      if (rows.length < 2) return [];

      const headers = rows[0].split(",").map((header) => {
        console.log("Header ditemukan:", header.trim());
        return header.trim();
      });
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
          console.log("Data row yang diparsing:", obj);
          result.push(obj);
        }
        currentRow = [];
      }

      console.log("📊 Parsed Jobs:", result);
      return result;
    },

    openJobDetail(job) {
      if (job.Link && job.Link !== "-") {
        window.open(job.Link, "_blank");
      } else {
        // Fallback ke rute internal
        this.$router?.push(`/job-detail/${job.ID}`);
      }
    },

    async retryFetch() {
      await this.fetchJobs();
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
  min-height: 100vh;
  padding: 0;
  overflow-x: hidden;
  background-color: #f5f5f5;
}

.abstract-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.1s ease-out;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  padding: 30px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 1s ease-in;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn 1s ease-in 0.3s;
  animation-fill-mode: both;
}

.why-join-section {
  position: relative;
  max-width: 800px;
  margin: 0 auto 40px;
  padding: 30px;
  background-color: #1e2a44;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #fff;
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: fadeIn 1s ease-in 0.6s;
  animation-fill-mode: both;
  transition: transform 0.3s ease;
}

.why-join-section:hover {
  transform: translateY(-5px);
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
  margin-bottom: 20px;
  z-index: 1;
  text-align: center;
}

.why-join-text {
  position: relative;
  font-size: 1rem;
  color: #d1d5db;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 15px;
  z-index: 1;
}

.why-join-text strong {
  color: #fff;
}

.join-benefits {
  position: relative;
  list-style-type: disc;
  padding-left: 20px;
  margin: 15px 0;
  color: #d1d5db;
  z-index: 1;
}

.join-benefits li {
  margin: 8px 0;
  line-height: 1.5;
}

.apply-now {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  text-decoration: none;
  display: inline-block;
}

.apply-now:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  text-decoration: none;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  margin: 30px 0;
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
  margin: 30px 0;
  text-align: center;
  backdrop-filter: blur(10px);
}

.error h3 {
  color: #d32f2f;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.retry-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  margin-top: 15px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.job-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.job-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(224, 224, 224, 0.3);
  backdrop-filter: blur(10px);
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.job-card:hover .job-icon {
  transform: scale(1.08);
}

.job-icon {
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.icon-container {
  text-align: center;
  color: white;
}

.job-emoji {
  font-size: 4rem;
  display: block;
  margin-bottom: 15px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.department-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.job-content {
  padding: 25px;
}

.job-title {
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

.job-department {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.job-meta {
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
    margin-bottom: 15px;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 25px;
  }

  .why-join-section {
    max-width: 100%;
    padding: 20px;
    margin-bottom: 30px;
  }

  .why-join-title {
    font-size: 1.5rem;
  }

  .why-join-text {
    font-size: 0.9rem;
  }

  .job-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  .job-icon {
    height: 180px;
  }

  .job-emoji {
    font-size: 3rem;
  }

  .job-content {
    padding: 20px;
  }

  .job-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 15px 10px 10px;
  }

  .page-title {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .why-join-section {
    padding: 15px;
    margin-bottom: 25px;
  }

  .job-icon {
    height: 160px;
  }

  .job-emoji {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .department-badge {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .job-content {
    padding: 15px;
  }

  .job-title {
    font-size: 1rem;
  }
}

/* Tablet Responsive */
@media (min-width: 769px) and (max-width: 1024px) {
  .content-wrapper {
    padding: 25px 20px 15px;
  }

  .page-title {
    font-size: 2.2rem;
    margin-bottom: 18px;
  }

  .subtitle {
    font-size: 1.1rem;
    margin-bottom: 28px;
  }

  .why-join-section {
    max-width: 90%;
    padding: 25px;
  }

  .why-join-title {
    font-size: 1.6rem;
  }

  .why-join-text {
    font-size: 0.95rem;
  }

  .job-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }

  .job-icon {
    height: 200px;
  }

  .job-emoji {
    font-size: 3.5rem;
  }
}
</style>
