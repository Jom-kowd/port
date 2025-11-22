// This script runs when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Portfolio Page ---
    const portfolioGrid = document.querySelector('.project-grid.full-portfolio-grid');
    if (portfolioGrid) {
        loadPortfolioProjects(portfolioGrid);
    }

    // --- Home Page ---
    const featuredGrid = document.querySelector('#featured-projects .project-grid');
    if (featuredGrid) {
        loadFeaturedProjects(featuredGrid);
    }
});

/**
 * Fetches ALL projects and builds the HTML for the main portfolio grid.
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

        if (typeof initializeProjectFilter === 'function') initializeProjectFilter();
        if (typeof initializeScrollReveal === 'function') initializeScrollReveal();

    } catch (error) {
        console.error('Error loading projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color); grid-column: 1 / -1;">Could not load projects. Please try again later.</p>';
    }
}

/**
 * Fetches a LIMITED number of projects for the home page.
 */
async function loadFeaturedProjects(projectGrid) {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let projects = await response.json();

        const featuredProjects = projects.slice(0, 3); // Get only first 3

        projectGrid.innerHTML = ''; 

        featuredProjects.forEach(project => {
            const cardHTML = createProjectCard(project);
            projectGrid.innerHTML += cardHTML;
        });

        if (typeof initializeScrollReveal === 'function') initializeScrollReveal();

    } catch (error) {
        console.error('Error loading featured projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color); grid-column: 1 / -1;">Could not load featured projects.</p>';
    }
}

/**
 * Creates the HTML for a single project card (New Design).
 */
function createProjectCard(project) {
    const tagsString = project.tags.join(' ').toLowerCase();
    // Create pills for tags
    const tagsHTML = project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

    return `
        <div class="project-card fade-in-element" data-tags="${tagsString}">
            <div class="project-thumb">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="project-detail.html?id=${project.id}" class="view-project-btn">
                        View Project <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.short_desc}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
            </div>
        </div>
    `;
}