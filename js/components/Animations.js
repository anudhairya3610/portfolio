export function initAnimations() {
    // Scroll Reveal Animation (Intersection Observer)
    // Targets both explicit .fade-in elements AND key section children
    const revealSelectors = [
        '.fade-in',
        '.section-title',
        '.section-subtitle',
        '.about-content',
        '.about-stats',
        '.skill-category-card',
        '.project-card',
        '.cert-card',
        '.stat-box',
    ].join(', ');

    const revealElements = document.querySelectorAll(revealSelectors);
    const revealOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Add fade-in class so the CSS transition applies uniformly
                entry.target.classList.add('fade-in');
                revealOnScroll.unobserve(entry.target); // fire once only
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Typing Animation
    const phrasesToType = [
        "AI / ML Developer",
        "Python Developer",
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

    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    // 3D Tilt Initialization
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".skill-card, .stat-box, .cert-card"), {
            max: 5,
            scale: 1.05,
            glare: true,
            "max-glare": 0.1
        });
    }
}
