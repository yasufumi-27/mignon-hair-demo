const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const ease='cubic-bezier(.22,1,.36,1)';
let leaving=false;
const closing=new WeakSet();
export function enterPage(){
 document.documentElement.classList.remove('page-leaving');leaving=false;
 if(reduced.matches)return;
 document.querySelectorAll('main:not([hidden]),body[data-view="product"]>#detail-dialog,body[data-view="cart"]>#cart-dialog').forEach(el=>el.animate([{opacity:.35,translate:'0 8px'},{opacity:1,translate:'0 0'}],{duration:240,easing:ease}));
}
export function navigateSoft(url){
 if(leaving)return;
 if(reduced.matches){location.assign(url);return}
 leaving=true;document.documentElement.classList.add('page-leaving');
 setTimeout(()=>location.assign(url),120);
}
export function openDialog(dialog){
 if(dialog.open||closing.has(dialog))return;
 dialog.showModal();
 if(!reduced.matches){const drawer=dialog.id==='site-menu';dialog.animate([{opacity:drawer?.6:0,translate:drawer?'-28px 0':'0 14px',scale:drawer?'1':'.98'},{opacity:1,translate:'0 0',scale:'1'}],{duration:260,easing:ease})}
}
export async function closeDialog(dialog){
 if(!dialog.open||closing.has(dialog))return;
 closing.add(dialog);
 if(!reduced.matches){try{await dialog.animate([{opacity:1,translate:'0 0'},{opacity:0,translate:dialog.id==='site-menu'?'-20px 0':'0 8px'}],{duration:150,easing:'ease-in'}).finished}catch{}}
 dialog.close();closing.delete(dialog);
}
export function initInteractions(){
 document.addEventListener('cancel',e=>{if(e.target instanceof HTMLDialogElement&&e.target.matches(':modal')){e.preventDefault();closeDialog(e.target)}},true);
 document.addEventListener('click',e=>{
  const control=e.target.closest('button,a,summary');
  if(control&&!control.disabled&&!reduced.matches)control.animate([{scale:'1'},{scale:'.97'},{scale:'1'}],{duration:200,easing:ease});
  const link=e.target.closest('a[href]');
  if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||!url.pathname.endsWith('.html')||(url.pathname===location.pathname&&url.search===location.search))return;
  e.preventDefault();navigateSoft(url.href);
 },true);
 document.addEventListener('click',e=>{
  const summary=e.target.closest('summary');if(!summary||reduced.matches)return;
  const details=summary.parentElement;if(!(details instanceof HTMLDetailsElement))return;
  e.preventDefault();if(details.dataset.animating)return;
  const start=details.getBoundingClientRect().height,wasOpen=details.open;
  details.open=true;const end=wasOpen?summary.getBoundingClientRect().height:details.getBoundingClientRect().height;
  details.dataset.animating='true';details.style.overflow='hidden';
  const animation=details.animate([{height:start+'px'},{height:end+'px'}],{duration:220,easing:ease});
  animation.finished.catch(()=>{}).then(()=>{details.open=!wasOpen;delete details.dataset.animating;details.style.overflow=''});
 });
 window.addEventListener('pageshow',enterPage);
 enterPage();
}
