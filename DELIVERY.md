# Stackly delivery report

## Pages

| File | Main content sections |
|---|---:|
| pages/index.html | 10 |
| pages/home-2.html | 10 |
| pages/products.html | 6 |
| pages/product-details.html | 6 |
| pages/new-arrivals.html | 6 |
| pages/bulk-orders.html | 6 |
| pages/about.html | 6 |
| pages/contact.html | 6 |
| pages/404.html | 1 |
| pages/coming-soon.html | 1 |

Header and footer are excluded from section counts. Documentation is a separate complete page.

## Assets

74 original content photographs generated using the built-in image_gen tool, optimized to local WebP. All 74 files have different SHA-256 hashes and are used. No image is shared between separate static content sections. Gallery thumbnail reuse occurs within the same gallery. Selected product detail routes reuse their product record image where appropriate. Exact prompts, subjects, hashes, file sizes, pages and section usage: documentation/image-inventory.json. Images are organized into home-1, home-2, products, product-details, new-arrivals, bulk-orders, about, contact and shared folders.

Original stacked-paper logo: assets/images/branding/logo.svg. Matching favicon: assets/images/branding/favicon.svg. Inter, Bootstrap 5 and Lucide are hosted locally. See documentation/THIRD-PARTY.md.

## Interactions

Accessible Home dropdown; responsive hamburger menu with Escape close; persistent light/dark and RTL controls; system theme detection; category filtering; keyword search; price/name sorting; empty-state reset; selected-product details; journal gallery; workspace tabs with keyboard navigation; FAQ accordions; product-to-enquiry subject prefill; contact, bulk and interest form validation; phone validation; honest demo submission states; configurable POST endpoint and map; back-to-top.

## Verification

Headless Chrome using Playwright. Ten pages × sixteen widths × light/dark × LTR/RTL = 640 layout checks. Widths: 320, 360, 375, 390, 420, 480, 576, 640, 768, 820, 992, 1024, 1280, 1366, 1440, 1920 pixels. No overflow, clipped checked text, missing images, broken local links or JavaScript errors were found in the final run. Dark and RTL layouts passed; full-page screenshots were captured for all ten pages in combined dark/RTL and light/LTR at desktop/mobile. Direct file opening, bulk/contact/interest demo states, invalid phone handling and key interactions were tested. See tests/qa-report.json and tests/screenshots.

Reference access and review limits are documented in documentation/reference-review.md. Native browser WebKit/Firefox, real devices and assistive-technology sessions were not tested. Production form submission, actual delivery/pricing/availability, hosting and a real map remain unconfigured. No live business claims are implied by demo content.

## Run

Open index.html directly, or run `node scripts/serve.cjs` and visit http://127.0.0.1:4173. No package install is needed to run the static site. Stop with Ctrl+C. See documentation/index.html for customization. Before production, replace demo business details and illustrative copy; connect and verify a secure form endpoint; set the map; and replace example.com in sitemap.xml and robots.txt. No public deployment was performed for this local HTML template request.

## File organization update

All ten website pages are now in `pages/`. Root `index.html` is only a static-host entry redirect. Internal navigation, dynamic product image paths, documentation links, sitemap and QA scripts have been adjusted for this structure.
