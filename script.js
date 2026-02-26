const textElement = document.getElementById('typewriter');
const phrases = [
    "get it done.",
    "get the best.",
    "get effects.",
    "get ai videos.",
    "get cgi videos.",
    "get next-gen ads.",
    "get cinematic soul."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2500; // Delay before starting to delete
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    const displayText = currentPhrase.substring(0, charIndex + (isDeleting ? -1 : 1));
    textElement.textContent = displayText;
    charIndex += isDeleting ? -1 : 1;

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);