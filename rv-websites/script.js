/* =========================================================
   RV WEBSITES CREATION
   Main JavaScript
   Works with the current index.html + style.css
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    const revealElements = document.querySelectorAll(".reveal");

    const faqItems = document.querySelectorAll(".faq-item");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const portfolioCards =
        document.querySelectorAll(".portfolio-card");

    const backToTop =
        document.getElementById("backToTop");

    const yearElement =
        document.getElementById("year");


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            const isOpen =
                navigation.classList.toggle("open");

            menuButton.classList.toggle(
                "open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close mobile menu when clicking a link */

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");

                menuButton.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       HEADER SHADOW WHEN SCROLLING
       ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 25) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 80;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       SCROLL REVEAL ANIMATION
       CSS EXPECTS:
       .reveal
       .reveal.show
       ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            function (element, index) {

                /*
                 * Slight stagger effect.
                 */

                element.style.transitionDelay =
                    (index * 45) + "ms";

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
         * Fallback for older browsers.
         */

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
       CURRENT CSS EXPECTS:
       .faq-item.active
       ===================================================== */

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }


        question.addEventListener(
            "click",
            function () {

                const isActive =
                    item.classList.contains("active");


                /*
                 * Close every other FAQ.
                 */

                faqItems.forEach(
                    function (otherItem) {

                        if (otherItem !== item) {

                            otherItem.classList.remove(
                                "active"
                            );

                            const otherQuestion =
                                otherItem.querySelector(
                                    ".faq-question"
                                );

                            if (otherQuestion) {

                                otherQuestion.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }

                    }
                );


                /*
                 * Toggle selected FAQ.
                 */

                if (isActive) {

                    item.classList.remove(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    item.classList.add(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });


    /* =====================================================
       OUR WORK / PORTFOLIO FILTER
       ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    button.getAttribute(
                        "data-filter"
                    );


                /*
                 * Change active filter button.
                 */

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );


                /*
                 * Filter portfolio cards.
                 */

                portfolioCards.forEach(
                    function (card) {

                        const category =
                            card.getAttribute(
                                "data-category"
                            );


                        const shouldShow =
                            filter === "all" ||
                            category === filter;


                        if (shouldShow) {

                            card.classList.remove(
                                "hidden"
                            );

                            /*
                             * Small animation restart.
                             */

                            card.style.animation =
                                "none";

                            void card.offsetWidth;

                            card.style.animation =
                                "";

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       PORTFOLIO CARD MOUSE EFFECT
       ===================================================== */

    portfolioCards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                /*
                 * Disable tilt on mobile/tablet.
                 */

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg) " +
                    "translateY(-6px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       SERVICE CARD HOVER EFFECT
       ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -1.5;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    1.5;


                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg) " +
                    "translateY(-7px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       PRICING CARD MICRO ANIMATION
       ===================================================== */

    const pricingServices =
        document.querySelectorAll(
            ".price-service"
        );


    pricingServices.forEach(
        function (service) {

            service.addEventListener(
                "mouseenter",
                function () {

                    service.classList.add(
                        "hovered"
                    );

                }
            );


            service.addEventListener(
                "mouseleave",
                function () {

                    service.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    /* =====================================================
       DEVOPS TAG ANIMATION
       ===================================================== */

    const techTags =
        document.querySelectorAll(
            ".tech-tags span, .devops-tags span"
        );


    techTags.forEach(
        function (tag, index) {

            tag.style.transitionDelay =
                (index * 50) + "ms";

        }
    );


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    updateBackToTop();


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       WHATSAPP LINK
       ===================================================== */

    const whatsappNumber =
        "917846071360";


    const whatsappMessage =
        "Hi Mithun, I saw your RV Websites Creation website and I'm interested in creating a website for my business.";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
            whatsappMessage
        );


    /*
     * Update all WhatsApp links automatically.
     *
     * This includes:
     * - Hero WhatsApp button
     * - Final CTA WhatsApp button
     * - Floating WhatsApp button
     */

    document
        .querySelectorAll(
            'a[href*="wa.me"]'
        )
        .forEach(function (link) {

            link.setAttribute(
                "href",
                whatsappURL
            );

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .nav-cta, .filter-btn"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                /*
                 * Do not interfere with
                 * normal navigation.
                 */

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "js-ripple";


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    (
                        event.clientX -
                        rect.left
                    ) + "px";


                ripple.style.top =
                    (
                        event.clientY -
                        rect.top
                    ) + "px";


                button.appendChild(
                    ripple
                );


                setTimeout(
                    function () {

                        ripple.remove();

                    },
                    650
                );

            }
        );

    });


    /* =====================================================
       HERO PARALLAX EFFECT
       ===================================================== */

    const hero =
        document.querySelector(".hero");


    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        hero &&
        heroVisual
    ) {

        hero.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth < 1000) {
                    return;
                }


                const rect =
                    hero.getBoundingClientRect();


                const mouseX =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const mouseY =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                heroVisual.style.transform =
                    "translate3d(" +
                    (mouseX * 8) +
                    "px, " +
                    (mouseY * 6) +
                    "px, 0)";

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                heroVisual.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       REDUCED MOTION ACCESSIBILITY
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /*
     * Listen for system motion preference changes.
     */

    if (
        typeof reducedMotion.addEventListener ===
        "function"
    ) {

        reducedMotion.addEventListener(
            "change",
            function (event) {

                document.documentElement.classList.toggle(
                    "reduce-motion",
                    event.matches
                );

            }
        );

    }


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%cRV WEBSITES CREATION",
        "font-size:18px;font-weight:800;"
    );

    console.log(
        "Website JavaScript loaded successfully."
    );

});

/* =========================================================
   PREMIUM 2026 INTERACTIONS
   Add at the VERY END of script.js
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       PREMIUM CURSOR LIGHT
       Desktop only
       ===================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        window.addEventListener(
            "mousemove",
            function (event) {

                mouseX = event.clientX;
                mouseY = event.clientY;

            },
            {
                passive: true
            }
        );


        function animateCursor() {

            glowX +=
                (mouseX - glowX) * 0.12;

            glowY +=
                (mouseY - glowY) * 0.12;


            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();

    }


    /* =====================================================
       PREMIUM CARD POINTER LIGHT
       ===================================================== */

    const premiumCards =
        document.querySelectorAll(
            ".service-card, " +
            ".benefit-card, " +
            ".type-card, " +
            ".portfolio-card, " +
            ".process-card, " +
            ".feature-item"
        );


    premiumCards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.innerWidth < 900
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--pointer-x",
                        x + "px"
                    );


                    card.style.setProperty(
                        "--pointer-y",
                        y + "px"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.removeProperty(
                        "--pointer-x"
                    );

                    card.style.removeProperty(
                        "--pointer-y"
                    );

                }
            );

        }
    );


    /* =====================================================
       PREMIUM MAGNETIC BUTTONS
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn-primary, .nav-cta"
        );


    magneticButtons.forEach(
        function (button) {

            button.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.innerWidth < 900
                    ) {
                        return;
                    }


                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        "translate(" +
                        (x * 0.08) +
                        "px, " +
                        (y * 0.08) +
                        "px)";

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.style.transform =
                        "";

                }
            );

        }
    );


    /* =====================================================
       ACTIVE SECTION — BETTER SCROLL FEEL
       ===================================================== */

    let scrollTimeout;

    window.addEventListener(
        "scroll",
        function () {

            document.body.classList.add(
                "is-scrolling"
            );


            clearTimeout(
                scrollTimeout
            );


            scrollTimeout =
                setTimeout(
                    function () {

                        document.body.classList.remove(
                            "is-scrolling"
                        );

                    },
                    120
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       HERO PARALLAX — DESKTOP ONLY
       ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            function (event) {

                if (
                    window.innerWidth < 1000
                ) {
                    return;
                }


                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                const laptop =
                    heroVisual.querySelector(
                        ".laptop"
                    );


                const phone =
                    heroVisual.querySelector(
                        ".phone"
                    );


                if (laptop) {

                    laptop.style.transform =
                        "perspective(1100px) " +
                        "rotateY(" +
                        (-5 + x * 5) +
                        "deg) " +
                        "rotateX(" +
                        (y * -3) +
                        "deg) " +
                        "translateY(" +
                        (y * -8) +
                        "px)";

                }


                if (phone) {

                    phone.style.transform =
                        "translate(" +
                        (x * 8) +
                        "px, " +
                        (y * -8) +
                        "px) rotate(2deg)";

                }

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            function () {

                const laptop =
                    heroVisual.querySelector(
                        ".laptop"
                    );


                const phone =
                    heroVisual.querySelector(
                        ".phone"
                    );


                if (laptop) {
                    laptop.style.transform =
                        "";
                }


                if (phone) {
                    phone.style.transform =
                        "";
                }

            }
        );

    }


    /* =====================================================
       PERFORMANCE SAFETY
       ===================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


})();