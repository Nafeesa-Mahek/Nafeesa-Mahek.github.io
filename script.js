document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
        });
    }

    // Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Animations (Fade in on scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate progress bars if they exist in this section
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                if (progressBars.length > 0) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('style').match(/--target-width:\s*([^;]+)/);
                        if (targetWidth && targetWidth[1]) {
                            bar.style.width = targetWidth[1];
                        }
                    });
                }
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-anim');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // Generate Dot Matrix in Hero Section
    const dotMatrix = document.getElementById('dotMatrix');
    if (dotMatrix) {
        // Create 12x12 grid (144 dots)
        for (let i = 0; i < 144; i++) {
            const dot = document.createElement('div');
            dot.className = 'matrix-dot';
            dotMatrix.appendChild(dot);
        }

        // Randomly color some dots on load and interaction
        const dots = document.querySelectorAll('.matrix-dot');
        const colors = ['#a855f7', '#ec4899', '#8b5cf6', '#d946ef', '#e5e7eb']; // Mostly purple/pink and default grey

        const animateDots = () => {
            dots.forEach(dot => {
                if(Math.random() > 0.85) {
                    dot.style.backgroundColor = colors[Math.floor(Math.random() * (colors.length - 1))];
                } else {
                    dot.style.backgroundColor = '#e5e7eb';
                }
            });
        };

        // Initial animation
        setTimeout(animateDots, 500);

        // Hover effect for matrix
        dotMatrix.addEventListener('mousemove', (e) => {
            const target = e.target;
            if (target.classList.contains('matrix-dot')) {
                target.style.backgroundColor = colors[Math.floor(Math.random() * (colors.length - 1))];
                
                // Reset after a while
                setTimeout(() => {
                    target.style.backgroundColor = '#e5e7eb';
                }, 1500);
            }
        });
    }
});
