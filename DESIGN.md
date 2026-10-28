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

All products, prices, specifications and availability are sample data. Photos are illustrative stock imagery and do not represent actual inventory or affiliation with visible manufacturers. No invented reviews, sales counts, shipping promises or discounts. No checkout, customer identity, payment processing, AI learning, or advertising event transmission. Recommended sorting is editorial demo order, not personalized AI.

## Assets

Photographs: Unsplash image CDN; source URLs in assets/photos/SOURCES.txt. Decorative hair accessory illustrations are original SVGs. Fonts use Google Fonts with system fallbacks. On product image stock photos, colors and depicted models can differ from the fictional variant/specification; detail dialogs state this explicitly.

## Validation

Run `node --test tests/catalog.test.mjs` for category/genre/asset consistency, compound filters, availability and sorting. Manual browser checks cover category/genre/price combinations, comparison, product detail, cart persistence and quantity totals. GitHub Pages publishes this directory directly; no build dependencies.


## 2026-10-27 storefront refinement

Reference: Shopify Japan, 「売れるECサイトのデザイン：7つのポイントと12の参考サイト」 (2025-02-18), https://www.shopify.com/jp/blog/best-ecommerce-sites . Reviewed all twelve descriptions; inspected Francfranc's live home visually and Vermicular / Kinokuniya current navigation via their official pages.

Applied principles: prominent search and imagery (Francfranc); early category entrances and varied editorial scale (STAYFUL); product context (AJUGA, GREEN SPOON); visual rhythm (reed, Yamamoto); clear information and help access (Vermicular, Kinokuniya); convenient persistent actions (FABRIC TOKYO); browsing across categories and saving (ZOZO); strong material/scene photography (Unagi no Nedoko, Daikanyama Seikaten).

Original implementation: full-bleed photographic hero, live latest-article link, early category entrances, eight database-backed selections, asymmetric journal layout, larger catalog cards with genre labels, lower-positioned editorial recommendations, related products by category, an intersection-controlled cart action, and explicit demo help. Existing motion remains below the primary shopping entrances. No retailer assets, promotional promises, sales figures, reviews, or exact layouts were copied. Conversion improvement requires actual usage measurement; it is not established by the demo.

QA: desktop and 390px layouts, category and multi-filter navigation, article links, detail/back/cart flow, dynamic content rendering. Shared admin/API endpoints remain unchanged.


## 2026-10-28 — 余白と、操作に応じた動き

参考：Apple 日本トップページ https://www.apple.com/jp/ 、Google ストア https://store.google.com/jp/?hl=ja 。大きな見出し、写真を主役にする構成、短い購入導線を参考に、MIGNONの落ち着いた色と写真で組み直した。

- トップは大きな文字とアーチ形の写真を組み合わせる。「くつろぐ／出かける／自分をいたわる」を選ぶと、写真・背景色・紹介商品・カテゴリへのリンクが切り替わる。紹介商品の名前と価格は共有データから取得する。
- スクロールでは見出しや商品が短く立ち上がる。デスクトップの写真のみ最大26px動かし、通常のスクロールを妨げない。スマートフォンでは写真の移動を止める。
- 注目商品は一つを大きく見せ、利用者が前後のボタンで切り替える。従来の自動切り替え・常時浮遊する演出と、重複するテーマ紹介を整理した。
- カテゴリ、商品、読みもの、利用ガイドに余白と大きさの差をつけた。検索・絞り込み・比較・お気に入り・カートの導線は継続する。
- 「動き：オフ」をタブ内で記憶する。端末の「視差効果を減らす」設定も尊重する。表示のためにJavaScriptで要素を隠したままにする設計は使わない。

実装：experience.css / experience.js。追加ライブラリ、画像、動画は不要。GitHub Pagesと既存の管理サービスの接続を継続。

確認：1280pxと390pxで表示・横方向のはみ出し・画像読込を確認。3シーンの切替、TabとEnterでの操作、動きの停止とページ間の引継ぎ、検索、ヘアアクセサリー＋1,000円以下＋在庫ありの複合絞込（3件）、お気に入り、2商品の比較、詳細、カート追加、数量2で25,600円になることをブラウザーで確認。既存のカタログテスト3件も成功。端末設定による動きの抑制は実装済みだが、実機のOS設定切替は未確認。
