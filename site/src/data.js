/* ふたりのハワイ — 旅程データ
 * 時刻の at は "HH:MM"（その日の tz 基準）。at がない行は「いま/つぎ」判定に使わない。
 * place は PLACES のキー。
 */
window.TRIP = {
  title: "ふたりのハワイ",
  subtitle: "オアフ島・ワイキキ　2026年10月13日〜19日",
};

window.PLACES = {
  sheraton: { name: "シェラトン・ワイキキ", q: "Sheraton Waikiki Beach Resort, 2255 Kalakaua Ave, Honolulu", cat: "stay", addr: "2255 Kalakaua Ave", tel: "+18089224422", info: "チェックイン15:00／アウト11:00。Edge Infinity Pool 8:00〜20:00（16歳以上）" },
  hnd: { name: "羽田空港 第3ターミナル", q: "Haneda Airport Terminal 3", cat: "airport", info: "デルタ航空カウンターは3階出発ロビー" },
  hnl: { name: "ダニエル・K・イノウエ国際空港（ホノルル）", q: "Daniel K. Inouye International Airport Terminal 2", cat: "airport", info: "デルタ航空はターミナル2。配車アプリの乗車場所は1階中央分離帯（Ride App表示）" },
  iass: { name: "IASS HAWAII LOUNGE", q: "IASS Hawaii Lounge, Honolulu Airport", cat: "airport", info: "ターミナル2・保安検査後、ガーデンコート1階。7:30〜18:00。飲み物とWi-Fiのみ" },
  cocolomi: { name: "COCOLOMI ワイキキ店", q: "COCOLOMI Waikiki, 2250 Kalakaua Ave #319, Honolulu", cat: "do", addr: "2250 Kalakaua Ave #319（Waikiki Shopping Plaza 3階）", tel: "+18087997213", info: "10:00〜22:00。全セラピスト日本語対応", url: "https://www.cocolomi-hawaii.com/" },
  wsp: { name: "Waikiki Shopping Plaza", q: "Waikiki Shopping Plaza, 2250 Kalakaua Ave, Honolulu", cat: "transit", info: "トロリーの起点。COCOLOMI・STIX ASIAもここ" },
  piko: { name: "Piko Kitchen + Bar", q: "Piko Kitchen + Bar, 2380 Kuhio Ave, Honolulu", cat: "eat", addr: "2380 Kuhio Ave（Lilia Waikiki 1階）", tel: "+18089232032", info: "ハッピーアワー 毎日14:00〜18:00", url: "https://www.pikowaikikihawaii.com/welcome/" },
  yardhouse: { name: "Yard House ワイキキ", q: "Yard House Waikiki, 226 Lewers St, Honolulu", cat: "eat", addr: "226 Lewers St（Waikiki Beach Walk）", info: "ハッピーアワー 月〜金14:00〜17:30" },
  alamoana: { name: "アラモアナセンター", q: "Ala Moana Center, 1450 Ala Moana Blvd, Honolulu", cat: "shop", addr: "1450 Ala Moana Blvd", info: "トロリー・ピンクラインは海側（マカイ側）に発着" },
  walmart: { name: "ウォルマート（ケアウモク）", q: "Walmart, 700 Keeaumoku St, Honolulu", cat: "shop", addr: "700 Keeaumoku St", info: "アラモアナセンターから徒歩圏" },
  wolfgang: { name: "ウルフギャング・ステーキハウス", q: "Wolfgang's Steakhouse Waikiki, 2301 Kalakaua Ave, Honolulu", cat: "eat", addr: "ロイヤル・ハワイアン・センター C館3階", info: "ランチ 11:00〜15:00" },
  fumis: { name: "Fumi's Kahuku Shrimp", q: "Fumi's Kahuku Shrimp Ala Moana Center", cat: "eat", info: "アラモアナ　マカイマーケット。ガーリックシュリンプ" },
  poibowl: { name: "Ala Moana Poi Bowl", q: "Ala Moana Poi Bowl, Ala Moana Center", cat: "eat", info: "アラモアナ　マカイマーケット。カルアピッグなど" },
  liliha: { name: "Liliha Bakery", q: "Liliha Bakery Ala Moana Center", cat: "eat", info: "アラモアナ　メイシーズ3階。ロコモコなど" },
  foodland: { name: "Foodland Farms", q: "Foodland Farms Ala Moana", cat: "eat", info: "アラモアナ　エヴァウイング。ポケ丼、翌朝の軽食" },
  paia: { name: "Paia Fish Market Waikiki", q: "Paia Fish Market Waikiki, 2299 Kuhio Ave, Honolulu", cat: "eat", addr: "2299 Kuhio Ave", info: "マヒマヒなどのグリルフィッシュ" },
  diamondhead: { name: "ダイヤモンドヘッド", q: "Diamond Head State Monument", cat: "do", info: "6:00〜18:00。予約制・1人$5。水・帽子・日焼け止め必須", url: "https://gostateparks.hawaii.gov/diamondhead" },
  pioneer: { name: "Pioneer Saloon", q: "Pioneer Saloon, 3046 Monsarrat Ave, Honolulu", cat: "eat", addr: "3046 Monsarrat Ave", info: "11:00〜20:00。プレートランチをテイクアウト" },
  kapiolani: { name: "カピオラニ公園（海側）", q: "Queen's Beach, Kapiolani Park, Honolulu", cat: "do", info: "Kapiolani Park Beach〜Queen's Beachの芝生。公園内は飲酒・喫煙禁止" },
  aquarium: { name: "ワイキキ水族館", q: "Waikiki Aquarium, 2777 Kalakaua Ave, Honolulu", cat: "do", addr: "2777 Kalakaua Ave", info: "9:00〜16:30。大人$12" },
  stix: { name: "STIX ASIA", q: "STIX ASIA, 2250 Kalakaua Ave, Honolulu", cat: "eat", info: "Waikiki Shopping Plaza 地下。フードコート形式" },
  kaipoke: { name: "Kai Poke", q: "Kai Poke, 333 Seaside Ave, Honolulu", cat: "eat", addr: "333 Seaside Ave", info: "ポケを軽めに" },
  iyasume: { name: "Musubi Cafe IYASUME", q: "Musubi Cafe Iyasume Waikiki", cat: "eat", info: "おむすび・テイクアウト" },
  rumfire: { name: "RumFire", q: "RumFire Waikiki, 2255 Kalakaua Ave, Honolulu", cat: "eat", info: "シェラトン内。11:00〜23:00頃" },
  pearl: { name: "パールハーバー国立記念公園", q: "Pearl Harbor National Memorial Visitor Center", cat: "do", info: "7:00〜17:00。バッグ持ち込み不可（透明バッグ・財布・スマホは可）。入口に有料荷物預かり$7", url: "https://www.nps.gov/perl/" },
  bus42west: { name: "42番 乗り場（クヒオ通り・西行き）", q: "Kuhio Ave & Lewers St bus stop, Honolulu", cat: "transit", info: "行き先表示「42 EWA BEACH」。停留所はDaBus2で確認" },
  bus42east: { name: "42番 乗り場（アリゾナ記念館前・東行き）", q: "Kamehameha Hwy Arizona Memorial bus stop", cat: "transit", info: "行き先表示「42 WAIKIKI BEACH & HOTELS」" },
  kakaako: { name: "カカアコ（壁画エリア）", q: "Kakaako Murals, Honolulu", cat: "do", info: "4日目の予約が取れなかった場合の候補" },
  waikikibeach: { name: "ワイキキビーチ", q: "Waikiki Beach, Honolulu", cat: "do", info: "シェラトン前から徒歩すぐ" },
  hwak: { name: "House Without A Key", q: "House Without A Key, Halekulani, 2199 Kalia Rd, Honolulu", cat: "eat", addr: "ハレクラニ内　2199 Kalia Rd", info: "生演奏17:30頃〜、フラ18:30頃〜。予約可否は要確認" },
  azure: { name: "Azure", q: "Azure Restaurant, Royal Hawaiian, 2259 Kalakaua Ave, Honolulu", cat: "eat", addr: "ロイヤル・ハワイアン内", info: "水〜日 17:30〜21:30（月火休）" },
  longs: { name: "Longs Drugs ワイキキ", q: "Longs Drugs, 2155 Kalakaua Ave, Honolulu", cat: "shop", addr: "2155 Kalakaua Ave", info: "お土産・日用品" },
  target: { name: "Target ワイキキ", q: "Target, 2345 Kuhio Ave, Honolulu", cat: "shop", addr: "2345 Kuhio Ave", info: "8:00〜23:00" },
  rhc: { name: "ロイヤル・ハワイアン・センター", q: "Royal Hawaiian Center, 2201 Kalakaua Ave, Honolulu", cat: "transit", info: "トロリー・ピンクラインの停留所あり" },
  consulate: { name: "在ホノルル日本国総領事館", q: "Consulate General of Japan in Honolulu, 1742 Nuuanu Ave", cat: "help", addr: "1742 Nuuanu Ave", tel: "+18085433111" },
  doc: { name: "Doctors on Call（シェラトン内）", q: "Straub Benioff Doctors on Call Sheraton Waikiki", cat: "help", addr: "シェラトン・マナーウイング", tel: "+18089239966" },
  queens: { name: "クイーンズ医療センター（救急）", q: "The Queen's Medical Center, 1301 Punchbowl St, Honolulu", cat: "help", addr: "1301 Punchbowl St" },
};

/* 日程 */
window.DAYS = [
  {
    n: 0, date: "2026-10-13", tz: "JST", end: "2026-10-13T21:55:00+09:00",
    label: "10月13日 火", title: "羽田から出発",
    lead: "日本時間。チェックイン・荷物預けを最優先、ラウンジは余裕があれば。",
    events: [
      { t: "18:00", at: "18:00", title: "羽田空港第3ターミナルに到着", place: "hnd" },
      { t: "18:15", at: "18:15", title: "チェックイン・荷物預け", note: "3階 デルタ航空カウンター", place: "hnd" },
      { t: "19:00", at: "19:00", title: "夕食", note: "4階 江戸小路など。待ち時間の短い店", key: true },
      { t: "19:45", at: "19:45", title: "保安検査・出国審査" },
      { t: "20:20", at: "20:20", title: "時間があれば SKY LOUNGE", note: "カード会社のラウンジ。対象カードと2人分の搭乗券" },
      { t: "21:00", at: "21:00", title: "搭乗口に到着", note: "出発55分前" },
      { t: "21:55", at: "21:55", title: "羽田を出発", note: "ホノルルへ。機内でしっかり休む", key: true },
    ],
    sections: [
      { title: "時間が押したら", items: ["チェックイン・荷物預けを最優先", "20:00頃には保安検査へ", "ラウンジは余裕がある場合だけ", "21:00頃の搭乗口到着を優先"] },
    ],
  },
  {
    n: 1, date: "2026-10-13", tz: "HST", end: "2026-10-14T04:00:00-10:00",
    label: "10月13日 火", title: "到着してロミロミ",
    lead: "ハワイ時間。到着後はUberでホテルへ直行、荷物を預けてCOCOLOMIへ。",
    events: [
      { t: "10:39", at: "10:39", title: "ホノルル空港に到着", note: "入国審査・荷物受取・税関", place: "hnl", key: true },
      { t: "11:45〜12:15", at: "11:45", title: "Uberを手配", note: "荷物を受け取ってから。乗車は1階中央の「Ride App」表示へ" },
      { t: "12:30〜13:00", at: "12:30", title: "シェラトンで荷物を預ける", note: "新婚旅行・アップグレード希望・部屋の準備を待てることを伝える", place: "sheraton" },
      { t: "13:00", at: "13:00", title: "COCOLOMIへ歩いて移動", note: "徒歩5〜8分", place: "cocolomi" },
      { t: "13:30〜14:30", at: "13:30", title: "ロミロミ 60分", note: "予約済み", place: "cocolomi", key: true, booked: true },
      { t: "15:00", at: "15:00", title: "チェックイン・入室", place: "sheraton" },
      { t: "15:30", at: "15:30", title: "シャワー・休憩" },
      { t: "16:15", at: "16:15", title: "ピコ・キッチン＋バーへ", note: "徒歩10〜15分", place: "piko" },
      { t: "16:30〜18:00", at: "16:30", title: "ハッピーアワー・早めの夕食", note: "混んでいたら Yard House", place: "piko", key: true },
      { t: "18:00", at: "18:00", title: "ホテルへ戻る", note: "上階のWaikiki Marketで水や朝食を買える" },
      { t: "20:00〜21:00", at: "20:00", title: "早めに就寝" },
    ],
    sections: [
      { title: "空港で時間がかかったら", items: ["12:15を過ぎたらホテルでの手続きを短く", "12:30を過ぎても空港にいたらCOCOLOMIへ電話（+1-808-799-7213）"] },
      { title: "ハッピーアワーの候補", options: [
        { place: "piko", desc: "第一候補。毎日14:00〜18:00" },
        { place: "yardhouse", desc: "混雑時・近場で済ませたいとき。月〜金14:00〜17:30" },
      ] },
    ],
  },
  {
    n: 2, date: "2026-10-14", tz: "HST", end: "2026-10-15T04:00:00-10:00",
    label: "10月14日 水", title: "アラモアナでお買い物",
    lead: "終わりの時刻は決めずに買い物。帰ったらプール、夜は早めに休む。",
    events: [
      { t: "8:00〜9:00", at: "08:00", title: "朝食・身支度", note: "ホテル周辺でコーヒーや軽食" },
      { t: "9:15〜10:00", at: "09:15", title: "アラモアナセンターへ移動", note: "トロリー・ピンクライン（始発は要確認。早い時間はTheBus 8・20・23・42番などかUber）", place: "alamoana" },
      { t: "10:00〜12:00", at: "10:00", title: "アラモアナでショッピング", place: "alamoana", key: true },
      { t: "11:00頃", at: "11:00", title: "ランチの方針を決める", note: "ウルフギャングの空席と気分で" },
      { t: "12:00〜14:00", at: "12:00", title: "ランチ", note: "アラモアナ内か、ワイキキに戻ってウルフギャング" },
      { t: "午後", at: "14:00", title: "ショッピングの続き", note: "時間があればウォルマートへ", place: "walmart" },
      { t: "15:00〜17:00", at: "15:00", title: "ワイキキへ戻る" },
      { t: "帰着後", at: "16:30", title: "シェラトンのプール", note: "Edge Infinity Pool　20:00まで", place: "sheraton" },
      { t: "18:30〜20:00", at: "18:30", title: "夕食", note: "ワイキキ周辺でハワイアングルメ", key: true },
      { t: "20:00〜", at: "20:00", title: "散策・早めに就寝", note: "翌朝はダイヤモンドヘッド" },
    ],
    sections: [
      { title: "ランチの候補", options: [
        { place: "wolfgang", desc: "当日の空席次第。熟成ステーキのランチセット" },
        { place: "fumis", desc: "ガーリックシュリンプ" },
        { place: "poibowl", desc: "カルアピッグなどハワイ伝統料理" },
        { place: "liliha", desc: "ロコモコなどのローカルフード" },
        { place: "foodland", desc: "ポケ丼" },
      ] },
      { title: "夕食の候補", options: [
        { place: "paia", desc: "昼がステーキなら魚介で" },
        { name: "ワイキキ周辺のフードトラック", desc: "ガーリックシュリンプやプレートランチ" },
        { place: "foodland", desc: "ポケ丼のテイクアウト（昼が重かったとき）" },
      ] },
      { title: "お土産メモ", items: ["ウォルマート：マカダミアチョコ、コーヒー、お菓子", "4〜5日目にLongs DrugsやTargetでも買えるので無理しない"] },
    ],
  },
  {
    n: 3, date: "2026-10-15", tz: "HST", end: "2026-10-16T04:00:00-10:00",
    label: "10月15日 木", title: "ダイヤモンドヘッドと水族館",
    lead: "朝はトロリーで登山。午後は疲れ具合で柔軟に。15:00にアリゾナ記念館の予約を忘れずに。",
    events: [
      { t: "7:30", at: "07:30", title: "ホテルを出発", note: "Waikiki Shopping Plazaへ歩く", place: "wsp" },
      { t: "8:00", at: "08:00", title: "トロリー・グリーンラインに乗る", note: "Waikiki Shopping Plaza発（時刻は前日に要確認）", place: "wsp", key: true },
      { t: "8:20頃", at: "08:20", title: "ダイヤモンドヘッドに到着", note: "予約枠 8:00〜9:00", place: "diamondhead", booked: true },
      { t: "8:25〜10:00", at: "08:25", title: "ダイヤモンドヘッド登山", note: "急がない。水分補給", place: "diamondhead", key: true },
      { t: "10:00〜10:35", at: "10:00", title: "下山後の休憩", note: "水分・トイレ" },
      { t: "10:40頃", at: "10:40", title: "グリーンラインで途中下車へ", note: "モンサラット通りで降りる" },
      { t: "11:00頃", at: "11:00", title: "Pioneer Saloonでテイクアウト", place: "pioneer" },
      { t: "11:30〜12:30", at: "11:30", title: "公園でピクニック", note: "レジャーシート。2人とも熟睡しない", place: "kapiolani", key: true },
      { t: "12:30〜14:00", at: "12:30", title: "ワイキキ水族館", note: "1〜1.5時間", place: "aquarium", key: true },
      { t: "14:00〜14:30", at: "14:00", title: "海沿いを歩いてホテルへ", note: "約25〜30分。疲れたらバスかUber", place: "sheraton" },
      { t: "15:00", at: "15:00", title: "アリゾナ記念館を予約", note: "recreation.govで翌日分が15:00に公開。数秒で埋まる", key: true, todo: true, link: "https://www.recreation.gov/search?q=USS%20Arizona%20Memorial" },
      { t: "15:00〜", at: "15:05", title: "昼寝・自由時間" },
      { t: "夕方〜夜", at: "18:00", title: "ホテル周辺で軽めの夕食", note: "第一候補は STIX ASIA" },
    ],
    sections: [
      { title: "登山の持ち物", items: ["水・帽子・日焼け止め・タオル", "トロリーの時刻に合わせて急がない"] },
      { title: "夕食の候補", options: [
        { place: "stix", desc: "第一候補。軽めにもしっかりにも" },
        { place: "kaipoke", desc: "ポケを軽めに" },
        { place: "iyasume", desc: "テイクアウトして部屋で" },
        { place: "rumfire", desc: "ホテルから出たくないとき" },
      ] },
    ],
  },
  {
    n: 4, date: "2026-10-16", tz: "HST", end: "2026-10-17T04:00:00-10:00",
    label: "10月16日 金", title: "パールハーバー",
    lead: "アリゾナ記念館 14:15の枠が取れた場合の予定。取れなかったときは下の代替案へ。",
    events: [
      { t: "8:30〜9:30", at: "08:30", title: "起床・準備", note: "朝はゆっくり" },
      { t: "9:30〜10:45", at: "09:30", title: "カフェでブランチ", note: "午後に備えて食事も済ませる" },
      { t: "10:45", at: "10:45", title: "ホテルで出発準備", note: "バッグは持ち込めないので財布とスマホ、透明バッグで" },
      { t: "11:15", at: "11:15", title: "42番の乗り場へ", note: "クヒオ通りの西行き。DaBus2で通過時刻を確認", place: "bus42west" },
      { t: "11:30〜12:00", at: "11:30", title: "TheBus 42番でパールハーバーへ", note: "「42 EWA BEACH」行き。ワイキキ東端11:30発の便", place: "bus42west", key: true },
      { t: "13:01", at: "13:01", title: "Arizona Memorial停留所に到着", place: "pearl" },
      { t: "13:10〜13:55", at: "13:10", title: "無料展示・記録映画", place: "pearl" },
      { t: "14:00", at: "14:00", title: "受付・乗船準備", note: "予約のQRコードを出す" },
      { t: "14:15〜15:00", at: "14:15", title: "アリゾナ記念館", note: "船の往復を含めて約45分", place: "pearl", key: true },
      { t: "15:00〜15:40", at: "15:00", title: "残りの展示・海沿い散策" },
      { t: "15:40〜16:00", at: "15:40", title: "42番でワイキキへ", note: "「WAIKIKI BEACH & HOTELS」行き。往路と乗り場が違う", place: "bus42east", key: true },
      { t: "17:00〜17:30", at: "17:00", title: "ホテルに帰着・休憩", place: "sheraton" },
      { t: "18:00〜19:00", at: "18:00", title: "ワイキキで夕食" },
    ],
    sections: [
      { title: "予約が取れなかったら", items: ["ホテルのプール・ワイキキビーチ", "カカアコで昼食と壁画散歩", "空席があれば午後のカタマラン", "パールハーバーの無料展示だけ見学する"] },
      { title: "行き方の比較", items: ["TheBus 42番：乗換なし・片道90〜110分。2人往復で現金$13／HOLO $12", "Uber：片道35〜60分・1台$30〜50程度", "Skyline併用：片道90〜120分。HOLOで2人往復$12"] },
    ],
  },
  {
    n: 5, date: "2026-10-17", tz: "HST", end: "2026-10-18T04:00:00-10:00",
    label: "10月17日 土", title: "海と最後のディナー",
    lead: "長い移動はせず、海とホテルでのんびり。ディナーだけは予約して、夜は荷造り。",
    events: [
      { t: "8:00〜9:30", at: "08:00", title: "朝食・カフェ", note: "気になっていたお店へ" },
      { t: "9:30〜11:30", at: "09:30", title: "ワイキキビーチで海水浴", place: "waikikibeach", key: true },
      { t: "11:30〜13:00", at: "11:30", title: "昼食", note: "食べ逃したハワイグルメを" },
      { t: "13:00〜16:30", at: "13:00", title: "自由時間", note: "プール、昼寝、お土産の買い足し" },
      { t: "16:30〜17:30", at: "16:30", title: "ホテルで休憩・着替え" },
      { t: "17:30〜19:30", at: "17:30", title: "新婚旅行最後のディナー", note: "日没は18:06頃", key: true, todo: true },
      { t: "20:00〜", at: "20:00", title: "荷造り・帰国準備", note: "夜更かししない" },
    ],
    sections: [
      { title: "ディナーの候補", options: [
        { place: "hwak", desc: "第一候補。夕暮れとハワイアンミュージック、フラ" },
        { place: "azure", desc: "より特別感のある高級シーフード" },
        { place: "rumfire", desc: "ホテル内で気軽に。オーシャンフロント" },
      ] },
      { title: "時間があれば", items: ["シュノーケリング（午前の海水浴と入れ替え）", "サンセットクルーズ（ディナーを遅めに）", "Longs Drugs・Targetでお土産の買い足し", "雨や予約の都合でできなかったことの回収"] },
    ],
  },
  {
    n: 6, date: "2026-10-18", tz: "HST", end: "2026-10-19T23:59:00+09:00",
    label: "10月18日 日〜19日 月", title: "帰国",
    lead: "18日はハワイ時間、19日は日本時間。12:00のレイトチェックアウトが通った場合の予定。",
    events: [
      { t: "8:00〜9:00", at: "08:00", title: "最後の朝食" },
      { t: "9:00〜10:30", at: "09:00", title: "最後の自由時間", note: "ビーチ散歩、買い物" },
      { t: "10:30〜11:45", at: "10:30", title: "荷造り・身支度" },
      { t: "12:00", at: "12:00", title: "チェックアウト・Uberで空港へ", note: "ホテル会員特典で12:00まで延長申請。通らなければ11:00にチェックアウトして荷物を預ける", place: "sheraton", key: true },
      { t: "12:45〜13:15", at: "12:45", title: "ホノルル空港に到着", note: "デルタ航空 ターミナル2", place: "hnl" },
      { t: "13:15〜14:15", at: "13:15", title: "搭乗手続き・保安検査" },
      { t: "14:15〜15:15", at: "14:15", title: "IASS HAWAII LOUNGE", note: "食事はなし。飲み物とWi-Fi", place: "iass" },
      { t: "15:40", at: "15:40", title: "搭乗ゲートへ" },
      { t: "16:25", at: "16:25", title: "ホノルルを出発（DL199）", key: true },
      { t: "20:00（日本）", at: "20:00", date: "2026-10-19", tz: "JST", title: "羽田空港に到着", note: "降機後、入国審査・荷物受取・税関申告（Visit Japan Web）", place: "hnd", key: true },
    ],
    sections: [
      { title: "羽田に着いたら", items: ["入国審査・荷物・税関で40〜60分程度"] },
    ],
  },
];

/* 予約・やること */
window.BOOKINGS = [
  { day: 1, when: "10/13 13:30", what: "COCOLOMI ロミロミ60分", status: "done", place: "cocolomi" },
  { day: 3, when: "10/15 8:00〜9:00", what: "ダイヤモンドヘッド入場", status: "done", place: "diamondhead" },
  { day: 3, when: "10/15 15:00に挑戦", what: "アリゾナ記念館（翌日分）", status: "todo", link: "https://www.recreation.gov/search?q=USS%20Arizona%20Memorial", note: "1枚$1。数秒で埋まる。ログインしておく" },
  { day: 1, when: "チェックイン時", what: "レイトチェックアウト12:00を申請", status: "todo", note: "ホテル会員特典・空室次第" },
  { day: 5, when: "早めに", what: "最後のディナー", status: "todo", note: "House Without A Key は予約可否を要確認" },
  { day: 2, when: "当日11:00頃", what: "ウルフギャングのランチ", status: "maybe", note: "空席を見て判断" },
  { day: 6, when: "10/17 16:25以降", what: "帰国便のオンラインチェックイン", status: "todo", note: "出発24時間前から" },
  { day: 6, when: "帰国前", what: "Visit Japan Webで税関申告", status: "todo", link: "https://www.vjw.digital.go.jp/" },
];

/* 旅の情報（情報タブ）
 * blocks: p=段落, list=箇条書き, rows=[ラベル, 値], tel=[ラベル, 番号, 補足], links=[ラベル, URL]
 */
window.INFO = [
  {
    id: "transit", title: "交通",
    groups: [
      {
        h: "ワイキキトロリー・ピンクライン（アラモアナ行き）",
        rows: [
          ["運賃", "1回・1日 $6。JCBカード提示で本人＋大人1名が無料（ピンクラインのみ）"],
          ["間隔", "約15分ごと。1周約1時間"],
          ["乗り場", "Waikiki Shopping Plaza、ロイヤル・ハワイアン・センターなど"],
          ["アラモアナ", "センターの海側（マカイ側）に発着"],
          ["注意", "始発は遅め（アラモアナ発10:40頃）。朝早く出るならTheBusかUber"],
        ],
        links: [["公式サイト・時刻表", "https://waikikitrolley.com/"]],
      },
      {
        h: "ワイキキトロリー・グリーンライン（ダイヤモンドヘッド行き）",
        rows: [
          ["使う日", "3日目　8:00 Waikiki Shopping Plaza発を予定"],
          ["間隔", "約60〜70分ごと。最終はワイキキ着16時過ぎ"],
          ["帰りの停留所", "火口 → 展望台 → モンサラット通り（Pioneer Saloon近く）→ カピオラニ公園・動物園 → 水族館 → ワイキキ"],
          ["注意", "分単位の時刻は前日に公式サイトで確認"],
        ],
        links: [["公式サイト・時刻表", "https://waikikitrolley.com/"]],
      },
      {
        h: "TheBus 42番（パールハーバー）",
        rows: [
          ["行き", "クヒオ通りの西行き乗り場から「42 EWA BEACH」行き"],
          ["降りる所", "Kamehameha Hwy + opp Arizona Memorial"],
          ["帰り", "アリゾナ記念館前から「42 WAIKIKI BEACH & HOTELS」行き"],
          ["運賃", "HOLOカード $3（2.5時間乗換可・1日上限$7.50）。現金 $3.25（おつりなし）"],
          ["HOLOカード", "ABC Storesなどで1枚$2"],
          ["アプリ", "App Storeで「DaBus2」を入れるとバスの現在地が分かる"],
          ["所要", "片道約60〜110分。昼は45〜60分間隔"],
        ],
        links: [["42番 時刻表（PDF）", "https://www.thebus.org/Route/TimeTables/Rt42_new.pdf"], ["リアルタイム到着情報", "http://hea.thebus.org/"]],
      },
      {
        h: "Uber",
        list: [
          "ホノルル空港では1階中央分離帯の「Ride App」表示の場所から乗る",
          "スーツケース2個なら車種を少し大きめに",
          "チップはアプリで降車後に（15〜20%が目安）",
        ],
      },
    ],
  },
  {
    id: "emergency", title: "緊急のとき",
    groups: [
      {
        h: "電話",
        tel: [
          ["警察・救急・消防", "911", "英語で \"Japanese interpreter, please\" と伝えると通訳につないでもらえる"],
          ["在ホノルル日本国総領事館", "+18085433111", "平日8:00〜16:00。時間外も同じ番号で緊急対応"],
          ["Doctors on Call（シェラトン内・日本語）", "+18089239966", "体調不良やけがはまずここへ"],
          ["シェラトン・ワイキキ", "+18089224422", ""],
          ["ホノルル警察（緊急でない相談）", "+18085293111", ""],
        ],
      },
      {
        h: "カードをなくしたら",
        list: [
          "Amexアプリでカードを一時停止",
          "カード裏面の番号か、アメックス公式サイトの海外緊急連絡先へ連絡",
          "警察に届けて受理番号をもらう（保険請求に必要）",
        ],
        links: [["アメックス 紛失・盗難の連絡先", "https://www.americanexpress.com/ja-jp/customer-service/"]],
      },
      {
        h: "病院（救急外来）",
        places: ["doc", "queens", "consulate"],
      },
    ],
  },
  {
    id: "money", title: "お金とルール",
    groups: [
      {
        h: "チップの目安",
        rows: [
          ["レストラン", "18〜22%。伝票にService Chargeが入っていれば不要"],
          ["バー", "1杯$1〜2、またはお会計の18〜20%"],
          ["ハウスキーピング", "1日$2〜5を枕元に"],
          ["Uber・タクシー", "15〜20%"],
          ["ベル・荷物", "1個$2程度"],
        ],
      },
      {
        h: "税金",
        list: ["買い物・食事にはオアフ島の消費税 約4.7%が値札に上乗せ", "ホテルの宿泊税は合計約18.7%"],
      },
      {
        h: "気をつけるルール",
        list: [
          "ビーチ・公園・路上での飲酒は禁止。お酒を買うときはパスポートを見せる（21歳以上）",
          "ビーチと公園は禁煙（電子たばこも）",
          "横断歩道でスマホを見ながら渡ると罰金",
          "オキシベンゾン・オクチノキサートを含む日焼け止めは販売禁止。ノンケミカルを選ぶ",
          "レジ袋は有料（紙袋15¢〜）。エコバッグがあると便利",
          "ビーチで荷物から目を離さない",
        ],
      },
    ],
  },
  {
    id: "weather", title: "天気と日没",
    groups: [
      {
        h: "日の出・日没（ホノルル）",
        rows: [
          ["10/13 火", "日の出 6:26　日没 18:09"],
          ["10/14 水", "日の出 6:26　日没 18:08"],
          ["10/15 木", "日の出 6:26　日没 18:07"],
          ["10/16 金", "日の出 6:27　日没 18:06"],
          ["10/17 土", "日の出 6:27　日没 18:06"],
          ["10/18 日", "日の出 6:28　日没 18:05"],
        ],
      },
      {
        h: "予報",
        links: [["ホノルルの天気（米国気象局）", "https://www.weather.gov/hfo/"], ["波の予報", "https://www.weather.gov/hfo/SRF"], ["ビーチの安全情報", "https://hawaiibeachsafety.com/"]],
      },
    ],
  },
  {
    id: "return", title: "帰国",
    groups: [
      {
        h: "羽田の税関",
        list: [
          "Visit Japan Webで携帯品申告を済ませてQRコードを用意",
          "税関の電子申告端末でQRとパスポートを読み取り、電子申告ゲートへ",
        ],
        links: [["Visit Japan Web", "https://www.vjw.digital.go.jp/"]],
      },
      {
        h: "免税の範囲（1人あたり）",
        rows: [
          ["お酒", "3本（1本760ml程度）"],
          ["たばこ", "紙巻200本、加熱式10箱"],
          ["その他", "海外での合計額20万円まで"],
        ],
      },
    ],
  },
];
