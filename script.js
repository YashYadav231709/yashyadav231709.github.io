// LOTTIE INTRO (plays once, dark background)
window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    if (!intro || !window.lottie) return;

    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'Scene-4.json'
    });

    animation.addEventListener('complete', () => {
        const overlay = document.querySelector('#intro .overlay');
        const logo = document.getElementById('lottie');

        overlay.style.opacity = '0';
        logo.style.transform = 'translateY(-140%) scale(0.0001)';
        logo.style.opacity = '0';

        setTimeout(() => {
            document.getElementById('intro').remove();
        }, 800);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar background on scroll
// FIX: Use requestAnimationFrame to throttle scroll handler
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 10, 24, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(5, 10, 24, 0.8)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// FIX: Intersection Observer — handles fade-in without conflicting with CSS animations
// Cards have no CSS animation now; this is the single source of truth
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // FIX: Use CSS class toggle instead of direct style mutation
            entry.target.classList.add('visible');
            // Stop observing once visible — no need to keep watching
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .about-text').forEach(el => {
    el.classList.add('fade-in-ready');
    observer.observe(el);
});

// Active nav link on scroll
// FIX: Also throttled with requestAnimationFrame
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
let navTicking = false;

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    navTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navTicking) {
        requestAnimationFrame(updateActiveNav);
        navTicking = true;
    }
}, { passive: true });
