/* Configure a same-origin secure form endpoint for production. Never add secrets here. */
window.AUREVIA_CONFIG = { formEndpoint: "", mapEmbedUrl: "" };
(() => {
    const subject = new URLSearchParams(location.search).get("subject");
    const field = document.querySelector("[name=subject]");
    if (subject && field) field.value = subject;
    document.querySelectorAll(".enquiry-form").forEach((form) =>
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const status = form.querySelector(".form-status");
            if (!form.reportValidity()) return;
            const payload = Object.fromEntries(new FormData(form));
            for (const [name, value] of Object.entries(payload)) {
                const input = form.elements.namedItem(name);
                if (input?.required && !value.trim()) {
                    input.setCustomValidity("Please enter a value, not only spaces.");
                    input.reportValidity();
                    input.addEventListener("input", () => input.setCustomValidity(""), {
                        once: true,
                    });
                    return;
                }
            }
            if (!window.AUREVIA_CONFIG.formEndpoint) {
                status.textContent =
                    form.dataset.form === "newsletter"
                        ? "Online registration is currently unavailable. No information was sent."
                        : "Online submission is currently unavailable. Your enquiry is valid, but has not been delivered. No information was sent or stored.";
                return;
            }
            const button = form.querySelector("button[type=submit]");
            button.disabled = true;
            status.textContent = "Sending your enquiry…";
            try {
                const response = await fetch(window.AUREVIA_CONFIG.formEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...payload, form: form.dataset.form }),
                });
                if (!response.ok) throw Error("Request failed");
                status.textContent = "Your enquiry has been submitted.";
                form.reset();
            } catch {
                status.textContent = "Your enquiry could not be sent. Please try again later.";
            } finally {
                button.disabled = false;
            }
        }),
    );
    const map = document.querySelector("#store-map"),
        url = window.AUREVIA_CONFIG.mapEmbedUrl;
    if (map && url.startsWith("https://www.google.com/maps/embed")) {
        const frame = document.createElement("iframe");
        frame.src = url;
        frame.title = "Store location map";
        frame.loading = "lazy";
        frame.referrerPolicy = "no-referrer-when-downgrade";
        map.replaceChildren(frame);
    }
})();
