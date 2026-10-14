const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
if (menuToggle && navPanel) {
    menuToggle.addEventListener('click', () => {
        const open = navPanel.classList.toggle('open');
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
    });
    navPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        navPanel.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }));
}

const progress = document.querySelector('.progress span');
const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: .12 });
    revealItems.forEach(item => revealObserver.observe(item));
}

const counters = document.querySelectorAll('[data-count]');
const animateCounter = el => {
    const target = Number(el.dataset.count || 0);
    if (reducedMotion) { el.textContent = target.toLocaleString(); return; }
    const started = performance.now();
    const tick = now => {
        const progressValue = Math.min((now - started) / 1200, 1);
        const eased = 1 - Math.pow(1 - progressValue, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (progressValue < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
        });
    }, { threshold: .65 });
    counters.forEach(counter => counterObserver.observe(counter));
}

const pricingData = {
    monthly: { basic: '$59', standard: '$89', premium: '$129', suffix: '/ month' },
    yearly: { basic: '$49', standard: '$74', premium: '$109', suffix: '/ month · billed yearly' }
};
const updatePricing = mode => {
    const data = pricingData[mode];
    document.querySelectorAll('[data-price]').forEach(price => { price.textContent = data[price.dataset.price]; });
    document.querySelectorAll('[data-price-suffix]').forEach(suffix => { suffix.textContent = data.suffix; });
};
document.querySelectorAll('.toggle').forEach(toggle => toggle.addEventListener('click', () => {
    document.querySelectorAll('.toggle').forEach(item => item.classList.remove('active'));
    toggle.classList.add('active');
    updatePricing(toggle.dataset.mode);
}));

const reviews = [
    { quote: 'The team is always on time, thoughtful with our home, and incredibly thorough. We finally have a cleaning routine we can rely on.', name: 'Emily Johnson', role: 'Weekly home client', image: 'images/Image (7).png' },
    { quote: 'Our office feels noticeably better after every visit. The communication is excellent and the quality is consistent.', name: 'Michael Chen', role: 'Office manager', image: 'images/Image (8).png' },
    { quote: 'We booked a deep clean before moving in and the result was outstanding. Professional, friendly, and worth every penny.', name: 'Lisa Williams', role: 'Move-in cleaning client', image: 'images/Image (9).png' }
];
let reviewIndex = 0;
const renderReview = () => {
    const review = reviews[reviewIndex];
    const quote = document.querySelector('[data-review-quote]');
    const name = document.querySelector('[data-review-name]');
    const role = document.querySelector('[data-review-role]');
    const image = document.querySelector('[data-review-image]');
    if (quote) quote.textContent = `“${review.quote}”`;
    if (name) name.textContent = review.name;
    if (role) role.textContent = review.role;
    if (image) image.src = review.image;
};
document.querySelector('[data-review-next]')?.addEventListener('click', () => { reviewIndex = (reviewIndex + 1) % reviews.length; renderReview(); });
document.querySelector('[data-review-prev]')?.addEventListener('click', () => { reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length; renderReview(); });

 document.querySelectorAll('.faq-question').forEach(question => question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const open = item.classList.toggle('open');
    question.setAttribute('aria-expanded', String(open));
}));

const bookingForm = document.querySelector('.booking-form');
bookingForm?.addEventListener('submit', event => {
    event.preventDefault();
    const status = bookingForm.querySelector('.form-status');
    if (status) status.textContent = 'Thanks — your request is ready for our team to confirm.';
    bookingForm.reset();
});

document.querySelectorAll('[data-year]').forEach(item => { item.textContent = new Date().getFullYear(); });
