export function renderProjects() {
    const container = document.getElementById('projects');
    if (!container) return;
    
    container.innerHTML = `
        <h2 class="section-title">Projects</h2>
        <p class="section-subtitle">Open source work from GitHub</p>

        <!-- Loading skeleton shown until API responds -->
        <div id="projects-loading" class="projects-loading">
            ${[1,2,3].map(() => `
                <div class="project-skeleton">
                    <div class="skeleton-bar wide"></div>
                    <div class="skeleton-bar medium"></div>
                    <div class="skeleton-bar short"></div>
                    <div class="skeleton-tags">
                        <div class="skeleton-tag"></div>
                        <div class="skeleton-tag"></div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Populated by github.js API call -->
        <div id="github-repos" class="projects-grid" style="display:none"></div>

        <!-- Shown on error or no results -->
        <div id="projects-empty-state" style="display:none" class="projects-empty">
            <i class="fa-solid fa-code-branch"></i>
            <p>Projects loading or unavailable — check back soon.</p>
        </div>
    `;
}
