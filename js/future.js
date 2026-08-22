const continueToDream =
document.getElementById("continueToDream");

continueToDream.addEventListener("click",()=>{

    gsap.to(".future-container",{

        opacity:0,

        scale:.95,

        duration:.8,

        ease:"power3.in",

        onComplete:()=>{

            showPage("dream-together");

            // Animasi masuk #dream-together kini ditangani
            // oleh MutationObserver di dream.js

        }

    });

});
