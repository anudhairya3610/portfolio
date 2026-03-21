export function initModal() {
    const modal = document.getElementById("cert-modal");
    if (!modal) return;
    
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".close-modal");
    const triggers = document.querySelectorAll(".cert-preview-trigger");

    // Pre-initialize style to allow transitions elegantly
    modal.style.display = 'none';

    triggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            modal.style.display = "flex";
            
            // tiny delay unblocks the thread so display:flex parses before opacity
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            modalImg.src = this.getAttribute('data-img-src');
            captionText.innerHTML = this.getAttribute('data-title');
            document.body.style.overflow = "hidden"; // Freeze background scrolling while active
        });
    });

    function closeModal() {
        if (!modal.classList.contains('show')) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = "auto";
        
        // Wait sequence matches the CSS transition window gracefully
        setTimeout(() => {
            modal.style.display = "none";
            modalImg.src = '';
        }, 300);
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });
}
