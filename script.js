// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal on scroll animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, no need to observe anymore
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Refined parallax for the large background text
window.addEventListener('scroll', () => {
    const mainTitle = document.querySelector('.hero-main-title');
    if (mainTitle) {
        const scrolled = window.scrollY;
        // Keep the -50% -50% base and add vertical movement
        mainTitle.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }
});

// Interactive mouse-follow effect for the hero section
const hero = document.getElementById('hero');
const mainTitle = document.querySelector('.hero-main-title');

if (hero && mainTitle) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height } = hero.getBoundingClientRect();
        
        // Calculate move offsets (-1 to 1)
        const moveX = (clientX / width - 0.5) * 30; // 30px max move
        const moveY = (clientY / height - 0.5) * 30;
        
        const scrolled = window.scrollY;
        mainTitle.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${scrolled * 0.3 + moveY}px))`;
    });
}

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon from bars to xmark
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });
}


