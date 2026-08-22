const storySlides = document.querySelectorAll(".story-slide");
const storyDots = document.querySelectorAll(".story-dot");
const storyNextButton = document.getElementById("storyNext");

let currentStory = 0;


function showStory(index) {

    const currentSlide = storySlides[currentStory];
    const nextSlide = storySlides[index];


    gsap.to(currentSlide, {

        opacity: 0,

        y: -40,

        scale: 0.95,

        duration: 0.5,

        onComplete: () => {

            currentSlide.classList.remove("active");

            storyDots[currentStory].classList.remove("active");


            currentStory = index;


            nextSlide.classList.add("active");

            storyDots[currentStory].classList.add("active");


            gsap.fromTo(

                nextSlide,

                {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                },

                {
                    opacity: 1,
                    y: 0,
                    scale: 1,

                    duration: 0.7,

                    ease: "power3.out"
                }

            );


            if (currentStory === storySlides.length - 1) {

                storyNextButton.innerHTML =
                    "Lanjutkan Cerita <span>♥</span>";

            }

        }

    });

}


storyNextButton.addEventListener("click", () => {

    if (currentStory < storySlides.length - 1) {

        showStory(currentStory + 1);

    } else {

        storyNextButton.disabled = true;


        gsap.to(".story-content", {

            opacity: 0,

            scale: 0.95,

            duration: 0.7,

            ease: "power3.in",

            onComplete: () => {

                openFirstChapter();

            }

        });

    }

});