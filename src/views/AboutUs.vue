<template>
  <div class="about-us-container">
    <!-- Hero Section with Parallax -->
    <section class="hero-section">
      <div :style="{ transform: `translateY(${parallaxOffset}px)` }" class="parallax-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div :class="{ 'animate-in': heroVisible }" class="hero-text">
          <h1 class="hero-title">About <span class="text-accent-hero">Trimas SGI</span></h1>
          <p class="hero-subtitle">Crafting Excellence Since 1991</p>
          <div class="hero-description">
            <p>Discover the story behind our commitment to premium garment manufacturing and sustainable business
              practices.</p>
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
          <h2>Our <span class="text-accent">Journey</span></h2>
          <p class="section-tagline">From humble beginnings to industry leadership</p>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          <div
              v-for="(milestone, index) in milestones"
              :key="index"
              :class="{
              'active': activeMilestone === index,
              'visible': visibleMilestones.includes(index)
            }"
              class="timeline-item"
              @click="setActiveMilestone(index)"
          >
            <div class="timeline-marker">
              <span class="material-icons">{{ milestone.icon }}</span>
            </div>
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <h2>Our <span class="text-accent">Values</span></h2>
          <p class="section-tagline">The principles that guide everything we do</p>
        </div>

        <div class="values-grid">
          <div
              v-for="(value, index) in values"
              :key="index"
              :class="{ 'active': activeValue === index }"
              class="value-card"
              @mouseenter="setActiveValue(index)"
              @mouseleave="setActiveValue(null)"
          >
            <div class="value-icon">
              <span class="material-icons">{{ value.icon }}</span>
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
            <div v-if="activeValue === index" class="value-details">
              <ul>
                <li v-for="detail in value.details" :key="detail">{{ detail }}</li>
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
          <h2>Leadership <span class="text-accent">Team</span></h2>
          <p class="section-tagline">Meet the visionaries behind our success</p>
        </div>

        <div class="team-showcase">
          <div class="team-grid">
            <div
                v-for="(member, index) in teamMembers"
                :key="index"
                :class="{ 'active': activeTeamMember === index }"
                class="team-card"
                @click="setActiveTeamMember(index)"
            >
              <div class="team-image">
                <img :alt="member.name" :src="member.image"/>
                <div class="team-overlay">
                  <span class="material-icons">person</span>
                </div>
              </div>
              <div class="team-info">
                <h4>{{ member.name }}</h4>
                <p class="team-role">{{ member.role }}</p>
              </div>
            </div>
          </div>

          <div v-if="activeTeamMember !== null" class="team-details">
            <transition mode="out-in" name="slide-fade">
              <div :key="activeTeamMember" class="team-profile">
                <div class="profile-content">
                  <h3>{{ teamMembers[activeTeamMember].name }}</h3>
                  <p class="profile-role">{{ teamMembers[activeTeamMember].role }}</p>
                  <p class="profile-bio">{{ teamMembers[activeTeamMember].bio }}</p>
                  <div class="profile-achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      <li v-for="achievement in teamMembers[activeTeamMember].achievements" :key="achievement">
                        {{ achievement }}
                      </li>
                    </ul>
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
          <h2>Social <span class="text-accent">Impact</span></h2>
          <p class="section-tagline">Creating positive change in our community</p>
        </div>

        <div class="csr-content">
          <div class="csr-stats">
            <div
                v-for="(stat, index) in csrStats"
                :key="index"
                :class="{ 'active': activeCsrStat === index }"
                class="csr-stat-card"
                @mouseenter="activeCsrStat = index"
                @mouseleave="activeCsrStat = null"
            >
              <div class="stat-icon">
                <span class="material-icons">{{ stat.icon }}</span>
              </div>
              <div ref="statNumbers" class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <p class="stat-description">{{ stat.description }}</p>
            </div>
          </div>

          <div class="csr-initiatives">
            <div class="initiative-tabs">
              <button
                  v-for="(initiative, index) in csrInitiatives"
                  :key="index"
                  :class="{ 'active': activeInitiative === index }"
                  class="tab-button"
                  @click="setActiveInitiative(index)"
              >
                <span class="material-icons">{{ initiative.icon }}</span>
                {{ initiative.title }}
              </button>
            </div>

            <div class="initiative-content">
              <transition mode="out-in" name="fade">
                <div :key="activeInitiative" class="initiative-details">
                  <div class="initiative-image">
                    <img :alt="csrInitiatives[activeInitiative].title" :src="csrInitiatives[activeInitiative].image"/>
                  </div>
                  <div class="initiative-text">
                    <h3>{{ csrInitiatives[activeInitiative].title }}</h3>
                    <p>{{ csrInitiatives[activeInitiative].description }}</p>
                    <div class="initiative-impact">
                      <h5>Impact Metrics:</h5>
                      <div class="impact-items">
                        <div
                            v-for="impact in csrInitiatives[activeInitiative].impact"
                            :key="impact.metric"
                            class="impact-item"
                        >
                          <span class="impact-number">{{ impact.value }}</span>
                          <span class="impact-label">{{ impact.metric }}</span>
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
          <h2>Future <span class="text-accent">Vision</span></h2>
          <p class="section-tagline">Our commitment to innovation and sustainability</p>
        </div>

        <div class="vision-content">
          <div class="vision-cards">
            <div
                v-for="(goal, index) in futureGoals"
                :key="index"
                :class="{ 'active': activeGoal === index }"
                class="vision-card"
                @click="setActiveGoal(index)"
            >
              <div class="vision-icon">
                <span class="material-icons">{{ goal.icon }}</span>
              </div>
              <h4>{{ goal.title }}</h4>
              <div class="vision-progress">
                <div class="progress-bar">
                  <div :style="{ width: goal.progress + '%' }" class="progress-fill"></div>
                </div>
                <span class="progress-text">{{ goal.progress }}% Complete</span>
              </div>
            </div>
          </div>

          <div v-if="activeGoal !== null" class="vision-details">
            <transition mode="out-in" name="slide-up">
              <div :key="activeGoal" class="goal-details">
                <h3>{{ futureGoals[activeGoal].title }}</h3>
                <p>{{ futureGoals[activeGoal].description }}</p>
                <div class="goal-timeline">
                  <h5>Implementation Timeline:</h5>
                  <div class="timeline-steps">
                    <div
                        v-for="(step, index) in futureGoals[activeGoal].steps"
                        :key="index"
                        :class="{ 'completed': step.completed }"
                        class="timeline-step"
                    >
                      <div class="step-marker"></div>
                      <div class="step-content">
                        <h6>{{ step.phase }}</h6>
                        <p>{{ step.description }}</p>
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
import {onMounted, onUnmounted, ref} from 'vue'

export default {
  name: 'AboutUs',
  setup() {
    const parallaxOffset = ref(0)
    const heroVisible = ref(false)
    const activeMilestone = ref(0)
    const visibleMilestones = ref([])
    const activeValue = ref(null)
    const activeTeamMember = ref(null)
    const activeCsrStat = ref(null)
    const activeInitiative = ref(0)
    const activeGoal = ref(null)
    const timelineSection = ref(null)

    // Data
    const milestones = ref([
      {
        year: '1991',
        title: 'Company Founded',
        description: 'Started as a small family business with a vision for quality garment manufacturing.',
        icon: 'flag'
      },
      {
        year: '1995',
        title: 'First Major Contract',
        description: 'Secured our first international contract, marking our entry into global markets.',
        icon: 'handshake'
      },
      {
        year: '2000',
        title: 'Technology Integration',
        description: 'Introduced advanced manufacturing technology to improve efficiency and quality.',
        icon: 'precision_manufacturing'
      },
      {
        year: '2010',
        title: 'Sustainability Initiative',
        description: 'Launched comprehensive environmental and social responsibility programs.',
        icon: 'eco'
      },
      {
        year: '2020',
        title: 'Digital Transformation',
        description: 'Implemented Industry 4.0 technologies for smart manufacturing.',
        icon: 'smart_toy'
      },
      {
        year: '2025',
        title: 'Global Expansion',
        description: 'Expanding operations to serve 25+ countries with premium garments.',
        icon: 'public'
      }
    ])

    const values = ref([
      {
        title: 'Quality Excellence',
        description: 'Uncompromising commitment to the highest standards of craftsmanship.',
        icon: 'star',
        details: [
          'Premium material selection',
          'Rigorous quality control',
          'Continuous improvement processes',
          'Customer satisfaction guarantee'
        ]
      },
      {
        title: 'Innovation',
        description: 'Embracing cutting-edge technology and creative design solutions.',
        icon: 'lightbulb',
        details: [
          'Research & development investment',
          'Technology integration',
          'Design innovation',
          'Process optimization'
        ]
      },
      {
        title: 'Sustainability',
        description: 'Protecting our environment for future generations.',
        icon: 'nature',
        details: [
          'Eco-friendly materials',
          'Waste reduction programs',
          'Energy efficiency',
          'Carbon footprint reduction'
        ]
      },
      {
        title: 'Integrity',
        description: 'Operating with transparency, honesty, and ethical practices.',
        icon: 'verified',
        details: [
          'Ethical business practices',
          'Fair labor conditions',
          'Transparent operations',
          'Community responsibility'
        ]
      }
    ])

    const teamMembers = ref([
      {
        name: 'Kevin Oen',
        role: 'Director',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'With over 25 years of experience in the garment industry, John leads our company with vision and passion for excellence.',
        achievements: [
          'Led company growth by 300% over 10 years',
          'Implemented sustainable manufacturing practices',
          'Established partnerships with 18+ international buyers'
        ]
      },
      {
        name: 'Sarah Chen',
        role: 'Chief Operations Officer',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=300&h=300&fit=crop&crop=face',
        bio: 'Sarah oversees our production operations, ensuring efficiency and quality in every aspect of manufacturing.',
        achievements: [
          'Optimized production efficiency by 40%',
          'Reduced waste by 60% through lean manufacturing',
          'Led ISO certification initiatives'
        ]
      },
      {
        name: 'Michael Rodriguez',
        role: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        bio: 'Michael brings creative vision to our designs, blending functionality with modern aesthetics.',
        achievements: [
          'Designed award-winning golf apparel collection',
          'Created innovative hospital uniform line',
          'Led sustainable fabric research projects'
        ]
      }
    ])

    const csrStats = ref([
      {
        icon: 'school',
        value: '500+',
        label: 'Students Trained',
        description: 'Vocational training programs for underprivileged youth'
      },
      {
        icon: 'forest',
        value: '10,000',
        label: 'Trees Planted',
        description: 'Environmental conservation and reforestation efforts'
      },
      {
        icon: 'local_hospital',
        value: '50+',
        label: 'Hospitals Supported',
        description: 'Free uniform donations to healthcare facilities'
      },
      {
        icon: 'recycling',
        value: '75%',
        label: 'Waste Reduction',
        description: 'Achieved through sustainable manufacturing processes'
      }
    ])

    const csrInitiatives = ref([
      {
        title: 'Youth Empowerment',
        icon: 'school',
        image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop',
        description: 'Our vocational training programs provide valuable skills to young people, creating pathways to meaningful careers in the garment industry.',
        impact: [
          {value: '500+', metric: 'Students Trained'},
          {value: '85%', metric: 'Job Placement Rate'},
          {value: '20', metric: 'Training Centers'}
        ]
      },
      {
        title: 'Environmental Conservation',
        icon: 'eco',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
        description: 'We actively participate in reforestation projects and implement eco-friendly manufacturing processes to protect our environment.',
        impact: [
          {value: '10,000', metric: 'Trees Planted'},
          {value: '75%', metric: 'Waste Reduction'},
          {value: '50%', metric: 'Energy Savings'}
        ]
      },
      {
        title: 'Healthcare Support',
        icon: 'local_hospital',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
        description: 'Supporting healthcare workers by providing quality uniforms to hospitals and medical facilities in underserved communities.',
        impact: [
          {value: '50+', metric: 'Hospitals Supported'},
          {value: '5,000+', metric: 'Uniforms Donated'},
          {value: '25', metric: 'Cities Reached'}
        ]
      }
    ])

    const futureGoals = ref([
      {
        title: 'Carbon Neutral Operations',
        icon: 'eco',
        progress: 65,
        description: 'Achieving complete carbon neutrality in our manufacturing operations by implementing renewable energy sources and optimizing our supply chain.',
        steps: [
          {
            phase: 'Phase 1: Energy Audit',
            description: 'Complete assessment of current energy consumption',
            date: '2024 Q1',
            completed: true
          },
          {
            phase: 'Phase 2: Solar Installation',
            description: 'Install solar panels across all facilities',
            date: '2024 Q3',
            completed: true
          },
          {
            phase: 'Phase 3: Process Optimization',
            description: 'Implement energy-efficient manufacturing processes',
            date: '2025 Q1',
            completed: false
          },
          {
            phase: 'Phase 4: Supply Chain Integration',
            description: 'Work with suppliers to reduce carbon footprint',
            date: '2025 Q3',
            completed: false
          }
        ]
      },
      {
        title: 'Digital Manufacturing',
        icon: 'precision_manufacturing',
        progress: 45,
        description: 'Transforming our operations with Industry 4.0 technologies including AI, IoT, and automated quality control systems.',
        steps: [
          {
            phase: 'Phase 1: Infrastructure Setup',
            description: 'Upgrade IT infrastructure and connectivity',
            date: '2024 Q2',
            completed: true
          },
          {
            phase: 'Phase 2: IoT Integration',
            description: 'Install sensors and monitoring systems',
            date: '2024 Q4',
            completed: false
          },
          {
            phase: 'Phase 3: AI Implementation',
            description: 'Deploy AI for quality control and optimization',
            date: '2025 Q2',
            completed: false
          }
        ]
      },
      {
        title: 'Global Market Expansion',
        icon: 'public',
        progress: 30,
        description: 'Expanding our reach to serve 30+ countries by establishing strategic partnerships and distribution networks.',
        steps: [
          {
            phase: 'Phase 1: Market Research',
            description: 'Analyze target markets and customer needs',
            date: '2024 Q1',
            completed: true
          },
          {
            phase: 'Phase 2: Partnership Development',
            description: 'Establish key partnerships in target regions',
            date: '2025 Q1',
            completed: false
          },
          {
            phase: 'Phase 3: Distribution Network',
            description: 'Build comprehensive distribution channels',
            date: '2025 Q4',
            completed: false
          }
        ]
      }
    ])

    // Methods
    const updateParallax = () => {
      const scrollY = window.scrollY
      parallaxOffset.value = scrollY * 0.5
    }

    const scrollToContent = () => {
      timelineSection.value?.scrollIntoView({behavior: 'smooth'})
    }

    const setActiveMilestone = (index) => {
      activeMilestone.value = index
    }

    const setActiveValue = (index) => {
      activeValue.value = index
    }

    const setActiveTeamMember = (index) => {
      activeTeamMember.value = activeTeamMember.value === index ? null : index
    }

    const setActiveInitiative = (index) => {
      activeInitiative.value = index
    }

    const setActiveGoal = (index) => {
      activeGoal.value = activeGoal.value === index ? null : index
    }

    const observeElements = () => {
      const timelineItems = document.querySelectorAll('.timeline-item')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(timelineItems).indexOf(entry.target)
            if (!visibleMilestones.value.includes(index)) {
              visibleMilestones.value.push(index)
            }
          }
        })
      }, {threshold: 0.3})

      timelineItems.forEach((item) => {
        observer.observe(item)
      })
    }

    onMounted(() => {
      // Hero animation
      setTimeout(() => {
        heroVisible.value = true
      }, 500)

      // Parallax effect
      const handleScroll = () => {
        updateParallax()
      }
      window.addEventListener('scroll', handleScroll)

      // Intersection observer
      setTimeout(() => {
        observeElements()
      }, 1000)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updateParallax)
    })

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
      teamMembers,
      csrStats,
      csrInitiatives,
      futureGoals,
      scrollToContent,
      setActiveMilestone,
      setActiveValue,
      setActiveTeamMember,
      setActiveInitiative,
      setActiveGoal
    }
  }
}
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
  background: linear-gradient(45deg, rgba(9, 46, 94, 0.8), rgba(9, 46, 94, 0.6));
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
  font-size: clamp(3rem, 8vw, 5rem);
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
  0%, 20%, 50%, 80%, 100% {
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
  transition: var(--transition);
}

.timeline-item.active .timeline-marker {
  background: var(--accent-color);
  color: white;
  transform: scale(1.1);
}

.timeline-content {
  flex: 1;
  padding: 0 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-top: 1rem;
  transition: var(--transition);
}

.timeline-item.active .timeline-content {
  background: var(--light-gray);
  transform: scale(1.02);
}

.timeline-year {
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
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
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.value-card:hover,
.value-card.active {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
  transition: var(--transition);
}

.value-card.active .value-icon {
  background: var(--accent-color);
  color: white;
}

.value-icon span {
  font-size: 2rem;
  color: var(--accent-color);
  transition: var(--transition);
}

.value-card.active .value-icon span {
  color: white;
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

.team-showcase {
  max-width: 1000px;
  margin: 0 auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.team-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  cursor: pointer;
}

.team-card:hover,
.team-card.active {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.team-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.team-card:hover .team-image img {
  transform: scale(1.05);
}

.team-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(9, 46, 94, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.team-card:hover .team-overlay,
.team-card.active .team-overlay {
  opacity: 1;
}

.team-overlay span {
  color: white;
  font-size: 3rem;
}

.team-info {
  padding: 1.5rem;
  text-align: center;
}

.team-info h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.team-role {
  color: var(--accent-color);
  font-weight: 500;
}

.team-details {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 2rem;
  min-height: 300px;
}

.profile-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.profile-role {
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 1rem;
}

.profile-bio {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.profile-achievements h5 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.profile-achievements ul {
  list-style: none;
  padding: 0;
}

.profile-achievements li {
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.profile-achievements li:before {
  content: "🏆";
  position: absolute;
  left: 0;
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
  transition: var(--transition);
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
  background: var(--accent-color);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.5s ease;
  z-index: -1;
}

.csr-stat-card:hover::before,
.csr-stat-card.active::before {
  transform: scaleY(1);
}

.csr-stat-card:hover,
.csr-stat-card.active {
  transform: translateY(-10px);
  color: white;
}

.stat-icon {
  margin-bottom: 1rem;
}

.stat-icon span {
  font-size: 2.5rem;
  color: var(--accent-color);
  transition: var(--transition);
}

.csr-stat-card:hover .stat-icon span,
.csr-stat-card.active .stat-icon span {
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  transition: var(--transition);
}

.csr-stat-card:hover .stat-number,
.csr-stat-card.active .stat-number {
  color: white;
}

.stat-label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.stat-description {
  font-size: 0.9rem;
  line-height: 1.4;
  transition: var(--transition);
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
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.tab-button:hover,
.tab-button.active {
  background: var(--accent-color);
  color: white;
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
  transition: var(--transition);
  border: 2px solid transparent;
}

.vision-card:hover,
.vision-card.active {
  background: white;
  border-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow);
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
</style>