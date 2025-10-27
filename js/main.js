// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

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

});
