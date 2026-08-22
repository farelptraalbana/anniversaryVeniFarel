const heroTimeline = gsap.timeline({
    defaults: {
        ease: "power3.out"
    }
});


heroTimeline

    .from(".hero-card", {

        opacity: 0,

        scale: 0.9,

        duration: 1.2

    })

    .from(".hero-subtitle", {

        opacity: 0,

        y: 30,

        duration: 0.8

    })

    .from(".hero-photo-wrapper", {

        opacity: 0,

        y: 50,

        rotation: -10,

        scale: 0.7,

        duration: 1

    })

    .from(".hero-title", {

        opacity: 0,

        y: 50,

        duration: 0.8

    })

    .from(".hero-anniversary", {

        opacity: 0,

        y: 20,

        duration: 0.6

    })

    .from("#startBtn", {

        opacity: 0,

        y: 30,

        duration: 0.6

    });


const startButton = document.getElementById("startBtn");

startButton.addEventListener("click", () => {

    startButton.disabled = true;

    const tl = gsap.timeline();

    // 1. Instantly cover screen with transition overlay
    tl.set(".hero-transition", {

        visibility: "visible",

        y: "0%"

    }, 0);

    // 2. Fade out hero card content (happens behind overlay, user won't see)
    tl.to(".hero-card", {

        opacity: 0,

        scale: 0.9,

        duration: 0.4,

        ease: "power3.in"

    }, 0);

    // 3. Wait a moment for dramatic effect, then switch page
    tl.call(() => {

        showPage("story-intro");

        window.scrollTo(0, 0);

    }, null, "+=0.3");

    // 4. Slide transition back up to reveal story-intro
    tl.to(".hero-transition", {

        y: "-100%",

        duration: 0.9,

        ease: "power4.inOut"

    });

    // 5. Hide transition after sliding up
    tl.set(".hero-transition", {

        visibility: "hidden"

    });

    // 6. Animate story label in
    tl.fromTo(

        ".story-label",

        {

            opacity: 0,

            y: 30

        },

        {

            opacity: 1,

            y: 0,

            duration: 0.7

        }

    );

    // 7. Animate story slide
    tl.fromTo(

        ".story-slide.active",

        {

            opacity: 0,

            y: 50,

            scale: 0.9

        },

        {

            opacity: 1,

            y: 0,

            scale: 1,

            duration: 1,

            ease: "power3.out"

        }

    );

});
