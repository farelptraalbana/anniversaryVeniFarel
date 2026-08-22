// =========================
// NAVIGATION FROM JOURNEY
// =========================

const continueJourney =
document.getElementById("continueJourney");

continueJourney.addEventListener("click", () => {

    showPage("letter");

    const env =
    document.getElementById("envelope");

    const paper =
    document.getElementById("letterPaper");

    // Reset state
    env.style.display = "flex";
    env.style.opacity = "0";
    env.style.pointerEvents = "auto";
    env.style.transform = "scale(.5) translateY(80px)";

    paper.style.display = "none";
    paper.classList.remove("revealed");

    gsap.to(env,{

        opacity:1,

        scale:1,

        y:0,

        duration:1.2,

        ease:"back.out(1.7)"

    });

    spawnHearts();

});


// =========================
// OPEN ENVELOPE
// =========================

const envelope =
document.getElementById("envelope");

const paper =
document.getElementById("letterPaper");

envelope.addEventListener("click",()=>{

    envelope.style.pointerEvents="none";

    gsap.to(".envelope-front",{

        scale:.9,

        opacity:0,

        duration:.4,

        ease:"power2.in"

    });

    gsap.to(envelope,{

        scale:.6,

        opacity:0,

        duration:.6,

        delay:.3,

        ease:"power3.in",

        onComplete:()=>{

            envelope.style.display="none";

            paper.style.display="block";

            paper.classList.add("revealed");

            gsap.fromTo(

                paper,

                {

                    opacity:0,

                    scaleY:.3,

                    scaleX:.8,

                    y:-60,

                    rotationX:15

                },

                {

                    opacity:1,

                    scaleY:1,

                    scaleX:1,

                    y:0,

                    rotationX:0,

                    duration:1,

                    ease:"power3.out"

                }

            );

            const paragraphs =
            paper.querySelectorAll(

                "h2,p,.signature,.letter-ending"

            );

            gsap.fromTo(

                paragraphs,

                {

                    opacity:0,

                    x:-30,

                    rotateY:10

                },

                {

                    opacity:1,

                    x:0,

                    rotateY:0,

                    duration:.8,

                    stagger:.15,

                    ease:"power2.out",

                    delay:.6

                }

            );

            createHeartBurst();

        }

    });

});


// =========================
// KEEP READING BUTTON
// =========================

const continueFuture =
document.getElementById("continueFuture");

if(continueFuture){

    continueFuture.addEventListener("click",()=>{

        continueFuture.disabled=true;

        gsap.to(".letter-container",{

            opacity:0,

            scale:.95,

            duration:.8,

            ease:"power3.in",

            onComplete:()=>{

                // reset supaya ketika dibuka lagi normal
                gsap.set(".letter-container",{

                    opacity:1,

                    scale:1

                });

                showPage("our-future");

            }

        });

    });

}


// =========================
// FLOATING HEARTS
// =========================

function spawnHearts(){

    const oldContainer=
    document.querySelector(".letter-hearts");

    if(oldContainer) oldContainer.remove();

    const container=
    document.createElement("div");

    container.className="letter-hearts";

    document
    .getElementById("app")
    .appendChild(container);

    for(let i=0;i<15;i++){

        const heart=
        document.createElement("span");

        heart.className="heart-particle";

        heart.textContent="♥";

        heart.style.left=Math.random()*100+"%";

        heart.style.top=Math.random()*100+"%";

        heart.style.fontSize=
        (Math.random()*15+10)+"px";

        container.appendChild(heart);

        gsap.to(heart,{

            opacity:.6,

            y:-(Math.random()*150+50),

            x:(Math.random()-.5)*80,

            rotation:Math.random()*360,

            duration:Math.random()*3+3,

            repeat:-1,

            yoyo:true,

            ease:"sine.inOut",

            delay:Math.random()*3

        });

    }

}


// =========================
// HEART BURST
// =========================

function createHeartBurst(){

    const container=
    document.createElement("div");

    container.className="letter-hearts";

    container.style.zIndex="10";

    document
    .getElementById("app")
    .appendChild(container);

    const symbols=[
        "♥",
        "❤",
        "💕",
        "💗"
    ];

    for(let i=0;i<25;i++){

        const heart=
        document.createElement("span");

        heart.className="heart-particle";

        heart.textContent=
        symbols[
            Math.floor(Math.random()*symbols.length)
        ];

        heart.style.left="50%";

        heart.style.top="50%";

        heart.style.fontSize=
        (Math.random()*20+12)+"px";

        container.appendChild(heart);

        const angle=
        (Math.PI*2/25)*i;

        const distance=
        Math.random()*200+100;

        gsap.to(heart,{

            opacity:1,

            x:Math.cos(angle)*distance,

            y:Math.sin(angle)*distance-50,

            rotation:
            Math.random()*720-360,

            scale:0,

            duration:
            Math.random()+1.5,

            ease:"power3.out",

            onComplete:()=>{

                gsap.to(heart,{

                    opacity:0,

                    duration:.5,

                    delay:.5

                });

            }

        });

    }

    setTimeout(()=>{

        container.remove();

    },3000);

}