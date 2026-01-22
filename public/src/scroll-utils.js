/**
 * Scroll Utilities
 * Performance-optimized scroll handling with requestAnimationFrame throttling
 */

/**
 * Creates a throttled scroll handler using requestAnimationFrame
 * Ensures scroll callbacks only fire once per frame (60fps max)
 */
export function createScrollHandler(callback) {
    let ticking = false;
    let lastScrollY = 0;

    function onScroll() {
        lastScrollY = window.scrollY;

        if (!ticking) {
            requestAnimationFrame(() => {
                callback(lastScrollY);
                ticking = false;
            });
            ticking = true;
        }
    }

    return {
        attach() {
            window.addEventListener('scroll', onScroll, { passive: true });
            // Initial call
            callback(window.scrollY);
        },
        detach() {
            window.removeEventListener('scroll', onScroll);
        },
        // Force an update (useful after resize)
        update() {
            callback(window.scrollY);
        }
    };
}

/**
 * Debounce function for resize handlers
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
export function debounce(fn, delay = 200) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Animation visibility controller
 * Pauses CSS animations when elements are off-screen
 */
export function createAnimationController(elements, options = {}) {
    const { rootMargin = '50px', threshold = 0 } = options;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.remove('animation-paused');
            } else {
                entry.target.style.animationPlayState = 'paused';
                entry.target.classList.add('animation-paused');
            }
        });
    }, { rootMargin, threshold });

    const elementList = typeof elements === 'string'
        ? document.querySelectorAll(elements)
        : elements;

    return {
        observe() {
            elementList.forEach(el => observer.observe(el));
        },
        disconnect() {
            observer.disconnect();
        }
    };
}

/**
 * Scene visibility observer for scroll-triggered reveals
 */
export function createSceneObserver(scenes, options = {}) {
    const {
        onEnter = () => {},
        onLeave = () => {},
        threshold = 0.3
    } = options;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                onEnter(entry.target);
            } else {
                onLeave(entry.target);
            }
        });
    }, {
        threshold,
        rootMargin: '-10% 0px -10% 0px'
    });

    const sceneList = typeof scenes === 'string'
        ? document.querySelectorAll(scenes)
        : scenes;

    return {
        observe() {
            sceneList.forEach(scene => observer.observe(scene));
        },
        disconnect() {
            observer.disconnect();
        }
    };
}
