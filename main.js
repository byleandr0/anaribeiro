// main.js

const headerHTML = `
    <nav class="navbar">
        <div class="container nav-content">
            <a href="index.html" class="logo">
                <img src="https://www.facebook.com/photo/?fbid=133084079475732&locale=pt_PT" alt="Ana Ribeiro">
            </a>
            <div class="nav-links">
                <a href="index.html">Início</a>
                <a href="sobre.html">A nossa casa</a>
                <a href="servicos.html">O que fazemos</a>
                <a href="contactos.html">Fala connosco</a>
                <a href="contactos.html#avaliacao" class="btn btn-outline">Agendar visita</a>
            </div>
            <button class="mobile-menu-btn" aria-label="Abrir menu"><i class="fas fa-bars"></i></button>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="anim-fade-up">
                    <a href="index.html" class="logo footer-logo">
                        <img src="assets/logo.jpg" alt="Ana Ribeiro" onerror="this.onerror=null; this.src='https://via.placeholder.com/200x60/FAFCFC/2A4867?text=Ana+Ribeiro';">
                    </a>
                    <p class="mt-3">Ajudamos-te a recuperar a tua melhor versão com acompanhamento premium e próximo.</p>
                </div>
                <div class="anim-fade-up delay-100">
                    <h3>Onde estamos</h3>
                    <ul>
                        <li>Av. Cidade de Tulle 173</li>
                        <li>4620-664 Lousada</li>
                    </ul>
                </div>
                <div class="anim-fade-up delay-200">
                    <h3>Fala connosco</h3>
                    <ul>
                        <li><a href="tel:00351910826804">910 826 804</a></li>
                        <li><a href="mailto:anaribeiro.fisio.fit@gmail.com">anaribeiro.fisio.fit@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Ana Ribeiro - Fitness & Fisioterapia.</p>
                <p style="margin-top: 0.5rem; font-size: 0.85rem;">Made <strong><a href="https://www.byleandr0.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color);">byleandr0</a></strong></p>
            </div>
        </div>
    </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    
    // Inject Header and Footer
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;

    // Set Active Link Based on Current URL
    const currentPath = window.location.pathname;
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') !== 'contactos.html#avaliacao') {
            if (currentPath.includes(link.getAttribute('href')) || (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active-link');
            }
        }
    });

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Advanced Scroll Animations (Intersection Observer)
    // Selecionar todos os elementos que queremos animar
    const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-scale-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Anima ligeiramente antes de aparecer na bottom da página
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Anima apenas 1 vez
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 5. Subtle Image Parallax effect
    const parallaxImages = document.querySelectorAll('.parallax-img');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxImages.forEach(img => {
            const speed = img.dataset.speed || 0.05;
            const yPos = -(scrolled * speed);
            // Aplicar o transform apenas se a imagem estiver na viewport para poupar performance (simplificado aqui)
            img.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Trigger initial animations on load for elements already in viewport
    setTimeout(() => {
        document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-scale-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);
});
