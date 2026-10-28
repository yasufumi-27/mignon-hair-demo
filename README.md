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

Products, brands, prices and specifications are fictional examples; stock photos are illustrative. No real sales, checkout, AI model or SNS APIs. Favorites/cart/recent items persist in this browser only. GitHub Pages is not a production-commerce host:
https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Deployment

GitHub Pages publishes main branch root. `.nojekyll` is present. Relative asset paths work on project Pages URLs. No build step or secrets.

## ページ遷移と履歴復元

- `index.html`: ホーム、`catalog.html`: 商品検索、`favorites.html`: お気に入り、`product.html?item=107`: 商品詳細、`cart.html`: カート。
- 絞り込み・並び替え・ページ番号はクエリに保持し、通常のドキュメント遷移でブラウザ履歴に追加する。検索は送信時に確定する。
- 履歴エントリーごとのスクロール位置、フィルター開閉、検索入力途中の内容、比較選択をsessionStorageへ保存する。pageshowでURLの条件を再読込し、BFCache復元時も画面と条件を一致させる。
- カート・お気に入りの変更は戻る操作で取り消さず、保存された最新データを反映する。
- ローカルブラウザ確認：カテゴリ→ジャンル→価格→戻る／進む、詳細→戻る、390pxでフィルター開閉復元。Safari実機は別途確認対象。

## 商品・記事の管理

管理画面: https://mignon-market-admin.fr8znvd4wp.chatgpt.site/admin.html

商品と記事はSitesの共有D1データベースから取得する。管理画面の保存で公開サイトへ反映（表示中のページは約3秒間隔で変更確認）。初期読込失敗時は未接続メッセージを表示し、静的な初期データへ戻さない。通信断中は最後に取得した内容と警告を表示する。

管理画面は別サービス `../mignon-admin-service`。公開APIは公開中の項目だけを返し、管理APIはパスワード認証が必要。パスワードをこのGitHubリポジトリに保存しない。画像アップロードはR2。

ローカルで管理サービスを5173番、店舗を4174番で起動するとローカルAPIへ接続する（4173番では公開APIで表示確認）。


## 2026-10-28 デザイン更新

トップの3つのシーン切替、大きな文字と写真、スクロールに合わせた登場演出を追加。操作を優先し、常時動く商品紹介は手動切替へ変更した。トップの「動き：オン／オフ」で演出を切り替えられる。設定はタブ内のページ移動でも保持する。端末の動きを減らす設定が有効な場合は、そちらを優先する。

画面の見せ方は `experience.css` と `experience.js`、注目商品は `motion.js`。詳しい意図と検証結果は `DESIGN.md` を参照。
