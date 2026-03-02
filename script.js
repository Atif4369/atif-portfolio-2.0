// ==========================================
// 1. Premium Preloader Logic
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); 
        }, 1500);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 2. Mobile Menu Toggle Logic
    // ==========================================
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    function openMenu() {
        if(mobileMenu) mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        if(mobileMenu) mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; 
    }

    if(menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
    if(menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ==========================================
    // 3. Scroll Reveal & Skill Progress Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.progress-bar');
                    if (bar) bar.style.width = bar.getAttribute('data-width');
                }
                observer.unobserve(entry.target); // Stops observing to save CPU
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 4. ULTRA-SMOOTH SCROLL SPY (No scroll event listeners!)
    // ==========================================
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: "-30% 0px -60% 0px" // Triggers exactly when section hits the middle of screen
    });

    sections.forEach(sec => spyObserver.observe(sec));

    // ==========================================
    // 5. Tools Click Logic
    // ==========================================
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolName = btn.getAttribute('data-tool');
            let url = "";
            switch(toolName) {
                case 'excel': url = "https://www.microsoft365.com/launch/excel"; break;
                case 'sheets': url = "https://docs.google.com/spreadsheets/u/0/"; break;
                case 'ppt': url = "https://www.microsoft365.com/launch/powerpoint"; break;
                case 'word': url = "https://www.microsoft365.com/launch/word"; break;
                default: return;
            }
            if (url !== "") window.open(url, "_blank"); 
        });
    });

    // ==========================================
    // 6. Contact Form AJAX Submission
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            const data = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST', body: data, headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formStatus.innerHTML = '<i class="ri-checkbox-circle-line"></i> Message sent successfully';
                    formStatus.className = 'form-status status-success show';
                    contactForm.reset(); 
                } else {
                    formStatus.innerHTML = '<i class="ri-error-warning-line"></i> Message sent failed';
                    formStatus.className = 'form-status status-error show';
                }
            } catch (error) {
                formStatus.innerHTML = '<i class="ri-wifi-off-line"></i> Message sent failed';
                formStatus.className = 'form-status status-error show';
            }
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            setTimeout(() => { formStatus.classList.remove('show'); }, 5000);
        });
    }
});