<template>
    <section class="president-message">
        <div class="message-container">
            <div class="president-image">
                <img src="../assets/img/Pak-Kevin.jpg" alt="President Director" />
            </div>
        <div class="message-content">
            <h1 class="title">Message From Our President Director</h1>
            <div class="message-text">
                <p>"With over 85 years of experience, Trimas Sarana Garment Industry has become one of the world's leading manufacturers for apparel brands. Our spirit of quality, care, and commitment leads us to deliver high quality products for our customers, keeping our environment sustainable, and creating a better life for all. Start your fashion journey with us and let our product quality take you higher."</p>
                <p class="president-name">Kartono Budiman (Kevin Oen)</p>
            </div>
        </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'PresidentMessage'
    };
</script>

<style scoped>
.president-message {
    width: 100%;
    padding: 40px 0;
    margin: 0 auto;
    background-color: #fff;
}

.message-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.president-image {
    flex: 1;
    width: 100vw;
}

.president-image img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
}

.message-content {
    flex: 1;
    padding: 10px 0;
}

.title {
    font-size: 42px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    line-height: 1.2;
}

.message-text {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
}

.president-name {
    margin-top: 20px;
    font-weight: 600;
}

/* Responsif untuk tablet dan mobile */
@media screen and (max-width: 992px) {
.message-container {
    flex-direction: column;
}

.president-image {
    max-width: 100%;
}

.title {
    font-size: 32px;
}
}

@media screen and (max-width: 576px) {
.president-message {
    padding: 15px 0;
}

.title {
    font-size: 28px;
}

.message-text {
    font-size: 14px;
}
}
</style>