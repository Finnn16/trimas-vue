<template>
<div class="company-card">
    <div class="card-icon-container">
        <img :src="iconSrc" alt="Icon" class="card-icon">
    </div>
    <img :src="productImage" alt="Product" class="product-image">
    <h2 class="card-title">{{ title }}</h2>
    <p class="card-description">{{ description }}</p>
</div>
</template>

<script>
export default {
name: 'CompanyCard',
props: {
    title: {
    type: String,
    required: true
    },
    description: {
    type: String,
    required: true
    },
    iconSrc: {
    type: String,
    required: true
    },
    productImage: {
    type: String,
    required: true
    }
}
}
</script>

<style scoped>
.company-card {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: visible;
    margin-top: 10%;
}

.company-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.card-icon-container {
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-icon {
    width: 120px;
    height: 120px;
    z-index: 2;
    opacity: 0.8;
}

.product-image {
    position: absolute;
    top: -55px;
    left: 128px;
    height: 300px;
    object-fit: contain;
    z-index: 1;
}

.card-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: #000;
    z-index: 3;
}

.card-description {
    font-size: 1.4rem;
    line-height: 1.6;
    color: #555;
    flex-grow: 1;
    z-index: 3;
}

@media (max-width: 768px) {
.card-icon-container {
    height: 150px;
}

.product-image {
    height: 150px;
}

.card-title {
    font-size: 1.5rem;
}

.card-description {
    font-size: 14px;
}
}
</style>