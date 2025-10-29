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

            // 6. Load the comments for this specific project
            loadDisqusComments(project.id, project.title);

        } catch (error) {
            // If anything went wrong, show the error message
            console.error('Error loading project:', error.message);
            loadingEl.style.display = 'none';
            errorEl.style.display = 'block';
        }
    }

    /**
     * Loads the Disqus comment thread for a specific page.
     * @param {string} projectId - The unique ID of the project (e.g., "project-1")
     * @param {string} projectTitle - The title of the project
     */
    function loadDisqusComments(projectId, projectTitle) {
        // ### PUT YOUR DISQUS SHORTNAME HERE ###
        // Remember to replace 'YOUR_SHORTNAME_HERE' with your actual Disqus shortname
        const DISQUS_SHORTNAME = 'my-portfolio-tphd8res2o'; 

        // This configuration tells Disqus what page it's on.
        var disqus_config = function () {
            this.page.url = window.location.href;  
            this.page.identifier = projectId; 
            this.page.title = projectTitle;
        };
        
        (function() { 
            if (!document.getElementById('disqus_thread')) return;
            var d = document, s = d.createElement('script');
            s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }

    // Run the main function
    loadProjectDetails();
});