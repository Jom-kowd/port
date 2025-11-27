// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Nav Hamburger ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Check if both elements exist
    if (hamburger && navLinks) {
        // Add click event listener to the hamburger icon
        hamburger.addEventListener('click', () => {
            // Toggle the 'nav-active' class to show/hide the menu
            navLinks.classList.toggle('nav-active');
            
            // Toggle the 'toggle' class for the hamburger animation
            hamburger.classList.toggle('toggle');
        });
    }

    // --- Hero Section Typing Animation ---
    // Check if the element with id 'hero-headline' exists
    if (document.getElementById('hero-headline')) {
        
        // Make sure the TypeIt library is loaded
        if (typeof TypeIt !== 'undefined') {
            
            new TypeIt("#hero-headline", {
                strings: [
                    "Hi, I'm Mark Jomar S. Calmateo.",
                    "I'm a Front-End Developer.",     // Changed from Aspiring Full Stack
                    "I'm a Graphic Designer.",        // Added from Resume 
                    "I build digital solutions from the Philippines 🇵🇭."
                ],
                // ... rest of your settings
                speed: 60,         // How fast it types
                breakLines: false, // Don't add <br> tags
                waitUntilVisible: true, // Wait until the element is on screen
                loop: true,        // Loop forever
                deleteSpeed: 40,   // How fast it deletes
                lifeLike: true     // More "human" typing
            }).go(); // Start the animation

        } else {
            console.error("TypeIt.js library is not loaded.");
        }
    }

});

// --- Back to Top Button Logic ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }