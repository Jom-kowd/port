document.addEventListener('DOMContentLoaded', () => {
    
    // Create the overlay div and append it to the body
    const overlay = document.createElement('div');
    overlay.classList.add('page-transition-overlay');
    document.body.appendChild(overlay);

    // --- FADE IN ON LOAD ---
    // Force a browser reflow before fading out to ensure the transition plays
    void overlay.offsetWidth; 
    overlay.style.opacity = '0';

    // --- FADE OUT ON CLICK ---
    // Select all internal navigation links
    const navLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([download])');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the destination URL
            const href = link.href;

            // Don't run animation if we're just clicking the link for the page we're already on
            if (href === window.location.href || href === window.location.href + '/') {
                e.preventDefault();
                return;
            }

            // Prevent the browser from navigating instantly
            e.preventDefault();

            // Fade in the overlay
            overlay.style.opacity = '1';

            // Wait for the animation (400ms), then navigate to the new page
            setTimeout(() => {
                window.location.href = href;
            }, 400); // This time MUST match the CSS transition duration
        });
    });

    // Handle browser back/forward buttons (pageshow event)
    window.addEventListener('pageshow', (e) => {
        // If the page is loaded from the back/forward cache, just fade out
        if (e.persisted) {
            overlay.style.opacity = '0';
        }
    });
});