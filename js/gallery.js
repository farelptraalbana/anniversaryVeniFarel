// =========================
// GALLERY MEMORIES
// Cinematic Photo Slideshow
// =========================


// =========================
// DATA FOTO
// =========================

const galleryData = [
    {
        photo: 'assets/photos/couple.jpeg',
        date: '2024',
        caption: 'Di mana semuanya dimulai.'
    },
    {
        photo: 'assets/photos/first-memory.jpg',
        date: '7 Maret 2024',
        caption: 'Kenangan pertama yang tidak pernah bisa aku lupakan.'
    },
    {
        photo: 'assets/photos/IMG-20250312-WA0023.jpg',
        date: '2024',
        caption: 'Saat-saat sederhana yang terasa begitu berarti.'
    },
    {
        photo: 'assets/photos/IMG_20240625_161533.jpg',
        date: '2024',
        caption: 'Senyum yang selalu membuat hariku lebih cerah.'
    },
    {
        photo: 'assets/photos/memory villa.jpeg',
        date: '2024',
        caption: 'Berdua, dalam setiap cerita.'
    },
    {
        photo: 'assets/photos/B612_20250318_150120_847.jpg',
        date: '2024',
        caption: 'Hari-hari yang terasa lengkap karenamu.'
    }
];


// =========================
// STATE
// =========================

let currentGalleryIndex = 0;
let isAnimating = false;


// =========================
// DOM REFS
// =========================

const galleryPhoto = document.getElementById('galleryPhoto');
const galleryDate = document.getElementById('galleryDate');
const galleryCaption = document.getElementById('galleryCaption');
const galleryCurrent = document.getElementById('galleryCurrent');
const galleryTotal = document.getElementById('galleryTotal');
const galleryDots = document.querySelectorAll('.gallery-dot');
const prevBtn = document.getElementById('prevGallery');
const nextBtn = document.getElementById('nextGallery');

galleryTotal.textContent = String(galleryData.length).padStart(2, '0');


// =========================
// UPDATE FOTO
// =========================

function updateGallery(index, direction) {

    if (isAnimating) return;
    isAnimating = true;

    const data = galleryData[index];

    // Animasi keluar — foto saat ini
    gsap.to(galleryPhoto, {
        scale: direction === 'next' ? 1.15 : 0.85,
        opacity: 0,
        rotation: direction === 'next' ? 4 : -4,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {

            // Ganti konten
            galleryPhoto.src = data.photo;
            galleryDate.textContent = data.date;
            galleryCaption.textContent = data.caption;
            galleryCurrent.textContent = String(index + 1).padStart(2, '0');

            // Update dots
            galleryDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Reset photo sebelum animasi masuk
            gsap.set(galleryPhoto, {
                rotation: direction === 'next' ? -4 : 4
            });

            // Animasi masuk — foto baru
            gsap.fromTo(galleryPhoto,
                {
                    scale: direction === 'next' ? 0.85 : 1.15,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.9,
                    ease: 'power4.out'
                }
            );

            // Animasi info — date + caption
            gsap.fromTo(
                [galleryDate, galleryCaption],
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power2.out',
                    delay: 0.35
                }
            );

            updateButtons();
            isAnimating = false;

        }
    });

}


// =========================
// STATE TOMBOL
// =========================

function updateButtons() {

    const atStart = currentGalleryIndex === 0;
    const atEnd = currentGalleryIndex === galleryData.length - 1;

    prevBtn.style.opacity = atStart ? '0.25' : '1';
    prevBtn.style.pointerEvents = atStart ? 'none' : 'auto';
    prevBtn.style.cursor = atStart ? 'default' : 'pointer';

    nextBtn.style.opacity = atEnd ? '0.25' : '1';
    nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
    nextBtn.style.cursor = atEnd ? 'default' : 'pointer';

}


// =========================
// EVENT LISTENERS
// =========================

prevBtn.addEventListener('click', () => {
    if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        updateGallery(currentGalleryIndex, 'prev');
    }
});

nextBtn.addEventListener('click', () => {
    if (currentGalleryIndex < galleryData.length - 1) {
        currentGalleryIndex++;
        updateGallery(currentGalleryIndex, 'next');
    }
});

// Navigasi via dot
galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === currentGalleryIndex || isAnimating) return;
        const direction = index > currentGalleryIndex ? 'next' : 'prev';
        currentGalleryIndex = index;
        updateGallery(currentGalleryIndex, direction);
    });
});

// Keyboard ← →
document.addEventListener('keydown', (e) => {

    const isActive = document
        .getElementById('gallery')
        .classList.contains('active');

    if (!isActive) return;

    if (e.key === 'ArrowLeft' && currentGalleryIndex > 0) {
        currentGalleryIndex--;
        updateGallery(currentGalleryIndex, 'prev');
    } else if (e.key === 'ArrowRight' && currentGalleryIndex < galleryData.length - 1) {
        currentGalleryIndex++;
        updateGallery(currentGalleryIndex, 'next');
    }

});


// =========================
// TOMBOL LANJUT
// =========================

const galleryContinueBtn = document.getElementById('continueToNext');

galleryContinueBtn.addEventListener('click', () => {

    galleryContinueBtn.disabled = true;

    gsap.to('#gallery .gallery-container', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.in',
        onComplete: () => {

            showPage('next-anniversary');

            // Reset untuk kunjungan berikutnya
            gsap.set('#gallery .gallery-container', {
                opacity: 1,
                y: 0
            });

            galleryContinueBtn.disabled = false;

        }
    });

});


// =========================
// ANIMASI MASUK HALAMAN
// =========================

const galleryObserver = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {

            const el = document.getElementById('gallery');

            if (el.classList.contains('active')) {
                animateGalleryEnter();
            }

        }

    });

});

galleryObserver.observe(
    document.getElementById('gallery'),
    { attributes: true }
);


function animateGalleryEnter() {

    // Hapus floating hearts dari letter section
    const hearts = document.querySelectorAll('.letter-hearts');
    hearts.forEach(el => el.remove());

    // Pastikan container terlihat (aman jika sebelumnya sempat di-opacity 0)
    gsap.set('.gallery-container', { opacity: 1, y: 0 });

    // Mulai animasi — gunakan fromTo dengan nilai akhir eksplisit
    // supaya elemen dijamin tampil meskipun tween terpotong
    gsap.fromTo('.gallery-label',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
    );
    gsap.fromTo('.gallery-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1, clearProps: 'all' }
    );
    gsap.fromTo('.gallery-showcase',
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.15, clearProps: 'all' }
    );
    gsap.fromTo('.gallery-info',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.25, clearProps: 'all' }
    );
    gsap.fromTo('.gallery-nav',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3, clearProps: 'all' }
    );
    gsap.fromTo('#continueToNext',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35, clearProps: 'all' }
    );

    createGalleryParticles();

}


// =========================
// PARTIKEL AMBIEN
// =========================

function createGalleryParticles() {

    const container = document.querySelector('.gallery-particles');

    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 25; i++) {

        const particle = document.createElement('div');
        particle.className = 'gallery-particle';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        container.appendChild(particle);

        gsap.to(particle, {
            y: -(Math.random() * 120 + 40),
            x: (Math.random() - 0.5) * 60,
            opacity: 0,
            duration: Math.random() * 5 + 3,
            repeat: -1,
            delay: Math.random() * 4,
            ease: 'sine.inOut'
        });

    }

}


// =========================
// INISIALISASI
// =========================

updateButtons();
