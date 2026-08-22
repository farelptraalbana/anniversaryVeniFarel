(() => {

    const starsContainer = document.getElementById("stars");

    if (!starsContainer) {
        return;
    }

    for (let i = 0; i < 120; i++) {

        const star = document.createElement("span");

        star.classList.add("star");

        star.style.left = `${Math.random() * 100}%`;

        star.style.top = `${Math.random() * 100}%`;

        const size = Math.random() * 2 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.opacity = Math.random();

        starsContainer.appendChild(star);

        gsap.to(star, {

            opacity: Math.random(),

            duration: Math.random() * 2 + 1,

            repeat: -1,

            yoyo: true,

            delay: Math.random() * 2

        });

    }

})();