const openCounterButton = document.getElementById("openCounter");

// Membuka halaman First Chapter
function openFirstChapter() {

    // Pindah halaman menggunakan Page Manager
    showPage("first-chapter");

    // Animasi masuk
    const chapterTimeline = gsap.timeline({

        defaults: {

            ease: "power3.out"

        }

    });

    chapterTimeline

        .from(".chapter-number", {

            opacity: 0,

            y: 30,

            duration: 0.6

        })

        .from(".chapter-heading h2", {

            opacity: 0,

            y: 60,

            duration: 0.8

        })

        .from(".chapter-subtitle", {

            opacity: 0,

            duration: 0.6

        })

        .from(".memory-photo-wrapper", {

            opacity: 0,

            x: -100,

            rotation: -12,

            duration: 1

        })

        .from(".memory-story", {

            opacity: 0,

            x: 100,

            duration: 1

        }, "-=0.7");

}

// Tombol Continue
openCounterButton.addEventListener("click", () => {

    openCounterButton.disabled = true;

    gsap.to(".chapter-container", {

        opacity: 0,

        scale: 0.95,

        duration: 0.7,

        ease: "power3.in",

        onComplete: () => {

            // Pindah ke halaman Counter
            showPage("love-counter");

            gsap.fromTo(

                ".counter-container",

                {

                    opacity: 0,

                    y: 70

                },

                {

                    opacity: 1,

                    y: 0,

                    duration: 1.2,

                    ease: "power3.out"

                }

            );

        }

    });

});