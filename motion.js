import {products,categories} from './catalog.js';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Deliberate, user-controlled discovery. No timer or perpetual product movement.
export function initMotion(){
 const home=document.body.dataset.view==='home';
 const listing=document.body.dataset.view==='catalog';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const find=id=>products.find(p=>p.id===id);
 const edits=[
  {id:101,kicker:'01 / SOUND & EVERYDAY',title:'好きな音で、\n満たす時間。',text:'音楽を聴く。それだけの時間を、もっと心地よく。'},
  {id:110,kicker:'02 / HOME & LIVING',title:'灯りひとつで、\n夜が変わる。',text:'一日の終わりに、自分だけのくつろぎを。'},
  {id:107,kicker:'03 / YOUR OWN STYLE',title:'小さな変化。\n新しい気分。',text:'いつもの装いに、ひとつだけ自分らしいアクセント。'}
 ].filter(edit=>find(edit.id));
 let index=0;
 const activeAnimations=new Set();
 let section;
 function showFeature(next,animated=false){
  index=(next+edits.length)%edits.length;
  const edit=edits[index],product=find(edit.id);
  section.querySelector('.spot-kicker').textContent=edit.kicker;
  section.querySelector('h2').textContent=edit.title;
  section.querySelector('.spot-description').textContent=edit.text;
  section.querySelector('.spot-shop').href=`product.html?item=${product.id}`;
  section.querySelector('.spot-shop').textContent=`詳しく見る　¥${product.price.toLocaleString('ja-JP')}　↗`;
  section.querySelector('.spot-front').href=`product.html?item=${product.id}`;
  const img=section.querySelector('.spot-front img');img.src=product.image;img.alt=product.name;
  section.querySelector('.spot-product').textContent=product.name;
  section.querySelector('.spot-count').textContent=`0${index+1} / 0${edits.length}`;
  section.querySelectorAll('.spot-dot').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  if(animated){
   section.querySelector('.spot-status').textContent=`${index+1} / ${edits.length}：${product.name}`;
   activeAnimations.forEach(animation=>animation.cancel());
   if(!reduced.matches&&!document.body.classList.contains('motion-paused')){
    section.querySelectorAll('.spot-copy>h2,.spot-description,.spot-front').forEach(el=>{
     const animation=el.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,easing:'cubic-bezier(.22,1,.36,1)'});
     activeAnimations.add(animation);animation.finished.catch(()=>{}).finally(()=>activeAnimations.delete(animation));
    });
   }
  }
 }
 if(home&&edits.length){
  document.querySelector('.hero').insertAdjacentHTML('afterend',`<section class="spotlight" aria-label="注目商品の紹介"><div class="spot-top"><span>THE CLOSER LOOK <i>ひとつを、じっくり。</i></span><span>SELECTED BY MIGNON</span></div><div class="spot-layout"><div class="spot-copy"><p class="spot-kicker"></p><h2></h2><p class="spot-description"></p><a class="spot-shop"></a><div class="spot-controls"><button data-spot-step="-1" aria-label="前の紹介商品">←</button><span class="spot-count" aria-hidden="true"></span><button data-spot-step="1" aria-label="次の紹介商品">→</button><div class="spot-dots">${edits.map((edit,i)=>`<button class="spot-dot" data-spot-index="${i}" aria-label="${esc(find(edit.id).name)}の紹介を表示"></button>`).join('')}</div></div></div><div class="spot-stage"><a class="spot-front"><img width="560" height="560" alt="" loading="lazy"><span class="spot-product"></span></a></div></div><p class="spot-disclaimer">商品・価格はデモ用のサンプルです。</p><p class="spot-status sr-only" role="status" aria-live="polite"></p></section>`);
  section=document.querySelector('.spotlight');
  section.addEventListener('click',event=>{
   const button=event.target.closest('button');if(!button)return;
   if(button.dataset.spotStep)showFeature(index+Number(button.dataset.spotStep),true);
   if(button.dataset.spotIndex!==undefined)showFeature(Number(button.dataset.spotIndex),true);
  });
  showFeature(0);
 }
 if(listing&&!location.pathname.endsWith('favorites.html')){
  const category=new URLSearchParams(location.search).get('category');
  const picks=products.filter(product=>!category||product.category===category).slice(0,4);
  if(picks.length){
   const label=categories.find(item=>item.id===category)?.name||'マーケット';
   document.querySelector('.catalog-layout').insertAdjacentHTML('afterend',`<section class="catalog-inspiration" aria-label="カテゴリのピックアップ"><div><span class="eyebrow">A CLOSER LOOK</span><h3>${esc(label)}の<br>気になるアイテム。</h3><small>編集ピックアップ・検索結果とは別枠</small></div><div class="inspiration-items">${picks.map(product=>`<a href="product.html?item=${product.id}"><img src="${esc(product.image)}" alt="${esc(product.name)}" width="150" height="150" loading="lazy"><span>${esc(product.name)}</span></a>`).join('')}</div></section>`);
  }
 }
 return ()=>{activeAnimations.forEach(animation=>animation.cancel());document.querySelectorAll('.spotlight,.catalog-inspiration').forEach(el=>el.remove())};
}
