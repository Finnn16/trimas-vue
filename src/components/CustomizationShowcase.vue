<template>
  <section class="customization-section">
    <div class="container">
      <h2>Kustomisasi Produk Anda</h2>
      <div class="content-wrapper">
        <!-- Gambar Produk -->
        <div class="image-container">
          <img :src="selectedImage" alt="Produk Kustom" />
        </div>
        <!-- Pilihan Kustomisasi -->
        <div class="options-container">
          <h3>Ciptakan Desain Sesuai Kebutuhan</h3>
          <p>
            Pilih warna untuk pakaian golf atau seragam rumah sakit Anda. Kami
            menawarkan fleksibilitas untuk memenuhi kebutuhan klub golf atau
            fasilitas kesehatan Anda.
          </p>
          <!-- Pilihan Warna -->
          <div class="color-options">
            <h4>Pilih Warna:</h4>
            <div class="color-buttons">
              <button
                v-for="color in colors"
                :key="color.name"
                :style="{ backgroundColor: color.hex }"
                :class="{ active: selectedColor === color.name }"
                @click="selectColor(color.name)"
              ></button>
            </div>
          </div>
          <!-- CTA -->
          <a href="/contact" class="cta-button">Hubungi Kami</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CustomizationShowcase",
  data() {
    return {
      colors: [
        {
          name: "blue",
          hex: "#1E40AF",
          image: "/src/assets/images/golf-shirt-blue.png",
        },
        {
          name: "white",
          hex: "#FFFFFF",
          image: "/src/assets/images/golf-shirt-white.png",
        },
        {
          name: "green",
          hex: "#15803D",
          image: "/src/assets/images/golf-shirt-green.png",
        },
      ],
      selectedColor: "blue",
    };
  },
  computed: {
    selectedImage() {
      const selected = this.colors.find(
        (color) => color.name === this.selectedColor
      );
      return selected ? selected.image : this.colors[0].image;
    },
  },
  methods: {
    selectColor(colorName) {
      this.selectedColor = colorName;
    },
  },
};
</script>

<style scoped>
.customization-section {
  padding: 60px 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: center;
}

.image-container {
  flex: 1;
  min-width: 300px;
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.options-container {
  flex: 1;
  min-width: 300px;
}

h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.6;
}

.color-options h4 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #333;
}

.color-buttons {
  display: flex;
  gap: 16px;
}

.color-buttons button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: border-color 0.3s;
}

.color-buttons button.active {
  border-color: #1e40af;
}

.color-buttons button:focus {
  outline: none;
}

.cta-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #1e40af;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #1e3a8a;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 20px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 20px;
  }

  .image-container,
  .options-container {
    min-width: 100%;
  }
}
</style>
