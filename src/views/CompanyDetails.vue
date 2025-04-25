<!-- src/views/CompanyDetails.vue -->
<template>
<main class="main-content">
    <h1 class="head-content">Tentang <span style="color: #092E5E;">Kami</span></h1>
    <section class="company-details">
    <div class="company-history">
        <h2>Sejarah Perusahaan</h2>
        <p>
        Didirikan pada tahun [tahun], perusahaan kami telah menjadi pemimpin dalam industri garmen, khususnya untuk pakaian golf dan seragam rumah sakit. Dengan komitmen pada kualitas dan inovasi, kami terus berkembang untuk memenuhi kebutuhan klien global.
        </p>
    </div>
    <div class="production-capacity">
        <h2>Kapasitas Produksi</h2>
        <p>
        Kami memiliki fasilitas produksi modern yang mampu menghasilkan [jumlah] unit pakaian per bulan, dengan fokus pada kualitas tinggi dan pengiriman tepat waktu untuk memenuhi pesanan besar seperti seragam rumah sakit dan pakaian golf premium.
        </p>
    </div>
    <div class="client-testimonials">
        <h2>Testimoni Klien</h2>
        <p>
        "Kualitas pakaian golf dari perusahaan ini luar biasa, sangat nyaman dan tahan lama!" - [Nama Klien]
        </p>
        <p>
        "Seragam rumah sakit yang mereka buat memenuhi standar kami dengan sempurna." - [Nama Klien]
        </p>
    </div>
    </section>
</main>
</template>

<script>
export default {
name: 'CompanyDetails',
};
</script>

<style scoped>
.main-content {
width: 100%;
max-width: 1600px;
padding: 80px 20px;
margin: 0 auto;
}

.head-content {
font-family: 'MDPrimer', sans-serif;
font-weight: 800;
font-size: 5.5rem;
text-align: center;
margin-bottom: 50px;
color: black;
}

.company-details {
max-width: 1200px;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 40px;
}

.company-history,
.production-capacity,
.client-testimonials {
background-color: #f9f9f9;
padding: 30px;
border-radius: 10px;
}

h2 {
font-family: 'MDPrimer', sans-serif;
font-size: 2rem;
margin-bottom: 20px;
color: #092E5E;
}

p {
font-size: 1.1rem;
line-height: 1.6;
color: #333;
}

@media (max-width: 992px) {
.head-content {
    font-size: 2.2rem;
}
}

@media (max-width: 768px) {
.main-content {
    padding: 20px;
}
}
</style>