/**
 * ATIF ARHAM - Portfolio Interaction Logic
 * Senior Frontend Approach: Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PRELOADER
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
            startHeroAnimations();
        }, 1200);
    });

    // 2. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. SCROLL REVEAL ENGINE (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a skill bar, trigger the width animation
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.classList.add('animate-bar');
                }
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .reveal-delayed, .card-reveal, .skill-item, .project-card').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. HERO ANIMATION START
    function startHeroAnimations() {
        document.querySelectorAll('#home .reveal, #home .reveal-delayed').forEach(el => {
            el.classList.add('visible');
        });
    }

    // 5. // UPDATED MOBILE MENU LOGIC WITH CANCEL BUTTON
const menuBtn = document.getElementById('mobile-menu-btn'); // Hamburger
const closeBtn = document.getElementById('close-menu-btn'); // New Cancel Button
const overlay = document.getElementById('mobile-overlay');
const overlayLinks = document.querySelectorAll('.mobile-nav-links a, .m-hire-btn');

function openMenu() {
    menuBtn.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeMenu() {
    menuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'initial'; // Restore scrolling
}

// Event Listeners
menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

// Close menu if any link is clicked
overlayLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});
    // 6. FORM HANDLING (Formspree)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            
            formStatus.innerHTML = "Sending...";
            formStatus.style.color = "var(--text-muted)";

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.innerHTML = "✔ Message sent successfully. I'll get back to you soon!";
                    formStatus.style.color = "#4BB543";
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = "❌ Oops! There was a problem. Please try again.";
                    formStatus.style.color = "#ff3333";
                }
            } catch (error) {
                formStatus.innerHTML = "❌ Connection error. Please check your internet.";
                formStatus.style.color = "#ff3333";
            }
        });
    }

    // 7. SMOOTH BUTTON RIPPLE EFFECT
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255,255,255,0.2)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.transition = 'width 0.5s ease-out, height 0.5s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
            }, 10);
            
            this.addEventListener('mouseup', () => {
                ripple.style.opacity = '0';
                setTimeout(() => ripple.remove(), 500);
            });
        });
    });
});

// Add this inside your DOMContentLoaded listener
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // ============================================================
    // SCROLL DETECTION LOGIC
    // ============================================================
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        // If user scrolls down more than 50px, add the class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
       
});

// MAGNETIC NAV LINKS: Follows the mouse slightly for a premium feel
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = link.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.3; // Sensitivity
        const y = (e.clientY - top - height / 2) * 0.3;
        link.style.transform = `scale(1.15) translate(${x}px, ${y}px)`;
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = ''; // Snaps back to original scale/position
    });
});

// FUNCTION TO LAUNCH ANALYTICS TOOLS
function launchTool(toolName) {
    let url = "";

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

    // This simulates "opening" the app by launching the professional web version
    window.open(url, '_blank');
}