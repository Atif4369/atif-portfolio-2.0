// ==========================================
// 0. Premium Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // We add a slight 1.5-second delay so the beautiful animation 
    // has time to play out even if the website loads instantly!
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Completely remove it from the code after fading out to keep the site fast
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800); 
    }, 1500);
});
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Mobile Menu Toggle Logic (With Cancel Option)
    // ==========================================
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    function openMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }

    menuOpenBtn.addEventListener('click', openMenu);
    menuCloseBtn.addEventListener('click', closeMenu);

    // Close menu automatically when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // ==========================================
    // 2. Scroll Reveal & Skill Progress Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress-bar');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add show class for fade/slide in
                entry.target.classList.add('show');
                
                // If it's a skill card, animate the progress bar
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.progress-bar');
                    if (bar) {
                        bar.style.width = bar.getAttribute('data-width');
                    }
                }
                
                // Unobserve to optimize performance (run once)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before bottom
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ==========================================
    // 3. Scroll Spy (Auto-marking Navbar Links)
    // ==========================================
    const sections = document.querySelectorAll('.section');
    const navItemsDesktop = document.querySelectorAll('.nav-item');
    const navItemsMobile = document.querySelectorAll('.mobile-nav-item');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Activate when section is around 1/3 down the screen
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update Desktop Navigation
        navItemsDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Update Mobile Navigation
        navItemsMobile.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // 4. Tools Click Logic (Requested Switch Case)
    // ==========================================
    const toolBtns = document.querySelectorAll('.tool-btn');
    
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolName = btn.getAttribute('data-tool');
            let url = "";

            // Using the exact logic requested by user
            switch(toolName) {
                case 'excel':
                    url = "https://www.microsoft365.com/launch/excel";
                    break;
                case 'sheets':
                    url = "https://docs.google.com/spreadsheets/u/0/"; 
                    break;
                case 'ppt':
                    url = "https://www.microsoft365.com/launch/powerpoint";
                    break;
                case 'word':
                    url = "https://www.microsoft365.com/launch/word";
                    break;
                default:
                    return;
            }

            if (url !== "") {
                window.open(url, "_blank"); // Opens securely in a new tab
            }
        });
    });
    // ==========================================
    // 5. Contact Form AJAX Submission (No Reload)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop the page from redirecting

            // Change button text to show it's working
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Gather the form data
            const data = new FormData(contactForm);

            try {
                // Send the data to Formspree silently
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Show Green Message
                    formStatus.innerHTML = '<i class="ri-checkbox-circle-line"></i> Message sent successfully';
                    formStatus.className = 'form-status status-success show';
                    contactForm.reset(); // Clear the form fields
                } else {
                    // Formspree blocked it / Error
                    formStatus.innerHTML = '<i class="ri-error-warning-line"></i> Message sent failed';
                    formStatus.className = 'form-status status-error show';
                }
            } catch (error) {
                // Network Error (No internet)
                formStatus.innerHTML = '<i class="ri-wifi-off-line"></i> Message sent failed';
                formStatus.className = 'form-status status-error show';
            }

            // Restore the button back to normal
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Automatically hide the message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        });
    }
});