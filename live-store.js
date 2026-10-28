import {products} from './catalog.js';
import {articles} from './journal.js?v=20261028-1';
export const API=location.hostname==='localhost'&&location.port==='4174'?'http://localhost:5173/api':'https://mignon-market-admin.fr8znvd4wp.chatgpt.site/api';
let revision=-1,busy=false,timer;
function status(text){let el=document.querySelector('#live-status');if(!el){el=document.createElement('p');el.id='live-status';el.setAttribute('role','status');el.style.cssText='margin:0;padding:10px 20px;background:#fff2d8;font-size:12px;text-align:center';document.querySelector('header')?.after(el)}el.textContent=text;el.hidden=!text}
async function get(path){const r=await fetch(API+'/'+path,{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('データを取得できません');return r.json()}
function apply(data){if(!Array.isArray(data.products)||!Array.isArray(data.articles))throw Error('Invalid content');products.splice(0,products.length,...data.products);articles.splice(0,articles.length,...data.articles);revision=data.revision}
export async function loadLive(){products.length=0;articles.length=0;try{apply(await get('public'));status('')}catch{status('商品・記事データへの接続を確認しています。しばらくお待ちください。')}}
export function watchLive(onChange){async function check(){if(busy||document.hidden)return;busy=true;try{const r=await get('public/revision');if(r.revision!==revision){const data=await get('public');apply(data);onChange()}status('')}catch{status('最新データに接続できません。表示内容は最後に取得した情報です。')}finally{busy=false}}function start(){clearInterval(timer);timer=setInterval(check,3000);check()}window.addEventListener('pagehide',()=>clearInterval(timer));window.addEventListener('pageshow',start);document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()});start()}
