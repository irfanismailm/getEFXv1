const textElement = document.getElementById('typewriter');
const bg = document.getElementById('parallax-bg');
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');

const colors = ['clr-green', 'clr-blue', 'clr-magenta', 'clr-yellow', 'clr-white'];

const phrases = [
    "EFX",
    "Effects Delivered Now",
    "Bold Digital Storytelling",
    "AI Powered Video Content",
    "CGI Visual Excellence",
    "Cinematic Power Unleashed"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentColors = [];

function getRandomColors(wordCount) {
    return Array.from({ length: wordCount }, () => colors[Math.floor(Math.random() * colors.length)]);
}

function type() {
    const currentPhrase = phrases[phraseIndex];
    const words = currentPhrase.split(" ");
    
    if (charIndex === 0 && !isDeleting) {
        currentColors = getRandomColors(words.length);
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    const fullTextSoFar = currentPhrase.substring(0, charIndex);
    const wordsSoFar = fullTextSoFar.split(" ");
    
    let htmlOutput = "";
    wordsSoFar.forEach((word, index) => {
        if (word.length > 0 || index === 0) {
            const colorClass = currentColors[index] || 'clr-white';
            htmlOutput += `<span class="${colorClass}">${word}</span>${index < wordsSoFar.length - 1 ? '<br>' : ''}`;
        }
    });

    const cursorHTML = '<span class="cursor">|</span>';
    textElement.innerHTML = htmlOutput + cursorHTML;

    charIndex += isDeleting ? -1 : 1;
    setTimeout(type, typeSpeed);
}

// Parallax Logic
window.addEventListener('scroll', () => {
    if (bg) {
        let offset = window.pageYOffset;
        bg.style.transform = `translate3d(0, ${offset * 0.2}px, 0)`;
    }
});

// Theme Switch Logic
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        themeIcon.className = 'ph ph-sun';
        localStorage.setItem('efx-theme', 'light');
    } else {
        themeIcon.className = 'ph ph-moon';
        localStorage.setItem('efx-theme', 'dark');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('efx-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.className = 'ph ph-sun';
    }
    
    setTimeout(type, 800);
});