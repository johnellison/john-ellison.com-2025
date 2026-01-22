/**
 * Scroll Controller for Cosmos Layers
 * Handles the cube explosion, scene transitions, and scroll-based animations
 * Uses requestAnimationFrame for throttled scroll handling
 */

import { createScrollHandler, debounce, createSceneObserver, createAnimationController } from './src/scroll-utils.js';
import { caseStudies } from './case-studies.js';
import { initRainbowGrid } from './rainbow-grid.js';

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    openingDuration: 1200, // Animation completes at 1200px scroll
    heroIntroDelay: 100,   // Brief delay before hero can scroll
    heroIntroDuration: 800 // Hero fade-in duration (ms)
};

// Hero intro state
let heroReady = false;
let heroIntroProgress = 0;

// ============================================
// EASING
// ============================================

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -5 * x);
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

// ============================================
// DOM REFERENCES
// ============================================

const elements = {
    cosmos: null,
    cubeContainer: null,
    cube: null,
    cubeFaces: null,
    prismaticCore: null,
    refractionRays: null,
    rays: null,
    foreground: null,
    mainTitle: null,
    tagline: null,
    tags: null,
    scrollIndicator: null,
    nebulas: null,
    bgTransition: null,
    prismaticSpotlights: null,
    prismRefraction: null,
    challengesSection: null,
    transitionSection: null,
};

// ============================================
// SCROLL HANDLER
// ============================================

function handleScroll(scrollY) {
    const vh = window.innerHeight;
    const progress = Math.min(scrollY / CONFIG.openingDuration, 1);
    const ease = easeOutExpo(progress);

    // Shared animation values
    const scale = 1 + (ease * 1.4);
    const opacity = Math.max(0, 1 - ease * 1.1);
    const blur = ease * 6;

    // ===== CUBE EXPLOSION =====
    if (elements.cube) {
        elements.cube.classList.add('animating');

        const rotateX = -12 + (ease * 18);
        const rotateY = -20 + (ease * 100);

        elements.cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    }

    // Faces explode outward
    const explodeDistance = ease * 300;

    if (elements.cubeFaces) {
        elements.cubeFaces.forEach((face) => {
            let rx = 0, ry = 0, tz = 140 + explodeDistance;

            if (face.classList.contains('front')) { }
            else if (face.classList.contains('back')) { ry = 180; }
            else if (face.classList.contains('right')) { ry = 90; }
            else if (face.classList.contains('left')) { ry = -90; }
            else if (face.classList.contains('top')) { rx = 90; }
            else if (face.classList.contains('bottom')) { rx = -90; }

            face.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
            face.style.opacity = opacity;
        });
    }

    // ===== PRISMATIC CORE =====
    if (elements.prismaticCore) {
        elements.prismaticCore.classList.add('animating');
        const coreScale = 1 + (ease * 10);
        elements.prismaticCore.style.transform = `translate(-50%, -50%) scale(${coreScale})`;
        elements.prismaticCore.style.opacity = opacity * 0.8;
    }

    // Rays expand
    if (elements.rays) {
        elements.rays.forEach((ray, i) => {
            const baseAngle = i * 60;
            const spin = ease * 60;
            ray.style.transform = `rotate(${baseAngle + spin}deg) scaleX(${scale * 2})`;
            ray.style.opacity = opacity * 0.6;
        });
    }

    // Cube container - include intro animation
    if (elements.cubeContainer) {
        // Cube fades in slightly before text
        const cubeIntroEase = easeOutCubic(Math.min(1, heroIntroProgress * 1.3));
        const cubeIntroOpacity = cubeIntroEase;
        elements.cubeContainer.style.opacity = Math.min(cubeIntroOpacity, opacity);
    }

    // ===== TEXT - INTRO ANIMATION + SCROLL EXPANSION =====
    // Blend intro fade-in with scroll-driven animation
    const introEase = easeOutCubic(heroIntroProgress);

    // During intro: start from slightly below and fade in
    // After intro: scroll controller takes over
    const introOffset = (1 - introEase) * 20; // Start 20px below
    const introOpacity = introEase; // Fade from 0 to 1

    // Combine intro animation with scroll animation
    const finalOpacity = Math.min(introOpacity, opacity);
    const finalTransform = heroIntroProgress < 1
        ? `translateY(${introOffset}px) scale(${1 + (ease * 0.4 * introEase)})`
        : `scale(${scale})`;
    const finalBlur = blur;

    if (elements.mainTitle) {
        elements.mainTitle.style.transform = finalTransform;
        elements.mainTitle.style.opacity = finalOpacity;
        elements.mainTitle.style.filter = `blur(${finalBlur}px)`;
    }

    if (elements.tagline) {
        // Slight delay for tagline
        const taglineIntroEase = easeOutCubic(Math.max(0, heroIntroProgress - 0.15) / 0.85);
        const taglineIntroOffset = (1 - taglineIntroEase) * 25;
        const taglineIntroOpacity = taglineIntroEase;
        const taglineFinalOpacity = Math.min(taglineIntroOpacity, opacity);
        const taglineFinalTransform = heroIntroProgress < 1
            ? `translateY(${taglineIntroOffset}px) scale(${1 + (ease * 0.4 * taglineIntroEase)})`
            : `scale(${scale})`;

        elements.tagline.style.transform = taglineFinalTransform;
        elements.tagline.style.opacity = taglineFinalOpacity;
        elements.tagline.style.filter = `blur(${finalBlur}px)`;
    }

    if (elements.tags) {
        elements.tags.style.transform = `scale(${scale})`;
        elements.tags.style.opacity = opacity * 0.8;
        elements.tags.style.filter = `blur(${blur}px)`;
    }


    // ===== COSMOS =====
    // Stars fade in early as part of intro
    if (elements.cosmos) {
        const cosmosIntroEase = easeOutCubic(Math.min(1, heroIntroProgress * 1.5));
        elements.cosmos.style.opacity = Math.min(cosmosIntroEase, opacity);
    }

    if (elements.nebulas) {
        const nebulaIntroEase = easeOutCubic(Math.min(1, heroIntroProgress * 1.2));
        elements.nebulas.forEach((nebula, i) => {
            const drift = ease * 50 * (i % 2 === 0 ? 1 : -1);
            nebula.style.transform = `translateY(${drift}px) scale(${1 + ease * 0.3})`;
            nebula.style.opacity = Math.min(nebulaIntroEase, opacity) * 0.3;
        });
    }

    // ===== BACKGROUND TRANSITION =====
    const bgProgress = Math.max(0, (progress - 0.6) / 0.4);
    if (elements.bgTransition) {
        elements.bgTransition.style.opacity = bgProgress;
    }

    // ===== PRISMATIC SPOTLIGHTS =====
    if (elements.challengesSection && elements.transitionSection && elements.prismaticSpotlights) {
        const scene2Rect = elements.challengesSection.getBoundingClientRect();
        const sceneTransitionRect = elements.transitionSection.getBoundingClientRect();

        const scene2InView = scene2Rect.top < vh * 0.8 && sceneTransitionRect.bottom > 0;

        if (scene2InView) {
            const fadeInProgress = Math.min(1, (vh * 0.8 - scene2Rect.top) / (vh * 0.3));
            const fadeOutProgress = sceneTransitionRect.bottom > vh * 0.5 ? 1 : Math.max(0, sceneTransitionRect.bottom / (vh * 0.5));
            const spotlightOpacity = Math.min(fadeInProgress, fadeOutProgress) * 0.9;

            elements.prismaticSpotlights.style.opacity = spotlightOpacity;
            elements.prismaticSpotlights.classList.add('active');
        } else {
            elements.prismaticSpotlights.style.opacity = 0;
            elements.prismaticSpotlights.classList.remove('active');
        }
    }

    // ===== SCROLL INDICATOR =====
    if (elements.scrollIndicator) {
        // Fade in after text, fade out when scrolling
        const indicatorIntroEase = easeOutCubic(Math.max(0, heroIntroProgress - 0.5) / 0.5);
        const scrollFade = Math.max(0, 1 - progress * 5);
        elements.scrollIndicator.style.opacity = Math.min(indicatorIntroEase, scrollFade);
    }

    // ===== CONVERGING LIGHTS =====
    if (elements.challengesSection) {
        const challengesRect = elements.challengesSection.getBoundingClientRect();
        if (challengesRect.top < vh * 0.5 && challengesRect.bottom > vh * 0.2) {
            elements.challengesSection.classList.add('lights-active');
        } else {
            elements.challengesSection.classList.remove('lights-active');
        }
    }


    // ===== PRISM REFRACTION =====
    if (elements.prismRefraction) {
        const prismRect = elements.prismRefraction.getBoundingClientRect();

        if (prismRect.top < vh * 0.7 && prismRect.bottom > vh * 0.3) {
            elements.prismRefraction.classList.add('visible');
            elements.prismRefraction.classList.remove('exiting');
        } else if (prismRect.top < vh * 0.2) {
            elements.prismRefraction.classList.add('exiting');
        } else if (prismRect.top > vh * 0.7) {
            elements.prismRefraction.classList.remove('visible');
            elements.prismRefraction.classList.remove('exiting');
        }
    }
}

// ============================================
// HERO INTRO ANIMATION
// ============================================

function startHeroIntro(scrollHandler) {
    const startTime = performance.now();

    function animateIntro(currentTime) {
        const elapsed = currentTime - startTime - CONFIG.heroIntroDelay;

        if (elapsed < 0) {
            // Still in delay phase
            requestAnimationFrame(animateIntro);
            return;
        }

        heroIntroProgress = Math.min(1, elapsed / CONFIG.heroIntroDuration);
        scrollHandler.update();

        if (heroIntroProgress < 1) {
            requestAnimationFrame(animateIntro);
        } else {
            heroReady = true;
        }
    }

    requestAnimationFrame(animateIntro);
}

// ============================================
// MOUSE PARALLAX
// ============================================

function setupMouseParallax() {
    function onMouseMove(e) {
        if (elements.cube && window.scrollY < window.innerHeight * 0.3) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (e.clientX - centerX) / centerX * 8;
            const moveY = (e.clientY - centerY) / centerY * 8;

            elements.cube.style.transform = `rotateX(${-12 + moveY}deg) rotateY(${-20 + moveX}deg)`;
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    return function cleanup() {
        document.removeEventListener('mousemove', onMouseMove);
    };
}

// ============================================
// PROBLEM CARDS CAROUSEL
// ============================================

function setupProblemCards() {
    const problemCards = document.querySelectorAll('.problem-card');

    if (problemCards.length === 0) {
        console.warn('[cosmos-layers] Problem cards not found');
        return;
    }

    // Get case study keys in order
    const caseKeys = Object.keys(caseStudies);
    let currentIndex = 0;

    // Create carousel modal element
    const modal = document.createElement('div');
    modal.className = 'case-modal';
    modal.innerHTML = `
        <div class="case-modal-backdrop"></div>
        <div class="case-modal-container">
            <button class="case-modal-close" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4L16 16M4 16L16 4"/>
                </svg>
            </button>
            <button class="case-modal-nav case-modal-prev" aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18L9 12L15 6"/>
                </svg>
            </button>
            <div class="case-modal-content">
                <div class="case-modal-image"></div>
                <div class="case-modal-body">
                    <p class="case-modal-problem"></p>
                    <h3 class="case-modal-title"></h3>
                    <p class="case-modal-description"></p>
                </div>
            </div>
            <button class="case-modal-nav case-modal-next" aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18L15 12L9 6"/>
                </svg>
            </button>
            <div class="case-modal-dots"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const backdrop = modal.querySelector('.case-modal-backdrop');
    const container = modal.querySelector('.case-modal-container');
    const content = modal.querySelector('.case-modal-content');
    const closeBtn = modal.querySelector('.case-modal-close');
    const prevBtn = modal.querySelector('.case-modal-prev');
    const nextBtn = modal.querySelector('.case-modal-next');
    const dotsContainer = modal.querySelector('.case-modal-dots');
    const modalImage = modal.querySelector('.case-modal-image');
    const modalProblem = modal.querySelector('.case-modal-problem');
    const modalTitle = modal.querySelector('.case-modal-title');
    const modalDesc = modal.querySelector('.case-modal-description');

    // Create dots
    caseKeys.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'case-modal-dot';
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.case-modal-dot');

    function updateContent(index, direction = 0) {
        const caseKey = caseKeys[index];
        const caseData = caseStudies[caseKey];
        if (!caseData) return;

        // Animate out then in
        const xOut = direction * -30;
        const xIn = direction * 30;

        gsap.to(content, {
            opacity: 0,
            x: xOut,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
                // Update content
                modalImage.style.background = `url('${caseData.image}') center/cover no-repeat`;
                modalProblem.textContent = caseData.problem;
                modalTitle.textContent = caseData.company;
                modalDesc.textContent = caseData.description;

                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });

                // Animate in
                gsap.fromTo(content,
                    { opacity: 0, x: xIn },
                    { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }
                );
            }
        });
    }

    function goToSlide(index) {
        const direction = index > currentIndex ? 1 : -1;
        currentIndex = index;
        updateContent(currentIndex, direction);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % caseKeys.length;
        updateContent(currentIndex, 1);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + caseKeys.length) % caseKeys.length;
        updateContent(currentIndex, -1);
    }

    function openModal(caseKey) {
        currentIndex = caseKeys.indexOf(caseKey);
        if (currentIndex === -1) currentIndex = 0;

        const caseData = caseStudies[caseKey];
        if (!caseData) return;

        // Set initial content without animation
        modalImage.style.background = `url('${caseData.image}') center/cover no-repeat`;
        modalProblem.textContent = caseData.problem;
        modalTitle.textContent = caseData.company;
        modalDesc.textContent = caseData.description;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Show modal with animation
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(container,
            { opacity: 0, scale: 0.95, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
    }

    function closeModal() {
        gsap.to(container, { opacity: 0, scale: 0.95, y: 20, duration: 0.2, ease: 'power2.in' });
        gsap.to(backdrop, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // Event listeners
    problemCards.forEach(card => {
        card.addEventListener('click', () => {
            const caseKey = card.dataset.case;
            openModal(caseKey);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    console.log('[cosmos-layers] Problem cards modal initialized');
}

// ============================================
// INITIALIZATION
// ============================================

export function init() {
    console.log('[cosmos-layers] Initializing scroll controller...');

    try {
        // Cache DOM references
        elements.cosmos = document.getElementById('cosmos');
        elements.cubeContainer = document.getElementById('cubeContainer');
        elements.cube = document.getElementById('cube');
        elements.cubeFaces = document.querySelectorAll('.cube-face');
        elements.prismaticCore = document.getElementById('prismaticCore');
        elements.refractionRays = document.getElementById('refractionRays');
        elements.rays = document.querySelectorAll('.ray');
        elements.foreground = document.getElementById('foreground');
        elements.mainTitle = document.getElementById('mainTitle');
        elements.tagline = document.getElementById('tagline');
        elements.tags = document.getElementById('tags');
        elements.scrollIndicator = document.getElementById('scrollIndicator');
        elements.nebulas = document.querySelectorAll('.nebula');
        elements.bgTransition = document.getElementById('bgTransition');
        elements.prismaticSpotlights = document.getElementById('prismaticSpotlights');
        elements.prismRefraction = document.getElementById('prismRefraction');
        elements.challengesSection = document.getElementById('scene2');
        elements.transitionSection = document.getElementById('sceneTransition');

        // Verify critical elements exist
        const critical = ['cube', 'cubeContainer', 'mainTitle', 'tagline', 'tags', 'scrollIndicator'];
        for (const key of critical) {
            if (!elements[key]) {
                console.error(`[cosmos-layers] Missing critical element: ${key}`);
            }
        }

        // Setup throttled scroll handler (rAF-based)
        const scrollHandler = createScrollHandler(handleScroll);
        scrollHandler.attach();
        console.log('[cosmos-layers] Scroll handler attached');

        // Start hero intro animation
        startHeroIntro(scrollHandler);
        console.log('[cosmos-layers] Hero intro animation started');

        // Setup scene observer for visibility
        const sceneObserver = createSceneObserver('.scene');
        sceneObserver.observe();
        console.log('[cosmos-layers] Scene observer active');

        // Pause cosmos animations when scrolled (performance)
        const cosmosAnimController = createAnimationController('#cosmos');
        cosmosAnimController.observe();

        // Mouse parallax
        const cleanupParallax = setupMouseParallax();

        // Initialize rainbow grid glow
        const cleanupRainbowGrid = initRainbowGrid();

        // Problem cards modal
        setupProblemCards();

        // Debounced resize handler
        const handleResize = debounce(() => {
            scrollHandler.update();
        }, 200);

        window.addEventListener('resize', handleResize);

        console.log('[cosmos-layers] Initialization complete');

        // Return cleanup function
        return function cleanup() {
            scrollHandler.detach();
            sceneObserver.disconnect();
            cosmosAnimController.disconnect();
            cleanupParallax();
            if (cleanupRainbowGrid) cleanupRainbowGrid();
            window.removeEventListener('resize', handleResize);
        };
    } catch (error) {
        console.error('[cosmos-layers] Initialization failed:', error);
    }
}
