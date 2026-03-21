export function renderHero() {
    const container = document.getElementById('home');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Ambient glowing orbs -->
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        
        <div class="hero-content">
            <p class="greeting hero-animate" style="--delay: 0.1s">Hi, I'm</p>

            <h1 class="hero-title hero-animate" style="--delay: 0.25s">
                Anudhairya Chaudhary<span class="text-accent">.</span>
            </h1>
            
            <!-- Typing effect role line -->
            <h2 class="hero-subtitle hero-animate" style="--delay: 0.4s">
                <span class="typing-text"></span><span class="cursor">|</span>
            </h2>
            
            <p class="tagline hero-animate" style="--delay: 0.55s">
                Designing intelligent systems that learn, adapt, and solve real problems.
            </p>
            
            <div class="hero-buttons hero-animate" style="--delay: 0.7s">
                <a href="#projects" class="btn primary-btn btn-glow pulse-button">
                    <i class="fa-solid fa-rocket"></i> View Projects
                </a>
                <a href="#contact" class="btn outline-btn">
                    <i class="fa-solid fa-envelope"></i> Contact Me
                </a>
            </div>
        </div>
    `;
}
