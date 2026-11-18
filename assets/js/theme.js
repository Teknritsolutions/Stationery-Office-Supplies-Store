/* Apply preferences before paint. Storage is optional in private/file contexts. */
(() => {
    let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
        dir = "ltr";
    try {
        theme = localStorage.getItem("aurevia-theme") || theme;
        dir = localStorage.getItem("aurevia-dir") || dir;
    } catch {}
    document.documentElement.dataset.theme = theme;
    document.documentElement.dir = dir;
    window.aureviaPreference = (key, value) => {
        try {
            localStorage.setItem("aurevia-" + key, value);
        } catch {}
    };
})();
