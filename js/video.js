// =========================
// FINAL VIDEO
// Halaman penutup — video cerita kita
// =========================


// =========================
// DOM REFS
// =========================

const storyVideo = document.getElementById('storyVideo');
const replayVideoBtn = document.getElementById('replayVideo');
const finishStoryBtn = document.getElementById('finishStory');


// =========================
// REPLAY VIDEO
// =========================

if (replayVideoBtn) {

    replayVideoBtn.addEventListener('click', () => {

        if (!storyVideo) return;

        storyVideo.currentTime = 0;

        storyVideo.play().catch(() => {
            // Autoplay diblokir browser — user cukup tekan play pada video
        });

    });

}


// =========================
// SELESAI — KEMBALI KE AWAL (HERO)
// =========================

if (finishStoryBtn) {

    finishStoryBtn.addEventListener('click', () => {

        finishStoryBtn.disabled = true;

        // =========================
        // HIDUPKAN KEMBALI MUSIC
        // =========================

        if (window.BgMusic) {
            window.BgMusic.play();
        }

        // =========================
        // HENTIKAN VIDEO
        // =========================

        if (storyVideo) {
            storyVideo.pause();
        }

        // =========================
        // ANIMASI KELUAR
        // =========================

        gsap.to('#final-video .video-container', {

            opacity: 0,
            y: -30,
            scale: 0.97,
            duration: 0.8,
            ease: 'power3.in',

            onComplete: () => {

                // Reset untuk kunjungan berikutnya
                gsap.set('#final-video .video-container', {
                    opacity: 1,
                    y: 0,
                    scale: 1
                });

                // Buka SECRET ENDING
                if (
                    window.SecretEnding &&
                    typeof window.SecretEnding.open === 'function'
                ) {

                    window.SecretEnding.open();

                } else {

                    // Fallback: kembali ke halaman awal
                    showPage('hero');

                    finishStoryBtn.disabled = false;
                }
            }
        });
    });
}


// =========================
// ANIMASI MASUK HALAMAN
// =========================

const videoObserver = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {

            const el = document.getElementById('final-video');

            if (el && el.classList.contains('active')) {
                animateVideoEnter();
            }

        }

    });

});

const videoEl = document.getElementById('final-video');

if (videoEl) {

    videoObserver.observe(videoEl, { attributes: true });

}


function animateVideoEnter() {

    // Pastikan container terlihat (aman jika sebelumnya sempat di-opacity 0)
    gsap.set('.video-container', { opacity: 1, y: 0, scale: 1 });

    const tl = gsap.timeline();

    tl.fromTo('.video-label',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
    )
    .fromTo('.video-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.35'
    )
    .fromTo('.video-wrapper',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', clearProps: 'all' },
        '-=0.2'
    )
    .fromTo('.video-caption',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
    )
    .fromTo('.video-btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
    );

}


// =========================
// PAUSE VIDEO SAAT PINDAH HALAMAN
// (jika user kembali ke hero, video tidak terus berbunyi)
// =========================

document.addEventListener('keydown', (e) => {

    const isActive = document
        .getElementById('final-video')
        .classList.contains('active');

    if (!isActive) return;

    if (e.key === 'Escape') {
        if (storyVideo) storyVideo.pause();
    }

});

