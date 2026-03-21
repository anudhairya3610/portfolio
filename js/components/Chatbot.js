export function initChatbot() {
    const chatbotHTML = `
        <div class="chatbot-widget" id="chatbot-widget">
            <button class="chatbot-trigger" id="chatbot-trigger" aria-label="Open AI Assistant">
                <i class="fa-solid fa-robot"></i>
                <div class="chatbot-trigger-tooltip">Ask AI Assistant</div>
            </button>
            <div class="chatbot-modal" id="chatbot-modal">
                <div class="chatbot-header">
                    <h3><i class="fa-solid fa-microchip"></i> Portfolio Assistant</h3>
                    <button class="chatbot-close" id="chatbot-close">&times;</button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="message ai-message">
                        Hello! I am Anudhairya's virtual recruiter. Ask me anything about his skills, projects, or background!
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-query" placeholder="E.g. What is his ML stack?" autocomplete="off" />
                    <button id="chatbot-send"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const trigger = document.getElementById('chatbot-trigger');
    const modal = document.getElementById('chatbot-modal');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-query');
    const sendBtn = document.getElementById('chatbot-send');
    const messagesContainer = document.getElementById('chatbot-messages');

    if (trigger && modal && close) {
        trigger.addEventListener('click', () => {
            modal.classList.add('active');
            trigger.classList.add('hidden');
        });
        close.addEventListener('click', () => {
            modal.classList.remove('active');
            trigger.classList.remove('hidden');
        });
    }

    function addMessage(text, isAI) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isAI ? 'ai-message' : 'user-message'}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTyping() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) typingDiv.remove();
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, false);
        input.value = '';
        
        showTyping();
        
        setTimeout(() => {
            removeTyping();
            addMessage("I am currently a UI demo. Soon I will be connected to a powerful LLM backend! For immediate contact, please use the form below.", true);
        }, 1500);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}
