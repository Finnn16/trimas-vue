<!-- SectionAccents.vue -->
<template>
  <div>
    <!-- President Message Section Accent -->
    <div class="president-message-accent">
      <div class="accent-line"></div>
      <div class="accent-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

    <!-- Value & Excellence Section Accent -->
    <div class="value-section-accent">
      <svg
        width="100%"
        height="800"
        viewBox="0 0 1200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,50 Q300,80 600,50 T1200,50"
          stroke="#79D1C3"
          stroke-width="2"
          fill="none"
        />
        <path
          d="M0,60 Q300,90 600,60 T1200,60"
          stroke="#4FABCF"
          stroke-width="2"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionAccents",
};
</script>

<style scoped>
/* President Message Section Accent */
.president-message-accent {
  position: absolute;
  top: 580px;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: -1;
}

.accent-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(79, 171, 207, 0) 0%,
    rgba(79, 171, 207, 0.3) 25%,
    rgba(79, 171, 207, 0.3) 75%,
    rgba(79, 171, 207, 0) 100%
  );
}

.accent-dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(79, 171, 207, 0.5);
}

/* Value & Excellence Section Accent */
.value-section-accent {
  position: absolute;
  top: 830px;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: -1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .president-message-accent {
    top: 650px;
  }

  .value-section-accent {
    top: 900px;
  }
}
</style>
