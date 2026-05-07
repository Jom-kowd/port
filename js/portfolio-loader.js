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
 * Creates the HTML for a single Skeleton Card (Updated for new Aspect Ratio)
 */
function createSkeletonHTML() {
    return `
        <div class="skeleton-card" style="aspect-ratio: 4/3; border-radius: 20px; min-height: auto;">
            <div class="skeleton-img" style="height: 100%;"></div>
        </div>
    `;
}

/**
 * Handles generating the Empty State if no projects are found
 */
function getEmptyStateHTML() {
    return `
        <div class="empty-portfolio-state fade-in-element">
            <i class="fa-solid fa-laptop-code" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1.5rem; opacity: 0.8;"></i>
            <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">System Updating...</h3>
            <p style="color: var(--secondary-color); font-size: 1.1rem; max-width: 500px; margin: 0 auto;">
                I am currently re-compiling my portfolio with new, exciting projects and designs. Check back shortly to see my latest work!
            </p>
        </div>
    `;
}

async function loadPortfolioProjects(projectGrid) {
    try {
        projectGrid.innerHTML = createSkeletonHTML().repeat(6);

        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const projects = await response.json();

        setTimeout(() => {
            projectGrid.innerHTML = ''; 
            
            // Check if array is empty
            if (projects.length === 0) {
                projectGrid.innerHTML = getEmptyStateHTML();
            } else {
                projects.forEach(project => {
                    const cardHTML = createProjectCard(project);
                    projectGrid.innerHTML += cardHTML;
                });
            }

            if (typeof initializeProjectFilter === 'function') initializeProjectFilter();
            if (typeof initializeScrollReveal === 'function') initializeScrollReveal();
        }, 500); 

    } catch (error) {
        console.error('Error loading projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color); grid-column: 1 / -1;">Could not load projects. Please try again later.</p>';
    }
}

async function loadFeaturedProjects(projectGrid) {
    try {
        projectGrid.innerHTML = createSkeletonHTML().repeat(3);

        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let projects = await response.json();

        const featuredProjects = projects.filter(p => p.featured === true);
        const finalProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

        setTimeout(() => {
            projectGrid.innerHTML = ''; 
            
            // Check if array is empty
            if (finalProjects.length === 0) {
                projectGrid.innerHTML = getEmptyStateHTML();
            } else {
                finalProjects.forEach(project => {
                    const cardHTML = createProjectCard(project);
                    projectGrid.innerHTML += cardHTML;
                });
            }

            if (typeof initializeScrollReveal === 'function') initializeScrollReveal();
        }, 500);

    } catch (error) {
        console.error('Error loading featured projects:', error.message);
        projectGrid.innerHTML = '<p style="text-align: center;">Could not load featured projects.</p>';
    }
}

/**
 * Creates the HTML for a single project card (New Minimalist Overlay Design).
 */
function createProjectCard(project) {
    const tagsString = project.tags.join(' ').toLowerCase();
    const tagsHTML = project.tags.map(tag => `<span class="modern-tag-pill">${tag}</span>`).join('');

    // Notice we use an <a> tag as the root wrapper so the whole card is clickable
    return `
        <a href="project-detail.html?id=${project.id}" class="modern-project-card project-card fade-in-element" data-tags="${tagsString}">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="view-icon-circle"><i class="fa-solid fa-arrow-right"></i></div>
            
            <div class="modern-project-overlay">
                <h3>${project.title}</h3>
                <p>${project.short_desc}</p>
                <div class="modern-tags">
                    ${tagsHTML}
                </div>
            </div>
        </a>
    `;
}