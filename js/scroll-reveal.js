document.addEventListener('DOMContentLoaded', () => {
    initializeScrollReveal();
});

/**
 * Finds all '.fade-in-element' items and uses
 * IntersectionObserver to add the 'is-visible' class when scrolled into view.
 */
function initializeScrollReveal() {
    // Select all elements we want to animate
    // We query *all* of them again in case new ones were added.
    const elementsToAnimate = document.querySelectorAll('.fade-in-element');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        elementsToAnimate.forEach(element => {
            // Check if it's already visible to avoid re-observing
            if (!element.classList.contains('is-visible')) {
                observer.observe(element);
            }
        });

    } else {
        // Fallback for very old browsers
        elementsToAnimate.forEach(element => {
            element.classList.add('is-visible');
        });
    }
}