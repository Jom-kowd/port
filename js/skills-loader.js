document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.querySelector('.tech-bento-grid');
    if (skillsContainer) {
        loadSkills(skillsContainer);
    }
});

async function loadSkills(container) {
    try {
        const response = await fetch('data/skills.json');
        if (!response.ok) throw new Error('Failed to load skills');
        const skillsData = await response.json();

        container.innerHTML = ''; 

        skillsData.forEach((category, index) => {
            // Build inner items
            const itemsHTML = category.items.map(item => `
                <div class="bento-tech-item">
                    <i class="${item.icon}"></i>
                    <span>${item.name}</span>
                </div>
            `).join('');

            // Make specific cards wider for the asymmetrical Bento look (1st and 4th card)
            const extraClass = (index === 0 || index === 3) ? 'wide-span' : '';

            // Build Card HTML
            const cardHTML = `
                <div class="tech-bento-card fade-in-element ${extraClass}">
                    <div class="bento-card-header">
                        <div class="bento-icon-wrapper"><i class="${category.icon}"></i></div>
                        <h3>${category.category}</h3>
                    </div>
                    <div class="bento-items-grid">
                        ${itemsHTML}
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });

        if (typeof initializeScrollReveal === 'function') {
            initializeScrollReveal();
        }

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Could not load skills data.</p>';
    }
}