document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("nav-burger");
    const navList = document.getElementById("nav-list");
    const backToTop = document.getElementById("back-to-top");

    // Мобільне меню
    burger?.addEventListener("click", () => {
        // Виправлено: використовуємо класи 'is-open', які вже є в CSS
        navList.classList.toggle("is-open");
        burger.classList.toggle("is-open");

        const expanded = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", (!expanded).toString());
    });

    // Закриття меню після натискання на лінк
    document.querySelectorAll(".nav__link").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("is-open");
            burger.classList.remove("is-open");
            burger.setAttribute("aria-expanded", "false");
        });
    });

    // Плавний скрол
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Фіксована навігація
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("nav--scrolled");
        } else {
            nav.classList.remove("nav--scrolled");
        }

        // Кнопка нагору (Виправлено на 'is-visible')
        if (window.scrollY > 500) {
            backToTop.classList.add("is-visible");
        } else {
            backToTop.classList.remove("is-visible");
        }
    });

    // Активний пункт меню
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav__link").forEach(link => {
            link.classList.remove("nav__link--active");
            const href = link.getAttribute("href");
            if (href === `#${current}`) {
                link.classList.add("nav__link--active");
            }
        });
    });

    // Вкладки годівлі
    const tabs = document.querySelectorAll(".feed-tab");
    const contents = document.querySelectorAll(".feed-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach(btn => btn.classList.remove("feed-tab--active"));
            contents.forEach(content => content.classList.add("feed-content--hidden"));

            tab.classList.add("feed-tab--active");
            document.getElementById(`tab-${target}`)?.classList.remove("feed-content--hidden");
        });
    });
});