export function fetchGithubRepos() {
    const grid        = document.getElementById('github-repos');
    const loading     = document.getElementById('projects-loading');
    const emptyState  = document.getElementById('projects-empty-state');
    
    if (!grid) return;

    const GITHUB_USERNAME = 'anudhairya3610';

    // Noise keywords — repos whose names contain these are likely test/demo clutter
    const EXCLUDE_KEYWORDS = ['test', 'demo', 'practice', 'tutorial', 'playground', 'temp', 'hello', 'sample'];

    async function fetchRepos() {
        try {
            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
            );
            if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

            const repos = await res.json();

            const relevant = repos
                // Exclude forks
                .filter(r => !r.fork)
                // Exclude noise repos by name pattern
                .filter(r => {
                    const name = r.name.toLowerCase();
                    return !EXCLUDE_KEYWORDS.some(kw => name.includes(kw));
                })
                // Sort: stars first, then recently updated
                .sort((a, b) => {
                    const starDiff = (b.stargazers_count || 0) - (a.stargazers_count || 0);
                    return starDiff !== 0
                        ? starDiff
                        : new Date(b.updated_at) - new Date(a.updated_at);
                })
                // Cap at 6
                .slice(0, 6);

            // Hide loader
            if (loading) loading.style.display = 'none';

            if (relevant.length === 0) {
                if (emptyState) emptyState.style.display = 'flex';
                return;
            }

            // Deterministic gradient from repo name
            const gradient = (str) => {
                let h = 0;
                for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
                const h1 = Math.abs(h % 360);
                const h2 = Math.abs((h * 3) % 360);
                return `linear-gradient(135deg, hsl(${h1},65%,18%), hsl(${h2},75%,35%))`;
            };

            grid.innerHTML = relevant.map(repo => {
                const title = repo.name.replace(/[-_]/g, ' ');
                const desc  = repo.description || 'An open source project on GitHub.';
                const lang  = repo.language || null;
                const stars = repo.stargazers_count || 0;

                return `
                <div class="project-card" data-tilt data-tilt-max="5" data-tilt-scale="1.03"
                     data-tilt-glare="true" data-tilt-max-glare="0.12">

                    <!-- Generative gradient banner -->
                    <div class="project-banner" style="background:${gradient(repo.name)}">
                        <i class="fa-solid fa-code project-banner-icon"></i>
                    </div>

                    <div class="project-content">
                        <h3>${title}</h3>
                        <p>${desc}</p>

                        <div class="project-tech">
                            ${lang ? `<span class="tech-tag"><i class="fa-solid fa-layer-group"></i> ${lang}</span>` : ''}
                            ${stars > 0 ? `<span class="tech-tag"><i class="fa-solid fa-star"></i> ${stars}</span>` : ''}
                        </div>
                    </div>

                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
                           class="btn outline-btn btn-sm">
                            <i class="fa-brands fa-github"></i> Source Code
                        </a>
                        ${repo.homepage
                            ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer"
                                  class="btn primary-btn btn-sm">
                                   <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                               </a>`
                            : ''}
                    </div>
                </div>`;
            }).join('');

            grid.style.display = 'grid';

            // Re-init tilt on new nodes
            if (window.VanillaTilt) {
                VanillaTilt.init(grid.querySelectorAll('.project-card'));
            }

        } catch (err) {
            console.error('GitHub fetch failed:', err);
            if (loading)    loading.style.display = 'none';
            if (emptyState) emptyState.style.display = 'flex';
        }
    }

    fetchRepos();
}
