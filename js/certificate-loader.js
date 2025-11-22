document.addEventListener('DOMContentLoaded', () => {
    const certificateGrid = document.querySelector('.certificate-grid');
    if (certificateGrid) {
        loadCertificates(certificateGrid);
    }
});

async function loadCertificates(certificateGrid) {
    try {
        const response = await fetch('data/certificates.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const certificates = await response.json();

        certificateGrid.innerHTML = '';

        certificates.forEach(cert => {
            // Determine Icon and Color Class based on category
            let iconClass = 'fa-certificate'; // Default
            let colorClass = 'cert-default';

            const cat = cert.category ? cert.category.toLowerCase() : '';

            if (cat === 'security') {
                iconClass = 'fa-shield-halved';
                colorClass = 'cert-security';
            } else if (cat === 'ai') {
                iconClass = 'fa-brain';
                colorClass = 'cert-ai';
            } else if (cat === 'data') {
                iconClass = 'fa-chart-simple';
                colorClass = 'cert-data';
            } else if (cat === 'code') {
                iconClass = 'fa-code';
                colorClass = 'cert-code';
            } else if (cat === 'creative') {
                iconClass = 'fa-pen-nib';
                colorClass = 'cert-creative';
            } else if (cat === 'hardware') {
                iconClass = 'fa-server';
                colorClass = 'cert-hardware';
            }

            const cardHTML = `
                <div class="cert-card fade-in-element ${colorClass}">
                    <div class="cert-header">
                        <div class="cert-icon-box">
                            <i class="fa-solid ${iconClass}"></i>
                        </div>
                        <span class="cert-date">${cert.date}</span>
                    </div>
                    <div class="cert-body">
                        <h3 class="cert-title">${cert.title}</h3>
                        <p class="cert-issuer"><i class="fa-solid fa-building-columns"></i> ${cert.issuer}</p>
                    </div>
                    <div class="cert-footer">
                        <a href="${cert.url}" target="_blank" class="view-cert-btn">
                            View Credential <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            `;
            certificateGrid.innerHTML += cardHTML;
        });

        // Re-init scroll reveal for new items
        if (typeof initializeScrollReveal === 'function') {
            initializeScrollReveal();
        }

    } catch (error) {
        console.error('Error loading certificates:', error.message);
        certificateGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Could not load certificates.</p>';
    }
}