const continueGallery =
document.getElementById("continueGallery");

continueGallery.addEventListener("click",()=>{

    continueGallery.disabled = true;

    gsap.to(".dream-container",{

        opacity:0,

        scale:.95,

        duration:.8,

        ease:"power3.in",

        onComplete:()=>{

            showPage("gallery");

            // Reset untuk kunjungan berikutnya
            gsap.set(".dream-container",{
                opacity:1,
                scale:1
            });

            continueGallery.disabled = false;

        }

    });

});


// =========================
// ANIMASI MASUK HALAMAN
// (pola MutationObserver sama seperti section lain)
// =========================

const dreamObserver = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {

            const el = document.getElementById('dream-together');

            if (el && el.classList.contains('active')) {
                animateDreamEnter();
            }

        }

    });

});

const dreamEl = document.getElementById('dream-together');

if (dreamEl) {
    dreamObserver.observe(dreamEl, { attributes: true });
}


function animateDreamEnter() {

    // Pastikan container terlihat (aman jika sebelumnya sempat di-opacity 0)
    gsap.set('.dream-container', { opacity: 1, y: 0, scale: 1 });

    const tl = gsap.timeline();

    tl.fromTo('.dream-label',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
    )
    .fromTo('.dream-container h2',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.35'
    )
    .fromTo('.dream-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
    )
    .fromTo('.dream-card',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all' },
        '-=0.2'
    )
    .fromTo('#continueGallery',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
    );

}
