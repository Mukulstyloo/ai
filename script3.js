document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Image Slider Functionality ---
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    function slide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        const offset = currentSlide * (-100 / totalSlides); 
        slider.style.transform = `translateX(${offset}%)`;
    }
    
    // Start the automatic slider
    setInterval(slide, 4000);


    // --- 2. On-Scroll Card Animation (Intersection Observer) ---
    const cards = document.querySelectorAll('.card.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 
    };

    function observerCallback(entries, observer) {
        entries.forEach((entry) => {
            const allCards = Array.from(document.querySelectorAll('.card.fade-in'));
            const cardIndex = allCards.indexOf(entry.target);

            if (entry.isIntersecting) {
                // Staggered delay for card animation
                entry.target.style.animationDelay = `${cardIndex * 0.15}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cards.forEach(card => {
        observer.observe(card);
    });
    
    
    // --- 3. Chatbot Logic ---
    const toggleButton = document.getElementById('chatbot-toggle');
    const closeButton = document.getElementById('chatbot-close');
    const chatWindow = document.getElementById('chatbot-window');
    const chatMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');

    // Toggle Chatbot Window
    toggleButton.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
        if (chatWindow.style.display === 'flex') {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            userInput.focus();
        }
    });
    
    closeButton.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Handle Sending Messages
    function sendMessage() {
        const text = userInput.value.trim();
        if (text === '') return;

        // 1. Display User Message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.textContent = text;
        chatMessages.appendChild(userMessageDiv);
        
        userInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 2. Get Bot Response (Simple Static Responses)
        setTimeout(() => {
            const botResponse = getBotResponse(text.toLowerCase());
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            botMessageDiv.textContent = botResponse;
            chatMessages.appendChild(botMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    }
    
    function getBotResponse(input) {
        if (input.includes('hello') || input.includes('hi')) {
            return "Welcome to AuraFlow. I can guide you on our 'services', 'contact', and 'location'.";
        } else if (input.includes('contact') || input.includes('support')) {
            return "Please reach out to hello@auraflow.com or call +1 (555) 555-FLOW for assistance.";
        } else if (input.includes('location')) {
            return "Our Global Design Studio is located at 100 Serenity Path, Clarity Hub. We primarily operate digitally.";
        } else if (input.includes('services') || input.includes('pillars')) {
            return "Our core services include Vision & Clarity, Balanced Design, and Seamless Workflow. See our 'Core Pillars' section above for more.";
        } else if (input.includes('philosophy') || input.includes('simplify')) {
            return "Our philosophy is 'The Art of Simplification,' distilling complexity into elegant, functional solutions.";
        } else if (input.includes('thank')) {
            return "You are welcome. Find your balance and have a peaceful day.";
        } else {
            return "I am currently focused on core topics. Try keywords like 'services', 'contact', or 'philosophy'.";
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // --- 4. Simple Search Logic (Client-side) ---
    document.querySelector('.search-btn').addEventListener('click', () => {
        const query = document.querySelector('.search-input').value.toLowerCase().trim();
        if (query) {
            alert(`Searching for: ${query}. (In a real application, this would execute a site-wide search!)`);
        }
    });

});