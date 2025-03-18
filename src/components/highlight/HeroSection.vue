<!-- HeroSection.vue -->
<template>
<section class="hero">
    <div class="hero-content">
    <div class="hero-aside">
        <div class="aside-content">
        <span class="highlight-text">the best styles for</span>
        <span class="highlight-text">modern fashion enthusiasts</span>
        <span class="highlight-text">for 2025</span>
        </div>
        
        <div class="offer-card">
        <div class="offer-content">
            <h3>Offers</h3>
            <p>eco-friendly fashion</p>
        </div>
        </div>
    </div>
    
    <div class="hero-main">
        <div class="hero-background">
        <h1 class="hero-title">Premium<br>Fashion</h1>
        <div class="hero-categories">
            <span>Style Ideas</span>
            <span>Trending & Outfits</span>
        </div>
        <h2 class="hero-subtitle">The 8 best clothing brands to follow</h2>
        </div>
    </div>
    </div>
</section>
</template>

<script>
export default {
name: 'HeroSection'
}
</script>

<style scoped>
.hero {
position: relative;
height: 550px;
overflow: hidden;
}

.hero-content {
display: flex;
height: 100%;
}

.hero-aside {
width: 30%;
padding: 30px;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
z-index: 2;
}

.aside-content {
display: flex;
flex-direction: column;
gap: 10px;
}

.highlight-text {
font-size: 1.1rem;
font-weight: 500;
color: #333;
}

.offer-card {
background-color: white;
border-radius: 10px;
padding: 15px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
width: 180px;
margin-top: 20px;
}

.offer-content h3 {
font-size: 1.2rem;
margin-bottom: 5px;
color: #d9534f;
}

.offer-content p {
font-size: 0.9rem;
color: #666;
}

.hero-main {
width: 70%;
position: relative;
overflow: hidden;
background: url('/background/fashion-hero.jpg') center/cover no-repeat;
}

.hero-background {
display: flex;
flex-direction: column;
justify-content: flex-end;
height: 100%;
padding: 40px;
background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));
color: white;
}

.hero-title {
font-size: 5rem;
font-weight: 700;
line-height: 1;
margin-bottom: 20px;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-categories {
display: flex;
gap: 15px;
margin-bottom: 10px;
font-size: 0.9rem;
}

.hero-categories span {
padding: 4px 0;
}

.hero-subtitle {
font-size: 1.8rem;
font-weight: 600;
margin-top: 10px;
text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

@media (max-width: 992px) {
.hero-content {
    flex-direction: column;
}

.hero-aside, .hero-main {
    width: 100%;
}

.hero-aside {
    height: 30%;
}

.hero-main {
    height: 70%;
}

.hero-title {
    font-size: 3.5rem;
}
}
</style>