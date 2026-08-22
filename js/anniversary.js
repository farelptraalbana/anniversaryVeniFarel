// =========================
// NEXT ANNIVERSARY
// Countdown menuju 24 Agustus
// =========================


// =========================
// TARGET TANGGAL
// =========================

// Anniversary berikutnya: 24 Agustus 2026
// Waktu Asia/Jakarta (WIB, UTC+7)
function getNextAnniversary() {

    return new Date('2027-08-24T00:00:00+07:00');

}

let targetDate = getNextAnniversary();


// =========================
// DOM REFS
// =========================

const daysEl = document.getElementById('annivDays');
const hoursEl = document.getElementById('annivHours');
const minsEl = document.getElementById('annivMins');
const secsEl = document.getElementById('annivSecs');


// =========================
// FORMAT ANGKA
// =========================

function pad(num) {
    return String(num).padStart(2, '0');
}


// =========================
// UPDATE COUNTDOWN
// =========================

function updateCountdown() {

    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {

        // Jika sudah sampai, tampilkan 00:00:00:00
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';

        return;

    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Animasi GSAP untuk setiap angka yang berubah
    animateNumber(daysEl, pad(days));
    animateNumber(hoursEl, pad(hours));
    animateNumber(minsEl, pad(minutes));
    animateNumber(secsEl, pad(seconds));

}

let prevValues = { days: '', hours: '', mins: '', secs: '' };

function animateNumber(el, newValue) {

    const key = el.id;

    // Cari key mapping
    let stateKey;
    if (el === daysEl) stateKey = 'days';
    else if (el === hoursEl) stateKey = 'hours';
    else if (el === minsEl) stateKey = 'mins';
    else stateKey = 'secs';

    // Jika berubah, animasi
    if (prevValues[stateKey] !== newValue) {

        // Animate angka keluar
        const span = el.querySelector('.timer-number-span');

        if (span) {
            gsap.fromTo(span,
                { y: 0, opacity: 1, scale: 1 },
                {
                    y: -20,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                    ease: 'power2.in',
                    onComplete: () => {
                        span.textContent = newValue;
                        gsap.fromTo(span,
                            { y: 20, opacity: 0, scale: 0.8 },
                            {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                duration: 0.35,
                                ease: 'back.out(1.7)'
                            }
                        );
                    }
                }
            );
        } else {
            el.textContent = newValue;
        }

        prevValues[stateKey] = newValue;

    }

}


// =========================
// START COUNTDOWN
// =========================

let countdownInterval;

function startCountdown() {

    // Update segera
    updateCountdown();

    // Update setiap detik
    countdownInterval = setInterval(updateCountdown, 1000);

}


// =========================
// TOMBOL LANJUT
// =========================

const annivContinueBtn = document.getElementById('continueToLast');

if (annivContinueBtn) {

    annivContinueBtn.addEventListener('click', () => {

        annivContinueBtn.disabled = true;

        // Hentikan countdown
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        gsap.to('#next-anniversary .anniversary-container', {
            opacity: 0,
            y: -30,
            scale: 0.97,
            duration: 0.8,
            ease: 'power3.in',
            onComplete: () => {

                showPage('one-last-thing');

                // Reset
                gsap.set('#next-anniversary .anniversary-container', {
                    opacity: 1,
                    y: 0,
                    scale: 1
                });

                annivContinueBtn.disabled = false;

            }
        });

    });

}


// =========================
// ANIMASI MASUK HALAMAN
// =========================

const annivObserver = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {

            const el = document.getElementById('next-anniversary');

            if (el && el.classList.contains('active')) {
                animateAnnivEnter();
            }

        }

    });

});

const annivEl = document.getElementById('next-anniversary');

if (annivEl) {

    annivObserver.observe(annivEl, { attributes: true });

}


function animateAnnivEnter() {

    // Reset target date setiap kali masuk
    targetDate = getNextAnniversary();

    // Mulai countdown
    startCountdown();

    // Pastikan container terlihat (aman jika sebelumnya sempat di-opacity 0)
    gsap.set('.anniversary-container', { opacity: 1, y: 0, scale: 1 });

    // Gunakan fromTo dengan nilai akhir eksplisit supaya elemen
    // dijamin tampil meskipun tween terpotong
    const tl = gsap.timeline();

    tl.fromTo('.anniversary-label',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
    )
        .fromTo('.anniversary-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
            '-=0.35'
        )
        .fromTo('.anniversary-sub',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
            '-=0.3'
        )
        .fromTo('.timer-item',
            { opacity: 0, y: 40, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)', clearProps: 'all' },
            '-=0.3'
        )
        .fromTo('.anniversary-date-info',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
            '-=0.4'
        )
        .fromTo('#continueToLast',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
            '-=0.3'
        );

    // Animasi orbit
    gsap.fromTo('.anniversary-orbit',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', clearProps: 'all' }
    );

}

