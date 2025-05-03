<template>
  <section class="president-message">
    <div class="message-container">
      <div class="president-image">
        <img src="../assets/img/Pak-Kevin.jpg" alt="President Director" />
      </div>
      <div class="message-content">
        <h1 class="title">Message From Our President Director</h1>
        <div class="message-text">
          <p>
            "With over 85 years of experience, Trimas Sarana Garment Industry
            has become one of the world's leading manufacturers for apparel
            brands. Our spirit of quality, care, and commitment leads us to
            deliver high quality products for our customers, keeping our
            environment sustainable, and creating a better life for all. Start
            your fashion journey with us and let our product quality take you
            higher."
          </p>
          <p class="president-name">Kartono Budiman (Kevin Oen)</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PresidentMessage",
};
</script>

<style scoped>
/* Styling Dasar */
.president-message {
  width: 100%;
  margin: 0 auto;
  background-color: transparent;
  padding: 40px 20px; /* Padding untuk semua ukuran layar */
}

.message-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px; /* Jarak lebih besar untuk desktop */
}

.president-image {
  flex: 1 1 50%; /* Proporsi fleksibel */
  max-width: 50%; /* Batasi lebar maksimum */
}

.president-image img {
  width: 100%;
  height: auto; /* Menjaga rasio aspek gambar */
  display: block;
  border-radius: 8px; /* Radius sudut lebih lembut */
  object-fit: cover; /* Pastikan gambar terisi dengan baik */
  max-height: 600px; /* Batasi tinggi maksimum */
}

.message-content {
  flex: 1 1 50%; /* Proporsi fleksibel */
  max-width: 50%;
  align-items: center;
  margin-bottom: 10px;
}

.title {
  font-family: "IBM Plex Serif", serif;
  font-size: 3.5rem; /* Ukuran awal untuk desktop */
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 20px;
}

.message-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.president-name {
  font-weight: 600;
  margin-top: 15px;
  color: #2c3e50; /* Warna lebih kontras */
}

/* Responsif untuk Tablet (maksimum 992px) */
@media screen and (max-width: 992px) {
  .message-container {
    flex-direction: column;
    gap: 20px; /* Jarak lebih kecil untuk tablet */
  }

  .president-image,
  .message-content {
    max-width: 100%; /* Penuhi lebar layar */
    flex: 1 1 100%;
  }

  .president-image img {
    max-height: 400px; /* Tinggi lebih kecil untuk tablet */
  }

  .title {
    font-size: 2.5rem; /* Ukuran teks lebih kecil */
    text-align: center; /* Pusatkan teks */
  }

  .message-text {
    text-align: center; /* Pusatkan teks */
  }
}

/* Responsif untuk Mobile (maksimum 576px) */
@media screen and (max-width: 576px) {
  .president-message {
    padding: 20px 10px; /* Padding lebih kecil untuk mobile */
  }

  .president-image img {
    max-height: 300px; /* Tinggi lebih kecil untuk mobile */
  }

  .title {
    font-size: 2rem; /* Ukuran teks lebih kecil lagi */
  }

  .message-text {
    font-size: 0.95rem; /* Ukuran teks lebih kecil */
  }

  .president-name {
    font-size: 1.1rem; /* Pastikan nama tetap terbaca */
  }
}

/* Responsif Tambahan untuk Layar Sangat Kecil (< 400px) */
@media screen and (max-width: 400px) {
  .title {
    font-size: 1.8rem; /* Sesuaikan untuk layar sangat kecil */
  }

  .message-text {
    font-size: 0.9rem; /* Ukuran teks lebih kecil lagi */
  }

  .president-image img {
    max-height: 250px; /* Tinggi lebih kecil untuk layar kecil */
  }
}
</style>
