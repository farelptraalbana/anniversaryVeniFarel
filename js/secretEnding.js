// =========================================================
// SECRET ENDING
// Sequence sinematik setelah tombol "The End ❤️"
// =========================================================

(function () {

    'use strict';

    // Jika GSAP tidak ada, jangan lanjut
    if (typeof gsap === 'undefined') return;

    // =========================
    // DOM REFS
    // =========================

    const overlay = document.getElementById('secretEnding');
    if (!overlay) return;

    const blackLayer = document.getElementById('seBlack');
    const typewriterEl = document.getElementById('seTypewriter');
    const stageTypewriter = document.getElementById('seStageTypewriter');
    const stageQuestion = document.getElementById('seStageQuestion');
    const stageFlower = document.getElementById('seStageFlower');
    const stageStorm = document.getElementById('seStageStorm');
    const stageNight = document.getElementById('seStageNight');

    const seedEl = document.getElementById('seSeed');
    const stemEl = document.getElementById('seStem');
    const leavesEl = document.getElementById('seLeaves');
    const flowerHeadEl = document.getElementById('seFlowerHead');
    const glowEl = document.getElementById('seGlow');

    const particlesEl = document.getElementById('seParticles');
    const firefliesEl = document.getElementById('seFireflies');
    const sparklesEl = document.getElementById('seSparkles');

    const bouquetWrap = document.getElementById('seBouquetWrap');
    const bouquetEl = document.getElementById('seBouquet');
    const bouquetGlowEl = document.getElementById('seBouquetGlow');
    const messageEl = document.getElementById('seMessage');

    const stormEl = document.getElementById('seStorm');
    const stormPetalsEl = document.getElementById('seStormPetals');
    const stormSparklesEl = document.getElementById('seStormSparkles');
    const stormGlowEl = document.getElementById('seStormGlow');

    const nightSkyEl = document.getElementById('seNightSky');
    const moonEl = document.getElementById('seMoon');
    const starsEl = document.getElementById('seStars');
    const fireflies2El = document.getElementById('seFireflies2');
    const finalWrapEl = document.getElementById('seFinalWrap');

    const btnYes = document.getElementById('seBtnYes');
    const btnNo = document.getElementById('seBtnNo');
    const btnTake = document.getElementById('seBtnTake');
    const btnRestart = document.getElementById('seBtnRestart');

    const stages = [
        stageTypewriter,
        stageQuestion,
        stageFlower,
        stageStorm,
        stageNight
    ];

    // =========================
    // STATE
    // =========================

    let active = false;
    let chosenFlower = '🌹'; // default
    let cleaned = false;

    // =========================
    // UTIL
    // =========================

    function showStage(stage) {
        stages.forEach(s => {
            if (!s) return;
            s.classList.remove('active');
        });
        if (stage) stage.classList.add('active');
    }

    function showEl(el) {
        if (!el) return;
        gsap.set(el, { display: 'block', opacity: 1, visibility: 'visible' });
    }

    function hideEl(el) {
        if (!el) return;
        gsap.set(el, { display: 'none', opacity: 0, visibility: 'hidden' });
    }

    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomPick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // =========================
    // OPEN / CLOSE
    // =========================

    function openSecretEnding() {

        if (active) return;
        active = true;
        cleaned = false;

        // Reset semua
        gsap.set(overlay, { display: 'block' });
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');

        // Reset stage
        stages.forEach(s => {
            if (!s) return;
            s.classList.remove('active');
        });

        // Reset hitam
        gsap.set(blackLayer, { opacity: 1 });

        // Reset elemen flower scene
        gsap.set(seedEl, { opacity: 0 });
        gsap.set(stemEl, { height: 0, opacity: 0 });
        gsap.set(leavesEl, { opacity: 0 });
        gsap.set(flowerHeadEl, { opacity: 0 });
        gsap.set(glowEl, { opacity: 0 });

        // Kosongkan container dinamis
        if (leavesEl) leavesEl.innerHTML = '';
        if (flowerHeadEl) flowerHeadEl.innerHTML = '';
        if (particlesEl) particlesEl.innerHTML = '';
        if (firefliesEl) firefliesEl.innerHTML = '';
        if (sparklesEl) sparklesEl.innerHTML = '';
        if (bouquetEl) bouquetEl.innerHTML = '';
        if (stormEl) stormEl.innerHTML = '';
        if (stormPetalsEl) stormPetalsEl.innerHTML = '';
        if (stormSparklesEl) stormSparklesEl.innerHTML = '';
        if (starsEl) starsEl.innerHTML = '';
        if (fireflies2El) fireflies2El.innerHTML = '';

        // Sembunyikan bouquet, message, final
        gsap.set(bouquetWrap, { opacity: 0, visibility: 'hidden' });
        gsap.set(messageEl, { opacity: 0, visibility: 'hidden' });
        gsap.set(moonEl, { opacity: 0 });
        gsap.set('.se-final-line', { opacity: 0 });
        gsap.set('.se-made-with', { opacity: 0 });

        // MULAI URUTAN
        runTypewriter();

    }

    function closeSecretEnding() {

        if (!active) return;
        active = false;

        // Hentikan semua tween
        gsap.killTweensOf(overlay);
        gsap.killTweensOf(stages);
        gsap.killTweensOf('*');

        // Sembunyikan overlay
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                overlay.classList.remove('active');
                gsap.set(overlay, { display: 'none', opacity: 1 });
                overlay.setAttribute('aria-hidden', 'true');
            }
        });

        // Kembali ke hero
        try {
            showPage('hero');
        } catch (e) {
            console.warn('showPage not available');
        }

        // Reset video state (aktifkan kembali tombol The End jika ada)
        const finishBtn = document.getElementById('finishStory');
        if (finishBtn) finishBtn.disabled = false;

    }

    // =========================
    // STAGE 1 — TYPEWRITER
    // =========================

    function runTypewriter() {

        const phrases = [
            'One more thing...',
            'I have not said everything yet.',
            'Before you go...',
            'There is something for you.'
        ];

        let phraseIndex = 0;

        showStage(stageTypewriter);

        function typePhrase(text, onDone) {

            typewriterEl.textContent = '';
            let i = 0;

            const typeInterval = setInterval(() => {

                i++;
                typewriterEl.textContent = text.slice(0, i);

                if (i >= text.length) {
                    clearInterval(typeInterval);

                    // jeda sebelum lanjut
                    gsap.delayedCall(0.9, onDone);
                }

            }, 60);

        }

        function nextPhrase() {

            if (phraseIndex < phrases.length) {

                typePhrase(phrases[phraseIndex], () => {
                    phraseIndex++;
                    // fade out, fade in berikutnya
                    gsap.to(typewriterEl, {
                        opacity: 0,
                        y: -12,
                        duration: 0.35,
                        ease: 'power2.in',
                        onComplete: () => {
                            gsap.set(typewriterEl, { opacity: 1, y: 0 });
                            nextPhrase();
                        }
                    });
                });

            } else {
                // Selesai semua kalimat — masuk stage question
                goToQuestion();
            }

        }

        gsap.fromTo(stageTypewriter, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
        nextPhrase();

    }

    // =========================
    // STAGE 2 — QUESTION
    // =========================

    function goToQuestion() {

        gsap.to(typewriterEl, {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {

                showStage(stageQuestion);

                gsap.fromTo('.se-question-inner',
                    { opacity: 0, scale: 0.9, y: 30 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)' }
                );

            }
        });

    }

    // =========================
    // STAGE 3 — FLOWER BLOOM
    // =========================

    function goToFlower() {

        // Fade out question
        gsap.to('.se-question-inner', {
            opacity: 0,
            scale: 0.9,
            y: -20,
            duration: 0.45,
            ease: 'power2.in',
            onComplete: () => {

                showStage(stageFlower);

                // Mulai animasi tumbuh
                animateFlowerBloom();

            }
        });

    }

    function animateFlowerBloom() {

        // 1. Benih muncul
        gsap.fromTo(seedEl, { opacity: 0 }, {
            opacity: 1,
            duration: 1.2,
            ease: 'power1.inOut'
        });

        // 2. Tunas menjadi batang
        gsap.fromTo(stemEl, { height: 0, opacity: 0 }, {
            height: '100%',
            opacity: 1,
            duration: 1.8,
            ease: 'power1.inOut',
            delay: 1.0
        });

        // 3. Benih memudar, daun muncul
        gsap.to(seedEl, {
            opacity: 0,
            scale: 0.3,
            duration: 0.6,
            delay: 1.2
        });

        gsap.fromTo(leavesEl, { opacity: 0 }, {
            opacity: 1,
            duration: 0.5,
            delay: 2.2,
            onStart: () => createLeaves()
        });

        // 4. Kepala bunga mekar
        gsap.fromTo(flowerHeadEl, { opacity: 0 }, {
            opacity: 1,
            duration: 0.6,
            delay: 2.8,
            onStart: () => createFlowerHead()
        });

        // Glow ikut menyala
        gsap.fromTo(glowEl, { opacity: 0 }, {
            opacity: 1,
            duration: 1.2,
            delay: 2.0
        });

        // Partikel & fireflies muncul
        gsap.delayedCall(1.6, createParticles);
        gsap.delayedCall(2.4, createFireflies);
        gsap.delayedCall(3.2, createSparkles);

        // Setelah mekar — tampilkan message + bouquet button
        gsap.delayedCall(4.2, () => {

            gsap.fromTo(messageEl, { opacity: 0, y: 30 }, {
                opacity: 1,
                y: 0,
                visibility: 'visible',
                duration: 0.9,
                ease: 'power3.out'
            });

            gsap.fromTo('#seBtnTake', { opacity: 0, y: 25, visibility: 'hidden' }, {
                opacity: 1,
                y: 0,
                visibility: 'visible',
                duration: 0.8,
                delay: 0.4,
                ease: 'back.out(1.7)'
            });

        });

    }

    function createLeaves() {

        leavesEl.innerHTML = '';

        const positions = [
            { left: '45%', bottom: '38%', rotate: 25, scale: 1 },
            { left: '55%', bottom: '30%', rotate: -25, scale: 1.1 },
            { left: '48%', bottom: '48%', rotate: 20, scale: 0.8 }
        ];

        positions.forEach((pos, i) => {

            const leaf = document.createElement('div');
            leaf.className = 'se-leaf';
            leaf.style.left = pos.left;
            leaf.style.bottom = pos.bottom;
            leaf.style.transform = `rotate(${pos.rotate}deg) scale(${pos.scale})`;

            leavesEl.appendChild(leaf);

            gsap.fromTo(leaf,
                { opacity: 0, scale: 0.3 },
                { opacity: 1, scale: pos.scale, duration: 0.6, delay: i * 0.15, ease: 'back.out(1.7)' }
            );

        });

    }

    function createFlowerHead() {

        flowerHeadEl.innerHTML = '';

        const petalCount = 8;
        const colors = ['#fbcfe8', '#f9a8d4', '#f472b6', '#fbcfe8', '#f9a8d4'];

        // Petals
        for (let i = 0; i < petalCount; i++) {

            const petal = document.createElement('div');
            petal.className = 'se-petal';

            const angle = (360 / petalCount) * i;
            petal.style.transform = `rotate(${angle}deg)`;

            petal.style.background = `linear-gradient(180deg, ${randomPick(colors)}, #f472b6 70%, #db2777)`;

            flowerHeadEl.appendChild(petal);

            gsap.fromTo(petal,
                { opacity: 0, scale: 0.2, rotate: angle },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: angle,
                    duration: 0.8,
                    delay: i * 0.07,
                    ease: 'back.out(1.9)'
                }
            );

        }

        // Center
        const center = document.createElement('div');
        center.className = 'se-flower-center';
        flowerHeadEl.appendChild(center);

        gsap.fromTo(center,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: 'back.out(2)' }
        );

    }

    // =========================
    // PARTIKEL / FIREFLIES / SPARKLES
    // =========================

    function createParticles() {

        if (!particlesEl) return;
        particlesEl.innerHTML = '';

        for (let i = 0; i < 22; i++) {

            const p = document.createElement('div');
            p.className = 'se-particle';

            const size = randomBetween(3, 8);
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = randomBetween(10, 90) + '%';
            p.style.bottom = '0px';

            particlesEl.appendChild(p);

            gsap.fromTo(p,
                { opacity: 0, y: 0 },
                {
                    opacity: randomBetween(0.3, 0.8),
                    y: -(randomBetween(150, 420)),
                    x: randomBetween(-60, 60),
                    duration: randomBetween(3, 6),
                    repeat: -1,
                    delay: randomBetween(0, 2),
                    ease: 'sine.inOut'
                }
            );

        }

    }

    function createFireflies() {

        if (!firefliesEl) return;
        firefliesEl.innerHTML = '';

        for (let i = 0; i < 14; i++) {

            const f = document.createElement('div');
            f.className = 'se-firefly';

            f.style.left = randomBetween(5, 95) + '%';
            f.style.top = randomBetween(15, 80) + '%';

            firefliesEl.appendChild(f);

            gsap.to(f, {
                x: randomBetween(-40, 40),
                y: randomBetween(-40, 40),
                opacity: randomBetween(0.2, 0.9),
                duration: randomBetween(2, 4),
                repeat: -1,
                yoyo: true,
                delay: randomBetween(0, 1),
                ease: 'sine.inOut'
            });

        }

    }

    function createSparkles() {

        if (!sparklesEl) return;
        sparklesEl.innerHTML = '';

        const chars = ['✦', '✧', '·', '✨'];

        for (let i = 0; i < 18; i++) {

            const s = document.createElement('div');
            s.className = 'se-sparkle';
            s.textContent = randomPick(chars);

            s.style.left = randomBetween(5, 95) + '%';
            s.style.top = randomBetween(10, 90) + '%';
            s.style.fontSize = randomBetween(9, 18) + 'px';

            sparklesEl.appendChild(s);

            gsap.fromTo(s,
                { opacity: 0, scale: 0.3 },
                {
                    opacity: randomBetween(0.4, 1),
                    scale: 1,
                    duration: randomBetween(1.5, 3),
                    repeat: -1,
                    yoyo: true,
                    delay: randomBetween(0, 2),
                    ease: 'sine.inOut'
                }
            );

        }

    }

    // =========================
    // STAGE 4 — BOUQUET + AMBIL BUNGA
    // =========================

    function showBouquet() {

        // Sembunyikan scene tanaman + message + tombol
        gsap.to('.se-flower-scene', {
            opacity: 0,
            scale: 0.9,
            y: 30,
            duration: 0.5,
            ease: 'power2.in'
        });

        gsap.to(messageEl, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
        gsap.to('#seBtnTake', { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' });

        // Tampilkan bouquet
        gsap.set(bouquetWrap, { visibility: 'visible', opacity: 0 });
        gsap.set(bouquetGlowEl, { opacity: 0 });

        gsap.delayedCall(0.55, () => {

            gsap.to(bouquetWrap, {
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            });

            gsap.to(bouquetGlowEl, { opacity: 1, duration: 1.0, delay: 0.2 });

            buildBouquet();

        });

    }

    function buildBouquet() {

        if (!bouquetEl) return;
        bouquetEl.innerHTML = '';

        const emojis = ['🌹', '🌷', '🌸', '🌺', '🌻', '🌼', '💐'];
        const flowerCount = 9;
        const center = 50; // % tengah

        for (let i = 0; i < flowerCount; i++) {

            const angle = (Math.PI / 2) + ((i / (flowerCount - 1)) * Math.PI);
            const radius = randomBetween(15, 34);
            const x = center + Math.cos(angle) * radius * 1.8;
            const y = 85 - Math.sin(angle) * radius * 1.6;

            const flower = document.createElement('div');
            flower.className = 'se-b-flower';
            flower.textContent = emojis[i % emojis.length];
            flower.style.left = x + '%';
            flower.style.bottom = y + '%';
            flower.style.fontSize = randomBetween(30, 46) + 'px';

            // Stem
            const stem = document.createElement('div');
            stem.className = 'se-b-stem';
            stem.style.left = x + '%';
            stem.style.bottom = '8px';
            stem.style.height = (y * 0.8) + 'px';
            stem.style.transformOrigin = 'bottom center';
            stem.style.transform = `rotate(${randomBetween(-6, 6)}deg)`;

            bouquetEl.appendChild(stem);
            bouquetEl.appendChild(flower);

            // Animasi muncul
            gsap.fromTo(stem, { opacity: 0, scaleY: 0 }, {
                opacity: 1,
                scaleY: 1,
                duration: 0.5,
                delay: i * 0.09,
                ease: 'power1.out'
            });

            gsap.fromTo(flower, { opacity: 0, y: 40, scale: 0.4 }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: i * 0.09 + 0.15,
                ease: 'back.out(1.9)'
            });

            // Leaf kecil di bawah flower
            const leaf = document.createElement('div');
            leaf.className = 'se-b-leaf';
            leaf.style.left = (x - 4) + '%';
            leaf.style.bottom = (y * 0.55) + 'px';
            leaf.style.transform = `rotate(${randomBetween(-30, 30)}deg)`;
            bouquetEl.appendChild(leaf);

            gsap.fromTo(leaf, { opacity: 0, scale: 0 }, {
                opacity: 0.8,
                scale: 1,
                duration: 0.4,
                delay: i * 0.09 + 0.3
            });

        }

        // Ribbon
        const ribbon = document.createElement('div');
        ribbon.className = 'se-b-ribbon';
        bouquetEl.appendChild(ribbon);

        gsap.fromTo(ribbon, { opacity: 0, scaleY: 0 }, {
            opacity: 1,
            scaleY: 1,
            duration: 0.5,
            delay: flowerCount * 0.09 + 0.3,
            ease: 'back.out(1.7)'
        });

        // Setelah bouquet selesai — lanjut ke flower storm otomatis
        gsap.delayedCall(2.4, () => {

            const flowers = bouquetEl.querySelectorAll('.se-b-flower');
            const pos = [];

            flowers.forEach(f => {
                pos.push({
                    el: f,
                    rect: f.getBoundingClientRect()
                });
            });

            goToStorm(pos);

        });

    }

    // =========================
    // STAGE 5 — FLOWER STORM
    // =========================

    function goToStorm(flowerPositions) {

        // Ambil emoji dari bouquet (atau default)
        const collectedEmojis = [];

        if (flowerPositions) {
            flowerPositions.forEach(p => {
                collectedEmojis.push(p.el.textContent);
            });
        }

        if (collectedEmojis.length === 0) {
            collectedEmojis.push('🌹', '🌷', '🌸', '🌺');
        }

        chosenFlower = randomPick(collectedEmojis);

        // Animasi keluar — bouquet terbang menuju sudut
        flowerPositions.forEach(p => {
            gsap.to(p.el, {
                x: (window.innerWidth / 2 - (p.rect.left + p.rect.width / 2)) * 1.2,
                y: -(window.innerHeight / 2 - (p.rect.top + p.rect.height / 2)) * 1.1,
                scale: 0.2,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.in'
            });
        });

        // Fade bouquet wrap
        gsap.to(bouquetWrap, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'power2.in'
        });

        gsap.to(bouquetGlowEl, { opacity: 0, duration: 0.4 });

        gsap.delayedCall(0.7, () => {

            showStage(stageStorm);

            // Background glow
            gsap.fromTo(stormGlowEl, { opacity: 0 }, { opacity: 1, duration: 1 });

            // Trigger storm
            launchFlowerStorm();

        });

    }

    function launchFlowerStorm() {

        if (!stormEl) return;
        stormEl.innerHTML = '';

        const emojiPool = ['🌹', '🌷', '🌸', '🌺', '🌻', '🌼', '💐', '❤️', '💖'];

        // Ombak bunga dari bawah
        for (let i = 0; i < 34; i++) {

            const flower = document.createElement('div');
            flower.className = 'se-storm-flower';
            flower.textContent = randomPick(emojiPool);
            flower.style.left = randomBetween(0, 100) + '%';
            flower.style.fontSize = randomBetween(28, 56) + 'px';

            stormEl.appendChild(flower);

            gsap.fromTo(flower,
                { opacity: 0, y: 0, x: 0, rotate: 0 },
                {
                    opacity: randomBetween(0.7, 1),
                    y: -(window.innerHeight + 200),
                    x: randomBetween(-120, 120),
                    rotate: randomBetween(-160, 160),
                    duration: randomBetween(2.6, 4.6),
                    delay: i * 0.12,
                    ease: 'power1.in',
                    onComplete: () => {
                        gsap.set(flower, { opacity: 0 });
                    }
                }
            );

        }

        // Kelopak jatuh dari atas
        if (stormPetalsEl) {
            stormPetalsEl.innerHTML = '';
            for (let i = 0; i < 26; i++) {

                const petal = document.createElement('div');
                petal.className = 'se-storm-petal';

                const size = randomBetween(8, 16);
                petal.style.width = size + 'px';
                petal.style.height = (size * 1.4) + 'px';
                petal.style.left = randomBetween(0, 100) + '%';
                petal.style.opacity = 0;

                stormPetalsEl.appendChild(petal);

                gsap.fromTo(petal,
                    { opacity: 0, y: -30, x: 0, rotate: 0 },
                    {
                        opacity: randomBetween(0.5, 0.9),
                        y: window.innerHeight + 60,
                        x: randomBetween(-80, 80),
                        rotate: randomBetween(-200, 200),
                        duration: randomBetween(3, 5),
                        delay: i * 0.15,
                        ease: 'none'
                    }
                );

            }
        }

        // Sparkles
        if (stormSparklesEl) {
            stormSparklesEl.innerHTML = '';
            const chars = ['✦', '✧', '✨', '·'];

            for (let i = 0; i < 20; i++) {

                const s = document.createElement('div');
                s.className = 'se-sparkle';
                s.textContent = randomPick(chars);
                s.style.left = randomBetween(5, 95) + '%';
                s.style.top = randomBetween(10, 90) + '%';
                s.style.fontSize = randomBetween(10, 22) + 'px';

                stormSparklesEl.appendChild(s);

                gsap.fromTo(s,
                    { opacity: 0, scale: 0.3 },
                    {
                        opacity: randomBetween(0.4, 1),
                        scale: 1,
                        duration: randomBetween(1.2, 2.4),
                        repeat: -1,
                        yoyo: true,
                        delay: randomBetween(0, 1.5),
                        ease: 'sine.inOut'
                    }
                );

            }
        }

        // Setelah storm — lanjut ke night sky
        gsap.delayedCall(4.6, goToNight);

    }

    // =========================
    // STAGE 6 — NIGHT SKY + FINAL MESSAGE
    // =========================

    function goToNight() {

        gsap.to(stageStorm, {
            opacity: 0,
            duration: 1.0,
            ease: 'power2.in',
            onComplete: () => {

                showStage(stageNight);

                // Fade in background
                gsap.fromTo(stageNight, { opacity: 0 }, { opacity: 1, duration: 0.6 });

                // Moon
                gsap.fromTo(moonEl, { opacity: 0, y: -30 }, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    delay: 0.3,
                    ease: 'power2.out'
                });

                // Stars
                createStars();
                createFireflies2();

                // Final lines
                const lines = document.querySelectorAll('.se-final-line');

                lines.forEach((line, i) => {
                    gsap.fromTo(line,
                        { opacity: 0, y: 35 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.0,
                            delay: 0.8 + i * 0.65,
                            ease: 'power3.out'
                        }
                    );
                });

gsap.fromTo('.se-made-with', { opacity: 0, y: 20 }, {
                    opacity: 0.7,
                    y: 0,
                    duration: 1.0,
                    delay: 0.8 + lines.length * 0.65 + 0.5,
                    ease: 'power2.out'
                });

                // Tombol "Kembali ke Awal"
                gsap.fromTo('#seBtnRestart', { opacity: 0, y: 20 }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.8 + lines.length * 0.65 + 1.2,
                    ease: 'power2.out'
                });

            }
        });

    }

    function createStars() {

        if (!starsEl) return;
        starsEl.innerHTML = '';

        for (let i = 0; i < 90; i++) {

            const star = document.createElement('div');
            star.className = 'se-star';

            star.style.left = randomBetween(0, 100) + '%';
            star.style.top = randomBetween(0, 70) + '%';
            star.style.width = randomBetween(1, 3) + 'px';
            star.style.height = star.style.width;

            starsEl.appendChild(star);

            gsap.fromTo(star,
                { opacity: 0 },
                {
                    opacity: randomBetween(0.3, 1),
                    duration: randomBetween(1, 3),
                    repeat: -1,
                    yoyo: true,
                    delay: randomBetween(0, 2),
                    ease: 'sine.inOut'
                }
            );

        }

    }

    function createFireflies2() {

        if (!fireflies2El) return;
        fireflies2El.innerHTML = '';

        for (let i = 0; i < 18; i++) {

            const f = document.createElement('div');
            f.className = 'se-firefly';

            f.style.left = randomBetween(5, 95) + '%';
            f.style.top = randomBetween(10, 90) + '%';

            fireflies2El.appendChild(f);

            gsap.to(f, {
                x: randomBetween(-50, 50),
                y: randomBetween(-50, 50),
                opacity: randomBetween(0.2, 0.8),
                duration: randomBetween(3, 5),
                repeat: -1,
                yoyo: true,
                delay: randomBetween(0, 2),
                ease: 'sine.inOut'
            });

        }

    }

    // =========================
    // EVENT LISTENERS — QUESTION
    // =========================

    if (btnYes) {
        btnYes.addEventListener('click', () => {
            btnYes.disabled = true;
            btnNo.disabled = true;
            goToFlower();
        });
    }

    if (btnNo) {
        btnNo.addEventListener('click', () => {
            btnNo.disabled = true;
            btnYes.disabled = true;

            // Pesan manis jika menolak
            gsap.to('.se-question-inner', {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {

                    showStage(stageTypewriter);
                    typewriterEl.textContent = "That's okay...";
                    typewriterEl.style.color = '#cbd5e1';

                    gsap.fromTo(stageTypewriter, { opacity: 0 }, { opacity: 1, duration: 0.5 });

                    gsap.delayedCall(2.2, () => {
                        closeSecretEnding();
                    });

                }
            });

        });
    }

    // =========================
    // EVENT LISTENERS — TAKE FLOWERS
    // =========================

if (btnTake) {
        btnTake.addEventListener('click', () => {
            btnTake.disabled = true;
            showBouquet();
        });
    }

    // =========================
    // BUTTON — KEMBALI KE AWAL
    // (tutup ending, lalu tampilkan kembali lock screen isi tanggal)
    // =========================

    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            btnRestart.disabled = true;

            // Tutup secret ending (fade out)
            closeSecretEnding();

            // Tampilkan kembali lock screen (isi tanggal jadian)
            if (window.LockScreen && typeof window.LockScreen.reset === 'function') {
                window.LockScreen.reset();
            } else {
                // Fallback: kembali ke hero
                try { showPage('hero'); } catch (e) {}
            }

            // Aktifkan kembali tombol setelah transisi
            setTimeout(() => { btnRestart.disabled = false; }, 1200);
        });
    }

    // =========================
    // KEYBOARD ESC UNTUK KELUAR
    // =========================

    document.addEventListener('keydown', (e) => {

        if (!active) return;

        if (e.key === 'Escape') {
            closeSecretEnding();
        }

    });

    // =========================
    // EKSPOS GLOBAL (untuk dipanggil video.js)
    // =========================

    window.SecretEnding = {
        open: openSecretEnding,
        close: closeSecretEnding,
        isActive: () => active
    };

})();

