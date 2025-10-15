// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to martyrs section
    window.scrollToMartyrs = function() {
        const martyrsSection = document.getElementById('martyrs');
        if (martyrsSection) {
            martyrsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.martyr-card, .timeline-item');
    animateElements.forEach(el => observer.observe(el));

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(17, 17, 17, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(17, 17, 17, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Create success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.textContent = 'تم إرسال رسالتك بنجاح ❤️ شكراً لتواصلك معنا.';
                
                // Style the message
                Object.assign(successMessage.style, {
                    padding: '15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '5px',
                    marginTop: '20px',
                    textAlign: 'center',
                    opacity: '0',
                    transition: 'opacity 0.5s'
                });
                
                // Insert message and show it
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                setTimeout(() => successMessage.style.opacity = '1', 10);
                
                // Reset form
                contactForm.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);
            } else {
                // Create error message element
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.textContent = 'يرجى ملء جميع الحقول المطلوبة.';
                
                // Style the message
                Object.assign(errorMessage.style, {
                    padding: '15px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    borderRadius: '5px',
                    marginTop: '20px',
                    textAlign: 'center',
                    opacity: '0',
                    transition: 'opacity 0.5s'
                });

                // Insert message and show it
                contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
                setTimeout(() => errorMessage.style.opacity = '1', 10);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => errorMessage.remove(), 500);
                }, 3000);
            }
        });
    }

    // Add parallax effect to hero section (optimized)
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            ticking = false;
        }
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Add typing effect to hero title (with check)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            Object.assign(ripple.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.5)',
                transform: 'scale(0)',
                animation: 'ripple-animation 0.6s ease-out'
            });
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        button { position: relative; overflow: hidden; }
        @keyframes ripple-animation {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Console message
    console.log('%cشهداء فلسطين - لن ننسى', 'color: #D62828; font-size: 24px; font-weight: bold;');
    console.log('%cفلسطين حرة وعربية', 'color: #004E23; font-size: 18px;');
});