// Presentation only: shopping state and navigation remain in app.js.
import {products} from './catalog.js';

const scenes = [
  {label:'くつろぐ', category:'home', image:'interior', alt:'自然光が差し込む、木の家具と植物のあるリビング', en:'ROOM TO UNWIND', title:'何もしない時間も、\nお気に入りに。', color:'#e8eee6', product:110},
  {label:'出かける', category:'fashion', image:'bag', alt:'身軽に出かける日のレザーバッグ', en:'READY FOR A NEW DAY', title:'いつもの道も、\n少し新しく。', color:'#f1e6dc', product:103},
  {label:'自分をいたわる', category:'beauty', image:'skincare', alt:'毎日のケアに使うスキンケアアイテム', en:'A MOMENT FOR YOURSELF', title:'自分のための、\nひと息を。', color:'#e9e9f0', product:111},
];

export function initExperience(){
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.experience-hero');
  const cleanups = [];
  const animations = new Set();
  let paused = reduced.matches;
  try { paused ||= sessionStorage.getItem('mignon-motion-paused') === 'true'; } catch {}
  const animate = (el, frames, options) => {
    if (!el || paused || reduced.matches) return;
    const animation = el.animate(frames, options);
    animations.add(animation);
    animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
  };
  const sync = () => {
    document.body.classList.toggle('motion-paused', paused);
    document.querySelectorAll('.experience-motion').forEach(button=>{
      button.setAttribute('aria-pressed', String(paused));
      button.disabled = reduced.matches;
      button.textContent = reduced.matches ? '動き：オフ（端末設定）' : paused ? '動き：オフ' : '動き：オン';
    });
    if(paused) animations.forEach(animation=>animation.finish());
  };
  const onMotion = event => {
    if(!event.target.closest('.experience-motion')) return;
    paused = !paused;
    try { sessionStorage.setItem('mignon-motion-paused',String(paused)); } catch {}
    sync();
  };
  const onReduced = () => {
    let saved=false;try{saved=sessionStorage.getItem('mignon-motion-paused')==='true'}catch{}
    paused=reduced.matches||saved;sync();
  };
  document.addEventListener('click', onMotion);
  reduced.addEventListener('change', onReduced);
  cleanups.push(()=>document.removeEventListener('click',onMotion),()=>reduced.removeEventListener('change',onReduced));

  if(hero && document.body.dataset.view === 'home'){
    const buttons = [...hero.querySelectorAll('[data-scene]')];
    const picture = hero.querySelector('.scene-image');
    const card = hero.querySelector('.scene-product');
    let current = Number(hero.dataset.sceneIndex || 0);
    let sequence = 0;
    const showScene = async (index, userAction=false) => {
      const ticket = ++sequence;
      const scene = scenes[index];
      const src = `assets/photos/${scene.image}.jpg`;
      // Decode first so a slow connection never produces a blank transition.
      const preload = new Image(); preload.src = src;
      try { await preload.decode(); } catch {}
      if(ticket !== sequence) return;
      current = index;
      hero.dataset.sceneIndex = String(index);
      hero.style.setProperty('--scene-color',scene.color);
      picture.src = src; picture.alt = scene.alt;
      hero.querySelector('.scene-number').textContent = `0${index+1}`;
      hero.querySelector('.scene-en').textContent = scene.en;
      hero.querySelector('.scene-title').textContent = scene.title;
      const link = hero.querySelector('.scene-link');
      link.href = `catalog.html?category=${scene.category}`;
      link.setAttribute('aria-label',`${scene.label}シーンの商品を見る`);
      const product = products.find(p=>p.id===scene.product) || products.find(p=>p.category===scene.category);
      card.hidden = !product;
      if(product){
        card.href = `product.html?item=${product.id}`;
        card.querySelector('img').src = product.image;
        card.querySelector('img').alt = product.name;
        card.querySelector('.scene-product-name').textContent = product.name;
        card.querySelector('.scene-product-price').textContent = `¥${product.price.toLocaleString('ja-JP')}`;
      }
      buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      if(userAction){
        hero.querySelector('.scene-status').textContent = `${scene.label}：${scene.title}`;
        hero.querySelectorAll('.scene-image,.scene-caption,.scene-product').forEach((el,i)=>{
          el.getAnimations().forEach(animation=>animation.cancel());
          animate(el,[{opacity:.25,transform:`translateY(${i?12:0}px) scale(${i?1:1.035})`},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:600,delay:i*40,easing:'cubic-bezier(.22,1,.36,1)'});
        });
      }
    };
    const onScene = event => {const button=event.target.closest('[data-scene]');if(button)showScene(Number(button.dataset.scene),true)};
    hero.addEventListener('click',onScene);
    cleanups.push(()=>{++sequence;hero.removeEventListener('click',onScene)});
    showScene(current);
    // The entrance happens once; live product updates don't replay it.
    if(!hero.dataset.entered){
      hero.dataset.entered='true';
      hero.querySelectorAll('.hero-copy>*,.scene-frame,.scene-product').forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,delay:Math.min(i*65,350),easing:'cubic-bezier(.22,1,.36,1)'}));
    }

    // A small scroll-linked movement, confined to decorative photography.
    // Normal document scrolling is never intercepted or pinned.
    let frame = 0, inView = true;
    const updateScroll = () => {
      frame = 0;
      const offset = paused || reduced.matches || innerWidth<901 ? 0 : Math.min(26,Math.max(0,-hero.getBoundingClientRect().top)*.045);
      hero.style.setProperty('--scene-drift',`${offset}px`);
    };
    const onScroll = () => {if(inView&&!frame)frame=requestAnimationFrame(updateScroll)};
    const visibility = new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView)onScroll()});
    visibility.observe(hero);
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    cleanups.push(()=>{visibility.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);hero.style.removeProperty('--scene-drift')});
  }

  // Content is always visible in CSS. Observer failure or disabled motion cannot hide it.
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      observer.unobserve(entry.target);
      if(entry.target.dataset.revealed)return;
      entry.target.dataset.revealed='true';
      // Avoid hiding an element that already contains the keyboard focus.
      if(entry.target.contains(document.activeElement))return;
      animate(entry.target,[{opacity:.2,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,easing:'cubic-bezier(.22,1,.36,1)'});
    });
  },{threshold:.08});
  document.querySelectorAll('.category-section,.home-selection .section-heading,.selection-card,.journal-home .section-heading,.journal-card,.spotlight,.shopping-guide,.closing').forEach(el=>observer.observe(el));
  cleanups.push(()=>observer.disconnect());
  sync();
  return ()=>{cleanups.forEach(fn=>fn());animations.forEach(animation=>animation.cancel())};
}
