document.addEventListener('DOMContentLoaded', () => {

    // Select all elements we want to animate
    const elementsToAnimate = document.querySelectorAll('.fade-in-element');

    // Check if the Intersection Observer API is supported
    if ('IntersectionObserver' in window) {
        
        // Create an observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the element is on screen
                if (entry.isIntersecting) {
                    // Add the 'is-visible' class
                    entry.target.classList.add('is-visible');
                    // Stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Observe each element
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });

    } else {
        // Fallback for very old browsers: just show all elements
        elementsToAnimate.forEach(element => {
            element.classList.add('is-visible');
        });
    }
});