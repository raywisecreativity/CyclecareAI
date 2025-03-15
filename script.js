// Typing Animation for Title & Button
const title = document.getElementById('typing-title');
const button = document.getElementById('typing-button');
const titleTexts = ["AI Lifestyle Adviser for PCOS", "Your PCOS Health Companion"];
const buttonTexts = ["Get Started", "Start Now"];

let i = 0;



function typeEffect(text, element, speed, nextFunc) {
    let charIndex = 0;
    function type() {
        if (charIndex < text.length) {
            element.textContent += text[charIndex++];
            setTimeout(type, speed);
        } else {
            setTimeout(nextFunc, 2000);
        }
    }
    type();
}
document.addEventListener("DOMContentLoaded", function () {
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const voiceButton = document.getElementById("voice-button"); // 🎤 Button for voice input

    // Ensure all elements exist
    if (!chatbotButton || !chatbotContainer || !closeChatbot || !chatbotMessages || !chatbotInput || !voiceButton) {
        console.error("One or more chatbot elements are missing from the HTML.");
        return;
    }

    // Toggle chatbot visibility
    chatbotButton.addEventListener("click", function () {
        chatbotContainer.style.display = "block";
    });

    closeChatbot.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
    });

    // Handle user input (Enter key)
    chatbotInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && chatbotInput.value.trim() !== "") {
            processUserMessage(chatbotInput.value.trim());
            chatbotInput.value = ""; // Clear input
        }
    });

    // 🎤 Handle voice input
    voiceButton.addEventListener("click", function () {
        startVoiceRecognition();
    });

    // Process user message
    function processUserMessage(userMessage) {
        appendMessage("user", userMessage);

        // Get bot response (AI-powered or keyword-based)
        setTimeout(async () => {
            const botResponse = await getBotResponse(userMessage);
            appendMessage("bot", botResponse);
            speakResponse(botResponse); // 🗣️ Text-to-Speech
        }, 1000);
    }

    // Append messages to chatbot
    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);

        // Scroll to latest message
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // ✅ NLP-Based Smart Responses
    async function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();

        // 💡 GPT API Integration (Optional)
        const useGPT = false; // Set to true to use GPT API
        if (useGPT) {
            return await fetchGPTResponse(userMessage);
        }

        // 📌 Keyword-Based Responses (Fallback)
        const pcosData = {
            "what is pcos": "PCOS is Polycystic Ovary Syndrome, a hormonal disorder common in women of reproductive age.",
            "exercise": "Yes, regular exercise improves insulin sensitivity and helps manage weight.",
            "cure for pcos": "There is no cure, but symptoms can be managed through lifestyle changes and medications.",
            "see a doctor": "If you have irregular periods, excessive hair growth, or difficulty conceiving, consult a doctor.",
            "tracking symptoms": "Tracking symptoms helps in monitoring health and discussing concerns with healthcare providers.",
            "pcos myths": "A common myth is that PCOS only affects overweight women, but it can affect women of all sizes.",
            "prevent complications": "Managing PCOS reduces risks of diabetes, heart disease, and infertility, lowering healthcare costs.",
            "medications for pcos": "Metformin, hormonal birth control, and fertility treatments are commonly prescribed.",
            "pcos diet": "A low-glycemic index diet rich in whole foods, vegetables, and lean proteins is beneficial.",
            "pcos symptoms": "Irregular periods, excessive hair growth, acne, and weight gain are common signs.",
            "advocate for pcos": "Tracking symptoms, seeking second opinions, and staying informed can empower women.",
            "diagnose pcos": "Blood tests, ultrasound imaging, and a review of symptoms are commonly used.",
            "pcos awareness": "Increased awareness ensures timely diagnosis and reduces stigma."
        };

        // Find best matching response
        for (let key in pcosData) {
            if (userMessage.includes(key)) {
                return pcosData[key];
            }
        }

        return "I'm still learning from Mind GEN AI! Try asking about PCOS symptoms, diet, or treatments.";
    }

    // 🎤 Speech-to-Text (Voice Input)
    function startVoiceRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            chatbotInput.value = transcript;
            processUserMessage(transcript);
        };

        recognition.onerror = function (event) {
            console.error("Speech recognition error:", event.error);
        };
    }

    // 🗣️ Text-to-Speech (Bot Speaks)
    function speakResponse(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    }

    // 💡 GPT API Fetch (Optional)
    async function fetchGPTResponse(userMessage) {
        try {
            const response = await fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": " 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" // Replace with actual API key
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    prompt: userMessage,
                    max_tokens: 100
                })
            });

            const data = await response.json();
            return data.choices[0].text.trim();
        } catch (error) {
            console.error("Error fetching GPT response:", error);
            return "I'm having trouble thinking right now. Try again later!";
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const voiceButton = document.getElementById("voice-button"); // 🎤 Voice button

    // Check if Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition is not supported in this browser.");
        voiceButton.style.display = "none"; // Hide the button if not supported
    }

    // Initialize speech recognition
    let recognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
    }

    // 🎤 Handle Voice Input Button Click
    voiceButton.addEventListener("click", function () {
        if (!recognition) {
            alert("Speech Recognition is not supported in this browser. Please try Google Chrome.");
            return;
        }

        voiceButton.textContent = "Listening... 🎙️"; // Change button text while listening
        recognition.start();

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            chatbotInput.value = transcript; // Set text input field
            processUserMessage(transcript); // Process as if user typed it
        };

        recognition.onerror = function (event) {
            console.error("Speech recognition error:", event.error);
            voiceButton.textContent = "🎤"; // Reset button
            alert("Error in Speech Recognition. Please try again.");
        };

        recognition.onend = function () {
            voiceButton.textContent = "🎤"; // Reset button after speech ends
        };
    });

    // Process user message (same as before)
    function processUserMessage(userMessage) {
        appendMessage("user", userMessage);
        setTimeout(async () => {
            const botResponse = await getBotResponse(userMessage);
            appendMessage("bot", botResponse);
            speakResponse(botResponse);
        }, 1000);
    }

    // Function to append messages
    function appendMessage(sender, message) {
        const messageElement = document.createElement("p");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // 🗣️ Text-to-Speech (Chatbot Speaks)
    function speakResponse(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    }
});


        
    


function animateCard(card, url) {
    card.style.transform = "scale(1.1) translateY(-10px)";
    card.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4)";
    setTimeout(() => {
        window.location.href = url;
    }, 300); // Delay before navigating
}
function startTyping() {
    title.textContent = "";
    typeEffect(titleTexts[i], title, 100, () => {
        i = (i + 1) % titleTexts.length;
        startTyping();
    });
}

startTyping();
// Open Model Links
function openModel(url) {
    window.open(url, "_blank");
}

// DARK MODE TOGGLE (Now Fully Working ✅)
const toggleButton = document.getElementById('toggle-mode');
const body = document.body;

// Load saved mode from Local Storage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
}

// Toggle Dark Mode on Click
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save Preference in Local Storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menuBar = document.getElementById("menuBar");

    menuIcon.addEventListener("click", function () {
        menuBar.classList.toggle("active");
    });
});

 // Toggle Menu
 function toggleMenu() {
    var menu = document.getElementById("menuBar");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
