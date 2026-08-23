// =========================
// BACKGROUND MUSIC
// =========================

(function () {

    const bgMusic = document.getElementById('bgMusic');

    if (!bgMusic) return;

    // =========================
    // CONFIG
    // =========================

    bgMusic.loop = true;
    bgMusic.preload = 'auto';

    // =========================
    // PLAY MUSIC
    // =========================

    function playMusic() {

        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {
                // Browser memblokir autoplay.
                // Akan dicoba lagi saat user berinteraksi.
            });

        }
    }

    // =========================
    // PAUSE MUSIC
    // =========================

    function pauseMusic() {
        bgMusic.pause();
    }

    // =========================
    // TOGGLE MUSIC
    // =========================

    function toggleMusic() {

        if (bgMusic.paused) {

            playMusic();

            return true;

        } else {

            pauseMusic();

            return false;

        }
    }

    // =========================
    // AUTOPLAY
    // =========================

    function tryAutoplay() {

        if (bgMusic.paused) {
            playMusic();
        }

    }

    // Coba saat DOM siap
    if (document.readyState === 'loading') {

        document.addEventListener(
            'DOMContentLoaded',
            tryAutoplay,
            { once: true }
        );

    } else {

        tryAutoplay();

    }

    // =========================
    // FALLBACK MOBILE
    // =========================
    // Jika autoplay diblokir HP,
    // musik mulai saat user pertama kali
    // menyentuh layar / klik.

    function startMusicFromInteraction() {

        if (!bgMusic.paused) {

            removeInteractionListeners();

            return;

        }

        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    removeInteractionListeners();

                })
                .catch(() => {

                    // Jangan hapus listener.
                    // Coba lagi pada interaksi berikutnya.

                });

        } else {

            removeInteractionListeners();

        }

    }

    function removeInteractionListeners() {

        document.removeEventListener(
            'click',
            startMusicFromInteraction
        );

        document.removeEventListener(
            'touchstart',
            startMusicFromInteraction
        );

        document.removeEventListener(
            'pointerdown',
            startMusicFromInteraction
        );

    }

    document.addEventListener(
        'click',
        startMusicFromInteraction
    );

    document.addEventListener(
        'touchstart',
        startMusicFromInteraction,
        { passive: true }
    );

    document.addEventListener(
        'pointerdown',
        startMusicFromInteraction
    );

    // =========================
    // GLOBAL API
    // =========================

    window.BgMusic = {

        play: playMusic,

        pause: pauseMusic,

        toggle: toggleMusic,

        isPlaying: () => !bgMusic.paused

    };

})();