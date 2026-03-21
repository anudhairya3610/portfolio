// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const icon = themeToggleBtn.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');
    
    if (document.documentElement.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Setting current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.fade-in');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            // Optional: uncomment below to animate only once
            // observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);

});

// Skill Card Accordion Logic
function toggleSkill(clickedCard) {
    const isActive = clickedCard.classList.contains('active');
    
    // Close all other active cards
    const allCards = document.querySelectorAll('.skill-card');
    allCards.forEach(card => card.classList.remove('active'));
    
    // If it was not active previously, open it
    if (!isActive) {
        clickedCard.classList.add('active');
    }
}

// Enhanced Multi-Phrase Typing Animation
const phrasesToType = [
    "AI/ML Enthusiast",
    "Python & Java Developer",
    "Creative Problem Solver"
];
const typingElement = document.querySelector('.typing-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = phrasesToType[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrasesToType.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }
    
    // Apply premium 3D tilt effects to all interactive static cards
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".skill-card, .stat-box, .cert-card"), {
            max: 5,
            scale: 1.05,
            glare: true,
            "max-glare": 0.1
        });
    }
});
