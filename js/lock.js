// =========================
// LOCK SCREEN
// Verifikasi dua langkah sebelum masuk
// =========================

(function () {

    // =========================
    // STATE
    // =========================
    let currentStep = 1; // 1 = tanggal, 2 = jam
    let isSubmitting = false;

    // =========================
    // JAWABAN BENAR
    // =========================
    const ANSWERS = {
        date: '24/08/2024',
        time: '08.24'
    };

    // =========================
    // DOM REFS
    // =========================
    const lockScreen = document.getElementById('lockScreen');
    const questionEl = document.getElementById('lockQuestion');
    const inputEl = document.getElementById('lockInput');
    const submitBtn = document.getElementById('lockSubmit');
    const stepDots = document.querySelectorAll('.lock-step');
    const lockIcon = document.querySelector('.lock-icon');
    const lockForm = document.getElementById('lockForm');
    const lockFormWrap = document.getElementById('lockFormWrap');
    const lockSuccess = document.getElementById('lockSuccess');

    // Popup
    const popupOverlay = document.getElementById('lockPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupText = document.getElementById('popupText');
    const popupBtn = document.getElementById('popupBtn');

    // =========================
    // FLOATING HEARTS
    // =========================
    function createHearts() {
        const container = document.querySelector('.lock-hearts');
        if (!container) return;
        const symbols = ['♥', '♡', '❤️'];
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('span');
            heart.className = 'lock-heart';
            heart.textContent = symbols[i % symbols.length];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 12 + 14) + 'px';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
            container.appendChild(heart);
        }
    }

    // =========================
    // SHOW QUESTION
    // =========================
    function showStep(step) {
        currentStep = step;

        // Update step dots
        stepDots.forEach((dot, i) => {
            dot.classList.remove('active', 'done');
            if (i + 1 === step) dot.classList.add('active');
            else if (i + 1 < step) dot.classList.add('done');
        });

        // Update question & placeholder
        if (step === 1) {
            questionEl.textContent = 'Masukkan Tanggal Jadian Veni dan Farel';
            inputEl.placeholder = 'DD/MM/YYYY';
            inputEl.value = '';
            inputEl.focus();
        } else if (step === 2) {
            questionEl.textContent = 'Jam Berapa Farel Tembak?';
            inputEl.placeholder = 'HH.MM';
            inputEl.value = '';
            inputEl.focus();
        }

        // Reset input state
        inputEl.classList.remove('error');
        submitBtn.disabled = false;
        isSubmitting = false;
    }

    // =========================
    // SHOW ERROR POPUP
    // =========================
    function showError(message) {
        popupTitle.innerHTML = '❌ <span>Kurang Tepat</span>';
        popupText.textContent = message;
        popupOverlay.classList.add('show');

        // Shake icon
        lockIcon.classList.add('error');
        setTimeout(() => lockIcon.classList.remove('error'), 500);
    }

    // =========================
    // VERIFIKASI
    // =========================
    function handleSubmit() {
        if (isSubmitting) return;
        isSubmitting = true;

        const value = inputEl.value.trim();

        if (currentStep === 1) {
            // Cek tanggal
            if (value === ANSWERS.date) {
                // Benar → lanjut step 2
                inputEl.classList.remove('error');
                showStep(2);
                isSubmitting = false;
            } else {
                // Salah
                inputEl.classList.add('error');
                showError('Tanggal yang kamu masukkan belum tepat. Coba ingat-ingat lagi ya... 💭');
                submitBtn.disabled = false;
                isSubmitting = false;
            }
        } else if (currentStep === 2) {
            // Cek jam
            if (value === ANSWERS.time) {
                // Benar semua → unlock
                inputEl.classList.remove('error');
                unlockScreen();
                isSubmitting = false;
            } else {
                // Salah
                inputEl.classList.add('error');
                showError('Waktunya belum tepat. Coba ingat lagi jam berapa Farel menyatakan cinta... ⏰');
                submitBtn.disabled = false;
                isSubmitting = false;
            }
        }
    }

    // =========================
    // UNLOCK
    // =========================
    function unlockScreen() {
        // Sembunyikan form
        lockFormWrap.style.display = 'none';

        // Tampilkan sukses
        lockSuccess.classList.add('show');

        // Tunggu sebentar, lalu fade out lock screen
        setTimeout(() => {
            gsap.to('#lockScreen', {
                opacity: 0,
                scale: 1.05,
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => {
                    lockScreen.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }, 1200);
    }

    // =========================
    // RESET — TAMPILKAN KEMBALI LOCK SCREEN
    // (dipanggil dari tombol "Kembali ke Awal")
    // =========================
    function resetScreen() {
        // Reset state
        currentStep = 1;
        isSubmitting = false;

        // Tampilkan kembali form, sembunyikan sukses
        lockFormWrap.style.display = '';
        lockSuccess.classList.remove('show');

        // Reset ikon kunci
        lockIcon.classList.remove('unlocked', 'error');

        // Reset popup
        popupOverlay.classList.remove('show');

        // Tampilkan lock screen
        lockScreen.style.display = 'flex';
        gsap.set('#lockScreen', { opacity: 1, scale: 1 });

        // Kunci scroll body
        document.body.style.overflow = 'hidden';

        // Kembali ke pertanyaan tanggal jadian
        showStep(1);
    }

    // =========================
    // POPUP CLOSE
    // =========================
    popupBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('show');
        // Kembali fokus ke input
        setTimeout(() => inputEl.focus(), 300);
    });

    // =========================
    // EVENT LISTENERS
    // =========================
    submitBtn.addEventListener('click', handleSubmit);

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    });

    // Format input: otomatis tambah slash atau dot
    inputEl.addEventListener('input', (e) => {
        inputEl.classList.remove('error');
    });

    // =========================
    // INIT
    // =========================
    createHearts();
    showStep(1);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Animasi masuk
    gsap.from('.lock-card', {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.lock-icon-wrapper', {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.2
    });

    // =========================
    // EXPOSE API GLOBAL
    // =========================
    window.LockScreen = {
        reset: resetScreen
    };

})();
