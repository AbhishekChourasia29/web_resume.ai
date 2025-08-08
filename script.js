document.addEventListener("DOMContentLoaded", function() {

    // --- Feather Icons Replacement ---
    feather.replace();

    // --- Animate On Scroll (AOS) Initialization ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50, // Adjusted offset for better mobile triggering
    });

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (hamburger && navMenu && navMenu.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    });
    
    // --- Certificate Carousel (Marquee) & Modal ---
    const certificateFiles = [
        "publication certificate for KrishiDIsha.png",
        "publication certificate for Student Dropout.jpeg",
        "codevir competiton certificate.jpeg",
        "tittle competition certificate.jpeg",
        "certificate1.png", "certificate2.png", "certificate3.png",
        "certificate4.png", "certificate5.png", "certificate6.png",
        "certificate7.png", "certificate8.png", "certificate9.png",
        "certificate10.png", "certificate11.png", "certificate12.png",
        "certificate13.png", "certificate14.png", "certificate15.png",
        "certificate16.png"
    ];

    const carousel = document.getElementById('certificate-carousel');
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModalBtn = document.querySelector('.close-modal');

    if (carousel && certificateFiles.length > 0) {
        const createCertificateItem = (file) => {
            const item = document.createElement('div');
            item.className = 'certificate-item';
            
            const img = document.createElement('img');
            const imgPath = `img/${file}`;
            img.src = imgPath;
            img.alt = 'Certificate Preview';
            img.loading = 'lazy';
            img.decoding = 'async';
            
            img.onerror = () => {
                console.warn(`Could not load certificate image: ${imgPath}. Displaying placeholder.`);
                const placeholderText = file.split('.')[0].replace(/_/g, ' ').substring(0, 20);
                img.src = `https://placehold.co/400x300/191924/A1A1A6?text=${encodeURIComponent(placeholderText)}`;
                img.onerror = null;
            };
            
            item.appendChild(img);

            item.addEventListener('click', () => {
                if (modal && modalImg) {
                    modal.style.display = 'flex';
                    modalImg.src = img.src;
                }
            });

            return item;
        };

        certificateFiles.forEach(file => {
            carousel.appendChild(createCertificateItem(file));
        });

        const originalItems = Array.from(carousel.children);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.addEventListener('click', () => {
                if (modal && modalImg) {
                    modal.style.display = 'flex';
                    modalImg.src = clone.querySelector('img').src;
                }
            });
            carousel.appendChild(clone);
        });

        const speedFactor = 2.5;
        const animationDuration = certificateFiles.length * speedFactor;
        carousel.style.animationDuration = `${animationDuration}s`;
    }

    const hideModal = () => {
        if (modal) modal.style.display = 'none';
    };

    if(closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    if(modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") hideModal();
    });

    // --- Theme Toggle (Light/Dark Mode) ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    
    const setTheme = (theme) => {
        body.className = theme;
        const themeIcon = themeToggleButton.querySelector('i');
        if (themeIcon) {
            themeIcon.setAttribute('data-feather', theme === 'light-mode' ? 'sun' : 'moon');
            feather.replace();
        }
        localStorage.setItem('theme', theme);
    };

    if(themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
            setTheme(newTheme);
        });
    }

    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    setTheme(savedTheme);

    // --- Dynamic Card Glow Effect (for non-touch devices) ---
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice()) {
        document.querySelectorAll('.project-card, .publication-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });
    }


    // --- Chatbot Logic ---
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    const knowledgeBase = {
        "hello": "Hi there! How can I help you learn more about Abhishek?",
        "hi": "Hello! Feel free to ask me about Abhishek's skills, projects, or experience.",
        "who are you": "I am an AI assistant designed to answer questions about Abhishek Chourasia's portfolio.",
        "skills": "Abhishek is skilled in C, C++, Java, Python, HTML, CSS, JavaScript, R, Flask, MySQL, and TensorFlow. He has a strong focus on AI/ML and Full Stack Development.",
        "experience": "He is currently a Research Intern at IBM's Global Remote Mentorship program, developing a breast cancer detection system. He is a final-year B.Tech student at Medi-Caps University.",
        "education": "Abhishek is pursuing his B.Tech in Computer Science from Medi-Caps University (2021-2025) with a current CGPA of 9.33. He completed his 12th from Karnataka Vidya Niketan with 86.2%.",
        "projects": "He has built several impressive projects, including KrishiDisha for agriculture, Vision_Forage.ai for image search, and Fake_News_Guard.ai for detecting misinformation. Which one would you like to know more about?",
        "krishidisha": "KrishiDisha is an AI platform for farmers. It gives crop and fertilizer recommendations, detects crop diseases from images, and predicts yield. It also has a multilingual AI chatbot.",
        "vision forage": "Vision_Forage.ai is an AI-powered image search engine. You can search for images using text or by uploading another image. It uses deep learning to understand the content.",
        "fake news": "Fake_News_Guard.ai is a web app that uses NLP and Machine Learning to check if a news article is real or fake.",
        "publications": "Abhishek has co-authored two research papers. One on 'KrishiDisha' for an IEEE conference, and another on 'Student Dropout Patterns' published by Springer Nature.",
        "contact": "You can contact Abhishek via email at en23cs3t1013@medicaps.ac.in. You can also find his LinkedIn and GitHub profiles at the top of the page.",
        "resume": "You can download Abhishek's resume by clicking the 'Download CV' button in the top section.",
        "cgpa": "Abhishek's current CGPA is 9.33 out of 10.0.",
        "internship": "He is a Research Intern at IBM, where he's working on a project called Web-BCD for breast cancer detection using machine learning.",
        "thank": "You're welcome! Is there anything else I can help you with?",
        "bye": "Goodbye! Have a great day."
    };
    
    const getBotResponse = (userInput) => {
        userInput = userInput.toLowerCase().trim();
        let bestMatch = null;
        let highestScore = 0;

        for (const key in knowledgeBase) {
            if (userInput.includes(key) && key.length > highestScore) {
                highestScore = key.length;
                bestMatch = key;
            }
        }
        
        return bestMatch ? knowledgeBase[bestMatch] : "I'm sorry, I don't have information on that. Try asking about skills, projects, or experience.";
    };

    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            if (!chatbotWindow.classList.contains('hidden')) {
                feather.replace();
            }
        });
    }
    
    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
        });
    }

    if (chatbotForm) {
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInput = chatbotInput.value.trim();
            if (userInput === '') return;

            addMessage(userInput, 'user');
            chatbotInput.value = '';

            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                addMessage(botResponse, 'bot');
            }, 500);
        });
    }
});
