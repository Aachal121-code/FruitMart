// --- Review Carousel Data & Rendering ---
const reviews = [
    {
        name: "Priya S.",
        text: "Absolutely fresh and delicious fruits! Delivery was super quick and the packaging was eco-friendly. Highly recommended.",
        stars: 4.5
    },
    {
        name: "Rahul M.",
        text: "The organic fruit box is a must-try. My kids love the taste and I love the quality!",
        stars: 5
    },
    {
        name: "Sneha K.",
        text: "Great offers and friendly customer support. FruitMart is my go-to for healthy snacking.",
        stars: 4
    },
    {
        name: "Amit P.",
        text: "Loved the Sunday special! Got double the fruits for my family. Will order again.",
        stars: 5
    },
    {
        name: "Meera D.",
        text: "Easy to order and the fruits are always fresh. The organic box is my favorite.",
        stars: 4.5
    },
    {
        name: "Vikram S.",
        text: "Fast delivery and great quality. The discounts make it even better.",
        stars: 4
    }
];

function renderStars(starCount) {
    let html = '';
    let full = Math.floor(starCount);
    let half = starCount % 1 >= 0.5;
    for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
    if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    for (let i = full + half; i < 5; i++) html += '<i class="fa-regular fa-star"></i>';
    return html;
}

function renderReviews() {
    const carousel = document.getElementById('testimonial-carousel');
    carousel.innerHTML = '';
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = `
            <i class="fa-solid fa-quote-left"></i>
            <p>${review.text}</p>
            <div class="stars">${renderStars(review.stars)}</div>
            <div class="customer">${review.name}</div>
        `;
        carousel.appendChild(div);
    });
}
renderReviews();

// --- Carousel Scroll Buttons ---
const carousel = document.getElementById('testimonial-carousel');
document.querySelector('.carousel-btn.left').onclick = () => {
    carousel.scrollBy({ left: -320, behavior: 'smooth' });
};
document.querySelector('.carousel-btn.right').onclick = () => {
    carousel.scrollBy({ left: 320, behavior: 'smooth' });
};

// --- Star Rating Input Logic ---
let selectedRating = 0;
const starEls = document.querySelectorAll('.star-rating-input .stars i');

starEls.forEach(star => {
    star.addEventListener('mouseenter', function () {
        fillStars(this.dataset.value);
    });
    star.addEventListener('mouseleave', function () {
        fillStars(selectedRating);
    });
    star.addEventListener('click', function () {
        const value = Number(this.dataset.value);
        if (selectedRating === value) {
            selectedRating = 0;
        } else {
            selectedRating = value;
        }
        fillStars(selectedRating);
    });
});

function fillStars(rating) {
    starEls.forEach(star => {
        if (Number(star.dataset.value) <= rating) {
            star.classList.remove('fa-regular');
            star.classList.add('fa-solid');
            star.style.color = '#ffc107';
        } else {
            star.classList.remove('fa-solid');
            star.classList.add('fa-regular');
            star.style.color = '';
        }
    });
}

// --- Add Review Form Logic ---
document.getElementById('review-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('reviewer-name').value.trim();
    const email = document.getElementById('reviewer-email').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const stars = Number(selectedRating);

    if (!name || !email || !text || !stars) {
        alert('Please fill all fields and select a rating.');
        return;
    }
    reviews.unshift({
        name: name,
        text: text,
        stars: stars
    });
    renderReviews();
    this.reset();
    selectedRating = 0;
    highlightStars(0);
    alert('Thank you for your review!');
});

// --- FAQ Accordion ---
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', function () {
        const item = this.parentElement;
        item.classList.toggle('active');
    });
});

// --- Newsletter Fake Submit ---
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
});

// --- Animate .intropic and .available img on scroll (optional) ---
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