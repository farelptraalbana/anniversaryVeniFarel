// =========================
// ONE LAST THING...
// Halaman misterius sebelum video final
// =========================


// =========================
// TOMBOL LANJUT
// =========================

const continueToVideo = document.getElementById('continueToVideo');

if (continueToVideo) {

    continueToVideo.addEventListener('click', () => {

        continueToVideo.disabled = true;

        // Animasi keluar — teks memudar
        gsap.to('.lasthing-text', {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power2.in'
        });

        gsap.to('.lasthing-label', {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in'
        });

        gsap.to('.lasthing-divider', {
            opacity: 0,
            scaleX: 0,
            duration: 0.5,
            ease: 'power3.in'
        });

        gsap.to('.lasthing-hint', {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in'
        });

        gsap.to('#continueToVideo', {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.5,
            ease: 'power2.in'
        });

        // Animasi rings melebar
        gsap.to('.lasthing-ring', {
            scale: 2,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.in'
        });

        gsap.to('.lasthing-ring--2', {
            scale: 2.5,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.in'
        });

        gsap.to('.lasthing-ring--3', {
            scale: 3,
            opacity: 0,
            duration: 1.3,
            ease: 'power3.in'
        });

        // Setelah semua selesai, pindah halaman
        gsap.delayedCall(0.9, () => {

            showPage('final-video');

            // Reset untuk kunjungan berikutnya
            gsap.set('.lasthing-text', {
                opacity: 1,
                y: 0
            });

            gsap.set('.lasthing-label', {
                opacity: 1,
                y: 0
            });

            gsap.set('.lasthing-divider', {
                opacity: 1,
                scaleX: 1
            });

            gsap.set('.lasthing-hint', {
                opacity: 1,
                y: 0
            });

            gsap.set('#continueToVideo', {
                opacity: 1,
                y: 0,
                scale: 1
            });

            gsap.set('.lasthing-ring', {
                scale: 1,
                opacity: 1
            });

            continueToVideo.disabled = false;

        });

    });

}


// =========================
// ANIMASI MASUK HALAMAN
// =========================

const lastthingObserver = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {

            const el = document.getElementById('one-last-thing');

            if (el && el.classList.contains('active')) {
                animateLastThingEnter();
            }

        }

    });

});

const lastthingEl = document.getElementById('one-last-thing');

if (lastthingEl) {

    lastthingObserver.observe(lastthingEl, { attributes: true });

}


function animateLastThingEnter() {

    const tl = gsap.timeline();

    // Reset
    tl.set('.lasthing-container > *', {
        opacity: 0,
        y: 30
    });

    tl.set('.lasthing-ring', {
        scale: 0.6,
        opacity: 0
    });

    tl.set('.lasthing-dot', {
        opacity: 0
    });

    // Animasi rings masuk
    tl.to('.lasthing-ring', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
    }, 0);

    tl.to('.lasthing-ring--2', {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out'
    }, 0);

    tl.to('.lasthing-ring--3', {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: 'power3.out'
    }, 0);

    // Animasi konten — pakai fromTo dengan nilai akhir eksplisit
    // supaya elemen dijamin tampil (bukan tersangkut di opacity 0)
    tl.fromTo('.lasthing-label',
        { opacity: 0, y: 20 },
        { opacity: 0.6, y: 0, duration: 0.8, ease: 'power2.out' },
        0.4
    );

    // Pastikan parent .lasthing-text tidak tersangkut di opacity 0
    // (tl.set('.lasthing-container > *') menyetelnya ke 0, dan parent
    // yang opacity 0 akan menyembunyikan children meskipun child sudah
    // di-animasi ke opacity 1)
    tl.fromTo('.lasthing-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.01, ease: 'none' },
        0.6
    );

    // Teks utama — setiap baris
    const textLines = document.querySelectorAll('.lasthing-text .text-line');

    if (textLines.length) {
        tl.fromTo(textLines,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.25, ease: 'power3.out' },
            0.6
        );
    } else {
        tl.fromTo('.lasthing-text',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            0.6
        );
    }

    tl.fromTo('.lasthing-divider',
        { opacity: 0, scaleX: 0 },
        { opacity: 0.5, scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
    );

    tl.fromTo('.lasthing-hint',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
    );

    tl.fromTo('#continueToVideo',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)' },
        '-=0.2'
    );

    // Partikel ambien dengan delay
    gsap.delayedCall(0.3, createLastThingDots);

}


// =========================
// PARTIKEL AMBIEN
// =========================

function createLastThingDots() {

    const container = document.querySelector('.lasthing-dots');

    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 30; i++) {

        const dot = document.createElement('div');
        dot.className = 'lasthing-dot';

        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';

        const size = Math.random() * 2 + 1;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';

        container.appendChild(dot);

        gsap.fromTo(dot,
            { opacity: 0 },
            {
                opacity: Math.random() * 0.5 + 0.1,
                y: -(Math.random() * 80 + 30),
                x: (Math.random() - 0.5) * 40,
                duration: Math.random() * 4 + 3,
                repeat: -1,
                yoyo: true,
                delay: Math.random() * 3,
                ease: 'sine.inOut'
            }
        );

    }

}


// =========================
// KEYBOARD — SPACE / ENTER
// =========================

document.addEventListener('keydown', (e) => {

    const isActive = document
        .getElementById('one-last-thing')
        .classList.contains('active');

    if (!isActive) return;

    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!continueToVideo.disabled) {
            continueToVideo.click();
        }
    }

});


