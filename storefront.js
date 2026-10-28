import {products,categories} from './catalog.js';
import {articles} from './journal.js?v=20261028-1';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yen=n=>'¥'+n.toLocaleString('ja-JP');
function miniCard(p){return `<a class="selection-card" href="product.html?item=${p.id}"><div><img src="${esc(p.image)}" alt="${esc(p.name)}" width="450" height="450" loading="lazy">${p.tag?`<span>${esc(p.tag)}</span>`:''}<i aria-hidden="true">↗</i></div><small>${esc(categories.find(c=>c.id===p.category)?.name)}</small><h3>${esc(p.name)}</h3><p>${yen(p.price)} <small>税込</small></p></a>`}
let dockObserver;
export function renderStorefront(){
 dockObserver?.disconnect();
 const $=s=>document.querySelector(s),view=document.body.dataset.view;
 document.querySelectorAll('.home-selection,.season-note,.shopping-guide,.detail-related,.purchase-dock').forEach(e=>e.remove());
 if(view==='home'){
 // Category entrances and actual items come before long editorial sections.
 const hero=$('.hero'),category=$('.category-section'),journal=$('.journal-home'),spot=$('.spotlight'),stories=$('.stories');
 (document.querySelector('.experience-foot')||hero).after(category);
 const picks=[...products].sort((a,b)=>a.rank-b.rank).slice(0,8);
 category.insertAdjacentHTML('afterend',`<section class="home-selection"><div class="section-heading"><div><p class="eyebrow">THE MARKET EDIT</p><h2>今、気になるもの。</h2><p class="section-description">身につけるものから、部屋で使うものまで。</p></div><a class="text-link" href="catalog.html">商品をすべて見る <span>→</span></a></div><div class="selection-grid">${picks.map(miniCard).join('')}</div></section>`);
 const selection=$('.home-selection');if(spot)selection.after(spot);if(journal)(spot||selection).after(journal);if(stories)(journal||spot||selection).after(stories);
 const latest=articles[0];
 $('.hero-copy .hero-secondary')?.remove();
 if(latest){$('.hero-copy>.primary').insertAdjacentHTML('afterend',`<a class="hero-secondary" href="article.html?id=${encodeURIComponent(latest.id)}">最新の特集を読む <span>↗</span></a>`);category.insertAdjacentHTML('beforebegin',`<a class="season-note" href="article.html?id=${encodeURIComponent(latest.id)}"><span>JOURNAL UPDATE</span><time>${esc(latest.date)}</time><strong>${esc(latest.title)}</strong><b aria-hidden="true">→</b></a>`)}
 $('.benefit-strip').hidden=true;
 }
 // Real demo facts rather than fictional reviews, delivery promises or discounts.
 const guide=`<section class="shopping-guide" id="shopping-guide"><div><p class="eyebrow">BEFORE YOU EXPLORE</p><h2>気持ちよく選ぶために。</h2><p>知りたいことを、すぐ見つかる場所へ。</p></div><div class="guide-questions"><details><summary>商品は購入できますか？ <span>＋</span></summary><p>こちらはデザイン・操作確認用のデモです。カート操作を体験できますが、注文・決済・配送は行いません。送料・返品条件も本番公開前にご案内します。</p></details><details><summary>気になる商品を保存するには？ <span>＋</span></summary><p>商品のハートを押すと、お気に入りに保存できます。会員登録は不要です。お気に入りとカートは、お使いのブラウザーに保存されます。</p><a href="favorites.html">お気に入りを見る →</a></details><details><summary>商品の違いを比べたいときは？ <span>＋</span></summary><p>商品一覧の「比較」を選ぶと、最大3点の価格・仕様・色・在庫を並べて確認できます。写真や仕様はデモ用のサンプルです。</p><a href="catalog.html">商品一覧で比較する →</a></details></div></section>`;
 if(view==='home')$('.closing').insertAdjacentHTML('beforebegin',guide);
 if(view==='product'){
 const id=Number(new URLSearchParams(location.search).get('item')),p=products.find(p=>p.id===id);if(!p)return;
 const related=products.filter(q=>q.category===p.category&&q.id!==p.id).slice(0,4);
 const detail=$('#detail-content');
 if(related.length)detail.insertAdjacentHTML('beforeend',`<section class="detail-related"><div class="section-heading"><div><p class="eyebrow">MORE TO DISCOVER</p><h2>同じカテゴリのアイテム</h2></div><a class="text-link" href="catalog.html?category=${p.category}">一覧へ →</a></div><div class="selection-grid">${related.map(miniCard).join('')}</div></section>`);
 detail.insertAdjacentHTML('beforeend',guide);
 detail.insertAdjacentHTML('afterend',`<div class="purchase-dock"><div><small>${esc(p.name)}</small><strong>${yen(p.price)} <span>税込</span></strong></div><button class="primary" data-add="${p.id}" ${p.stock?'':'disabled'}>${p.stock?'デモカートに入れる':'在庫なし'} <span aria-hidden="true">＋</span></button></div>`);
 dockObserver=new IntersectionObserver(([entry])=>{const dock=$('.purchase-dock');if(dock)dock.hidden=entry.isIntersecting},{threshold:.1});dockObserver.observe($('.detail-actions'));
 }
}
