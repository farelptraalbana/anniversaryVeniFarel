const memoryJourney =
    document.getElementById("memory-journey");

const continueThings =
    document.getElementById("continueThings");

const journeyPhoto =
    document.getElementById("journeyPhoto");

const journeyDate =
    document.getElementById("journeyDate");

const journeyTitle =
    document.getElementById("journeyTitle");

const journeyText =
    document.getElementById("journeyText");

const currentMemory =
    document.getElementById("currentMemory");

const totalMemory =
    document.getElementById("totalMemory");

const previousMemory =
    document.getElementById("previousMemory");

const nextMemory =
    document.getElementById("nextMemory");


const memories = [

    {
        photo: "assets/photos/memories/memory-1.jpg",

        date: "2024",

        title: "The beginning.",

        text: `
            Hari itu mungkin terlihat seperti hari biasa.
            Tapi tanpa aku sadari, hari itu menjadi awal
            dari banyak cerita yang akan kita buat bersama.
        `
    },

    {
        photo: "assets/photos/memories/memory-2.jpg",

        date: "2024",

        title: "Just us.",

        text: `
            Momen dimana semua konflik bermula. Yaaa tidak bisa
            bekata banyak, tetapi mungkin ini menjadi hal yang selalu
            diingat dan jadikan pembelajaran kedepannya.
        `
    },

    {
        photo: "assets/photos/memories/memory-3.jpg",

        date: "2024",

        title: "The Story Begins",

        text: `
            Perjalanan kita dimulai dari sini. Dan aku bersyukur
            karena kamu ada di hidupku. Semula bermulai dari sini, story panjang kita akan terus berlanjut, dan aku berharap
            kita akan terus bersama hingga akhir cerita.
        `
    },

    {
        photo: "assets/photos/memories/memory-4.jpg",

        date: "2024",

        title: "Being with you.",

        text: `
            Tidak semua hari harus sempurna.
            Tapi aku selalu bersyukur karena
            di antara banyaknya hari yang aku jalani,
            ada banyak hari yang aku habiskan bersamamu.
        `
    },

    {
        photo: "assets/photos/memories/memory-5.jpeg",

        date: "2024",

        title: "Still writing.",

        text: `
            Akhir cerita kita di tahun 2024 berakhir disini.
            Ini bukan akhir dari cerita kita.
            Masih ada banyak tempat,
            banyak foto, dan banyak kenangan
            yang belum kita buat.
        `
    }

];


let memoryIndex = 0;


totalMemory.textContent =
    String(memories.length).padStart(2, "0");


function updateMemory(direction = 1) {

    const animationX =
        direction === 1 ? -80 : 80;


    gsap.to(
        [
            journeyPhoto,
            journeyDate,
            journeyTitle,
            journeyText
        ],
        {

            opacity: 0,

            x: animationX,

            duration: 0.4,

            ease: "power2.in",

            onComplete: () => {

                const memory =
                    memories[memoryIndex];


                journeyPhoto.src =
                    memory.photo;

                journeyDate.textContent =
                    memory.date;

                journeyTitle.textContent =
                    memory.title;

                journeyText.textContent =
                    memory.text.trim();

                currentMemory.textContent =
                    String(memoryIndex + 1)
                    .padStart(2, "0");


                gsap.fromTo(
                    [
                        journeyPhoto,
                        journeyDate,
                        journeyTitle,
                        journeyText
                    ],
                    {

                        opacity: 0,

                        x: -animationX

                    },
                    {

                        opacity: 1,

                        x: 0,

                        duration: 0.7,

                        stagger: 0.08,

                        ease: "power3.out"

                    }
                );

            }

        }
    );

}


nextMemory.addEventListener("click", () => {

    memoryIndex++;

    if (memoryIndex >= memories.length) {

        memoryIndex = 0;

    }

    updateMemory(1);

});


previousMemory.addEventListener("click", () => {

    memoryIndex--;

    if (memoryIndex < 0) {

        memoryIndex =
            memories.length - 1;

    }

    updateMemory(-1);

});


continueThings.addEventListener("click", () => {

    continueThings.disabled = true;


    gsap.to(".things-container", {

        opacity: 0,

        scale: 0.95,

        duration: 0.7,

        onComplete: () => {

            showPage(

                "memory-journey"

            );

            memoryJourney.classList.add("journey-visible");

            gsap.fromTo(

                ".journey-container",

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
