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