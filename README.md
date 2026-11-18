# Stackly — Stationery & Office Supplies

Complete static HTML catalogue and bulk-enquiry template.

Run: `node scripts/serve.cjs`, then visit http://127.0.0.1:4173. Alternatively open `index.html` directly. No install or build required.

Pages: index, home-2 (10 sections each); products, product-details, new-arrivals, bulk-orders, about, contact (6 each); 404 and coming-soon (1 each).

See documentation/index.html for customization, product records, image inventory, form integration, theme and RTL support. Edit scripts/build.cjs for shared content and run `node scripts/build.cjs` to regenerate HTML and product data.

74 original generated photographs are optimized locally to WebP. No external asset network requests are required.

Forms are demo-only until a backend is configured. Map, business details, sitemap domain and illustrative copy must be customized before production.

Validation: tests/qa-report.json. Browser QA requires Playwright and installed Chrome; the bundled QA script currently references the available workspace Playwright installation. No browser dependency is needed to run the website.

## File organization

```text
stationery-office-supplies/
??? index.html              # Root entry ? pages/index.html
??? pages/                  # All ten website pages
??? assets/                 # CSS, JavaScript, images, fonts and libraries
??? documentation/          # Template guide and image inventory
??? scripts/                # Build and local preview tools
??? tests/                  # QA scripts, reports and screenshots
??? package.json
??? README.md
??? DELIVERY.md
??? sitemap.xml
??? robots.txt
```

All website page source files live in `pages/`: `index.html`, `home-2.html`, `products.html`, `product-details.html`, `new-arrivals.html`, `bulk-orders.html`, `about.html`, `contact.html`, `404.html`, and `coming-soon.html`. The root `index.html` is only a small entry redirect for static hosting. Page assets use `../assets/`; links between website pages stay relative within `pages/`. Configure your host to use `pages/404.html` for custom errors.
