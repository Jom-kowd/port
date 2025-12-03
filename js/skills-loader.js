document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.querySelector('.tech-stack-wrapper');
    if (skillsContainer) {
        loadSkills(skillsContainer);
    }
});

async function loadSkills(container) {
    try {
        const response = await fetch('data/skills.json');
        if (!response.ok) throw new Error('Failed to load skills');
        const skillsData = await response.json();

        container.innerHTML = ''; // Clear existing static content

        skillsData.forEach(category => {
            // Build items HTML
            const itemsHTML = category.items.map(item => `
                <div class="tech-item">
                    <i class="${item.icon}"></i>
                    <span>${item.name}</span>
                </div>
            `).join('');

            // Build Card HTML
            const cardHTML = `
                <div class="tech-card fade-in-element">
                    <div class="tech-card-header">
                        <div class="icon-wrapper"><i class="${category.icon}"></i></div>
                        <h3>${category.category}</h3>
                    </div>
                    <div class="tech-grid">
                        ${itemsHTML}
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });

        // Re-initialize animations
        if (typeof initializeScrollReveal === 'function') {
            initializeScrollReveal();
        }

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Could not load skills data.</p>';
    }
}