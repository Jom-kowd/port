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
 * Creates the HTML for a single Skeleton Card
 */
function createSkeletonHTML() {
    return `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
            </div>
        </div>
    `;
}

/**
 * Fetches ALL projects and builds the HTML for the main portfolio grid.
 */
async function loadPortfolioProjects(projectGrid) {
    try {
        // Show 6 skeleton cards while loading
        projectGrid.innerHTML = createSkeletonHTML().repeat(6);

        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const projects = await response.json();

        // Optional: Artificial delay para makita mo ang skeleton effect kahit mabilis ang internet mo
        // Pwede mo itong tanggalin (setTimeout) kapag idedeploy na.
        setTimeout(() => {
            projectGrid.innerHTML = ''; // Clear skeletons
            projects.forEach(project => {
                const cardHTML = createProjectCard(project);
                projectGrid.innerHTML += cardHTML;
            });

            // Re-initialize external libraries if they exist
            if (typeof initializeProjectFilter === 'function') initializeProjectFilter();
            if (typeof initializeScrollReveal === 'function') initializeScrollReveal();
        }, 500); // 500ms delay

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
        // Show 3 skeleton cards while loading
        projectGrid.innerHTML = createSkeletonHTML().repeat(3);

        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let projects = await response.json();

        // FILTER BY FEATURED FLAG instead of slice
        const featuredProjects = projects.filter(p => p.featured === true);
        const finalProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

        setTimeout(() => {
            projectGrid.innerHTML = ''; // Clear skeletons
            finalProjects.forEach(project => {
                const cardHTML = createProjectCard(project);
                projectGrid.innerHTML += cardHTML;
            });

            if (typeof initializeScrollReveal === 'function') initializeScrollReveal();
        }, 500);

    } catch (error) {
        console.error('Error loading featured projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center;">Could not load featured projects.</p>';
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
                <img src="${project.image}" alt="${project.title}" loading="lazy" width="400" height="225">
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