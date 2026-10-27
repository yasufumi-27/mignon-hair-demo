import {API} from './live-store.js?v=20261027-10';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yen=n=>'¥'+n.toLocaleString('ja-JP');
let selected='';try{selected=sessionStorage.getItem('mignon-coupon')||''}catch{}
let controller,timer,sequence=0;
function remember(code){selected=code;try{sessionStorage.setItem('mignon-coupon',code)}catch{}}
export function renderCoupon(cart){
 clearTimeout(timer);controller?.abort();sequence++;
 document.querySelector('#coupon-panel')?.remove();
 const items=Object.entries(cart).map(([id,quantity])=>({id:Number(id),quantity}));
 if(!items.length)return;
 const panel=document.createElement('section');panel.id='coupon-panel';panel.className='coupon-panel';
 panel.innerHTML=`<span class="eyebrow">A LITTLE EXTRA</span><h3>クーポンを使う</h3><form id="coupon-form"><label for="coupon-code">クーポンコード</label><div class="coupon-entry"><input id="coupon-code" name="code" value="${esc(selected)}" placeholder="例：WELCOME10" autocomplete="off" autocapitalize="characters" maxlength="32" required><button class="primary" type="submit">適用する</button><button type="button" id="coupon-remove" ${selected?'':'hidden'}>解除</button></div></form><p id="coupon-status" role="status" aria-live="polite"></p><div id="coupon-amounts"></div><small>全商品対象・1コードのみ。割引の確認用デモです。注文・決済はできません。</small>`;
 document.querySelector('#cart-content').append(panel);
 const form=panel.querySelector('form'),message=panel.querySelector('#coupon-status'),amounts=panel.querySelector('#coupon-amounts'),remove=panel.querySelector('#coupon-remove');
 async function check(code){
  clearTimeout(timer);controller?.abort();controller=new AbortController();const ticket=++sequence;
  const timeout=setTimeout(()=>controller?.abort(),10000);
  message.textContent='クーポンを確認しています…';amounts.replaceChildren();form.querySelector('[type=submit]').disabled=true;
  try{
   const r=await fetch(API+'/coupon-check',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({code,items}),signal:controller.signal});
   const v=await r.json();if(ticket!==sequence||!panel.isConnected)return;
   if(!r.ok)throw Error(v.error||'クーポンを適用できません');
   remember(v.code);remove.hidden=false;message.textContent=v.name+'を適用しました';message.className='coupon-success';
   amounts.innerHTML=`<div><span>商品合計（税込）</span><b>${yen(v.subtotal)}</b></div><div class="coupon-discount"><span>クーポン割引</span><b>−${yen(v.discount)}</b></div><div class="coupon-payable"><span>割引後の商品合計</span><strong>${yen(v.total)}</strong></div>`;
   timer=setTimeout(()=>check(selected),Math.min(30000,Math.max(1000,Date.parse(v.expiresAt)-Date.now()+100)));
  }catch(e){if(ticket===sequence&&panel.isConnected){message.textContent=e.name==='AbortError'?'確認できませんでした。もう一度お試しください。':e.message;message.className='coupon-error';amounts.replaceChildren();remove.hidden=!selected}}
  finally{clearTimeout(timeout);if(ticket===sequence&&panel.isConnected)form.querySelector('[type=submit]').disabled=false}
 }
 form.addEventListener('submit',e=>{e.preventDefault();const code=form.code.value.trim().toUpperCase();remember(code);remove.hidden=false;check(code)});
 remove.addEventListener('click',()=>{remember('');renderCoupon(cart)});
 if(selected)check(selected);
}
window.addEventListener('pagehide',()=>{clearTimeout(timer);controller?.abort();sequence++});
