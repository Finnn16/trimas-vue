<template>
  <section class="testimonial-grid">
    <div
      v-for="(item, index) in testimonials"
      :key="index"
      class="testimonial-card"
      tabindex="0"
      role="article"
      aria-label="User testimonial"
    >
      <img
        class="avatar"
        :src="item.avatar"
        :alt="item.avatarAlt"
        loading="lazy"
        onerror="this.style.display='none'"
      />
      <blockquote class="testimonial-text">"{{ item.testimonial }}"</blockquote>
      <p class="name">{{ item.name }}</p>
      <p class="job">{{ item.job }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialGrid",
  data() {
    return {
      testimonials: [
        {
          testimonial:
            "This service exceeded my expectations with its friendly support and professional handling.",
          name: "Alex Johnson",
          job: "Product Manager",
          avatar:
            "https://placehold.co/96x96/png?text=AJ&bg=888888&fg=ffffff&font=Inter",
          avatarAlt:
            "Avatar of Alex Johnson, a product manager, showing a friendly smiling person on grey background",
        },
        {
          testimonial:
            "A wonderful experience! Highly recommended for anyone seeking quality and professionalism.",
          name: "Maria Gomez",
          job: "UX Designer",
          avatar:
            "https://placehold.co/96x96/png?text=MG&bg=777777&fg=ffffff&font=Inter",
          avatarAlt:
            "Avatar of Maria Gomez, a UX designer, showing a friendly smiling person on grey background",
        },
        {
          testimonial:
            "Efficient, clean, and reliable service with a friendly touch that made all the difference.",
          name: "Daniel Lee",
          job: "Software Engineer",
          avatar:
            "https://placehold.co/96x96/png?text=DL&bg=999999&fg=ffffff&font=Inter",
          avatarAlt:
            "Avatar of Daniel Lee, a software engineer, showing a friendly smiling person on grey background",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

.testimonial-grid {
  display: flex;
  gap: 24px;
  justify-content: center;
  padding: 32px;
  background: rgba(128, 128, 128, 0.1); /* subtle grey base with transparency */
  font-family: "Inter", sans-serif;
  flex-wrap: wrap;
}

.testimonial-card {
  background: rgba(211, 211, 211, 0.15); /* light transparent grey */
  border-radius: 12px;
  padding: 24px 24px 32px;
  width: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: default;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    transform 0.3s ease;
  outline-offset: 4px;
}

.testimonial-card:focus,
.testimonial-card:hover {
  background: rgba(211, 211, 211, 0.35);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-6px);
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid rgba(128, 128, 128, 0.25);
  background-color: rgba(200, 200, 200, 0.2);
  flex-shrink: 0;
}

.testimonial-text {
  font-size: 1rem;
  color: #2b2b2b;
  margin-bottom: 20px;
  line-height: 1.5;
  font-style: italic;
  user-select: text;
}

.name {
  font-weight: 700;
  font-size: 1.1rem;
  color: #111;
  margin-bottom: 4px;
}

.job {
  font-weight: 500;
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

/* Responsive adjustments */

@media (max-width: 980px) {
  .testimonial-grid {
    justify-content: space-around;
    gap: 20px;
  }
}

@media (max-width: 700px) {
  .testimonial-grid {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 24px;
  }

  .testimonial-card {
    width: 90%;
    max-width: 400px;
  }
}
</style>
