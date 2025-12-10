// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Full Stack Developer',
    'Web Designer',
    'Problem Solver',
    'Creative Thinker'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500; // Pause before typing next
    }
    
    setTimeout(typeText, typingDelay);
}

// Start typing animation
setTimeout(typeText, 1000);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ==================== MOBILE MENU ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScroll = currentScroll;
});

// ==================== STATS COUNTER ANIMATION ====================
const statValues = document.querySelectorAll('.stat-value');
let countersStarted = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

function checkCounters() {
    const statsSection = document.querySelector('.contributions-stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible && !countersStarted) {
        countersStarted = true;
        statValues.forEach(stat => animateCounter(stat));
    }
}

window.addEventListener('scroll', checkCounters);
checkCounters(); // Check on load

// ==================== GITHUB CONTRIBUTION GRAPH ====================
function generateGitHubGraph() {
    const graphContainer = document.getElementById('github-graph');
    if (!graphContainer) return;
    
    const grid = document.createElement('div');
    grid.className = 'graph-grid';
    
    // Generate 52 weeks * 7 days = 364 cells
    const weeks = 52;
    const daysPerWeek = 7;
    
    for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < daysPerWeek; day++) {
            const cell = document.createElement('div');
            cell.className = 'graph-cell';
            
            // Generate random contribution level (0-4)
            // In a real implementation, this would come from GitHub API
            const level = Math.floor(Math.random() * 5);
            cell.classList.add(`level-${level}`);
            
            // Add tooltip (optional)
            const contributions = level === 0 ? 0 : Math.floor(Math.random() * 10) + level * 3;
            const date = new Date();
            date.setDate(date.getDate() - ((weeks - week) * 7 + (daysPerWeek - day)));
            
            cell.setAttribute('data-tooltip', `${contributions} contributions on ${date.toLocaleDateString()}`);
            cell.setAttribute('data-level', level);
            
            grid.appendChild(cell);
        }
    }
    
    graphContainer.appendChild(grid);
    
    // Add hover effect with tooltip (basic implementation)
    const cells = graphContainer.querySelectorAll('.graph-cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            // You can add a custom tooltip element here
            this.setAttribute('title', tooltip);
        });
    });
}

// Generate the graph on page load
generateGitHubGraph();

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ==================== SCROLL REVEAL ANIMATIONS ====================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.about-text, .about-image, .contributions-graph');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal elements
document.querySelectorAll('.about-text, .about-image, .contributions-graph').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on load

// ==================== ENHANCED GITHUB GRAPH WITH REAL DATA STRUCTURE ====================
// This function creates a more realistic contribution pattern
function generateRealisticContributions() {
    const graphContainer = document.getElementById('github-graph');
    if (!graphContainer || graphContainer.children.length > 0) return;
    
    const grid = document.createElement('div');
    grid.className = 'graph-grid';
    
    // Create a pattern that looks more realistic
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // 52 weeks back
    
    // Create contribution pattern (more active on weekdays)
    for (let i = 0; i < 364; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        const cell = document.createElement('div');
        cell.className = 'graph-cell';
        
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        // Generate more realistic contribution levels
        let level;
        const random = Math.random();
        
        if (isWeekend) {
            // Less activity on weekends
            if (random < 0.5) level = 0;
            else if (random < 0.75) level = 1;
            else if (random < 0.9) level = 2;
            else level = 3;
        } else {
            // More activity on weekdays
            if (random < 0.2) level = 0;
            else if (random < 0.4) level = 1;
            else if (random < 0.6) level = 2;
            else if (random < 0.85) level = 3;
            else level = 4;
        }
        
        cell.classList.add(`level-${level}`);
        
        const contributions = level === 0 ? 0 : Math.floor(Math.random() * 5) + level * 2;
        cell.setAttribute('title', `${contributions} contributions on ${currentDate.toLocaleDateString('it-IT')}`);
        cell.setAttribute('data-date', currentDate.toISOString().split('T')[0]);
        cell.setAttribute('data-count', contributions);
        
        grid.appendChild(cell);
    }
    
    graphContainer.appendChild(grid);
}

// Generate realistic graph
generateRealisticContributions();

// ==================== PARALLAX EFFECT ON HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== CURSOR TRAIL EFFECT (Optional Enhancement) ====================
// Uncomment if you want a subtle cursor trail effect
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach((circle, index) => {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(setActiveNavLink));

// ==================== LAZY LOADING IMAGES ====================
// If you add real images later, this will help with performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🚀 Portfolio loaded successfully!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%c💼 Interested in the code? Check out the repository!', 'color: #60a5fa; font-size: 14px;');

// ==================== PREVENT CONSOLE ERRORS ====================
// Add error handling for missing elements
if (!document.getElementById('github-graph')) {
    console.warn('GitHub graph container not found');
}

// ==================== UTILITY FUNCTIONS ====================
// Get query parameter (useful for tracking/analytics)
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Copy to clipboard function (useful for email/contact buttons)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add skip to main content link functionality
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main') || document.querySelector('.hero');
        if (main) {
            main.tabIndex = -1;
            main.focus();
        }
    });
}

// Announce page changes for screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ==================== LOAD COMPLETE ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✅ All resources loaded', 'color: #10b981; font-size: 12px;');
});
