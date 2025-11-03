document.addEventListener('DOMContentLoaded', () => {
    // Find the grid on the certificates page
    const certificateGrid = document.querySelector('.certificate-grid');

    if (certificateGrid) {
        loadCertificates(certificateGrid);
    }
});

/**
 * Fetches certificates from the JSON file and builds the HTML.
 * @param {HTMLElement} certificateGrid - The grid element to fill.
 */
async function loadCertificates(certificateGrid) {
    try {
        const response = await fetch('data/certificates.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const certificates = await response.json();

        // Clear the loading message
        certificateGrid.innerHTML = '';

        // Loop through each certificate and create the HTML card
        certificates.forEach(cert => {
            const cardHTML = `
                <div class="certificate-card fade-in-element">
                    <div class="cert-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.9l4.3 1.9v3.7c0 3.2-1.8 6.2-4.3 7.9-2.5-1.7-4.3-4.7-4.3-7.9V3.8L12 1.9zM11 16c-3.3 0-6-1.2-6 2.8v1.5C5 21.2 8.1 22 12 22s7-.8 7-1.8v-1.5c0-1.5-2.7-2.8-6-2.8h-2z"></path></svg>
                    </div>
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <p>Issued by: ${cert.issuer}</p>
                        <a href="${cert.url}" target="_blank" class="btn btn-secondary">View Certificate</a>
                    </div>
                </div>
            `;
            // Add the new card to the grid
            certificateGrid.innerHTML += cardHTML;
        });

        // Tell scroll-reveal to find the new cards
        initializeScrollReveal();

    } catch (error) {
        console.error('Error loading certificates:', error.message);
        certificateGrid.innerHTML = '<p style="text-align: center; color: var(--secondary-color); grid-column: 1 / -1;">Could not load certificates.</p>';
    }
}