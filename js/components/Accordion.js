export function toggleSkill(clickedCard) {
    const isActive = clickedCard.classList.contains('active');
    
    // Close all other active cards safely
    const allCards = document.querySelectorAll('.skill-card');
    allCards.forEach(card => card.classList.remove('active'));
    
    if (!isActive) {
        clickedCard.classList.add('active');
    }
}
