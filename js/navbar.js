document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('spotlight-nav');
    if (!nav) return;

    const hoverLayer = document.getElementById('spotlight-hover');
    const items = nav.querySelectorAll('.nav-item');
    
    let activeIndex = 0; // Default active index (Início)
    let isHovering = false;
    let isAutoScrolling = false;
    
    // Spring physics variables
    let currentSpotlightX = 0;
    let targetSpotlightX = 0;
    
    let currentAmbienceX = 0;
    let targetAmbienceX = 0;

    // Spring constants
    const stiffness = 0.15;
    const damping = 0.7;
    
    let spotlightVel = 0;
    let ambienceVel = 0;

    function getTargetX(index) {
        const item = nav.querySelector(`[data-index="${index}"]`);
        if (!item) return 0;
        const navRect = nav.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        return itemRect.left - navRect.left + itemRect.width / 2;
    }

    // Initialize targets
    const initX = getTargetX(activeIndex);
    currentSpotlightX = initX;
    targetSpotlightX = initX;
    currentAmbienceX = initX;
    targetAmbienceX = initX;
    
    nav.style.setProperty("--spotlight-x", `${currentSpotlightX}px`);
    nav.style.setProperty("--ambience-x", `${currentAmbienceX}px`);

    // Animation loop
    function animate() {
        // Only run spring physics if mouse is not hovering (for spotlight)
        if (!isHovering) {
            const spotlightAccel = (targetSpotlightX - currentSpotlightX) * stiffness;
            spotlightVel += spotlightAccel;
            spotlightVel *= damping;
            currentSpotlightX += spotlightVel;
            nav.style.setProperty("--spotlight-x", `${currentSpotlightX}px`);
        } else {
            // Mouse controls spotlight directly
            currentSpotlightX = targetSpotlightX;
            nav.style.setProperty("--spotlight-x", `${currentSpotlightX}px`);
        }

        // Always spring ambience towards active item
        const ambienceAccel = (targetAmbienceX - currentAmbienceX) * stiffness;
        ambienceVel += ambienceAccel;
        ambienceVel *= damping;
        currentAmbienceX += ambienceVel;
        nav.style.setProperty("--ambience-x", `${currentAmbienceX}px`);

        requestAnimationFrame(animate);
    }
    
    animate();

    nav.addEventListener("mousemove", (e) => {
        isHovering = true;
        hoverLayer.style.opacity = "1";
        const rect = nav.getBoundingClientRect();
        targetSpotlightX = e.clientX - rect.left;
    });

    nav.addEventListener("mouseleave", () => {
        isHovering = false;
        hoverLayer.style.opacity = "0";
        targetSpotlightX = getTargetX(activeIndex);
    });

    items.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            isAutoScrolling = true;
            setTimeout(() => { isAutoScrolling = false; }, 1600);
            
            setActiveIndex(index);
            const targetId = item.getAttribute('href');
            if (window.lenis) {
                window.lenis.scrollTo(targetId, { duration: 1.5 });
            } else {
                const targetEl = document.querySelector(targetId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function setActiveIndex(index) {
        activeIndex = index;
        
        // Update classes
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add("text-white");
                item.classList.remove("text-brand-soft");
            } else {
                item.classList.add("text-brand-soft");
                item.classList.remove("text-white");
            }
        });

        const mobileItems = document.querySelectorAll('.mobile-nav-item');
        mobileItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add("text-white");
                item.classList.remove("text-brand-soft");
            } else {
                item.classList.add("text-brand-soft");
                item.classList.remove("text-white");
            }
        });

        targetAmbienceX = getTargetX(activeIndex);
        if (!isHovering) {
            targetSpotlightX = getTargetX(activeIndex);
        }
    }

    // Handle intersection observer to auto-update active index on scroll
    const sections = Array.from(items).map(item => {
        const href = item.getAttribute('href');
        if(href.startsWith('#')) {
            return document.querySelector(href);
        }
        return null;
    }).filter(Boolean);

    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = sections.indexOf(entry.target);
                    // Match with correct nav item data-index
                    const dataIndex = parseInt(items[index].getAttribute('data-index'));
                    if (!isNaN(dataIndex)) {
                        setActiveIndex(dataIndex);
                    }
                }
            });
        }, {
            rootMargin: "-20% 0px -60% 0px"
        });

        sections.forEach(section => observer.observe(section));
    }
    
    // Add ID to hero section if it doesn't have one
    const hero = document.querySelector('.hero-scroll-container');
    if (hero && !hero.id) hero.id = 'inicio';

    // --- Mobile Menu Logic ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    let isMobileMenuOpen = false;

    function closeMobileMenu() {
        if (!isMobileMenuOpen || !mobileBtn || !mobileDropdown) return;
        isMobileMenuOpen = false;
        mobileDropdown.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]', 'scale-95');
        mobileDropdown.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        
        const spans = mobileBtn.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].classList.remove('translate-y-[6px]', 'rotate-45');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('translate-y-[-6px]', '-rotate-45');
        }
    }

    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            isMobileMenuOpen = true;
            mobileDropdown.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]', 'scale-95');
            mobileDropdown.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
            
            const spans = mobileBtn.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].classList.add('translate-y-[6px]', 'rotate-45');
                spans[1].classList.add('opacity-0');
                spans[2].classList.add('translate-y-[-6px]', '-rotate-45');
            }
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        document.addEventListener('click', (e) => {
            if (isMobileMenuOpen && !mobileDropdown.contains(e.target) && !mobileBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        const mobileItems = document.querySelectorAll('.mobile-nav-item');
        mobileItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                isAutoScrolling = true;
                setTimeout(() => { isAutoScrolling = false; }, 1600);
                
                setActiveIndex(index);
                closeMobileMenu();
                const targetId = item.getAttribute('href');
                if (window.lenis) {
                    window.lenis.scrollTo(targetId, { duration: 1.5 });
                } else {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // --- Smart Scroll Hide/Show Logic ---
    const navbarWrapper = document.getElementById('navbar-wrapper');
    if (navbarWrapper) {
        let lastScrollY = window.scrollY;
        let scrollUpDistance = 0;
        const SCROLL_UP_THRESHOLD = 200; // Require 200px of upward scroll to show, preventing accidental triggers
        
        window.addEventListener('scroll', () => {
            if (isAutoScrolling) {
                lastScrollY = window.scrollY;
                navbarWrapper.classList.remove('-translate-y-32');
                return;
            }
            
            const currentScrollY = window.scrollY;
            
            // Show immediately if we are at the very top
            if (currentScrollY <= 100) {
                navbarWrapper.classList.remove('-translate-y-32');
                scrollUpDistance = 0;
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down - hide immediately
                navbarWrapper.classList.add('-translate-y-32');
                scrollUpDistance = 0; // Reset scroll up accumulator
                if (typeof closeMobileMenu === 'function') closeMobileMenu();
            } else {
                // Scrolling up - accumulate distance
                scrollUpDistance += (lastScrollY - currentScrollY);
                if (scrollUpDistance > SCROLL_UP_THRESHOLD) {
                    navbarWrapper.classList.remove('-translate-y-32');
                }
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
});
