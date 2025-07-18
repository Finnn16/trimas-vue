<template>
  <div class="language-switcher">
    <button
      @click="switchLanguage"
      class="language-btn"
      :title="`Switch to ${getNextLanguageLabel()}`"
    >
      {{ getCurrentLanguageLabel() }}
    </button>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "LanguageSwitcher",
  setup() {
    const { locale } = useI18n();
    const languages = ["id", "en", "ja"];

    const getCurrentLanguageLabel = () => {
      const labels = {
        id: "ID",
        en: "EN",
        ja: "JP",
      };
      return labels[locale.value];
    };

    const getNextLanguageLabel = () => {
      const currentIndex = languages.indexOf(locale.value);
      const nextIndex = (currentIndex + 1) % languages.length;
      const nextLang = languages[nextIndex];

      const labels = {
        id: "Indonesian",
        en: "English",
        ja: "Japanese",
      };
      return labels[nextLang];
    };

    const switchLanguage = () => {
      const currentIndex = languages.indexOf(locale.value);
      const nextIndex = (currentIndex + 1) % languages.length;
      const nextLanguage = languages[nextIndex];

      locale.value = nextLanguage;
      localStorage.setItem("locale", nextLanguage);
    };

    return {
      getCurrentLanguageLabel,
      getNextLanguageLabel,
      switchLanguage,
    };
  },
};
</script>

<style scoped>
/* Language Switcher Styles */
.language-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999; /* Z-index tinggi agar selalu di atas */
}

.language-btn {
  background: rgba(9, 46, 94, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.language-btn:hover {
  background: rgba(9, 46, 94, 1);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.language-btn:active {
  transform: scale(0.95);
}

/* Responsive untuk language switcher */
@media (max-width: 768px) {
  .language-switcher {
    bottom: 15px;
    right: 15px;
  }

  .language-btn {
    width: 50px;
    height: 50px;
    font-size: 12px;
  }
}
</style>
