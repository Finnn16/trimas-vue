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
          :key="job.ID"
          class="job-card"
          @click="openJobDetail(job)"
        >
          <!-- Job Icon Section (menggantikan foto) -->
          <div class="job-icon">
            <div class="icon-container">
              <svg
                class="job-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-html="
                  departmentIcons[job.Department] || departmentIcons['default']
                "
              ></svg>
            </div>
          </div>

          <!-- Job Content -->
          <div class="job-content">
            <h2 class="job-title">{{ job.Title }}</h2>
            <p class="job-department">
              <svg
                class="department-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 21V7L13 3V21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 21V11L13 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ job.Department }}
            </p>
            <div class="job-meta">
              <svg
                class="qualifications-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 4L12 14.01L9 11.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="job-qualifications">{{ job.Qualifications }}</span>
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
      departmentIcons: {
        Production: `<path d="M4 19V9C4 7.89543 4.89543 7 6 7H8M20 19V9C20 7.89543 19.1046 7 18 7H16M12 7V5C12 3.89543 11.1046 3 10 3H8C6.89543 3 6 3.89543 6 5V7M12 7H8M12 7H16M16 7V5C16 3.89543 15.1046 3 14 3H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11H12M8 15H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="11" r="1" fill="currentColor"/>`,
        HR: `<path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11ZM20 8V14M17 11H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        IT: `<path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        Marketing: `<path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        Finance: `<path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "Quality Control": `<path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        default: `<path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
      },
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
      console.log("All headers:", headers); // Add this line to log all headers
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
          console.log("Qualifications value:", obj.Qualifications); // Add this line to specifically log qualifications
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
  color: #1e2a44;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
  padding: 28px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.98)
  );
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

.job-card:hover .job-title {
  color: #2563eb;
}

.job-department {
  color: #4b5563;
  font-size: 1rem;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  padding: 8px 12px;
  background: rgba(37, 99, 235, 0.2);
  border-radius: 8px;
  width: fit-content;
  transition: all 0.3s ease;
}

.job-department:hover {
  background: rgba(37, 99, 235, 0.6);
  transform: translateX(5px);
}

.job-meta {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.6;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.job-icon-svg {
  width: 80px;
  height: 80px;
  color: #1e2a44;
  margin: 0 auto 15px auto;
  display: block;
  transition: transform 0.3s ease;
}

.job-card:hover .job-icon-svg {
  transform: scale(1.1);
  color: #2563eb;
}

.department-icon {
  width: 20px;
  height: 20px;
  color: #4b5563;
}

.qualifications-icon {
  width: 20px;
  height: 20px;
  color: #4b5563;
  flex-shrink: 0;
}

.job-department,
.job-meta {
  display: flex;
  align-items: center;
  gap: 8px;
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
