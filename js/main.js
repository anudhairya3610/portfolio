import { initNavigation } from './components/Navigation.js';
import { initAnimations } from './components/Animations.js';
import { initModal } from './components/Modal.js';
import { toggleSkill } from './components/Accordion.js';

import { renderHero } from './components/Hero.js';
import { renderAbout } from './components/About.js';
import { renderSkills } from './components/Skills.js';
import { renderProjects } from './components/Projects.js';
import { initChatbot } from './components/Chatbot.js';

import { fetchGithubRepos } from './api/github.js';
import { initContactForm } from './api/contact.js';

// Expose the accordion toggle function strictly to global scope 
// so the inline HTML 'onclick' can continue functioning uninterrupted.
window.toggleSkill = toggleSkill;

// Bootstrap all sub-systems safely
document.addEventListener('DOMContentLoaded', () => {

    // 1. Render App Shell UI Modules
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    initChatbot(); // Initialize chatbot DOM widget immediately

    // Re-initialize 3D tilt effects since DOM nodes were created dynamically
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    }

    // 2. Utilities & Effects
    initNavigation();
    initAnimations();
    initModal();
    
    // API logic routines
    fetchGithubRepos();
    initContactForm();
    
    // Minor global tweaks
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});
