// Animate .intropic cards on scroll
document.addEventListener("DOMContentLoaded", function () {
    const intropicEls = document.querySelectorAll('.intropic');
    const availImgs = document.querySelectorAll('.available img');

    function animateOnScroll(elements) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        elements.forEach(el => observer.observe(el));
    }

    animateOnScroll(intropicEls);
    animateOnScroll(availImgs);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Search bar animation (optional)
    const searchForm = document.querySelector('.nav-search');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Search functionality is not implemented yet.');
        });
    }
});