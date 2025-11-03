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
        // so we get the newly loaded ones.
        const projectCards = projectGrid.querySelectorAll('.project-card');

        filterContainer.addEventListener('click', (e) => {
            // Only run if a filter button was clicked
            if (!e.target.classList.contains('filter-btn')) {
                return;
            }

            // Remove 'active' class from all buttons
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add 'active' class to the clicked button
            const filterButton = e.target;
            filterButton.classList.add('active');

            // Get the filter value from the 'data-filter' attribute
            const filterValue = filterButton.dataset.filter;

            // Loop through all project cards
            projectCards.forEach(card => {
                const cardTags = card.dataset.tags;

                // Check if the card has the tag or if 'all' was clicked
                if (filterValue === 'all' || (cardTags && cardTags.includes(filterValue))) {
                    card.classList.remove('hide'); // Show the card
                } else {
                    card.classList.add('hide'); // Hide the card
                }
            });
        });
    }
}