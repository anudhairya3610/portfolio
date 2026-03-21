export function initContactForm() {
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
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.style.color = "#10b981"; 
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                    formStatus.style.color = "#ef4444"; 
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a network problem.";
                formStatus.style.color = "#ef4444";
            }
        });
    }
}
