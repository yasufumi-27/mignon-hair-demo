export const categories = [
  {id:'fashion',name:'ファッション',en:'FASHION',image:'bag',genres:['バッグ','トップス','シューズ','腕時計']},
  {id:'tech',name:'家電・デジタル',en:'TECH & GADGETS',image:'headphones',genres:['オーディオ','カメラ','時計']},
  {id:'home',name:'ホーム・キッチン',en:'HOME & LIVING',image:'chair',genres:['家具','照明','ドリンクウェア']},
  {id:'beauty',name:'ビューティー',en:'BEAUTY & CARE',image:'perfume',genres:['フレグランス','スキンケア']},
  {id:'food',name:'食品・ドリンク',en:'FOOD & DRINK',image:'coffee',genres:['コーヒー','ドリンクセット']},
  {id:'outdoor',name:'アウトドア',en:'OUTDOOR',image:'bottle',genres:['ボトル','バッグ','シューズ']},
  {id:'hair',name:'ヘアアクセサリー',en:'HAIR ACCESSORIES',image:'../product-1.svg',genres:['シュシュ','カチューシャ','ヘアクリップ','バレッタ','ヘアゴム','ヘアピン']},
];
export const colors = {'ホワイト':'#eeeae0','ブラック':'#333934','ベージュ':'#c7b292','ブラウン':'#88664d','グリーン':'#78876a','ピンク':'#d1a1a1','イエロー':'#d2b45e','レッド':'#b44c3b'};
const rows = [
[101,'ワイヤレス オーバーイヤーヘッドホン','tech','オーディオ',12800,'イエロー','headphones','SOUND FORM','音楽に、心地よい没入感。','軽量設計／充電式','EDITORS PICK'],
[102,'オーク ダイニングチェア','home','家具',24800,'ベージュ','chair','ROOM STANDARD','余白を楽しむ、やさしいフォルム。','木製フレーム／座面高45cm',''],
[103,'ミニマル レザーショルダー','fashion','バッグ',8900,'ブラウン','bag','DAY / OFF','身軽に出かける日の相棒。','合成皮革／内ポケット付き','NEW'],
[104,'シングルオリジン コーヒー','food','コーヒー',1680,'ブラウン','coffee','SLOW ROAST','朝のひと息を、少し豊かに。','焙煎豆200g／中煎り',''],
[105,'オードパルファム ウッディ','beauty','フレグランス',6800,'ベージュ','perfume','MOMENT','静かな余韻をまとう。','50mL／ウッディ系','NEW'],
[106,'ステンレス アウトドアボトル','outdoor','ボトル',3280,'グリーン','bottle','FIELD NOTES','街でも、自然の中でも。','500mL／ステンレス製',''],
[107,'ふんわり サテンシュシュ','hair','シュシュ',880,'ベージュ','svg:1','MIGNON SELECT','さっと結ぶだけで、やわらかな印象に。','フリーサイズ／サテン調',''],
[108,'クラシック フィルムカメラ','tech','カメラ',39800,'ブラック','camera','FRAME','何気ない日を、残したくなる。','35mmフィルム／本体',''],
[109,'コットン ベーシックTシャツ','fashion','トップス',2980,'ホワイト','shirt','EVERYDAY WARDROBE','毎日着たくなる、気持ちよさ。','コットン100%／Mサイズ',''],
[110,'アンビエント テーブルランプ','home','照明',7980,'ホワイト','lamp','ROOM STANDARD','夜の部屋に、穏やかな灯り。','卓上タイプ／調光式','NEW'],
[111,'デイリー スキンケアセット','beauty','スキンケア',4980,'ホワイト','skincare','MOMENT','自分に向き合う、いつもの時間。','化粧水・乳液／2点セット',''],
[112,'カラーブロック スニーカー','fashion','シューズ',9800,'レッド','sneakers','DAY / OFF','軽やかな一歩から、はじめよう。','25cm／合成繊維',''],
[113,'ミニマル ウォッチ','fashion','腕時計',11800,'ホワイト','watch','FORM & TIME','時を重ねる、シンプルなかたち。','クォーツ／38mm',''],
[114,'パールライン カチューシャ','hair','カチューシャ',1680,'ホワイト','svg:2','MIGNON SELECT','いつものスタイルに、小さな輝き。','フリーサイズ／パール調','NEW'],
[115,'リラックス ラウンジチェア','home','家具',29800,'ブラウン','chair','ROOM STANDARD','読書にも、何もしない時間にも。','木製フレーム／室内用',''],
[116,'ドリップバッグ アソート','food','コーヒー',1980,'ブラウン','coffee','SLOW ROAST','気分で選ぶ、今日の一杯。','10袋入り／3種アソート','NEW'],
[117,'マットカラー バンスクリップ','hair','ヘアクリップ',1280,'グリーン','svg:3','MIGNON SELECT','ラフにまとめて、すっきりと。','長さ約10cm／マット仕上げ',''],
[118,'ノイズキャンセリング ヘッドホン','tech','オーディオ',19800,'ブラック','headphones','SOUND FORM','集中したい時間に。','ワイヤレス／収納ケース付き',''],
[119,'トラベル ドリンクボトル','outdoor','ボトル',2480,'ベージュ','bottle','FIELD NOTES','小さな旅を、身近に。','350mL／ステンレス製','NEW'],
[120,'ハンドケア デュオ','beauty','スキンケア',3280,'ホワイト','skincare','MOMENT','指先まで、心地よく。','ハンドソープ・クリーム',''],
[121,'べっ甲スクエア バレッタ','hair','バレッタ',1480,'ブラウン','svg:5','MIGNON SELECT','控えめなアクセントを添えて。','長さ約8cm／べっ甲調',''],
[122,'ブレンドコーヒー ギフト','food','ドリンクセット',3980,'ブラウン','coffee','SLOW ROAST','一杯の楽しみを、贈ろう。','コーヒー豆2種／ギフト箱',''],
[123,'ウィークエンド ショルダーバッグ','outdoor','バッグ',5980,'ブラック','bag','FIELD NOTES','必要なものだけ持って、外へ。','軽量タイプ／調整ストラップ',''],
[124,'リフレッシュ フレグランス','beauty','フレグランス',5480,'ベージュ','perfume','MOMENT','気持ちが切り替わる香り。','30mL／シトラス系',''],
[125,'ダブルウォール ボトル','home','ドリンクウェア',2880,'グリーン','bottle','ROOM STANDARD','机の上にも、お気に入りを。','450mL／二重構造',''],
[126,'デスク クロック','tech','時計',4580,'ホワイト','watch','FORM & TIME','時間を確かめる、小さな習慣。','アナログ表示／卓上用',''],
[127,'デイリーブレンド コーヒー','food','コーヒー',1280,'ブラウン','coffee','SLOW ROAST','暮らしになじむ、飽きない味わい。','焙煎豆200g／深煎り',''],
[128,'ウォーキング シューズ','outdoor','シューズ',7980,'レッド','sneakers','FIELD NOTES','いつもより、遠くまで。','25cm／軽量ソール',''],
[129,'ツイストメタル ヘアゴム','hair','ヘアゴム',780,'ベージュ','svg:6','MIGNON SELECT','さりげなく、印象を変える。','フリーサイズ／メタル調',''],
[130,'ミニパール ヘアピンセット','hair','ヘアピン',980,'ホワイト','svg:8','MIGNON SELECT','重ねて楽しむ、ヘアアレンジ。','2本セット／パール調','NEW'],
[131,'オーガンジー リボンシュシュ','hair','シュシュ',1100,'ピンク','svg:4','MIGNON SELECT','透ける素材で軽やかに。','フリーサイズ／オーガンジー調',''],
[132,'ベロア ワイドカチューシャ','hair','カチューシャ',1980,'ブラック','svg:7','MIGNON SELECT','秋冬の装いに、落ち着いた質感。','フリーサイズ／ベロア調',''],
];
export const products = rows.map(([id,name,category,genre,price,color,photo,brand,description,spec,tag], index)=>({
  id,name,category,genre,price,color,brand,description,spec,tag,stock:![115,124,132].includes(id),rank:index,
  image:photo.startsWith('svg:')?`assets/product-${photo.split(':')[1]}.svg`:`assets/photos/${photo}.jpg`
}));
export const categoryName = id => categories.find(c=>c.id===id)?.name || 'すべての商品';
export function filterProducts(state) {
  const words=state.query.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);
  return products.filter(p => (state.category==='all'||p.category===state.category)
    && (state.genre==='all'||p.genre===state.genre)
    && (state.price==='all'||p.price<=Number(state.price))
    && (!state.colors.length||state.colors.includes(p.color))
    && (!state.stock||p.stock)
    && (!state.favoritesOnly||state.favorites.includes(p.id))
    && words.every(w=>(p.name+p.genre+p.brand+p.color+categoryName(p.category)).normalize('NFKC').toLowerCase().includes(w)))
    .sort((a,b)=>state.sort==='low'?a.price-b.price:state.sort==='high'?b.price-a.price:state.sort==='new'?b.id-a.id:a.rank-b.rank);
}
