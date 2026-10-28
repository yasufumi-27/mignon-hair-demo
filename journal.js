import {openDialog,closeDialog} from './interaction.js?v=20261028-1';
export const articles=[
 {id:'october-edit',type:'特集',date:'2026.10.27',title:'今月のおすすめ。秋の暮らしを整える6つのヒント',intro:'身につけるもの、部屋に置くもの、ひと息つく時間。いつもの毎日を少し変える、秋のセレクション。',image:'assets/photos/interior.jpg',category:'home',sections:[['まずは、小さな場所から','部屋全体を模様替えしなくても、よく座る場所の照明や、机の上の小物を一つ変えるだけで気分は変わります。色を増やしすぎず、木の色・白・落ち着いたグリーンなど、好きな色を軸に選んでみましょう。'],['秋を楽しむ6つのアイデア','① やさしい灯りを一つ置く。② お気に入りのカップを決める。③ 朝のコーヒーをゆっくり淹れる。④ バッグの中を整える。⑤ ヘアアクセサリーで質感を足す。⑥ 音楽を楽しむ時間をつくる。大きな買い替えより、日常の一場面から始めるのがおすすめです。'],['選ぶ前に、使う場面を想像する','サイズや見た目だけでなく、どこに置くか、いつ使うかまで考えると選びやすくなります。商品ページで寸法・素材・お手入れ方法を確認し、今持っているものとの組み合わせも楽しんでください。']]},
 {id:'autumn-campaign',type:'キャンペーン',date:'2026.10.26',title:'AUTUMN DAYS｜秋のお気に入りを見つけよう',intro:'ファッションからホームアイテムまで。カテゴリを越えて巡る、秋のキャンペーン企画。',image:'assets/photos/bag.jpg',category:'fashion',sections:[['テーマは「毎日使いたくなるもの」','持ち歩くバッグ、くつろぐ部屋の道具、身につける小さなアクセント。秋の暮らしに取り入れたいアイテムを、使う場面ごとに紹介するキャンペーンのデモです。'],['開催内容（デモ設定）','掲載期間：2026年10月26日〜11月15日。対象：ファッション・ホーム・ヘアアクセサリーの紹介商品。期間や対象カテゴリを確認して商品一覧へ進む、キャンペーンページの構成例です。'],['ご利用について','この企画は画面確認用です。実際のセール・割引・クーポン配布は実施していません。掲載写真・価格はサンプルで、注文や決済はできません。']]},
 {id:'hair-style',type:'コラム',date:'2026.10.24',title:'忙しい朝に。ヘアアクセサリーを選ぶ3つの視点',intro:'シュシュ、カチューシャ、クリップ。気分やシーンに合った選び方で、毎日のアレンジを楽しむ。',image:'assets/product-1.svg',category:'hair',sections:[['1．仕上がりの雰囲気で選ぶ','やわらかな印象にしたい日は布のシュシュ、顔まわりをすっきり見せたい日はカチューシャ、ラフにまとめたい日はクリップ。なりたい雰囲気を先に決めると、候補を絞りやすくなります。'],['2．髪の量とサイズを確認する','同じ形でも、大きさや留める部分の構造はさまざまです。写真だけで決めず、商品ページの寸法を確認しましょう。使う部分の髪の量に合うかを考えるのがポイントです。'],['3．服と色をつなぐ','バッグや靴と色をそろえると、装いにまとまりが生まれます。ベージュやブラウンを普段使いに、明るい色をアクセントに。お気に入りを保存して比較すると、手持ちの服に合う一つを探しやすくなります。']]},
 {id:'coffee-time',type:'記事',date:'2026.10.22',title:'コーヒーから始める、休日の小さな習慣',intro:'スマートフォンを少し置いて。香りを楽しむ数分を、休日のスタートに。',image:'assets/photos/coffee.jpg',category:'food',sections:[['道具を増やす前に、時間をつくる','最初から道具をそろえる必要はありません。いつものカップで、落ち着いて飲める場所を決めるところから始めてみましょう。窓際やベランダなど、少し景色が変わる場所も気分転換になります。'],['好みを一言メモしてみる','香ばしい、すっきり、ミルクと合わせたい。専門的な言葉でなくても、飲んだ印象を残しておくと次に選ぶヒントになります。焙煎や原材料、保存方法など、商品表示も一緒に確認してください。'],['片付けまでを一つの流れに','飲み終えたら道具を洗って乾かし、次に使いやすい場所へ。準備から片付けまで無理なくできる形なら、気軽に続けられます。自分のペースで楽しむことを大切に。']]},
 {id:'evening-light',type:'特集',date:'2026.10.20',title:'夜の部屋を楽しむ、灯りと余白のつくり方',intro:'仕事が終わった後の部屋を、くつろぐための場所へ。テーブルランプを中心に考える空間づくり。',image:'assets/photos/lamp.jpg',category:'home',sections:[['明るさだけでなく、光の向きを見る','部屋全体を均等に照らすだけでなく、手元や壁に光を向けると印象が変わります。読書などの作業では十分な明るさを確保し、使う目的に合わせて照明を組み合わせましょう。'],['置く場所を先に測る','サイドテーブルの広さや、電源までの距離を確認してから選びます。コードが通路を横切らないか、周りに熱の影響を受けるものがないかも確認し、製品の取扱説明書に従って設置してください。'],['余白もインテリアの一部','ランプの横に置くものは、一冊の本や小さなトレイなど少なめに。お気に入りのものが引き立つ余白を残すと、日々の片付けもしやすくなります。']]},
 {id:'weekend-bag',type:'コラム',date:'2026.10.18',title:'身軽に出かける。週末バッグの中身を整える',intro:'必要なものだけを持って、いつもの街を歩く。バッグ選びと持ち物の見直しを一緒に。',image:'assets/photos/bottle.jpg',category:'outdoor',sections:[['行き先に合わせて、中身を決める','散歩、カフェ、買い物。どこへ行くかで必要な持ち物は変わります。一度すべて出して、今日使うものを選び直すと、バッグに必要な容量も見えてきます。'],['よく使うものの定位置をつくる','鍵やスマートフォンなど、取り出す回数の多いものは決まった場所へ。ポケットの数だけでなく、開口部の形や片手で取り出しやすいかも選ぶ際のポイントです。'],['持ち歩く道具もサイズを確認','ボトルやポーチを入れるなら、高さ・幅・重さのバランスを確認しましょう。身軽さを優先する日と荷物が多い日で、使い分けるのも一つの方法です。']]}
];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const href=a=>'article.html?id='+a.id;
const types=['すべて','キャンペーン','特集','コラム','記事'];
function card(a){return `<a class="journal-card" href="${href(a)}"><div class="journal-image"><img src="${esc(a.image)}" alt="" width="600" height="400" loading="lazy"><span>${esc(a.type)}</span></div><div class="journal-card-body"><time>${esc(a.date)}</time><h3>${esc(a.title)}</h3><p>${esc(a.intro)}</p><span class="journal-read">続きを読む ↗</span></div></a>`}
export function initJournal(){
 const $=s=>document.querySelector(s),view=document.body.dataset.view;
 $('.header-inner').insertAdjacentHTML('afterbegin','<button class="menu-toggle" aria-label="メニューを開く" aria-controls="site-menu" aria-expanded="false"><span aria-hidden="true">☰</span><small>メニュー</small></button>');
 document.body.insertAdjacentHTML('beforeend',`<dialog id="site-menu" aria-labelledby="site-menu-title"><div class="menu-top"><h2 id="site-menu-title">メニュー</h2><button class="menu-close" aria-label="メニューを閉じる">×</button></div><p class="eyebrow">EXPLORE MIGNON MARKET</p><nav aria-label="サイトメニュー"><a href="index.html">ホーム <span>→</span></a><a href="catalog.html">商品を探す <span>→</span></a><a href="campaigns.html" class="menu-campaign">キャンペーン <small>特集・コラム・記事もこちら</small><span>→</span></a><a href="favorites.html">お気に入り <span>→</span></a><a href="cart.html">カート <span>→</span></a></nav><p class="menu-note">日々の暮らしに、小さな発見を。<br>商品と読みものを、ひとつの場所で。</p></dialog>`);
 const menu=$('#site-menu'),toggle=$('.menu-toggle');
 toggle.addEventListener('click',()=>{openDialog(menu);toggle.setAttribute('aria-expanded','true')});
 $('.menu-close').addEventListener('click',()=>closeDialog(menu));
 menu.addEventListener('close',()=>toggle.setAttribute('aria-expanded','false'));
 menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(menu)}});
 window.addEventListener('pagehide',()=>{if(menu.open)menu.close()});
 renderJournal();
}
export function renderJournal(){
 const $=s=>document.querySelector(s),view=document.body.dataset.view;
 document.querySelectorAll('.journal-home,.journal-page,.journal-article').forEach(e=>e.remove());
 if(view==='home')$('.benefit-strip').insertAdjacentHTML('afterend',`<section class="journal-home" aria-labelledby="journal-home-title"><div class="section-heading"><div><p class="eyebrow">NEWS & JOURNAL</p><h2 id="journal-home-title">今月の特集と、暮らしの読みもの。</h2></div><a class="text-link" href="campaigns.html">一覧を見る →</a></div><div class="journal-grid">${articles.map(card).join('')}</div></section>`);
 if(view!=='journal')return;
 $('#recent-section').hidden=true;
 const shell=$('main>.shell');
 if(location.pathname.endsWith('campaigns.html')){
 const requested=new URLSearchParams(location.search).get('type'),type=types.includes(requested)?requested:'すべて';
 const list=articles.filter(a=>type==='すべて'||a.type===type);
 shell.insertAdjacentHTML('afterbegin',`<section class="journal-page"><nav class="breadcrumbs"><a href="index.html">ホーム</a><span>/</span><span>キャンペーン・読みもの</span></nav><header class="journal-header"><p class="eyebrow">NEWS & JOURNAL</p><h1>キャンペーンと、<br>暮らしの読みもの。</h1><p>今月のおすすめから、毎日を楽しむ小さなヒントまで。</p><small>掲載内容はデモ用です。実際のキャンペーンは実施していません。</small></header><nav class="journal-tabs" aria-label="記事の種類">${types.map(t=>`<a href="campaigns.html${t==='すべて'?'':'?type='+encodeURIComponent(t)}" ${type===t?'aria-current="page"':''}>${t}</a>`).join('')}</nav><p class="journal-count">${list.length}件を掲載・新着順</p><div class="journal-grid">${list.map(card).join('')}</div></section>`);
 document.title='キャンペーン・特集・コラム | MIGNON MARKET';
 }else{
 const a=articles.find(a=>a.id===new URLSearchParams(location.search).get('id'));
 if(!a){shell.insertAdjacentHTML('afterbegin','<section class="journal-page"><h1>記事が見つかりません</h1><a class="primary" href="campaigns.html">一覧へ戻る</a></section>');document.title='記事が見つかりません | MIGNON MARKET';return}
 shell.insertAdjacentHTML('afterbegin',`<article class="journal-article"><nav class="breadcrumbs"><a href="index.html">ホーム</a><span>/</span><a href="campaigns.html">キャンペーン・読みもの</a><span>/</span><span>${esc(a.type)}</span></nav><header><div class="article-meta"><span>${esc(a.type)}</span><time>${esc(a.date)}</time><span>MIGNON JOURNAL</span></div><h1>${esc(a.title)}</h1><p class="article-intro">${esc(a.intro)}</p></header><img class="article-cover" src="${esc(a.image)}" alt="${esc(a.title)}のイメージ" width="1200" height="700"><div class="article-body">${a.sections.map(([h,p])=>`<section><h2>${esc(h)}</h2><p>${esc(p)}</p></section>`).join('')}<aside class="article-cta"><p>気になるアイテムを探してみませんか？</p><a class="primary" href="catalog.html?category=${esc(a.category)}">関連する商品を見る →</a></aside><p class="article-notice">この記事はデモ用の編集コンテンツです。写真・商品・価格はイメージで、実際の販売・キャンペーンは行いません。</p><a class="text-link" href="campaigns.html">← キャンペーン・読みもの一覧へ</a></div><section class="article-related"><h2>こちらの読みものも</h2><div class="journal-grid">${articles.filter(b=>b.id!==a.id).slice(0,3).map(card).join('')}</div></section></article>`);
 document.title=a.title+' | MIGNON MARKET';
 }
}
