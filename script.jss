/* =========================================
   ZAVMERIN — TEMPLATE SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       TEMPLATE DATA
    ========================= */

    const templates =
        window.zavmerinTemplates || [];


    /* =========================
       TEMPLATE GRID
    ========================= */

    const templateGrid =
        document.querySelector(".template-grid");


    if (!templateGrid) {
        return;
    }


    /* =========================
       CREATE TEMPLATE CARDS
    ========================= */

    templateGrid.innerHTML = "";


    templates.forEach(function (template) {

        const card =
            document.createElement("article");

        card.className =
            "template-card";

        card.dataset.category =
            template.category;


        card.innerHTML = `

            <div class="template-image">

                ${
                    template.badge
                        ? `
                            <span class="template-badge">
                                ${template.badge}
                            </span>
                          `
                        : ""
                }

                <img
                    src="./${template.image}"
                    alt="${template.title} template"
                >

            </div>


            <div class="template-info">

                <p class="template-number">
                    ${template.number}
                </p>

                <h3>
                    ${template.title}
                </h3>

                <p>
                    ${template.description}
                </p>

                <a
                    href="product.html?template=${template.id}"
                    class="template-button"
                >
                    View Template →
                </a>

            </div>

        `;


        templateGrid.appendChild(card);

    });


    /* =========================
       GET ELEMENTS
    ========================= */

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );

    const templateCards =
        document.querySelectorAll(
            ".template-card"
        );

    const filterStatus =
        document.getElementById(
            "filter-status"
        );

    const viewAllButton =
        document.getElementById(
            "view-all-button"
        );

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    /* =========================
       FILTER TEMPLATES
    ========================= */

    function filterTemplates(category) {

        templateCards.forEach(function (card, index) {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";


                setTimeout(function () {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                }, index * 60);


            } else {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(10px)";


                setTimeout(function () {

                    card.style.display = "none";

                }, 250);

            }

        });


        /* Active filter */

        filterButtons.forEach(function (button) {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });


        /* Filter status */

        if (filterStatus) {

            filterStatus.textContent =
                category === "all"
                    ? "Showing all templates"
                    : "Showing " +
                      category +
                      " templates";

        }

    }


    /* =========================
       FILTER BUTTONS
    ========================= */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterTemplates(
                    button.dataset.filter
                );

            }
        );

    });


    /* =========================
       CATEGORY CARDS
    ========================= */

    categoryCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const filter =
                    card.dataset.filter;


                filterTemplates(filter);


                const templatesSection =
                    document.getElementById(
                        "templates"
                    );


                if (templatesSection) {

                    setTimeout(function () {

                        templatesSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }

            }
        );

    });


    /* =========================
       VIEW ALL
    ========================= */

    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            function () {

                filterTemplates("all");

            }
        );

    }


    /* =========================
       CARD REVEAL
    ========================= */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        templateCards.forEach(function (card) {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(20px)";

            card.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";


            revealObserver.observe(card);

        });

    } else {

        templateCards.forEach(function (card) {

            card.style.opacity = "1";

        });

    }


    /* =========================
       BUTTON PRESS EFFECT
    ========================= */

    const interactiveButtons =
        document.querySelectorAll(
            ".hero-button, " +
            ".template-button, " +
            ".contact-button, " +
            ".buy-button"
        );


    interactiveButtons.forEach(function (button) {

        button.addEventListener(
            "mousedown",
            function () {

                button.style.transform =
                    "scale(0.97)";

            }
        );


        button.addEventListener(
            "mouseup",
            function () {

                button.style.transform = "";

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                button.style.transform = "";

            }
        );

    });


    /* =========================
       INITIAL FILTER
    ========================= */

    filterTemplates("all");

});