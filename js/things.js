const littleThings =
    document.getElementById("little-things");

const continueCounter =
    document.getElementById("continueCounter");

const loveCards =
    document.querySelectorAll(".love-card");


continueCounter.addEventListener("click", () => {

    continueCounter.disabled = true;


    gsap.to(".counter-container", {

        opacity: 0,

        scale: 0.95,

        duration: 0.7,

        ease: "power3.in",

        onComplete: () => {

            showPage(

                "little-things"

            );

            littleThings.classList.add("things-visible");


            gsap.fromTo(

                ".things-heading",

                {
                    opacity: 0,
                    y: 50
                },

                {
                    opacity: 1,
                    y: 0,

                    duration: 1
                }

            );


            gsap.fromTo(

                ".love-card",

                {
                    opacity: 0,
                    y: 80
                },

                {
                    opacity: 1,
                    y: 0,

                    duration: 0.8,

                    stagger: 0.15,

                    ease: "power3.out"
                }

            );

        }

    });

});


loveCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle("card-open");

    });

});
