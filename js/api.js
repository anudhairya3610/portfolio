// API integrations map

// 1. Formspree/Web3Forms Contact Form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const data = new FormData(e.target);
            formStatus.textContent = "Sending...";
            formStatus.style.color = "var(--text-secondary)";
            
            try {
                const response = await fetch(e.target.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.style.color = "#10b981"; // success green
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                    formStatus.style.color = "#ef4444"; // error red
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a network problem.";
                formStatus.style.color = "#ef4444";
            }
        });
    }

    // GitHub API Fetch implementation
    const githubReposContainer = document.getElementById('github-repos');
    const emptyState = document.getElementById('projects-empty-state');
    
    // Using a placeholder GitHub username (to be replaced by the developer)
    const GITHUB_USERNAME = 'octocat'; 
    
    if (githubReposContainer) {
        async function fetchGithubRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`);
                if (!response.ok) throw new Error("Failed to fetch");
                
                const repos = await response.json();
                
                if (repos.length > 0) {
                    if (emptyState) emptyState.style.display = 'none';
                    
                    githubReposContainer.innerHTML = repos.map(repo => `
                        <div class="project-card" data-tilt data-tilt-max="5" data-tilt-scale="1.05" data-tilt-glare="true" data-tilt-max-glare="0.1">
                            <div class="project-content" style="transform: translateZ(20px)">
                                <h3><i class="fa-brands fa-github text-accent"></i> ${repo.name}</h3>
                                <p>${repo.description || 'No description available.'}</p>
                                <div class="project-tech">
                                    <span>${repo.language || 'Code'}</span>
                                    <span>⭐ ${(repo.stargazers_count !== undefined ? repo.stargazers_count : 0)}</span>
                                </div>
                            </div>
                            <div class="project-links">
                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn outline-btn btn-sm">View Repo</a>
                                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn primary-btn btn-sm">Live Demo</a>` : ''}
                            </div>
                        </div>
                    `).join('');
                    
                    // Activate 3D effects on the newly inserted DOM elements
                    if (window.VanillaTilt) {
                        VanillaTilt.init(document.querySelectorAll("#github-repos .project-card"));
                    }
                } else if (emptyState) {
                    emptyState.innerHTML = '<p>🚀 No public repositories found yet.</p>';
                }
            } catch (error) {
                console.error("Error fetching GitHub repos:", error);
                if (emptyState) {
                    emptyState.innerHTML = '<p>🚀 Currently working on exciting projects in AI/ML and software development. Projects will be added soon.</p>';
                }
            }
        }
        
        fetchGithubRepos();
    }
});
