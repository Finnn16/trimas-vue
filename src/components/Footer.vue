<!-- SimpleFooter.vue -->
<template>
<footer class="simple-footer">
    <div class="footer-content">
    <div class="container">
        <!-- Main Footer -->
        <div class="footer-main">
        <!-- Brand Section -->
        <div class="footer-brand">
            <div class="logo">
            <h2>Trimas SGI <br><span> Sarana Garment Industri</span></h2>
            </div>
            <p class="tagline">To Create A Better Life For All</p>
        </div>
        
        <!-- Navigation Section -->
        <div class="footer-nav">
            <div class="nav-column">
            <h3>Navigasi</h3>
            <ul>
                <li><router-link to="/">Beranda</router-link></li>
                <li><router-link to="/tentang">Tentang Kami</router-link></li>
                <li><router-link to="/layanan">Layanan</router-link></li>
                <li><router-link to="/portofolio">Portofolio</router-link></li>
                <li><router-link to="/kontak">Kontak</router-link></li>
            </ul>
            </div>
            
            <div class="nav-column">
            <h3>Kontak</h3>
            <ul class="contact-info">
                <li>
                    <span class="contact-text">Jl. Raya Kopo KM.7 No.82, Sayati, Kec. Margahayu, Kota Bandung, Jawa Barat 40228</span>
                </li>
                <li>
                    <span class="contact-text">trimas-hc@trisula.com</span>
                </li>
                <li>
                    <span class="contact-text">+62 812 3456 7890</span>
                </li>
            </ul>
            </div>
        </div>
        
        <!-- Social Media -->
        <div class="footer-social">
            <h3>Ikuti Kami</h3>
            <div class="social-links">
            <a href="https://www.instagram.com/trimassgi.official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </a>
            <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
            </a>
            <a href="https://id.linkedin.com/company/pt-trimas-sarana-garment-industry" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
                </svg>
            </a>
            <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            </a>
            </div>
        </div>
        </div>
        
        <!-- Copyright Section -->
        <div class="footer-bottom">
        <p>&copy; {{ currentYear }} PT. Trimas Sarana Garment Industri.</p>
        <div class="terms-links">
            Maintenance by :<a href="/kebijakan-privasi"> Harfin Taufiq</a>
        </div>
        </div>
    </div>
    </div>
</footer>
</template>

<script>
export default {
name: 'SimpleFooter',
computed: {
    currentYear() {
    return new Date().getFullYear();
    }
}
}
</script>

<style scoped>
.simple-footer {
    background-color: #092e5e;
    color: #fff;
    padding: 3rem 0 1rem;
    box-sizing: border-box;
    width: 100%;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;
}

.footer-main {
    display: grid;
    grid-template-columns: 1.5fr 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

/* Brand Styling */
.footer-brand .logo h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #ECA704, #f5ce6a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.footer-brand .logo span {
    font-weight: 300;
}

.footer-brand .tagline {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

/* Navigation Styling */
.footer-nav {
    display: flex;
    justify-content: space-between;
}

.nav-column {
    flex: 1;
    padding-right: 1rem;
}

.footer-nav h3, 
.footer-social h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    position: relative;
    padding-bottom: 0.8rem;
    color: #fff;
}

.footer-nav h3::after,
.footer-social h3::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background: #ECA704;
}

.nav-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-column ul li {
    margin-bottom: 0.7rem;
}

.nav-column a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
}

.nav-column a:hover {
    color: #ECA704;
    transform: translateX(5px);
}

.contact-info li {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.7rem;
    line-height: 1.4;
}

.contact-text {
    display: inline-block;
    word-wrap: break-word;
}

/* Social Media Styling */
.social-links {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #fff;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background: #ECA704;
    color: #092e5e;
    transform: translateY(-3px);
}

/* Footer Bottom */
.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
}

.terms-links {
    display: flex;
    gap: 0.3rem;
}

.terms-links a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.3s ease;
}

.terms-links a:hover {
    color: #ECA704;
}

/* Responsive Design - Preserve Desktop Layout but Improve Mobile */

/* Small desktop adjustment */
@media (max-width: 1100px) {
    .footer-main {
    gap: 1.5rem;
    }
    
    .footer-brand .logo h2 {
    font-size: 1.6rem;
    }
}

/* Tablet layout */
@media (max-width: 992px) {
    .footer-main {
    grid-template-columns: 1fr 1fr;
    }

    .footer-brand {
    grid-column: span 2;
    margin-bottom: 1rem;
    }
    
    .footer-nav {
    padding-top: 1rem;
    }
}

/* Mobile layout - more vertical */
@media (max-width: 768px) {
    .container {
    padding: 0 1.5rem;
    }
    
    .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
    }
    
    .footer-brand {
    grid-column: 1;
    text-align: center;
    }
    
    .footer-nav {
    flex-direction: column;
    gap: 2rem;
    }
    
    .nav-column {
    padding-right: 0;
    }
    
    .social-links {
    justify-content: center;
    }
    
    .footer-nav h3, 
    .footer-social h3 {
    text-align: center;
    }
    
    .footer-nav h3::after,
    .footer-social h3::after {
    left: 50%;
    transform: translateX(-50%);
    }
    
    .nav-column ul {
    text-align: center;
    }
}

/* Small mobile adjustments */
@media (max-width: 576px) {
    .simple-footer {
    padding: 2rem 0 1rem;
    }
    
    .container {
    padding: 0 1rem;
    }
    
    .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    }
    
    .footer-brand .logo h2 {
    font-size: 1.5rem;
    }
    
    .social-links a {
    width: 32px;
    height: 32px;
    }
    
    .social-links svg {
    width: 18px;
    height: 18px;
    }
}

/* Extra small screens */
@media (max-width: 380px) {
    .footer-brand .logo h2 {
    font-size: 1.3rem;
    }
    
    .footer-nav h3, 
    .footer-social h3 {
    font-size: 1rem;
    }
    
    .contact-info li,
    .nav-column a {
    font-size: 0.9rem;
    }
}
</style>