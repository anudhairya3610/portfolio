export function renderAbout() {
    const container = document.getElementById('about');
    if (!container) return;
    
    container.innerHTML = `
        <h2 class="section-title">About Me</h2>
        <div class="about-container">
            <div class="about-content">
                <p>I'm Anudhairya — a CSE student obsessed with building things that think. I work at the intersection of <strong>Machine Learning, Python, and systems programming</strong>, turning complex problems into clean, working software.</p>
                <ul class="about-bullets">
                    <li><i class="fa-solid fa-microchip text-accent"></i> Building real AI/ML projects — from data pipelines to model deployment</li>
                    <li><i class="fa-solid fa-code text-accent"></i> Strong in DSA, OOP, and low-level CS fundamentals that make software reliable</li>
                    <li><i class="fa-solid fa-rocket text-accent"></i> Goal: contribute to production-grade intelligent systems</li>
                </ul>
            </div>
            <div class="about-stats">
                <div class="stat-box">
                    <h3>10+</h3>
                    <p>Projects Built</p>
                </div>
                <div class="stat-box">
                    <h3>AI / ML</h3>
                    <p>Primary Focus</p>
                </div>
                <div class="stat-box">
                    <h3>2nd Year</h3>
                    <p>B.Tech CSE</p>
                </div>
            </div>
        </div>
    `;
}
