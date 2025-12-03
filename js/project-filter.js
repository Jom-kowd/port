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
    const searchInput = document.getElementById('project-search'); // Get the input

    if (filterContainer && projectGrid) {
        const projectCards = projectGrid.querySelectorAll('.project-card');
        
        // Track current filter state
        let activeCategory = 'all';
        let searchTerm = '';

        const filterProjects = () => {
            projectCards.forEach(card => {
                const cardTags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardDesc = card.querySelector('p').textContent.toLowerCase();
                
                // Category Match
                const matchesCategory = activeCategory === 'all' || cardTags.includes(activeCategory.toLowerCase());
                
                // Search Match (Title, Desc, or Tags)
                const matchesSearch = cardTitle.includes(searchTerm) || 
                                      cardDesc.includes(searchTerm) || 
                                      cardTags.includes(searchTerm);

                if (matchesCategory && matchesSearch) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        };

        // Button Click Event
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                activeCategory = e.target.dataset.filter;
                filterProjects();
            }
        });

        // Input Type Event
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value.toLowerCase();
                filterProjects();
            });
        }
    }
}