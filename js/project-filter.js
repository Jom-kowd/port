// We run this once on load for other pages, and it's called
// again by portfolio-loader.js after projects are fetched.
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectFilter();
});

/**
 * Finds all project filter buttons and adds click listeners
 * to show/hide project cards based on their data-tags.
 */
function initializeProjectFilter() {
    const filterContainer = document.querySelector('.filter-bar');
    const projectGrid = document.querySelector('.project-grid');

    // Make sure both exist before running
    if (filterContainer && projectGrid) {
        
        // We must query for the cards *inside* this function
        // so we get the newly loaded ones from the JSON fetch.
        const projectCards = projectGrid.querySelectorAll('.project-card');

        filterContainer.addEventListener('click', (e) => {
            // Only run if a filter button was clicked
            if (!e.target.classList.contains('filter-btn')) {
                return;
            }

            // 1. Remove 'active' class from all buttons
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // 2. Add 'active' class to the clicked button
            const filterButton = e.target;
            filterButton.classList.add('active');

            // 3. Get the filter value from the button's data attribute
            const filterValue = filterButton.dataset.filter;

            // 4. Loop through all project cards and toggle visibility
            projectCards.forEach(card => {
                // Get the tags string from the HTML attribute (e.g., "react node.js")
                const cardTags = card.dataset.tags;

                // Check if 'all' is selected OR if the card's tags contain the filter value.
                // We use .toLowerCase() on both sides to ensure "Graphic Design" matches "graphic design".
                if (filterValue === 'all' || (cardTags && cardTags.toLowerCase().includes(filterValue.toLowerCase()))) {
                    card.classList.remove('hide'); // Show the card
                } else {
                    card.classList.add('hide'); // Hide the card
                }
            });
        });
    }
}