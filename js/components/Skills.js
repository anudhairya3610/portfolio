export function renderSkills() {
    const container = document.getElementById('skills');
    if (!container) return;

    // Exact existing skills, grouped into categories — no additions or deletions
    const categories = [
        {
            title: "Programming Languages",
            icon: "fa-solid fa-code",
            skills: [
                { name: "Python",     icon: "fa-brands fa-python" },
                { name: "Java",       icon: "fa-brands fa-java"   },
                { name: "JavaScript", icon: "fa-brands fa-js"     },
            ]
        },
        {
            title: "Core Computer Science",
            icon: "fa-solid fa-microchip",
            skills: [
                { name: "Data Structures & Algorithms", icon: "fa-solid fa-project-diagram" },
                { name: "Database Management (DBMS)",   icon: "fa-solid fa-database"        },
                { name: "Object-Oriented Programming",  icon: "fa-solid fa-cubes"           },
                { name: "Linux / UNIX",                 icon: "fa-brands fa-linux"          },
            ]
        },
        {
            title: "Artificial Intelligence & ML",
            icon: "fa-solid fa-robot",
            skills: [
                { name: "Machine Learning", icon: "fa-solid fa-network-wired" },
                { name: "Data Analysis",    icon: "fa-solid fa-chart-line"    },
            ]
        },
        {
            title: "Web Development",
            icon: "fa-solid fa-globe",
            skills: [
                { name: "HTML / CSS", icon: "fa-solid fa-code" },
            ]
        },
    ];

    container.innerHTML = `
        <h2 class="section-title">Technical Arsenal</h2>
        <p class="section-subtitle">Core competencies and technologies</p>
        
        <div class="skills-category-grid">
            ${categories.map(cat => `
                <div class="skill-category-card" data-tilt data-tilt-max="5" data-tilt-glare="true" data-tilt-max-glare="0.1">
                    <div class="skill-cat-header">
                        <i class="${cat.icon}"></i>
                        <h3>${cat.title}</h3>
                    </div>
                    <ul class="skill-list">
                        ${cat.skills.map(s => `
                            <li>
                                <i class="${s.icon}"></i>
                                <span>${s.name}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;

    if (window.VanillaTilt) {
        VanillaTilt.init(container.querySelectorAll('.skill-category-card'));
    }
}
