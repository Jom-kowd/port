document.addEventListener('DOMContentLoaded', () => {

    // References
    const loadingEl = document.getElementById('project-loading');
    const dataEl = document.getElementById('project-data');
    const errorEl = document.getElementById('project-error');

    // Content Elements
    const titleEl = document.getElementById('project-title');
    const shortDescEl = document.getElementById('project-short-desc');
    const imageEl = document.getElementById('project-image');
    const longDescEl = document.getElementById('project-long-desc');
    const tagsEl = document.getElementById('project-tags');
    const liveLinkEl = document.getElementById('project-live-link');
    const codeLinkEl = document.getElementById('project-code-link');
    const gallerySection = document.getElementById('gallery-section');
    const galleryGrid = document.getElementById('project-gallery-grid');

    async function loadProjectDetails() {
        try {
            // 1. Get ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get('id');

            if (!projectId) throw new Error('No project ID provided');

            // 2. Fetch Data
            const response = await fetch('data/projects.json');
            if (!response.ok) throw new Error('Projects data file not found');
            const projects = await response.json();

            // 3. Find Project
            const project = projects.find(p => p.id === projectId);
            if (!project) throw new Error('Project not found');

            // 4. Populate Content
            document.title = project.title + ' - Project Details';
            titleEl.textContent = project.title;
            shortDescEl.textContent = project.short_desc;
            imageEl.src = project.image;
            imageEl.alt = project.title;
            longDescEl.textContent = project.long_desc;
            
            liveLinkEl.href = project.live_url;
            codeLinkEl.href = project.code_url;

            // Tags (Pills)
            tagsEl.innerHTML = project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

            // 5. Handle Gallery
            if (project.gallery && project.gallery.length > 0) {
                gallerySection.style.display = 'block';
                galleryGrid.innerHTML = project.gallery.map(imgSrc => `
                    <div class="gallery-item">
                        <img src="${imgSrc}" alt="Project screenshot">
                    </div>
                `).join('');
            } else {
                gallerySection.style.display = 'none';
            }
            
            // 6. Show Page
            loadingEl.style.display = 'none';
            dataEl.style.display = 'block';

            // Re-run Scroll Reveal if available
            if (typeof initializeScrollReveal === 'function') {
                // Small delay to ensure DOM is rendered
                setTimeout(initializeScrollReveal, 100);
            }

            // 7. Load Comments
            loadDisqusComments(project.id, project.title);

        } catch (error) {
            console.error('Error:', error.message);
            loadingEl.style.display = 'none';
            errorEl.style.display = 'block';
        }
    }

    function loadDisqusComments(projectId, projectTitle) {
        // ### REPLACE THIS WITH YOUR ACTUAL DISQUS SHORTNAME ###
        const DISQUS_SHORTNAME = 'my-portfolio-tphd8res2o'; 

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

    loadProjectDetails();
});