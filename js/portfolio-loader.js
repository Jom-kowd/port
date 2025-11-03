// This script runs when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Portfolio Page ---
    // Find the specific grid for the main portfolio page
    const portfolioGrid = document.querySelector('.project-grid.full-portfolio-grid');
    if (portfolioGrid) {
        loadPortfolioProjects(portfolioGrid);
    }

    // --- Home Page ---
    // Find the grid for the featured projects on the home page
    const featuredGrid = document.querySelector('#featured-projects .project-grid');
    if (featuredGrid) {
        loadFeaturedProjects(featuredGrid);
    }
});

/**
 * Fetches ALL projects and builds the HTML for the main portfolio grid.
 * @param {HTMLElement} projectGrid - The grid element to fill.
 */
async function loadPortfolioProjects(projectGrid) {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const projects = await response.json();

        projectGrid.innerHTML = ''; // Clear loading message

        projects.forEach(project => {
            const cardHTML = createProjectCard(project);
            projectGrid.innerHTML += cardHTML;
        });

        // Re-initialize scripts that need to see the new elements
        initializeProjectFilter();
        initializeScrollReveal();

    } catch (error) {
        console.error('Error loading projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color); grid-column: 1 / -1;">Could not load projects. Please try again later.</p>';
    }
}

/**
 * Fetches a LIMITED number of projects for the home page.
 * @param {HTMLElement} projectGrid - The grid element to fill.
 */
async function loadFeaturedProjects(projectGrid) {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let projects = await response.json();

        // Get only the first 3 projects
        const featuredProjects = projects.slice(0, 3);

        projectGrid.innerHTML = ''; // Clear loading message

        featuredProjects.forEach(project => {
            const cardHTML = createProjectCard(project);
            projectGrid.innerHTML += cardHTML;
        });

        // Re-initialize scroll reveal for the new cards
        initializeScrollReveal();

    } catch (error) {
        console.error('Error loading featured projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color); grid-column: 1 / -1;">Could not load featured projects.</p>';
    }
}

/**
 * A helper function to create the HTML for a single project card.
 * This avoids repeating code in both load functions.
 * @param {object} project - The project object from projects.json
 * @returns {string} - The HTML string for the project card
 */
function createProjectCard(project) {
    const tagsString = project.tags.join(' ').toLowerCase();
    const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

    // Note: We use the "Learn More" link for the primary button on featured projects too
    // to keep it consistent with the portfolio page.
    return `
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
}