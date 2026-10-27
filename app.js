import {renderCoupon} from './coupons.js?v=20261027-10';
import {initInteractions,navigateSoft,openDialog,closeDialog} from './interaction.js?v=20261027-9';
import {renderStorefront} from './storefront.js?v=20261027-10';
import {loadLive,watchLive} from './live-store.js?v=20261027-10';
import {initJournal,renderJournal} from './journal.js?v=20261027-10';
import {initMotion} from './motion.js?v=20261027-8';
import {categories,colors,products,categoryName,filterProducts} from './catalog.js';
await loadLive();
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const yen=n=>'¥'+n.toLocaleString('ja-JP');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',heart:'<path d="M20.7 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.7-8.5a5.5 5.5 0 0 0 0-7.8Z"/>',bag:'<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',home:'<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z"/>',sliders:'<path d="M3 6h5m4 0h9M3 18h10m4 0h4"/><circle cx="10" cy="6" r="2"/><circle cx="15" cy="18" r="2"/>'};
const icon=name=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.grid}</svg>`;
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const find=id=>products.find(p=>p.id===Number(id));
function read(key,fallback){try{return JSON.parse(localStorage.getItem('market-v2-'+key))??fallback}catch{return fallback}}
function validIds(value){return Array.isArray(value)?[...new Set(value.filter(id=>Number.isInteger(id)&&find(id)))]:[]}
let favorites=validIds(read('favorites',[]));
let recent=validIds(read('recent',[])).slice(0,6);
let cart=read('cart',{});
if(!cart||typeof cart!=='object'||Array.isArray(cart))cart={};
cart=Object.fromEntries(Object.entries(cart).filter(([id,q])=>find(id)?.stock&&Number.isInteger(q)&&q>0&&q<=20));
let compared=[];
const initial={category:'all',genre:'all',query:'',price:'all',colors:[],stock:false,sort:'recommended',favoritesOnly:false,page:1};
let state={...initial,colors:[]};
function readURL(){
 const p=new URLSearchParams(location.search);
 state={...initial,colors:[]};
 if(categories.some(c=>c.id===p.get('category')))state.category=p.get('category');
 if(categories.find(c=>c.id===state.category)?.genres.includes(p.get('genre')))state.genre=p.get('genre');
 state.query=p.get('q')||'';
 if(['1000','3000','10000','30000'].includes(p.get('price')))state.price=p.get('price');
 state.colors=p.getAll('color').filter(c=>c in colors);
 state.stock=p.get('stock')==='1';state.favoritesOnly=location.pathname.endsWith('/favorites.html')||p.get('saved')==='1';
 if(['low','high','new'].includes(p.get('sort')))state.sort=p.get('sort');
 state.page=Math.max(1,Number.parseInt(p.get('page')||'1',10)||1);
}
const route=location.pathname.split('/').pop()||'index.html';
const isHome=route==='index.html'&&!location.search&&!location.hash;
const entryId=history.state?.marketEntry||crypto.randomUUID();
history.replaceState({...history.state,marketEntry:entryId},'');
history.scrollRestoration='manual';
function rememberView(){
 const view={x:scrollX,y:scrollY,filters:$('#filters').open,query:$('#search').value,searchCategory:$('#search-category').value,compared,draft:draftFilters(),navX:$('#navigation').scrollLeft};
 try{sessionStorage.setItem('market-view-'+entryId,JSON.stringify(view));sessionStorage.setItem('market-nav-x',String(view.navX))}catch{}
}
function restoreNavigation(view){
 let x=view?.navX;
 if(!Number.isFinite(x)){try{x=Number(sessionStorage.getItem('market-nav-x'))}catch{x=0}}
 $('#navigation').scrollLeft=Math.max(0,Number.isFinite(x)?x:0);
}
function restoreView(){
 let view;try{view=JSON.parse(sessionStorage.getItem('market-view-'+entryId))}catch{}
 if(view){restoreDraft(view.draft);$('#filters').open=view.filters;$('#search').value=view.query;$('#search-category').value=view.searchCategory;compared=validIds(view.compared).slice(0,3);$$('[data-compare]').forEach(e=>e.checked=compared.includes(Number(e.dataset.compare)));renderCompareBar();}
 restoreNavigation(view);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{restoreNavigation(view);window.scrollTo({left:view?.x||0,top:view?.y||0,behavior:'instant'})}));
}
function navigate(url){rememberView();navigateSoft(url)}
function listingURL(){
 const p=new URLSearchParams();
 if(state.category!=='all')p.set('category',state.category);
 if(state.genre!=='all')p.set('genre',state.genre);
 if(state.query)p.set('q',state.query);
 if(state.price!=='all')p.set('price',state.price);
 state.colors.forEach(c=>p.append('color',c));
 if(state.stock)p.set('stock','1');
 if(state.sort!=='recommended')p.set('sort',state.sort);if(state.page>1)p.set('page',state.page);
 return (state.favoritesOnly?'favorites.html':'catalog.html')+(p.size?'?'+p:'');
}
function goListing(){navigate(listingURL())}
function returnToList(){
 if(document.referrer&&new URL(document.referrer).origin===location.origin&&new URL(document.referrer).pathname.startsWith(new URL('./',location.href).pathname)){history.back()}
 else navigate('catalog.html');
}
window.addEventListener('pagehide',rememberView);
window.addEventListener('pageshow',()=>{readURL();favorites=validIds(read('favorites',[]));cart=read('cart',{});if(!cart||typeof cart!=='object'||Array.isArray(cart))cart={};cart=Object.fromEntries(Object.entries(cart).filter(([id,q])=>find(id)?.stock&&Number.isInteger(q)&&q>0&&q<=20));render();if(route==='cart.html')renderCart();if(route==='product.html'&&find(new URLSearchParams(location.search).get('item')))detail(new URLSearchParams(location.search).get('item'));renderStorefront();save();restoreView()});
function save(){try{localStorage.setItem('market-v2-favorites',JSON.stringify(favorites));localStorage.setItem('market-v2-cart',JSON.stringify(cart));localStorage.setItem('market-v2-recent',JSON.stringify(recent));}catch{toast('保存が制限されています。データは今回の操作中のみ保持します。')}$('#cart-count').textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),3000)}
function buildControls(){
 $('#search-category').innerHTML='<option value="all">全カテゴリ</option>'+categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
 $('#navigation').innerHTML='<button data-action="all" data-nav="all">すべての商品</button>'+[...categories.filter(c=>c.id==='hair'),...categories.filter(c=>c.id!=='hair')].map(c=>`<button data-category="${c.id}" data-nav="${c.id}">${c.name}</button>`).join('');
 $('#category-grid').innerHTML=categories.map(c=>`<button class="category-card" data-category="${c.id}"><span class="category-image"><img src="${c.id==='hair'?'assets/product-1.svg':`assets/photos/${c.image}.jpg`}" alt="" loading="lazy"></span><strong>${c.name}</strong><small>${c.en}</small></button>`).join('');
 $('#category-filters').innerHTML=[{id:'all',name:'すべての商品'},...categories].map(c=>`<label class="filter-option"><input type="radio" name="category" value="${c.id}"><span>${c.name}</span><small>${c.id==='all'?products.length:products.filter(p=>p.category===c.id).length}</small></label>`).join('');
 $('#color-filters').innerHTML=Object.entries(colors).map(([name,color])=>`<label class="color-option"><input type="checkbox" name="color" value="${name}"><span class="swatch" style="background:${color}"></span>${name}</label>`).join('');
 $('#search-suggestions').innerHTML=['ヘッドホン','バッグ','コーヒー','シュシュ','カチューシャ','チェア','ボトル','スキンケア'].map(v=>`<option value="${v}">`).join('');
}
function syncControls(){
 if($('#search').value!==state.query)$('#search').value=state.query;$('#search-category').value=state.category;$('#price').value=state.price;$('#stock').checked=state.stock;$('#sort').value=state.sort;
 $$('[name=category]').forEach(el=>el.checked=el.value===state.category);
 $$('[name=color]').forEach(el=>el.checked=state.colors.includes(el.value));
 const cat=categories.find(c=>c.id===state.category);
 $('#genre-field').hidden=!cat;
 $('#genre').innerHTML='<option value="all">ジャンル全件</option>'+(cat?.genres||[]).map(g=>`<option>${g}</option>`).join('');$('#genre').value=state.genre;
 $$('#navigation [data-action=home]').forEach(el=>el.setAttribute('aria-current',String(isHome)));
 $$('[data-nav]').forEach(el=>el.setAttribute('aria-current',String(!isHome&&['catalog.html','favorites.html'].includes(route)&&el.dataset.nav===state.category)));
 $$('[data-action=favorites]').forEach(el=>el.setAttribute('aria-pressed',String(state.favoritesOnly)));
}
function draftFilters(){return {category:$('[name=category]:checked')?.value||'all',genre:$('#genre').value,price:$('#price').value,colors:$$('[name=color]:checked').map(e=>e.value),stock:$('#stock').checked}}
function draftGenre(category,genre='all'){
 const cat=categories.find(c=>c.id===category);$('#genre-field').hidden=!cat;
 $('#genre').innerHTML='<option value="all">ジャンル全件</option>'+(cat?.genres||[]).map(g=>`<option>${g}</option>`).join('');
 $('#genre').value=cat?.genres.includes(genre)?genre:'all';
}
function restoreDraft(d){if(!d)return;$$('[name=category]').forEach(e=>e.checked=e.value===d.category);draftGenre(d.category,d.genre);$('#price').value=d.price;$$('[name=color]').forEach(e=>e.checked=d.colors.includes(e.value));$('#stock').checked=d.stock;}
function applyFilters(){Object.assign(state,draftFilters(),{page:1});goListing()}
function clearDraft(){restoreDraft({...initial,colors:[]});}
let galleryTimer;
function startGallery(){
 clearInterval(galleryTimer);
 const gallery=$('#gallery');if(!gallery)return;
 let index=0,paused=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const slides=[...gallery.querySelectorAll('.gallery-slide')];
 const show=n=>{index=(n+slides.length)%slides.length;slides.forEach((e,i)=>e.hidden=i!==index);gallery.querySelectorAll('[data-slide]').forEach((e,i)=>e.setAttribute('aria-pressed',String(i===index)));$('#gallery-count').textContent=`${index+1} / ${slides.length}`;};
 const toggle=()=>$('#gallery-pause').textContent=paused?'自動再生':'一時停止';
 gallery.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='gallery-pause'){paused=!paused;toggle()}else{if(b.dataset.slide!==undefined)show(Number(b.dataset.slide));else if(b.dataset.step)show(index+Number(b.dataset.step));}});
 galleryTimer=setInterval(()=>{if(!paused&&!document.hidden&&!gallery.matches(':hover')&&!gallery.contains(document.activeElement))show(index+1)},4500);
 show(0);toggle();
}
window.addEventListener('pagehide',()=>clearInterval(galleryTimer));
function productCard(p){return `<article class="product"><button class="product-image" data-detail="${p.id}" aria-label="${escape(p.name)}の詳細"><img src="${escape(p.image)}" alt="${escape(p.name)}のイメージ" loading="lazy" width="400" height="400">${!p.stock?'<span class="tag sold">SOLD OUT</span>':p.tag?`<span class="tag">${escape(p.tag)}</span>`:''}</button><button class="heart" data-favorite="${p.id}" aria-pressed="${favorites.includes(p.id)}" aria-label="${escape(p.name)}をお気に入り${favorites.includes(p.id)?'から削除':'に追加'}">${icon('heart')}</button><p class="product-brand">${escape(p.brand)}</p><h3><button data-detail="${p.id}">${escape(p.name)}</button></h3><p class="product-desc">${escape(p.description)}</p><span class="product-genre">${escape(p.genre)}</span><p class="price">${yen(p.price)}<small>税込</small></p><div class="product-meta"><span><i class="swatch" style="background:${colors[p.color]}"></i>${escape(p.color)}</span><label class="compare-check"><input type="checkbox" data-compare="${p.id}" ${compared.includes(p.id)?'checked':''} aria-label="${escape(p.name)}を比較">比較</label></div></article>`}
function render(){
 syncControls();
 const list=filterProducts({...state,favorites});const pages=Math.max(1,Math.ceil(list.length/12));state.page=Math.min(state.page,pages);
 const title=state.favoritesOnly?'お気に入り':state.genre!=='all'?state.genre:categoryName(state.category);
 $('#catalog-title').textContent=title;$('#breadcrumb-current').textContent=state.category==='all'?title:categoryName(state.category)+(state.genre!=='all'?' / '+state.genre:'');
 const start=(state.page-1)*12;
 $('#result-count').textContent=list.length?`${list.length}件中 ${start+1}–${Math.min(start+12,list.length)}件を表示`:'0件の商品';
 $('#products').innerHTML=list.slice(start,start+12).map(productCard).join('');$('#empty').hidden=list.length>0;
 const chips=[];
 if(state.query)chips.push(['query',`検索：${state.query}`]);if(state.category!=='all')chips.push(['category',categoryName(state.category)]);if(state.genre!=='all')chips.push(['genre',state.genre]);if(state.price!=='all')chips.push(['price',`${yen(Number(state.price))}以下`]);state.colors.forEach(c=>chips.push(['color:'+c,c]));if(state.stock)chips.push(['stock','在庫あり']);if(state.favoritesOnly)chips.push(['favoritesOnly','お気に入り']);
 $('#filter-chips').innerHTML=chips.map(([key,label])=>`<button class="chip" data-clear="${escape(key)}" aria-label="${escape(label)}を解除">${escape(label)}<span aria-hidden="true">×</span></button>`).join('');
 $('#pagination').innerHTML=pages>1?`<button data-page="${state.page-1}" ${state.page===1?'disabled':''} aria-label="前のページ">←</button>`+Array.from({length:pages},(_,i)=>`<button data-page="${i+1}" aria-label="${i+1}ページ目" ${state.page===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')+`<button data-page="${state.page+1}" ${state.page===pages?'disabled':''} aria-label="次のページ">→</button>`:'';
 renderRecent();renderCompareBar();
}
function renderRecent(){ $('#recent-section').hidden=!recent.length||['campaigns.html','article.html'].includes(route);$('#recent-products').innerHTML=recent.map(id=>find(id)).filter(Boolean).map(p=>`<button data-detail="${p.id}"><img src="${escape(p.image)}" alt="" loading="lazy">${escape(p.name)}<strong>${yen(p.price)}</strong></button>`).join('');}
function reset(){state={...initial,colors:[],favoritesOnly:route==='favorites.html'};goListing()}
function chooseCategory(id){state.category=id;state.genre='all';state.page=1;state.favoritesOnly=false;goListing()}
function detail(id){const p=find(id);if(!p)return;const photos=p.images?.length?p.images.map((src,i)=>({src,label:`画像${i+1}`,view:0})):['全体','ディテール','質感'].map((label,i)=>({src:p.image,label,view:i}));recent=[p.id,...recent.filter(x=>x!==p.id)].slice(0,6);save();renderRecent();$('#detail-content').innerHTML=`<div class="detail-grid"><div><div id="gallery" role="region" aria-label="商品画像スライド"><div class="gallery-stage">${photos.map(({src,label,view},i)=>`<figure class="gallery-slide gallery-view-${view}" ${i?'hidden':''}><img class="detail-image" src="${escape(src)}" alt="${escape(p.name)}・${label}のイメージ" width="600" height="600"><figcaption>${label}</figcaption></figure>`).join('')}</div><div class="gallery-controls"><button data-step="-1" aria-label="前の画像">←</button><span id="gallery-count"></span><button data-step="1" aria-label="次の画像">→</button><button id="gallery-pause">一時停止</button></div><div class="gallery-thumbs">${photos.map(({src,label},i)=>`<button data-slide="${i}" aria-label="${label}の画像を表示"><img src="${escape(src)}" alt=""><span>${label}</span></button>`).join('')}</div></div><p class="sample-caption">${p.images?.length?'写真はデモ用のイメージです。':'デモでは同じサンプル画像の全体・拡大表示を切り替えます。'}実際の販売商品ではありません。</p></div><div class="detail-body"><p class="eyebrow">${escape(p.brand)}</p><h2 id="detail-title">${escape(p.name)}</h2><p>${escape(p.description)}</p><p class="price">${yen(p.price)}<small>税込・サンプル価格</small></p><dl><div><dt>カテゴリ</dt><dd>${categoryName(p.category)}</dd></div><div><dt>ジャンル</dt><dd>${escape(p.genre)}</dd></div><div><dt>カラー</dt><dd>${escape(p.color)}</dd></div><div><dt>仕様（サンプル）</dt><dd>${escape(p.spec)}</dd></div><div><dt>在庫（サンプル）</dt><dd>${p.stock?'在庫あり':'在庫なし'}</dd></div></dl><div class="detail-actions"><label>数量<select id="quantity" ${p.stock?'':'disabled'}>${[1,2,3,4,5].map(n=>`<option value="${n}">${n}</option>`).join('')}</select></label><button class="primary" data-add="${p.id}" ${p.stock?'':'disabled'}>${p.stock?'デモカートに入れる':'現在在庫がありません'}</button></div><button class="text-link" data-favorite="${p.id}">${favorites.includes(p.id)?'お気に入りから削除':'♡ お気に入りに保存'}</button><p class="sample-caption">このデモでは注文・決済・配送は行いません。</p><div class="detail-service"><span>写真・仕様はサンプルです</span><span>送料・返品条件：本番公開前にご案内</span><button class="text-link" data-action="guide">ご利用ガイドを見る →</button></div></div></div>`;
 $('#detail-dialog').dataset.item=p.id;if(!$('#detail-dialog').open)$('#detail-dialog').show();startGallery();if(document.body.dataset.view==='product')renderStorefront();
}
function add(id,quantity=1){const p=find(id);if(!p?.stock)return;const old=cart[id]||0;cart[id]=Math.min(20,old+quantity);save();toast(cart[id]===old?'1商品あたり20点まで追加できます':'デモカートに追加しました');}
function renderCart(){const items=Object.entries(cart);$('#cart-content').innerHTML=items.length?items.map(([id,q])=>{const p=find(id);return `<div class="cart-row"><img src="${escape(p.image)}" alt=""><div><h3>${escape(p.name)}</h3><p class="price">${yen(p.price)} <small>税込</small></p><div class="quantity-row"><button data-quantity="${id}" data-delta="-1" aria-label="${escape(p.name)}の数量を減らす">−</button><span>${q}</span><button data-quantity="${id}" data-delta="1" ${q>=20?'disabled':''} aria-label="${escape(p.name)}の数量を増やす">＋</button><button class="remove-item" data-remove="${id}">削除</button></div></div></div>`}).join('')+`<div class="cart-total"><span>商品合計（税込）</span><strong>${yen(items.reduce((total,[id,q])=>total+find(id).price*q,0))}</strong></div><div class="cart-notice">注文・決済はできません。<br>送料・配送日時は設定されていません。</div><button class="text-link close">買い物を続ける →</button>`:'<div class="empty"><h3>カートは空です</h3><p>気になる商品を見つけて、追加してみましょう。</p><button class="primary close">商品を見る</button></div>';renderCoupon(cart)}
function renderCompareBar(){ $('#compare-bar').hidden=!compared.length;$('#compare-count').textContent=`${compared.length} / 3点を選択中`; }
function showComparison(){if(!compared.length)return;$('#compare-content').innerHTML=`<div class="comparison-grid" style="--compare-columns:${compared.length}">${compared.map(id=>{const p=find(id);return `<article><img src="${escape(p.image)}" alt="${escape(p.name)}のイメージ"><h3>${escape(p.name)}</h3><p class="price">${yen(p.price)}</p><dl><dt>カテゴリ</dt><dd>${categoryName(p.category)}</dd><dt>カラー</dt><dd>${escape(p.color)}</dd><dt>仕様（サンプル）</dt><dd>${escape(p.spec)}</dd><dt>在庫（サンプル）</dt><dd>${p.stock?'在庫あり':'在庫なし'}</dd></dl><button class="primary" data-add="${p.id}" ${p.stock?'':'disabled'}>デモカートに追加</button></article>`}).join('')}</div>`;openDialog($('#compare-dialog'))}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();render();if($('#detail-dialog').open)detail(id);toast(favorites.includes(id)?'お気に入りに保存しました':'お気に入りから削除しました')}
const actions={'apply-filters':applyFilters,'clear-draft':clearDraft,all:()=>navigate('catalog.html'),reset:()=>reset(),home:()=>navigate('index.html'),new:()=>navigate('catalog.html?sort=new'),favorites:()=>navigate('favorites.html'),cart:()=>navigate('cart.html'),compare:showComparison,'clear-compare':()=>{compared=[];render()},'clear-recent':()=>{recent=[];save();renderRecent()},guide:()=>openDialog($('#guide-dialog')),'clear-data':()=>{favorites=[];cart={};recent=[];compared=[];save();render();toast('このブラウザの保存データを消去しました')}};
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 if(b.classList.contains('close')){const d=b.closest('dialog');if(['detail-dialog','cart-dialog'].includes(d.id)){returnToList()}else closeDialog(d);return}
 if(b.dataset.action){actions[b.dataset.action]?.();return}
 if(b.dataset.category){chooseCategory(b.dataset.category);return}
 if(b.dataset.detail){navigate('product.html?item='+Number(b.dataset.detail));return}
 if(b.dataset.favorite){toggleFavorite(Number(b.dataset.favorite));return}
 if(b.dataset.add){const inDetail=!!b.closest('#detail-dialog');add(Number(b.dataset.add),inDetail?Number($('#quantity').value):1);if(inDetail)navigate('cart.html');return}
 if(b.dataset.quantity){const id=b.dataset.quantity;cart[id]=Math.max(0,Math.min(20,cart[id]+Number(b.dataset.delta)));if(!cart[id])delete cart[id];save();renderCart();return}
 if(b.dataset.remove){delete cart[b.dataset.remove];save();renderCart();return}
 if(b.dataset.page){state.page=Number(b.dataset.page);goListing();return}
 if(b.dataset.clear){const key=b.dataset.clear;if(key.startsWith('color:'))state.colors=state.colors.filter(c=>c!==key.slice(6));else{state[key]=initial[key];if(key==='category')state.genre='all'}state.page=1;goListing()}
});
document.addEventListener('change',e=>{
 const el=e.target;
 if(el.name==='category'){draftGenre(el.value);return}
 if(el.id==='search-category'){return}
 if(el.name==='color'||['genre','price','stock'].includes(el.id)){return}
 if(el.id==='sort'){state.sort=el.value;state.page=1;goListing();return}
 if(el.dataset.compare){const id=Number(el.dataset.compare);if(el.checked){if(compared.length===3){el.checked=false;toast('比較は3点まで選択できます');return}compared.push(id)}else compared=compared.filter(x=>x!==id);renderCompareBar()}
});
$('#search-form').addEventListener('submit',e=>{e.preventDefault();if(e.isComposing)return;state.query=$('#search').value.trim();state.category=$('#search-category').value;state.genre='all';state.favoritesOnly=false;state.page=1;goListing()});
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d&&!['detail-dialog','cart-dialog'].includes(d.id)){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d)}})});
const mobile=matchMedia('(max-width:900px)');$('#filters').open=!mobile.matches;mobile.addEventListener('change',e=>$('#filters').open=!e.matches);
readURL();buildControls();save();render();
const view=['campaigns.html','article.html'].includes(route)?'journal':route==='product.html'?'product':route==='cart.html'?'cart':isHome?'home':'catalog';
document.body.dataset.view=view;
$$('.hero,.benefit-strip,.category-section,.editorial-grid,.closing').forEach(e=>e.hidden=view!=='home');
$('#catalog').hidden=view!=='catalog';
if(view==='product'||view==='cart'){$('main').hidden=true;const pageDialog=$(view==='product'?'#detail-dialog':'#cart-dialog');$('footer').before(pageDialog);}
$$('a.brand').forEach(e=>e.href='index.html');$('.skip').href=view==='catalog'?'#catalog':'catalog.html';
$('.breadcrumbs button').dataset.action='home';
if(view==='product'){
 const id=new URLSearchParams(location.search).get('item');
 if(find(id)){detail(id);document.title=find(id).name+' | MIGNON MARKET'}
 else{$('#detail-content').innerHTML='<h2>商品が見つかりません</h2><a href="catalog.html">商品一覧へ</a>';$('#detail-dialog').removeAttribute('aria-labelledby');$('#detail-dialog').show()}
}else if(view==='cart'){renderCart();$('#cart-dialog').show();document.title='カート | MIGNON MARKET'}
else document.title=(isHome?'ホーム':state.favoritesOnly?'お気に入り':state.query?'検索結果':categoryName(state.category))+' | MIGNON MARKET';
// Keep desktop navigation available as well as the mobile navigation.
$('#navigation').insertAdjacentHTML('afterbegin','<button data-action="home">ホーム</button>');

syncControls();
restoreNavigation();

let cleanupMotion=initMotion();

initJournal();
renderStorefront();

watchLive(()=>{
 const draft=draftFilters(),query=$('#search').value,searchCategory=$('#search-category').value,navX=$('#navigation').scrollLeft;
 favorites=validIds(favorites);recent=validIds(recent);compared=validIds(compared);
 cart=Object.fromEntries(Object.entries(cart).filter(([id])=>find(id)?.stock));
 buildControls();$('#navigation').insertAdjacentHTML('afterbegin','<button data-action="home">ホーム</button>');render();restoreDraft(draft);$('#search').value=query;$('#search-category').value=searchCategory;$('#navigation').scrollLeft=navX;
 if(route==='cart.html')renderCart();
 if(route==='product.html'){const id=new URLSearchParams(location.search).get('item');if(find(id)){detail(id);document.title=find(id).name+' | MIGNON MARKET'}else{clearInterval(galleryTimer);$('#detail-content').innerHTML='<h2>この商品は現在公開されていません</h2><a href="catalog.html">商品一覧へ</a>'}}
 cleanupMotion?.();cleanupMotion=initMotion();renderJournal();renderStorefront();save();
});

restoreView();

initInteractions();
