const pages = document.querySelectorAll(".page");

function showPage(id) {

    pages.forEach(page => {
        page.classList.remove("active");
        page.scrollTop = 0;
    });

    // Force reflow untuk reset scroll
    void document.body.offsetHeight;

    const target = document.getElementById(id);

    if (!target) return;

    target.classList.add("active");

    target.scrollTop = 0;

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    // =========================
    // FINAL VIDEO
    // MATIKAN BACKGROUND MUSIC
    // =========================

    if (id === "final-video") {

        if (window.BgMusic) {
            window.BgMusic.pause();
        }

        // Update tulisan tombol musik
        const musicButton = document.getElementById("toggleMusicBtn");

        if (musicButton) {
            musicButton.textContent = "🔊 Nyalakan Musik";
        }
    }
}