document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the parts of our template
    const loadingEl = document.getElementById('project-loading');
    const dataEl = document.getElementById('project-data');
    const errorEl = document.getElementById('project-error');

    // Get references to the content holders
    const titleEl = document.getElementById('project-title');
    const shortDescEl = document.getElementById('project-short-desc');
    const imageEl = document.getElementById('project-image');
    const longDescEl = document.getElementById('project-long-desc');
    const tagsEl = document.getElementById('project-tags');
    const liveLinkEl = document.getElementById('project-live-link');
    const codeLinkEl = document.getElementById('project-code-link');

    /**
     * Finds the project data and populates the page
     */
    async function loadProjectDetails() {
        try {
            // 1. Get the project ID from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get('id');

            if (!projectId) {
                // If no ID, show error
                throw new Error('No project ID provided');
            }

            // 2. Fetch the projects data
            // We are in /js/, so we go up one level (..) then into /data/
            const response = await fetch('../data/projects.json');
            if (!response.ok) {
                throw new Error('Projects data file not found');
            }
            const projects = await response.json();

            // 3. Find the correct project
            const project = projects.find(p => p.id === projectId);

            if (!project) {
                // If project not found, show error
                throw new Error('Project not found');
            }

            // 4. Populate the page with the project data
            
            // Set document title
            document.title = project.title + ' - Project Details'; 

            // Fill in the template
            titleEl.textContent = project.title;
            shortDescEl.textContent = project.short_desc;
            imageEl.src = project.image;
            imageEl.alt = project.title + ' main image';
            longDescEl.textContent = project.long_desc;

            // Set links
            liveLinkEl.href = project.live_url;
            codeLinkEl.href = project.code_url;

            // Create and add tags
            tagsEl.innerHTML = ''; // Clear any existing tags
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.textContent = tag;
                tagsEl.appendChild(tagSpan);
            });
            
            // 5. Show the data and hide the loading message
            dataEl.style.display = 'block';
            loadingEl.style.display = 'none';

        } catch (error) {
            // If anything went wrong, show the error message
            console.error('Error loading project:', error.message);
            loadingEl.style.display = 'none';
            errorEl.style.display = 'block';
        }
    }

    // Run the function
    loadProjectDetails();
});