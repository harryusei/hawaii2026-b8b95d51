#!/usr/bin/env node
/* ふたりのハワイ — ビルド
 *
 *   node build.mjs            … パスワードを聞かれるので入力（画面に表示されます）
 *   HAWAII_PASSWORD=xxx node build.mjs
 *
 * src/ の HTML・CSS・JS を1ファイルにまとめ、AES-GCM（鍵はPBKDF2-SHA256で導出）で暗号化して
 * dist/index.html に出力します。外部ライブラリは使いません。
 * dist/ をそのまま GitHub Pages に置けば公開できます。
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const src = (f) => readFileSync(join(root, "src", f), "utf8");
const ITER = 300000;

async function getPassword() {
  if (process.env.HAWAII_PASSWORD) return process.env.HAWAII_PASSWORD;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const pw = (await rl.question("パスワードを入力: ")).trim();
  rl.close();
  if (!pw) { console.error("パスワードが空です。"); process.exit(1); }
  return pw;
}

function inline() {
  const safe = (s) => s.replace(/<\/script/gi, "<\\/script");
  return src("index.html")
    .replace(/<!--INLINE:css-->[\s\S]*?<!--\/INLINE-->/, `<style>${src("styles.css")}</style>`)
    .replace(
      /<!--INLINE:js-->[\s\S]*?<!--\/INLINE-->/,
      `<script>window.__BUILT__=true;${safe(src("data.js"))}</script><script>${safe(src("app.js"))}</script>`
    );
}

const b64 = (u8) => Buffer.from(u8).toString("base64");

async function encrypt(text, password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
  );
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(text)));
  return { salt: b64(salt), iv: b64(iv), ct: b64(ct), iter: ITER };
}

function gate(payload) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0A7EA4">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="ふたりのハワイ">
<title>ふたりのハワイ</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#E3F4F7;color:#12384A;
    font-family:"Hiragino Sans","Noto Sans JP",sans-serif;-webkit-font-smoothing:antialiased}
  form{width:min(340px,88vw);text-align:center}
  h1{font-family:"Hiragino Maru Gothic ProN","M PLUS Rounded 1c",sans-serif;color:#075F7C;font-size:30px;margin:0 0 6px}
  p{margin:0 0 22px;color:#4E6B78;font-size:15px}
  input{width:100%;box-sizing:border-box;font-size:18px;padding:14px 16px;border-radius:16px;border:2px solid #CBE9EF;background:#fff;color:inherit}
  input:focus{outline:none;border-color:#0A7EA4}
  button{margin-top:12px;width:100%;font:700 17px "Hiragino Maru Gothic ProN",sans-serif;padding:14px;border:0;border-radius:999px;background:#E4486A;color:#fff;cursor:pointer}
  button:disabled{opacity:.6}
  .err{min-height:1.6em;margin-top:12px;color:#C2304F;font-size:14px}
  label{display:block;text-align:left;font-size:14px;margin-bottom:6px}
</style>
</head>
<body>
<form id="f" autocomplete="on" hidden>
  <h1>ふたりのハワイ</h1>
  <p>旅のしおりを開くパスワードを入力してください</p>
  <label for="pw">パスワード</label>
  <input id="pw" type="password" autocomplete="current-password" required autofocus>
  <button id="b" type="submit">しおりを開く</button>
  <div class="err" id="err" role="alert"></div>
</form>
<script>
(function(){
  var P=${JSON.stringify(payload)}, K="hawaii-key";
  var u8=function(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})};
  var b64=function(b){return btoa(String.fromCharCode.apply(null,new Uint8Array(b)))};
  function show(html){document.open();document.write(html);document.close();}
  async function open(key){
    var pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:u8(P.iv)},key,u8(P.ct));
    return new TextDecoder().decode(pt);
  }
  async function derive(pw){
    var base=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);
    return crypto.subtle.deriveKey({name:"PBKDF2",salt:u8(P.salt),iterations:P.iter,hash:"SHA-256"},base,{name:"AES-GCM",length:256},true,["decrypt"]);
  }
  var f=document.getElementById("f"),err=document.getElementById("err"),b=document.getElementById("b");
  (async function(){
    var saved=localStorage.getItem(K);
    if(saved){
      try{var key=await crypto.subtle.importKey("raw",u8(saved),"AES-GCM",false,["decrypt"]);show(await open(key));return;}
      catch(e){localStorage.removeItem(K);}
    }
    f.hidden=false;document.getElementById("pw").focus();
  })();
  f.addEventListener("submit",async function(e){
    e.preventDefault();b.disabled=true;b.textContent="開いています…";err.textContent="";
    try{
      var key=await derive(document.getElementById("pw").value);
      var html=await open(key);
      try{localStorage.setItem(K,b64(await crypto.subtle.exportKey("raw",key)));}catch(_){}
      show(html);
    }catch(_){
      err.textContent="パスワードが違います。もう一度入力してください。";
      b.disabled=false;b.textContent="しおりを開く";
    }
  });
})();
</script>
</body>
</html>
`;
}

const SW = `// オフライン用：ネット優先、つながらなければ前回の内容を表示
const C = "hawaii-v1";
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(C).then((c) => c.addAll(["./"]))); });
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((r) => { const copy = r.clone(); caches.open(C).then((c) => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./")))
  );
});
`;

const pw = await getPassword();
const html = inline();
const out = join(root, "dist");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "index.html"), gate(await encrypt(html, pw)));
writeFileSync(join(out, "sw.js"), SW);
writeFileSync(join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(join(out, ".nojekyll"), "");
console.log("dist/ に出力しました（index.html は暗号化済み）。");
