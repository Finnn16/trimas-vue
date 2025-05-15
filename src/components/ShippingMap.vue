<template>
  <div>
    <div id="map" style="height: 500px; width: 100%"></div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import us from "@/assets/flags/4x3/us.svg";
import th from "@/assets/flags/4x3/th.svg";
import jp from "@/assets/flags/4x3/jp.svg";
import mx from "@/assets/flags/4x3/mx.svg";
import sg from "@/assets/flags/4x3/sg.svg";
import my from "@/assets/flags/4x3/my.svg";
import id from "@/assets/flags/4x3/id.svg";
import br from "@/assets/flags/4x3/br.svg";
import ca from "@/assets/flags/4x3/ca.svg";

export default {
  name: "ShippingMap",
  setup() {
    onMounted(() => {
      // Inisialisasi peta
      const map = L.map("map").setView([20, 0], 2); // Posisi tengah dunia, zoom 2

      // Tambahkan base layer dari OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Data pengiriman
      const shippingData = [
        {
          country: "United States",
          lat: 37.0902,
          lng: -95.7129,
          flag: us,
          brands: 10,
        },
        {
          country: "Thailand",
          lat: 15,
          lng: 100,
          flag: th,
          brands: 2,
        },
        {
          country: "Mexico",
          lat: 23.6345,
          lng: -102.5528,
          flag: mx,
          brands: 4,
        },
        {
          country: "Singapore",
          lat: 1.35,
          lng: 103.8,
          flag: sg,
          brands: 2,
        },
        {
          country: "Malaysia",
          lat: 4,
          lng: 101.7,
          flag: my,
          brands: 2,
        },
        {
          country: "Indonesia",
          lat: -6.2088,
          lng: 106.8456,
          flag: id,
          brands: 4,
        },
        { country: "Japan", lat: 36, lng: 138, flag: jp, brands: 5 },
        {
          country: "Brazil",
          lat: -14.235,
          lng: -51.9253,
          flag: br,
          brands: 3,
        },
        {
          country: "Canada",
          lat: 56.1304,
          lng: -106.3468,
          flag: ca,
          brands: 3,
        },
      ];

      // Tambahkan marker dengan ikon bendera
      shippingData.forEach((data) => {
        // Ikon default (ukuran normal)
        const defaultIcon = L.icon({
          iconUrl: data.flag,
          iconSize: [32, 32], // Ukuran normal
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        // Ikon saat hover (ukuran lebih besar)
        const hoverIcon = L.icon({
          iconUrl: data.flag,
          iconSize: [48, 48], // Ukuran lebih besar saat hover
          iconAnchor: [24, 48], // Sesuaikan anchor karena ukuran berubah
          popupAnchor: [0, -48],
        });

        const marker = L.marker([data.lat, data.lng], { icon: defaultIcon })
          .addTo(map)
          .bindPopup(`Shipping to ${data.country}: ${data.brands} brands`);

        // Event handler untuk hover dengan delay untuk transisi halus
        let hoverTimeout;
        marker.on("mouseover", function () {
          clearTimeout(hoverTimeout); // Hapus timeout sebelumnya
          hoverTimeout = setTimeout(() => {
            this.setIcon(hoverIcon); // Ganti ke ikon besar setelah delay
            this.openPopup();
          }, 100); // Delay 100ms untuk efek smooth
        });

        marker.on("mouseout", function () {
          clearTimeout(hoverTimeout); // Hapus timeout saat mouse out
          hoverTimeout = setTimeout(() => {
            this.setIcon(defaultIcon); // Kembalikan ke ikon normal setelah delay
            this.closePopup();
          }, 100); // Delay 100ms untuk transisi keluar
        });

        marker.on("click", function () {
          map.flyTo([data.lat, data.lng], 5); // Zoom ke negara saat marker diklik
        });
      });
    });
  },
};
</script>

<style scoped>
#map {
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
}

/* Tambahkan transisi untuk popup */
.leaflet-popup-content-wrapper {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.leaflet-popup-tip {
  transition: transform 0.3s ease;
}

/* Efek transisi saat ikon diganti (meskipun terbatas oleh Leaflet) */
.leaflet-marker-icon {
  transition: transform 0.3s ease; /* Tidak langsung berfungsi pada ikon Leaflet, hanya untuk referensi */
}
</style>
