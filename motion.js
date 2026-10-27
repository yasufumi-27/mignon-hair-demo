import {products,categories} from './catalog.js';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function initMotion(){
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const home=document.body.dataset.view==='home';
const listing=document.body.dataset.view==='catalog';
const find=id=>products.find(p=>p.id===id);
const yen=n=>'¥'+n.toLocaleString('ja-JP');
let paused=reduced.matches,timer,visible=true,observer;
const edits=[
 {id:101,kicker:'SOUND / EVERYDAY',title:'日常に、\n心地よい没入感。',text:'お気に入りの音楽と、いつもより少し豊かな時間。',color:'#d7bb78'},
 {id:107,kicker:'STYLE / A LITTLE DETAIL',title:'小さなアクセントで、\n今日を変える。',text:'さっと結ぶだけで、やわらかな印象に。',color:'#cab6aa'},
 {id:110,kicker:'LIVING / SLOW EVENING',title:'一日の終わりに、\nやさしい灯りを。',text:'夜の部屋を、ゆっくりくつろぐ場所へ。',color:'#a9b9a6'}
].filter(e=>find(e.id));
function pauseButton(){return '<button class="motion-toggle" aria-pressed="false">動きを止める Ⅱ</button>'}
function syncPause(){document.body.classList.toggle('motion-paused',paused);document.querySelectorAll('.motion-toggle').forEach(b=>{b.textContent=paused?'動きを再生 ▷':'動きを止める Ⅱ';b.setAttribute('aria-pressed',String(paused))})}
let index=0;
function showFeature(i){
 index=(i+edits.length)%edits.length;const e=edits[index],p=find(e.id),section=document.querySelector('.spotlight');if(!section)return;
 section.style.setProperty('--spot-color',e.color);
 section.querySelector('.spot-kicker').textContent=e.kicker;section.querySelector('h2').textContent=e.title;
 section.querySelector('.spot-description').textContent=e.text;
 const link=section.querySelector('.spot-shop');link.href=`product.html?item=${p.id}`;link.textContent=`商品を見る　${yen(p.price)} →`;
 section.querySelector('.spot-front').href=`product.html?item=${p.id}`;
 section.querySelector('.spot-front img').src=p.image;section.querySelector('.spot-front img').alt=p.name;
 section.querySelector('.spot-product').textContent=p.name;
 section.querySelector('.spot-count').textContent=`0${index+1} / 0${edits.length}`;
 section.querySelectorAll('.spot-dot').forEach((b,n)=>b.setAttribute('aria-pressed',String(index===n)));
}
if(home&&edits.length){
 const sideLeft=find(107)||find(edits[0].id),sideRight=find(110)||find(edits[0].id);
 const hero=document.querySelector('.hero');
 hero.insertAdjacentHTML('afterend',`<section class="spotlight" aria-label="注目商品の紹介"><div class="spot-top"><span>THE SPOTLIGHT <i>今、出会いたいもの。</i></span>${pauseButton()}</div><div class="spot-layout"><div class="spot-copy"><p class="spot-kicker"></p><h2></h2><p class="spot-description"></p><a class="spot-shop"></a><div class="spot-controls"><button data-spot-step="-1" aria-label="前の紹介商品">←</button><span class="spot-count"></span><button data-spot-step="1" aria-label="次の紹介商品">→</button><div class="spot-dots">${edits.map((e,i)=>`<button class="spot-dot" data-spot-index="${i}" aria-label="${esc(find(e.id).name)}の紹介を表示"></button>`).join('')}</div></div></div><div class="spot-stage"><div class="spot-orbit" aria-hidden="true"></div><div class="spot-glow" aria-hidden="true"></div><img class="spot-side spot-left" src="${esc(sideLeft.image)}" alt="" loading="lazy"><img class="spot-side spot-right" src="${esc(sideRight.image)}" alt="" loading="lazy"><a class="spot-front"><img width="560" height="560" alt=""><span class="spot-product"></span></a><span class="spot-stage-note">MIGNON / SELECTED ITEMS</span></div></div><p class="spot-disclaimer">商品・価格はデモ用のサンプルです。</p></section>`);
 const spotlight=document.querySelector('.spotlight');
 spotlight.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.spotStep)showFeature(index+Number(b.dataset.spotStep));if(b.dataset.spotIndex!==undefined)showFeature(Number(b.dataset.spotIndex))});
 observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:.15});observer.observe(spotlight);
 showFeature(0);
 document.querySelector('.category-section').insertAdjacentHTML('afterend',`<section class="stories" aria-labelledby="stories-title"><div class="section-heading"><div><p class="eyebrow">STORIES TO SHOP</p><h2 id="stories-title">暮らしを想像する、3つのシーン。</h2></div><span class="story-hint">写真からアイテムを探す ↗</span></div><div class="story-grid">${[
 {id:107,img:'assets/product-1.svg',en:'01 / GET READY',title:'出かける前の、ひと工夫。',desc:'いつもの装いに、お気に入りを。'},
 {id:110,img:'assets/photos/interior.jpg',en:'02 / AT HOME',title:'自分らしく、くつろぐ。',desc:'心地よい部屋をつくるアイテム。'},
 {id:104,img:'assets/photos/coffee.jpg',en:'03 / SLOW DOWN',title:'ひと息つく時間も、大切に。',desc:'毎日の小さな楽しみを見つけよう。'}
 ].filter(e=>find(e.id)).map(e=>`<a class="story-card" href="product.html?item=${e.id}"><img src="${e.img}" alt="${e.title}" loading="lazy" width="600" height="800"><div class="story-copy"><span>${e.en}</span><h3>${e.title}</h3><p>${e.desc}</p><b>アイテムを見る ↗</b></div></a>`).join('')}</div></section>`);
}
if(listing){
 const params=new URLSearchParams(location.search),category=params.get('category');
 const picks=products.filter(p=>!category||p.category===category).slice(0,4);
 if(!location.pathname.endsWith('favorites.html')&&picks.length){
 const label=categories.find(c=>c.id===category)?.name||'マーケット';
 document.querySelector('.catalog-layout').insertAdjacentHTML('beforebegin',`<section class="catalog-inspiration" aria-label="カテゴリのピックアップ"><div><span class="eyebrow">A CLOSER LOOK</span><h3>${label}の<br>気になるアイテム。</h3><small>編集ピックアップ・検索結果とは別枠</small>${pauseButton()}</div><div class="inspiration-items">${picks.map(p=>`<a href="product.html?item=${p.id}"><img src="${esc(p.image)}" alt="${esc(p.name)}" width="150" height="150"><span>${esc(p.name)}</span></a>`).join('')}</div></section>`);
 }
}
const onToggle=e=>{if(e.target.closest('.motion-toggle')){paused=!paused;syncPause()}};document.addEventListener('click',onToggle);
const onReduced=e=>{paused=e.matches;syncPause()};reduced.addEventListener('change',onReduced);
function start(){clearInterval(timer);if(home&&edits.length)timer=setInterval(()=>{const section=document.querySelector('.spotlight');if(!paused&&!document.hidden&&visible&&!section.matches(':hover')&&!section.contains(document.activeElement))showFeature(index+1)},6500)}
const stop=()=>clearInterval(timer);window.addEventListener('pagehide',stop);window.addEventListener('pageshow',start);
syncPause();start();
return ()=>{stop();observer?.disconnect();document.removeEventListener('click',onToggle);reduced.removeEventListener('change',onReduced);window.removeEventListener('pagehide',stop);window.removeEventListener('pageshow',start);document.querySelectorAll('.spotlight,.stories,.catalog-inspiration').forEach(e=>e.remove())};
}
