// This script runs when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Find the specific grid for the main portfolio page
    const projectGrid = document.querySelector('.project-grid.full-portfolio-grid');
    
    // Only run this code if we're on the portfolio page (where the grid exists)
    if (projectGrid) {
        loadPortfolioProjects(projectGrid);
    }
});

/**
 * Fetches projects from the JSON file and builds the HTML for the portfolio grid.
 * @param {HTMLElement} projectGrid - The grid element to fill with project cards.
 */
async function loadPortfolioProjects(projectGrid) {
    try {
        // Fetch the project data
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();

        // Clear out any hard-coded projects or loading text
        projectGrid.innerHTML = ''; 

        // Loop through each project and create an HTML card for it
        projects.forEach(project => {
            // Create a string of all tags for the data-tags attribute
            const tagsString = project.tags.join(' ').toLowerCase();

            // Create a string of HTML for the tag spans
            const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

            // Use a template literal to build the card HTML
            const projectCardHTML = `
                <div class="project-card fade-in-element" data-tags="${tagsString}">
                    <img src="${project.image}" alt="${project.title} Screenshot">
                    <h3>${project.title}</h3>
                    <p>${project.short_desc}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                    <div class="project-links">
                        <a href="project-detail.html?id=${project.id}" class="btn btn-primary">Learn More</a>
                        <a href="${project.code_url}" target="_blank" class="btn btn-secondary">View Code</a>
                    </div>
                </div>
            `;
            
            // Add the new card's HTML to the grid
            projectGrid.innerHTML += projectCardHTML;
        });

        // --- VERY IMPORTANT ---
        // Now that the projects are loaded, we must re-initialize
        // the project filter script so it can find the new cards.
        initializeProjectFilter();
        
        // We also need to tell the scroll-reveal script to find the new cards.
        initializeScrollReveal();

    } catch (error) {
        console.error('Error loading projects:', error.message);
        // Show a user-friendly error message in the grid
        projectGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color);">Could not load projects. Please try again later.</p>';
    }
}