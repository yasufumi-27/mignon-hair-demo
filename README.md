# MIGNON MARKET

A responsive, non-transactional general-commerce UI demo. Public preview:
https://yasufumi-27.github.io/mignon-hair-demo/

## Run

```sh
python3 -m http.server 4173
node --test tests/catalog.test.mjs
```

Open http://localhost:4173/ over HTTP (ES modules need HTTP; opening index.html directly as a file is not supported).

## Features

- 7 categories / 32 sample products; extensible data in catalog.js
- Global and category search, category-specific genres, color/price/stock filters
- Selected filter chips, clear/reset, sorting, 12-item pagination, URL-encoded filter state
- Product detail links (`?item=101`), accessible dialogs, favorites, recent history, cart quantity and deletion
- Up to 3 products compared by price/category/color/specification/stock
- Responsive navigation, collapsible mobile filters, mobile bottom navigation, reduced motion and focus states

Design sources and boundaries: DESIGN.md. Image source URLs: assets/photos/SOURCES.txt.

## Demo only

Products, brands, prices and specifications are fictional examples; stock photos are illustrative. No real sales, checkout, login, admin CRUD, AI model or SNS APIs. Favorites/cart/recent items persist in this browser only. GitHub Pages is not a production-commerce host:
https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Deployment

GitHub Pages publishes main branch root. `.nojekyll` is present. Relative asset paths work on project Pages URLs. No build step or secrets.
