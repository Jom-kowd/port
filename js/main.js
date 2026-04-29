// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Nav Hamburger ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // --- 2. Hero Section Typing Animation ---
    if (document.getElementById('hero-headline')) {
        if (typeof TypeIt !== 'undefined') {
            new TypeIt("#hero-headline", {
                strings: [
                    "Hi, I'm Mark Jomar.",
                    "Front-End Developer.", 
                    "Graphic Designer."
                ],
                speed: 60,
                breakLines: false,
                waitUntilVisible: true,
                loop: true,
                deleteSpeed: 40,
                lifeLike: true
            }).go();
        } else {
            console.error("TypeIt.js library is not loaded.");
        }
    }

    // --- 3. Scroll To Top Logic (NEW) ---
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (scrollTopBtn) {
        // Show button when scrolling down 500px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top on click
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// --- 4. AJAX Contact Form Submission (NEW) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Pigilan ang pag-redirect sa Formspree
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Ipakita ang Loading State sa button
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json' // Gusto natin ng JSON response
                    }
                });

                if (response.ok) {
                    // SUCCESS STATE
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! I will get back to you soon.';
                    formStatus.style.backgroundColor = "rgba(16, 185, 129, 0.1)"; // Light green bg
                    formStatus.style.color = "#10b981"; // Green text
                    formStatus.style.display = "block";
                    contactForm.reset(); // I-clear ang form inputs
                } else {
                    throw new Error('Formspree returned an error');
                }
            } catch (error) {
                // ERROR STATE
                formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Oops! There was a problem sending your message.';
                formStatus.style.backgroundColor = "rgba(239, 68, 68, 0.1)"; // Light red bg
                formStatus.style.color = "#ef4444"; // Red text
                formStatus.style.display = "block";
            } finally {
                // Ibalik sa normal ang button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Itago ang message pagkatapos ng 5 segundo
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }