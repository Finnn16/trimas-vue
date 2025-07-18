<template>
  <div class="about-us-container">
    <!-- Hero Section with Parallax -->
    <section class="hero-section">
      <div
        :style="{ transform: `translateY(${parallaxOffset}px)` }"
        class="parallax-bg"
      ></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div :class="{ 'animate-in': heroVisible }" class="hero-text">
          <h1 class="hero-title">
            {{ $t("about.hero.title") }}
            <span class="text-accent-hero">{{ $t("about.hero.company") }}</span>
          </h1>
          <p class="hero-subtitle">{{ $t("about.hero.subtitle") }}</p>
          <div class="hero-description">
            <p>
              {{ $t("about.hero.description") }}
            </p>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToContent">
        <span class="material-icons">keyboard_arrow_down</span>
      </div>
    </section>

    <!-- Interactive Timeline Section -->
    <section ref="timelineSection" class="timeline-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("about.journey.title") }}
            <span class="text-accent">{{ $t("about.journey.journey") }}</span>
          </h2>
          <p class="section-tagline">
            {{ $t("about.journey.subtitle") }}
          </p>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          <div
            v-for="(milestone, index) in milestones"
            :key="index"
            :class="{
              active: activeMilestone === index,
              visible: visibleMilestones.includes(index),
            }"
            class="timeline-item"
            @click="setActiveMilestone(index)"
          >
            <div class="timeline-marker">
              <span class="material-icons">{{ milestone.icon }}</span>
            </div>
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3>{{ $t(`about.milestones.${index}.title`) }}</h3>
              <p>{{ $t(`about.milestones.${index}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("about.values.title") }}
            <span class="text-accent">{{ $t("about.values.values") }}</span>
          </h2>
          <p class="section-tagline">
            {{ $t("about.values.subtitle") }}
          </p>
        </div>

        <div class="values-grid">
          <div
            v-for="(value, index) in values"
            :key="index"
            :class="{ active: activeValue === index }"
            class="value-card"
            @mouseenter="setActiveValue(index)"
            @mouseleave="setActiveValue(null)"
          >
            <div class="value-icon">
              <span class="material-icons">{{ value.icon }}</span>
            </div>
            <h3>{{ $t(`about.valuesData.${index}.title`) }}</h3>
            <p>{{ $t(`about.valuesData.${index}.description`) }}</p>
            <div v-if="activeValue === index" class="value-details">
              <ul>
                <li
                  v-for="(detail, detailIndex) in value.details"
                  :key="detailIndex"
                >
                  {{ $t(`about.valuesData.${index}.details.${detailIndex}`) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("about.team.title") }}
            <span class="text-accent">{{ $t("about.team.team") }}</span>
          </h2>
          <p class="section-tagline">{{ $t("about.team.subtitle") }}</p>
        </div>

        <div class="leadership-categories">
          <div
            v-for="(category, categoryKey) in leadershipTeams"
            :key="categoryKey"
            class="leadership-category"
          >
            <h3 class="category-title">
              {{ $t(`about.teamCategories.${categoryKey}.title`) }}
            </h3>
            <div class="team-showcase">
              <div class="team-modern-grid">
                <div
                  v-for="(member, index) in category.members"
                  :key="index"
                  :class="{
                    active: activeTeamMember === `${categoryKey}-${index}`,
                  }"
                  class="team-member"
                  @click="setActiveTeamMember(`${categoryKey}-${index}`)"
                >
                  <div class="member-image-container">
                    <div class="member-image">
                      <img
                        :alt="
                          $t(`about.teamMembers.${categoryKey}.${index}.name`)
                        "
                        :src="member.image"
                      />
                      <div class="image-overlay">
                        <div class="overlay-content">
                          <span class="material-icons">info</span>
                          <p>{{ $t("about.clickToLearnMore") }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4 class="member-name">
                      {{ $t(`about.teamMembers.${categoryKey}.${index}.name`) }}
                    </h4>
                    <p class="member-role">
                      {{ $t(`about.teamMembers.${categoryKey}.${index}.role`) }}
                    </p>
                    <div class="member-divider"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Popup Overlay for Team Member Details -->
          <div
            v-if="activeTeamMember !== null"
            class="team-popup-overlay"
            @click.self="setActiveTeamMember(null)"
          >
            <transition mode="out-in" name="slide-fade">
              <div :key="activeTeamMember" class="team-popup-content">
                <button class="close-popup" @click="setActiveTeamMember(null)">
                  &times;
                </button>
                <div class="member-profile">
                  <div class="profile-header">
                    <div class="profile-avatar">
                      <img
                        :alt="getActiveMemberName"
                        :src="getActiveMember.image"
                      />
                    </div>
                    <div class="profile-title">
                      <h3>{{ getActiveMemberName }}</h3>
                      <p class="profile-position">{{ getActiveMemberRole }}</p>
                    </div>
                  </div>
                  <div class="profile-body">
                    <div class="profile-bio">
                      <h5>{{ $t("about.profileAbout") }}</h5>
                      <p>{{ getActiveMemberBio }}</p>
                    </div>
                    <div class="profile-achievements">
                      <h5>{{ $t("about.keyAchievements") }}</h5>
                      <div class="achievements-list">
                        <div
                          v-for="(
                            achievement, idx
                          ) in getActiveMemberAchievements"
                          :key="idx"
                          class="achievement-item"
                        >
                          <span class="achievement-icon">🏆</span>
                          <span class="achievement-text">{{
                            achievement
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CSR Impact Section -->
    <section class="csr-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("about.csr.title") }}
            <span class="text-accent">{{ $t("about.csr.impact") }}</span>
          </h2>
          <p class="section-tagline">
            {{ $t("about.csr.subtitle") }}
          </p>
        </div>

        <div class="csr-content">
          <div class="csr-stats">
            <div
              v-for="(stat, index) in csrStats"
              :key="index"
              :class="{ active: activeCsrStat === index }"
              class="csr-stat-card"
              @mouseenter="activeCsrStat = index"
              @mouseleave="activeCsrStat = null"
            >
              <div class="stat-icon">
                <span class="material-icons">{{ stat.icon }}</span>
              </div>
              <div ref="statNumbers" class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">
                {{ $t(`about.csrStats.${index}.label`) }}
              </div>
              <p class="stat-description">
                {{ $t(`about.csrStats.${index}.description`) }}
              </p>
            </div>
          </div>

          <div class="csr-initiatives">
            <div class="initiative-tabs">
              <button
                v-for="(initiative, index) in csrInitiatives"
                :key="index"
                :class="{ active: activeInitiative === index }"
                class="tab-button"
                @click="setActiveInitiative(index)"
              >
                <span class="material-icons">{{ initiative.icon }}</span>
                {{ $t(`about.csrInitiatives.${index}.title`) }}
              </button>
            </div>

            <div class="initiative-content">
              <transition mode="out-in" name="fade">
                <div :key="activeInitiative" class="initiative-details">
                  <div class="initiative-image">
                    <img
                      :alt="
                        $t(`about.csrInitiatives.${activeInitiative}.title`)
                      "
                      :src="csrInitiatives[activeInitiative].image"
                    />
                  </div>
                  <div class="initiative-text">
                    <h3>
                      {{ $t(`about.csrInitiatives.${activeInitiative}.title`) }}
                    </h3>
                    <p>
                      {{
                        $t(
                          `about.csrInitiatives.${activeInitiative}.description`
                        )
                      }}
                    </p>
                    <div class="initiative-impact">
                      <h5>{{ $t("about.impactMetrics") }}:</h5>
                      <div class="impact-items">
                        <div
                          v-for="(impact, impactIndex) in csrInitiatives[
                            activeInitiative
                          ].impact"
                          :key="impactIndex"
                          class="impact-item"
                        >
                          <span class="impact-number">{{ impact.value }}</span>
                          <span class="impact-label">{{
                            $t(
                              `about.csrInitiatives.${activeInitiative}.impact.${impactIndex}.metric`
                            )
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future Vision Section -->
    <section class="vision-section">
      <div class="container">
        <div class="section-header">
          <h2>
            {{ $t("about.vision.title") }}
            <span class="text-accent">{{ $t("about.vision.vision") }}</span>
          </h2>
          <p class="section-tagline">
            {{ $t("about.vision.subtitle") }}
          </p>
        </div>

        <div class="vision-content">
          <div class="vision-cards">
            <div
              v-for="(goal, index) in futureGoals"
              :key="index"
              :class="{ active: activeGoal === index }"
              class="vision-card"
              @click="setActiveGoal(index)"
            >
              <div class="vision-icon">
                <span class="material-icons">{{ goal.icon }}</span>
              </div>
              <h4>{{ $t(`about.futureGoals.${index}.title`) }}</h4>
              <div class="vision-progress">
                <div class="progress-bar">
                  <div
                    :style="{ width: goal.progress + '%' }"
                    class="progress-fill"
                  ></div>
                </div>
                <span class="progress-text"
                  >{{ goal.progress }}% {{ $t("about.complete") }}</span
                >
              </div>
            </div>
          </div>

          <div v-if="activeGoal !== null" class="vision-details">
            <transition mode="out-in" name="slide-up">
              <div :key="activeGoal" class="goal-details">
                <h3>{{ $t(`about.futureGoals.${activeGoal}.title`) }}</h3>
                <p>{{ $t(`about.futureGoals.${activeGoal}.description`) }}</p>
                <div class="goal-timeline">
                  <h5>{{ $t("about.implementationTimeline") }}:</h5>
                  <div class="timeline-steps">
                    <div
                      v-for="(step, index) in futureGoals[activeGoal].steps"
                      :key="index"
                      :class="{ completed: step.completed }"
                      class="timeline-step"
                    >
                      <div class="step-marker"></div>
                      <div class="step-content">
                        <h6>
                          {{
                            $t(
                              `about.futureGoals.${activeGoal}.steps.${index}.phase`
                            )
                          }}
                        </h6>
                        <p>
                          {{
                            $t(
                              `about.futureGoals.${activeGoal}.steps.${index}.description`
                            )
                          }}
                        </p>
                        <span class="step-date">{{ step.date }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";

export default {
  name: "AboutUs",
  setup() {
    const { t } = useI18n();
    const parallaxOffset = ref(0);
    const heroVisible = ref(false);
    const activeMilestone = ref(0);
    const visibleMilestones = ref([]);
    const activeValue = ref(null);
    const activeTeamMember = ref(null);
    const activeCsrStat = ref(null);
    const activeInitiative = ref(0);
    const activeGoal = ref(null);
    const timelineSection = ref(null);

    // Data
    const milestones = ref([
      {
        year: "1991",
        icon: "flag",
      },
      {
        year: "1995",
        icon: "handshake",
      },
      {
        year: "2000",
        icon: "precision_manufacturing",
      },
      {
        year: "2010",
        icon: "eco",
      },
      {
        year: "2020",
        icon: "smart_toy",
      },
      {
        year: "2025",
        icon: "public",
      },
    ]);

    const values = ref([
      {
        icon: "star",
        details: [0, 1, 2, 3], // Index untuk i18n details
      },
      {
        icon: "volunteer_activism",
        details: [0, 1, 2, 3],
      },
      {
        icon: "handshake",
        details: [0, 1, 2, 3],
      },
    ]);

    const leadershipTeams = ref({
      bod: {
        members: [
          {
            image:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
          },
          {
            image:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
          },
        ],
      },
      boc: {
        members: [
          {
            image:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
          },
          {
            image:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
          },
        ],
      },
      managers: {
        members: [
          {
            image:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
          },
          {
            image:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
          },
          {
            image:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
          },
        ],
      },
    });

    const csrStats = ref([
      {
        icon: "school",
        value: "500+",
      },
      {
        icon: "forest",
        value: "10,000",
      },
      {
        icon: "local_hospital",
        value: "50+",
      },
      {
        icon: "recycling",
        value: "75%",
      },
    ]);

    const csrInitiatives = ref([
      {
        icon: "school",
        image:
          "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
        impact: [{ value: "500+" }, { value: "85%" }, { value: "20" }],
      },
      {
        icon: "eco",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
        impact: [{ value: "10,000" }, { value: "75%" }, { value: "50%" }],
      },
      {
        icon: "local_hospital",
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
        impact: [{ value: "50+" }, { value: "5,000+" }, { value: "25" }],
      },
    ]);

    const futureGoals = ref([
      {
        icon: "eco",
        progress: 65,
        steps: [
          {
            date: "2024 Q1",
            completed: true,
          },
          {
            date: "2024 Q3",
            completed: true,
          },
          {
            date: "2025 Q1",
            completed: false,
          },
          {
            date: "2025 Q3",
            completed: false,
          },
        ],
      },
      {
        icon: "precision_manufacturing",
        progress: 45,
        steps: [
          {
            date: "2024 Q2",
            completed: true,
          },
          {
            date: "2024 Q4",
            completed: false,
          },
          {
            date: "2025 Q2",
            completed: false,
          },
        ],
      },
      {
        icon: "public",
        progress: 30,
        steps: [
          {
            date: "2024 Q1",
            completed: true,
          },
          {
            date: "2025 Q1",
            completed: false,
          },
          {
            date: "2025 Q4",
            completed: false,
          },
        ],
      },
    ]);

    // Methods
    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxOffset.value = scrollY * 0.5;
    };

    const scrollToContent = () => {
      timelineSection.value?.scrollIntoView({ behavior: "smooth" });
    };

    const setActiveMilestone = (index) => {
      activeMilestone.value = index;
    };

    const setActiveValue = (index) => {
      activeValue.value = index;
    };

    const setActiveTeamMember = (id) => {
      activeTeamMember.value = activeTeamMember.value === id ? null : id;
    };

    const getActiveMember = computed(() => {
      if (!activeTeamMember.value) return null;
      const [category, index] = activeTeamMember.value.split("-");
      return leadershipTeams.value[category].members[index];
    });

    const getActiveMemberName = computed(() => {
      if (!activeTeamMember.value) return "";
      const [category, index] = activeTeamMember.value.split("-");
      return t(`about.teamMembers.${category}.${index}.name`);
    });

    const getActiveMemberRole = computed(() => {
      if (!activeTeamMember.value) return "";
      const [category, index] = activeTeamMember.value.split("-");
      return t(`about.teamMembers.${category}.${index}.role`);
    });

    const getActiveMemberBio = computed(() => {
      if (!activeTeamMember.value) return "";
      const [category, index] = activeTeamMember.value.split("-");
      return t(`about.teamMembers.${category}.${index}.bio`);
    });

    const getActiveMemberAchievements = computed(() => {
      if (!activeTeamMember.value) return [];
      const [category, index] = activeTeamMember.value.split("-");
      const achievementCount = t(
        `about.teamMembers.${category}.${index}.achievements`,
        {},
        { fallbackWarn: false }
      );

      // Get achievements array
      const achievements = [];
      let i = 0;
      while (true) {
        try {
          const achievement = t(
            `about.teamMembers.${category}.${index}.achievements.${i}`
          );
          if (achievement.includes("about.teamMembers")) break; // Stop if translation key is returned
          achievements.push(achievement);
          i++;
        } catch (e) {
          break;
        }
      }
      return achievements;
    });

    const setActiveInitiative = (index) => {
      activeInitiative.value = index;
    };

    const setActiveGoal = (index) => {
      activeGoal.value = activeGoal.value === index ? null : index;
    };

    const observeElements = () => {
      const timelineItems = document.querySelectorAll(".timeline-item");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(timelineItems).indexOf(entry.target);
              if (!visibleMilestones.value.includes(index)) {
                visibleMilestones.value.push(index);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      timelineItems.forEach((item) => {
        observer.observe(item);
      });
    };

    onMounted(() => {
      // Hero animation
      setTimeout(() => {
        heroVisible.value = true;
      }, 500);

      // Parallax effect
      const handleScroll = () => {
        updateParallax();
      };
      window.addEventListener("scroll", handleScroll);

      // Intersection observer
      setTimeout(() => {
        observeElements();
      }, 1000);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", updateParallax);
    });

    return {
      parallaxOffset,
      heroVisible,
      activeMilestone,
      visibleMilestones,
      activeValue,
      activeTeamMember,
      activeCsrStat,
      activeInitiative,
      activeGoal,
      timelineSection,
      milestones,
      values,
      leadershipTeams,
      csrStats,
      csrInitiatives,
      futureGoals,
      scrollToContent,
      setActiveMilestone,
      setActiveValue,
      setActiveTeamMember,
      getActiveMember,
      getActiveMemberName,
      getActiveMemberRole,
      getActiveMemberBio,
      getActiveMemberAchievements,
      setActiveInitiative,
      setActiveGoal,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* Base Styles */
.about-us-container {
  font-family: "Poppins", sans-serif;
  color: #2c3e50;
  --primary-color: #092e5e;
  --accent-color: #092e5e;
  --light-gray: #f8f9fa;
  --dark-gray: #343a40;
  --text-color: #2c3e50;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.text-accent {
  color: var(--accent-color);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-tagline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-bg {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 120%;
  background: url("../assets/img/karyawan.webp") no-repeat center/cover;
  z-index: -2;
  will-change: transform;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(9, 46, 94, 0.8),
    rgba(9, 46, 94, 0.6)
  );
  z-index: -1;
}

.hero-content {
  text-align: center;
  color: white;
  z-index: 1;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-text {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease;
}

.hero-text.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: white;
  animation: bounce 2s infinite;
}

.scroll-indicator span {
  font-size: 2rem;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Timeline Section */
.timeline-section {
  padding: 6rem 0;
  background-color: white;
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-color), #e9ecef);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
  cursor: pointer;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-item:nth-child(even) .timeline-content {
  text-align: right;
}

.timeline-marker {
  width: 60px;
  height: 60px;
  background: white;
  border: 3px solid var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-item.active .timeline-marker {
  background: var(--accent-color);
  color: white;
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(9, 46, 94, 0.4);
}

.timeline-content {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-top: 1rem;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-item.active .timeline-content {
  background: var(--light-gray);
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.timeline-year {
  font-size: 1.6rem;
  color: var(--accent-color);
  font-weight: 600;
  padding: 0.5rem;
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

/* Values Section */
.values-section {
  padding: 6rem 0;
  background: var(--light-gray);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.value-card:hover,
.value-card.active {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}

.value-icon {
  width: 80px;
  height: 80px;
  background: var(--light-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.value-card.active .value-icon {
  background: var(--accent-color);
  color: white;
  transform: scale(1.1);
}

.value-icon span {
  font-size: 2rem;
  color: var(--accent-color);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.value-card.active .value-icon span {
  color: white;
  transform: rotate(360deg);
}

.value-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.value-details {
  margin-top: 1.5rem;
  text-align: left;
}

.value-details ul {
  list-style: none;
  padding: 0;
}

.value-details li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
  position: relative;
  padding-left: 1.5rem;
}

.value-details li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--accent-color);
  font-weight: bold;
}

/* Team Section */
.team-section {
  padding: 6rem 0;
  background: white;
}

.leadership-categories {
  max-width: 1200px;
  margin: 0 auto;
}

.leadership-category {
  margin-bottom: 4rem;
}

.category-title {
  font-size: 1.8rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
}

.team-showcase {
  max-width: 1000px;
  margin: 0 auto;
}

/* Modern Team Grid */
.team-modern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
  justify-items: center;
}

.team-member {
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.team-member:hover,
.team-member.active {
  transform: translateY(-15px);
}

.member-image-container {
  position: relative;
  margin-bottom: 2rem;
}

.member-image {
  position: relative;
  width: 300px; /* Fixed width for all team members */
  height: 400px; /* Fixed height for all team members */
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin: 0 auto; /* Center the image container */
}

/* Ensure all team member images have consistent styling */
.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top; /* Ensures faces are visible for all team members */
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.team-member:hover .member-image,
.team-member.active .member-image {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}

.team-member:hover .member-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(9, 46, 94, 0.9),
    rgba(9, 46, 94, 0.7)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
}

.team-member:hover .image-overlay,
.team-member.active .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 1rem;
}

.overlay-content span {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.overlay-content p {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.member-info {
  text-align: center;
  padding: 0 1rem;
}

.member-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.team-member:hover .member-name,
.team-member.active .member-name {
  color: var(--accent-color);
}

.member-role {
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-divider {
  width: 50px;
  height: 3px;
  background: var(--accent-color);
  margin: 0 auto;
  border-radius: 2px;
  transform: scaleX(0);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.team-member:hover .member-divider,
.team-member.active .member-divider {
  transform: scaleX(1);
}

/* Modern Team Details */
.team-details-modern {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.member-profile {
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-title h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.profile-position {
  font-size: 1.2rem;
  color: var(--accent-color);
  font-weight: 600;
  margin: 0;
}

.profile-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .profile-body {
    grid-template-columns: 1fr 1fr;
  }
}

.profile-bio h5,
.profile-achievements h5 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
}

.profile-bio h5::after,
.profile-achievements h5::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--accent-color);
  border-radius: 2px;
}

.profile-bio p {
  line-height: 1.8;
  color: #495057;
  font-size: 1rem;
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  transform: translateX(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.achievement-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.achievement-text {
  font-size: 0.95rem;
  color: #495057;
  line-height: 1.5;
}

/* CSR Section */
.csr-section {
  padding: 6rem 0;
  background: var(--light-gray);
}

.csr-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

.csr-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.csr-stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.csr-stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-color), #0a3d7a);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
}

.csr-stat-card:hover::before,
.csr-stat-card.active::before {
  transform: scaleY(1);
}

.csr-stat-card:hover,
.csr-stat-card.active {
  transform: translateY(-15px) scale(1.05);
  color: white;
}

.stat-icon {
  margin-bottom: 1rem;
}

.stat-icon span {
  font-size: 2.5rem;
  color: var(--accent-color);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.csr-stat-card:hover .stat-icon span,
.csr-stat-card.active .stat-icon span {
  color: white;
  transform: scale(1.2) rotate(360deg);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.csr-stat-card:hover .stat-number,
.csr-stat-card.active .stat-number {
  color: white;
  transform: scale(1.1);
}

.stat-label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.stat-description {
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.csr-initiatives {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.initiative-tabs {
  display: flex;
  border-bottom: 1px solid #e9ecef;
  overflow-x: auto;
}

.tab-button {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.tab-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--accent-color);
  transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
}

.tab-button:hover::before,
.tab-button.active::before {
  left: 0;
}

.tab-button:hover,
.tab-button.active {
  color: white;
  transform: translateY(-2px);
}

.initiative-content {
  padding: 2rem;
}

.initiative-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

@media (min-width: 768px) {
  .initiative-details {
    grid-template-columns: 1fr 1fr;
  }
}

.initiative-image {
  border-radius: 8px;
  overflow: hidden;
  height: 250px;
}

.initiative-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initiative-text h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.initiative-impact {
  margin-top: 2rem;
}

.initiative-impact h5 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.impact-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.impact-item {
  text-align: center;
  padding: 1rem;
  background: var(--light-gray);
  border-radius: 8px;
}

.impact-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
}

.impact-label {
  font-size: 0.9rem;
  color: #6c757d;
}

/* Vision Section */
.vision-section {
  padding: 6rem 0;
  background: white;
}

.vision-content {
  max-width: 1000px;
  margin: 0 auto;
}

.vision-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.vision-card {
  background: var(--light-gray);
  padding: 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid transparent;
}

.vision-card:hover,
.vision-card.active {
  background: white;
  border-color: var(--accent-color);
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.vision-icon {
  width: 60px;
  height: 60px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.vision-icon span {
  color: white;
  font-size: 1.5rem;
}

.vision-card h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.vision-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--accent-color);
  transition: width 1s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 600;
}

.vision-details {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 2rem;
  min-height: 400px;
}

.goal-details h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.goal-timeline {
  margin-top: 2rem;
}

.goal-timeline h5 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.timeline-steps {
  position: relative;
}

.timeline-step {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 12px;
  top: 25px;
  bottom: -2rem;
  width: 2px;
  background: #e9ecef;
}

.timeline-step.completed::after {
  background: var(--accent-color);
}

.step-marker {
  width: 24px;
  height: 24px;
  border: 2px solid #e9ecef;
  border-radius: 50%;
  background: white;
  margin-right: 1rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.timeline-step.completed .step-marker {
  background: var(--accent-color);
  border-color: var(--accent-color);
}

.step-content {
  flex: 1;
}

.step-content h6 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.step-content p {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.step-date {
  font-size: 0.8rem;
  color: var(--accent-color);
  font-weight: 600;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .timeline-line {
    left: 30px;
  }

  .timeline-item {
    flex-direction: column;
    padding-left: 80px;
  }

  .timeline-item:nth-child(even) {
    flex-direction: column;
  }

  .timeline-item:nth-child(even) .timeline-content {
    text-align: left;
  }

  .timeline-marker {
    position: absolute;
    left: -80px;
  }

  .timeline-content {
    padding: 1rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .initiative-tabs {
    flex-direction: column;
  }

  .tab-button {
    justify-content: flex-start;
  }

  .vision-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  section {
    padding: 3rem 0;
  }

  .hero-content {
    padding: 0 1rem;
  }

  .timeline-item {
    padding-left: 60px;
  }

  .timeline-marker {
    left: -60px;
    width: 40px;
    height: 40px;
  }

  .value-card,
  .team-details,
  .vision-details {
    padding: 1.5rem;
  }

  .csr-stats {
    grid-template-columns: 1fr;
  }

  .impact-items {
    grid-template-columns: repeat(2, 1fr);
  }
}
.team-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.team-popup-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 95%;
  width: 800px;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
}

.close-popup {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--accent-color);
  font-weight: bold;
  line-height: 1;
  padding: 0;
  transition: color 0.3s ease;
}

.close-popup:hover {
  color: var(--primary-color);
}
</style>
