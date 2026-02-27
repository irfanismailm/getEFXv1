const textElement = document.getElementById('typewriter');
const bg = document.getElementById('parallax-bg');

const phrases = [
    "EFX",
    "Effects Delivered",
    "Bold Storytelling",
    "AI-Powered Content",
    "CGI Excellence",
    "Cinematic Power"
]
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    const displayText = currentPhrase.substring(0, charIndex);
    
    // Injects <br> at the first space
    if (displayText.includes(" ")) {
        textElement.innerHTML = displayText.replace(" ", "<br>");
    } else {
        textElement.textContent = displayText;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(type, typeSpeed);
}

// Fixed Parallax logic
window.addEventListener('scroll', () => {
    if (bg) {
        let offset = window.pageYOffset;
        bg.style.transform = `translate3d(0, ${offset * 0.2}px, 0)`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 800);
});