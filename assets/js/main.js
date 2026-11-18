/* Shared navigation and catalogue behaviours. All content is present in static HTML. */
(() => {
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => [...document.querySelectorAll(s)];
    const icons = () => window.lucide?.createIcons();
    icons();
    const theme = $("#theme-toggle"),
        rtl = $("#rtl-toggle"),
        menu = $(".menu-toggle"),
        nav = $("#navigation");
    const themeLabel = () => {
        const dark = document.documentElement.dataset.theme === "dark";
        theme.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        theme.setAttribute("aria-pressed", dark);
        theme.title = theme.getAttribute("aria-label");
        theme.innerHTML = '<i data-lucide="' + (dark ? 'sun' : 'moon') + '" aria-hidden="true"></i>';
        icons();
    };
    themeLabel();
    theme.addEventListener("click", () => {
        const value = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = value;
        window.aureviaPreference("theme", value);
        themeLabel();
    });
    const directionLabel = () => {
        const isRtl = document.documentElement.dir === "rtl";
        rtl.setAttribute("aria-pressed", isRtl);
        rtl.setAttribute("aria-label", isRtl ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
        rtl.title = rtl.getAttribute("aria-label");
        rtl.innerHTML = '<span class="control-label">' + (isRtl ? 'LTR' : 'RTL') + '</span>';
        icons();
    };
    directionLabel();
    rtl.addEventListener("click", () => {
        const value = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
        document.documentElement.dir = value;
        window.aureviaPreference("dir", value);
        directionLabel();
    });
    const setMenuOpen = (open) => {
        if (!menu || !nav) return;
        nav.classList.toggle("open", open);
        menu.setAttribute("aria-expanded", open);
        menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        menu.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '" aria-hidden="true"></i>';
        icons();
    };
    menu?.addEventListener("click", () => {
        setMenuOpen(!nav.classList.contains("open"));
    });
    nav?.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenuOpen(false);
    });
    matchMedia("(max-width: 1199px)").addEventListener("change", (event) => {
        if (!event.matches) setMenuOpen(false);
    });
    $$(".home-menu").forEach((dropdown) => {
        dropdown.querySelector("summary").addEventListener("click", (event) => {
            if (event.pointerType === "mouse" && dropdown.open) event.preventDefault();
        });
        dropdown.addEventListener("pointerenter", (event) => {
            if (event.pointerType === "mouse") dropdown.open = true;
        });
        dropdown.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse" && !dropdown.contains(document.activeElement))
                dropdown.open = false;
        });
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            $$(".home-menu[open]").forEach((x) => (x.open = false));
            const wasOpen = nav?.classList.contains("open");
            setMenuOpen(false);
            if (wasOpen) menu.focus();
        }
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".home-menu"))
            $$(".home-menu[open]").forEach((x) => (x.open = false));
        if (menu && !e.composedPath().includes(menu.closest(".header-inner"))) {
            setMenuOpen(false);
        }
    });
    $("[data-history-back]")?.addEventListener("click", () => {
        if (document.referrer && history.length > 1) {
            history.back();
            return;
        }
        location.assign("index.html");
    });
    $(".back-top")?.addEventListener("click", () =>
        window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        }),
    );
    const params = new URLSearchParams(location.search);
    const allProducts = window.AUREVIA_PRODUCTS;
    const products = allProducts.slice(0, 12);
    if ($("#catalogue-grid")) {
        let category = params.get("category") || "";
        if (!products.some((x) => x.category === category)) category = "";
        const search = $("#product-search"),
            sort = $("#product-sort");
        if (["price-asc", "price-desc", "name"].includes(params.get("sort")))
            sort.value = params.get("sort");
        const update = () => {
            const term = search.value.trim().toLowerCase();
            let results = products.filter(
                (p) =>
                    (!category || p.category === category) &&
                    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term),
            );
            if (sort.value === "price-asc") results.sort((a, b) => a.price - b.price);
            if (sort.value === "price-desc") results.sort((a, b) => b.price - a.price);
            if (sort.value === "name") results.sort((a, b) => a.name.localeCompare(b.name));
            $("#catalogue-grid").innerHTML = results
                .map(
                    (p) =>
                        `<article class="product-card" data-price="${p.price}"><a class="product-media" href="product-details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" width="600" height="600" loading="lazy"></a><div class="product-body"><span class="small">${p.category}</span><h3><a href="product-details.html?id=${p.id}">${p.name}</a></h3><div class="product-bottom"><span>$${p.price.toFixed(2)} <small>/ ${p.id === 3 ? "ream" : "each"}</small></span><a class="round-link" aria-label="View ${p.name}" href="product-details.html?id=${p.id}"><i data-lucide="arrow-right"></i></a></div></div></article>`,
                )
                .join("");
            $("#product-count").textContent =
                `${results.length} ${results.length === 1 ? "product" : "products"}${category ? " in " + category : ""}`;
            $("#empty-state").hidden = results.length > 0;
            $$(".category-filter").forEach((b) => {
                const selected = b.dataset.category === category;
                b.classList.toggle("selected", selected);
                b.setAttribute("aria-pressed", selected);
            });
            icons();
        };
        $$(".category-filter").forEach((b) =>
            b.addEventListener("click", () => {
                category = b.dataset.category;
                update();
                $(".catalogue-toolbar").scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                    block: "start",
                });
            }),
        );
        search.addEventListener("input", update);
        sort.addEventListener("change", update);
        $("#clear-filters").addEventListener("click", () => {
            search.value = "";
            category = "";
            sort.value = "featured";
            update();
        });
        update();
    }
    if ($("#gallery-main")) {
        const p = allProducts.find((x) => x.id === Number(params.get("id"))) || products[0];
        $$("[data-product-name]").forEach((n) => (n.textContent = p.name));
        $("#detail-category").textContent = p.category;
        $("#detail-price").innerHTML =
            `$${p.price.toFixed(2)} <small>/ ${p.id === 3 ? "ream" : "each"} · indicative price</small>`;
        $("#detail-description").textContent = p.description;
        $(".product-enquire").href = "contact.html?subject=" + encodeURIComponent(p.name);
        document.title = p.name + " | Velmont";
        if (p.id !== 1) {
            $("#gallery-main").src = p.image;
            $("#gallery-main").alt = p.name;
            $(".gallery-thumbnails").hidden = true;
            $("#specifications").innerHTML =
                `<tr><th scope="row">Product</th><td>${p.name}</td></tr><tr><th scope="row">Category</th><td>${p.category}</td></tr><tr><th scope="row">Indicative price</th><td>$${p.price.toFixed(2)} USD</td></tr><tr><th scope="row">Materials & pack sizes</th><td>Confirm available options with your enquiry</td></tr><tr><th scope="row">Ordering</th><td>Individual and bulk enquiries</td></tr>`;
        }
        $$(".gallery-thumb").forEach((b) =>
            b.addEventListener("click", () => {
                $("#gallery-main").src = b.querySelector("img").src;
                $("#gallery-main").alt = b.querySelector("img").alt;
                $$(".gallery-thumb").forEach((x) => x.classList.toggle("selected", x === b));
            }),
        );
    }
    const workspaces = [
        [
            "A calmer corner for focused work.",
            "Bring order to your home office with a journal, reliable writing tools and a few carefully chosen desk accessories.",
            "../assets/images/workspaces/home-office.webp",
            "Sunlit home office with a writing desk and stationery",
        ],
        [
            "Equip the whole team, thoughtfully.",
            "Bring your supply list together with paper, filing essentials and writing tools for corporate workspaces.",
            "../assets/images/workspaces/corporate-office.webp",
            "Meeting table arranged with stationery for a corporate team",
        ],
        [
            "Good tools for the next chapter.",
            "Notebooks, pens and study essentials for daily lessons, revision and the ideas in between.",
            "../assets/images/workspaces/student-desk.webp",
            "Study desk with an open notebook and writing essentials",
        ],
        [
            "Give your creativity room to move.",
            "Sketchbooks, pencils and art supplies for experiments, first drafts and finished pieces.",
            "../assets/images/workspaces/creative-studio.webp",
            "Creative studio workbench with sketchbook, paints and drawing tools",
        ],
    ];
    $$("[data-workspace]").forEach((b, i, all) => {
        b.addEventListener("click", () => {
            all.forEach((x) => x.setAttribute("aria-selected", x === b));
            $("#workspace-title").textContent = workspaces[i][0];
            $("#workspace-description").textContent = workspaces[i][1];
            $("#workspace-image").src = workspaces[i][2];
            $("#workspace-image").alt = workspaces[i][3];
            $("#workspace-panel").setAttribute("aria-labelledby", b.id);
        });
        b.addEventListener("keydown", (e) => {
            if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                let n =
                    e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 3
                          : (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                all[n].focus();
                all[n].click();
            }
        });
    });
})();
