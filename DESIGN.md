# MIGNON MARKET — design decisions

Updated 2026-10-26. A non-transactional multi-category storefront demo.

## Principles applied

- Apple HIG, Searching: one prominent search location, visible category scope, suggestions, removable scope/filter chips, clearable history. https://developer.apple.com/design/human-interface-guidelines/searching
- Microsoft Fluent 2, Layout: consistent 4/8px spacing scale, visual grouping, responsive reflow, progressively disclosed filters on narrow screens. https://fluent2.microsoft.design/layout
- Google Material / Android accessibility: named icon buttons, visible selected/focus/disabled states, generous touch targets and reduced-motion support. https://developer.android.com/guide/topics/ui/accessibility/apps

These are design references, not certification or an exact implementation of the vendors' design systems. Interactive states and keyboard behavior require ongoing QA.

## Delivered experience

Seven categories, 32 sample products; category-specific genres, cross-category search, price/color/availability filters, individually removable chips, sorting and 12-item pagination. URL query parameters preserve filtering and can open a specific product via `?item=101`. Favorites, cart, and recent items use namespaced browser-local storage. Compare up to three products. Native dialogs provide focus containment and Escape handling. Responsive layouts use breakpoints at 600, 900, and 1200px.

## Honest demonstration boundaries

All products, prices, specifications and availability are sample data. Photos are illustrative stock imagery and do not represent actual inventory or affiliation with visible manufacturers. No invented reviews, sales counts, shipping promises or discounts. No checkout, customer identity, payment processing, admin backend, AI learning, or advertising event transmission. Recommended sorting is editorial demo order, not personalized AI.

## Assets

Photographs: Unsplash image CDN; source URLs in assets/photos/SOURCES.txt. Decorative hair accessory illustrations are original SVGs. Fonts use Google Fonts with system fallbacks. On product image stock photos, colors and depicted models can differ from the fictional variant/specification; detail dialogs state this explicitly.

## Validation

Run `node --test tests/catalog.test.mjs` for category/genre/asset consistency, compound filters, availability and sorting. Manual browser checks cover category/genre/price combinations, comparison, product detail, cart persistence and quantity totals. GitHub Pages publishes this directory directly; no build dependencies.
