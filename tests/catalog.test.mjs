import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { categories, products, filterProducts } from '../catalog.js';
const base={category:'all',genre:'all',query:'',price:'all',colors:[],stock:false,sort:'recommended',favoritesOnly:false,favorites:[]};
test('catalog has unique products, valid categories, genres and local images',()=>{
 assert.equal(new Set(products.map(p=>p.id)).size,products.length);
 for(const p of products){assert(categories.find(c=>c.id===p.category)?.genres.includes(p.genre));assert(existsSync(new URL('../'+p.image,import.meta.url)));assert(p.price>0)}
});
test('cross-category keyword search and compound filtering',()=>{
 assert.equal(filterProducts({...base,query:'コーヒー'}).length,4);
 const results=filterProducts({...base,category:'hair',genre:'シュシュ',price:'1000',colors:['ベージュ']});
 assert.deepEqual(results.map(p=>p.id),[107]);
 assert.equal(filterProducts({...base,query:'絶対に存在しない商品'}).length,0);
});
test('in-stock exclusion, favorite scope, and sort',()=>{
 assert(filterProducts({...base,stock:true}).every(p=>p.stock));
 assert.equal(filterProducts({...base,stock:true}).length,29);
 assert.deepEqual(filterProducts({...base,favoritesOnly:true,favorites:[103,107]}).map(p=>p.id),[103,107]);
 for(const order of ['low','high']){const list=filterProducts({...base,sort:order});for(let i=1;i<list.length;i++)assert(order==='low'?list[i-1].price<=list[i].price:list[i-1].price>=list[i].price)}
});
