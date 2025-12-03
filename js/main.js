// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Nav Hamburger ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // --- 2. Hero Section Typing Animation ---
    if (document.getElementById('hero-headline')) {
        if (typeof TypeIt !== 'undefined') {
            new TypeIt("#hero-headline", {
                strings: [
                    "Hi, I'm Mark Jomar.",
                    "Front-End Developer.", 
                    "Graphic Designer."
                ],
                speed: 60,
                breakLines: false,
                waitUntilVisible: true,
                loop: true,
                deleteSpeed: 40,
                lifeLike: true
            }).go();
        } else {
            console.error("TypeIt.js library is not loaded.");
        }
    }

    // --- 3. Scroll To Top Logic (NEW) ---
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (scrollTopBtn) {
        // Show button when scrolling down 500px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top on click
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});