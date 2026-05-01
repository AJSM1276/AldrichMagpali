    // ============================================
// BANNER THAT SHOWS ON EVERY PAGE RELOAD
// (No persistence - always reappears)
// ============================================
// ===== THEME INITIALIZATION =====
function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (darkModeToggle) {
        darkModeToggle.classList.toggle('active', isDark);
        darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

// OPTION A: Always start with LIGHT mode
let darkMode = false;

// OPTION B: Start with SYSTEM preference (recommended)
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// let darkMode = prefersDark;

applyTheme(darkMode);

// User toggle - saves preference
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode ? 'dark' : 'light');
        applyTheme(darkMode);
    });
}

(function() {
    const banner = document.getElementById('fgliAnnouncementBanner');
    const closeBtn = document.getElementById('closeBannerBtn');
    const applyBtn = document.getElementById('applyNowBannerBtn');
    
    // NO localStorage check - banner always starts visible on every reload
    // Just ensure banner is visible when page loads
    if (banner) {
        banner.classList.remove('banner-hidden');
    }
    
    // When user clicks X - just hide it for THIS session only
    // Will reappear on next page reload
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (banner) {
                banner.classList.add('banner-hidden');
            }
            // NO localStorage save - banner will show again on next reload
        });
    }
    
    // Optional: Apply button action
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert("🎓 FGLI 75% discount application: \n\nPlease visit our FGLI Support section or contact me directly.\n\nDiscount code: FGLI75COMMUNITY");
        });
    }
})();
    // Simple JavaScript for interactivity
    document.addEventListener('DOMContentLoaded', function() {
        // Set current year
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const darkModeToggle = document.getElementById('darkModeToggle');

        function applyTheme(isDark) {
            document.body.classList.toggle('dark-mode', isDark);
            if (darkModeToggle) {
                darkModeToggle.classList.toggle('active', isDark);
                darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            }
        }

        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        let darkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
        applyTheme(darkMode);

        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                darkMode = !darkMode;
                localStorage.setItem('darkMode', darkMode ? 'dark' : 'light');
                applyTheme(darkMode);
            });
        }

        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('active');
                
                // Toggle body scroll when menu is open
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on a regular nav link (not dropdown parent)
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Only close if it's not a dropdown parent on mobile
                    if (window.innerWidth < 1000 && link.closest('.nav-item-has-children')) {
                        return; // Don't close menu for dropdown parents on mobile
                    }
                    
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Also close any open dropdowns on mobile
                    if (window.innerWidth < 1000) {
                        document.querySelectorAll('.nav-item-has-children.active').forEach(item => {
                            item.classList.remove('active');
                        });
                    }
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Also close any open dropdowns on mobile
                    if (window.innerWidth < 1000) {
                        document.querySelectorAll('.nav-item-has-children.active').forEach(item => {
                            item.classList.remove('active');
                        });
                    }
                }
            });
        }
        
        // ===== DROPDOWN FUNCTIONALITY =====
        const navItemsWithChildren = document.querySelectorAll('.nav-item-has-children');
        
        navItemsWithChildren.forEach(item => {
            const link = item.querySelector('.nav-link');
            
            link.addEventListener('click', function(e) {
                // Only handle dropdown toggle on mobile
                if (window.innerWidth < 1000) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    navItemsWithChildren.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    item.classList.toggle('active');
                }
            });
        });
        
        // Handle dropdown link clicks
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // On mobile, close menu and dropdown after clicking
                if (window.innerWidth < 1000) {
                    // Close dropdown
                    const parentItem = link.closest('.nav-item-has-children');
                    if (parentItem) {
                        parentItem.classList.remove('active');
                    }
                    
                    // Close mobile menu
                    if (menuToggle && nav) {
                        menuToggle.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1000) {
                if (!e.target.closest('.nav-item-has-children')) {
                    navItemsWithChildren.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            }
        });
        
        // ===== ACCORDION FUNCTIONALITY =====
        // Accordion functionality for Essays
        const accordionToggles = document.querySelectorAll('.accordion-toggle');
        
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const accordionItem = this.closest('.accordion-item');
                const isActive = accordionItem.classList.contains('active');
                
                // Close all other accordion items
                document.querySelectorAll('.accordion-item.active').forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    accordionItem.classList.remove('active');
                } else {
                    accordionItem.classList.add('active');
                }
            });
        });
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    faqItem.classList.remove('active');
                } else {
                    faqItem.classList.add('active');
                }
            });
        });
        
        // ===== DOWNLOAD BUTTONS =====
        // const downloadBtns = document.querySelectorAll('.download-btn');
        
        // downloadBtns.forEach(btn => {
        //     btn.addEventListener('click', function() {
        //         const resource = this.getAttribute('data-resource');
        //         let resourceName = '';
                
        //         switch(resource) {
        //             case 'essay-worksheet':
        //                 resourceName = 'Essay Brainstorming Worksheet';
        //                 break;
        //             case 'planning-checklist':
        //                 resourceName = 'High School Planning Checklist';
        //                 break;
        //             case 'application-timeline':
        //                 resourceName = 'College Application Timeline';
        //                 break;
        //             default:
        //                 resourceName = 'Resource';
        //         }
                
        //         // Show download notification
        //         alert(`${resourceName} downloaded! (This is a demo - in a real site, this would download a PDF)`);
        //     });
        // });
        
        // ===== CONTACT FORM =====
        // Contact Form Submission - MODIFIED FOR FORMSPREE
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');

        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                // Don't prevent default - let Formspree handle it
                // e.preventDefault(); // REMOVE THIS LINE
                
                // Just show a loading message
                formMessage.textContent = 'Sending your message...';
                formMessage.className = 'form-message';
                
                // Optional: You can let Formspree handle everything
                // The form will submit normally to Formspree
                // Formspree will redirect based on your settings
            });
        }
        
        // ===== SMOOTH SCROLL =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or if it's a dropdown parent on mobile
                if (href === '#' || 
                    (window.innerWidth < 1000 && this.classList.contains('nav-link') && 
                     this.closest('.nav-item-has-children'))) {
                    return;
                }
                
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (window.innerWidth < 1000 && nav && nav.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        // Also close any open dropdowns
                        document.querySelectorAll('.nav-item-has-children.active').forEach(item => {
                            item.classList.remove('active');
                        });
                        
                        // Scroll after menu closes
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }, 300);
                    } else {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // ===== SCROLL ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate child elements with delay
                    const cards = entry.target.querySelectorAll('.service-card, .resource-category, .free-resource-card, .faq-item, .contact-item');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
        
        // ===== WINDOW RESIZE HANDLER =====
        // Close dropdowns when resizing from mobile to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1000) {
                // Close all mobile dropdowns when switching to desktop
                document.querySelectorAll('.nav-item-has-children.active').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });
    // Interactive Web Background
class InteractiveWeb {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Add canvas to hero section
        const hero = document.querySelector('.hero');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '0';
        this.canvas.style.pointerEvents = 'none';
        hero.prepend(this.canvas);
        
        // Resize handler
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Mouse move listener
        document.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.createParticles();
    }
    
    createParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(90, 141, 166, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Connect particles within distance
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(90, 141, 166, ${0.2 * (1 - distance/120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
            
            // Connect to mouse
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(90, 141, 166, ${0.3 * (1 - distance/150)})`;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveWeb();
});