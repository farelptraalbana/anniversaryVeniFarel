// =========================
// BACKGROUND MUSIC
// Autoplay saat web dibuka, lalu diulang otomatis dari awal
// setelah lagu selesai (looping playback).
// =========================

(function () {

    const bgMusic = document.getElementById('bgMusic');

    if (!bgMusic) return;

    // Pastikan looping playback: begitu lagu habis, putar ulang dari awal.
    // (atribut "loop" di HTML sudah menangani ini, tapi kita tambahkan
    // fallback manual agar tetap aman di browser yang kurang konsisten)
    bgMusic.loop = true;

    bgMusic.addEventListener('ended', () => {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
    });

    // =========================
    // AUTOPLAY
    // =========================
    function tryPlayMusic() {
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay diblokir browser (butuh interaksi user dulu).
                // Musik akan otomatis diputar begitu user berinteraksi
                // pertama kali dengan halaman (lihat listener di bawah).
            });
        }
    }

    // Coba putar otomatis begitu halaman siap
    document.addEventListener('DOMContentLoaded', tryPlayMusic);

    // Jika DOMContentLoaded sudah lewat (script dimuat belakangan),
    // langsung coba mainkan
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        tryPlayMusic();
    }

    // =========================
    // FALLBACK: MULAI SAAT INTERAKSI PERTAMA
    // (mengatasi kebijakan autoplay browser yang memblokir suara
    // sebelum ada interaksi dari user)
    // =========================
    function startOnFirstInteraction() {
        if (!bgMusic.paused) {
            removeInteractionListeners();
            return;
        }

        bgMusic.play().catch(() => {});
        removeInteractionListeners();
    }

    function removeInteractionListeners() {
        document.removeEventListener('click', startOnFirstInteraction);
        document.removeEventListener('keydown', startOnFirstInteraction);
        document.removeEventListener('touchstart', startOnFirstInteraction);
    }

    document.addEventListener('click', startOnFirstInteraction);
    document.addEventListener('keydown', startOnFirstInteraction);
    document.addEventListener('touchstart', startOnFirstInteraction);

    // =========================
    // API GLOBAL
    // Dipakai halaman lain (mis. final-video) untuk
    // mematikan/menyalakan musik secara manual.
    // =========================
    function playMusic() {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
    }

    function pauseMusic() {
        bgMusic.pause();
    }

    function toggleMusic() {
        if (bgMusic.paused) {
            playMusic();
            return true; // sedang bermain
        }
        pauseMusic();
        return false; // sedang dimatikan
    }

    window.BgMusic = {
        play: playMusic,
        pause: pauseMusic,
        toggle: toggleMusic,
        isPlaying: () => !bgMusic.paused
    };

})();
