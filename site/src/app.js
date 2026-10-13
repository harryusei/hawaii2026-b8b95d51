/* ふたりのハワイ — app */
(function () {
  "use strict";

  const { DAYS, PLACES, BOOKINGS, INFO } = window;
  const view = document.getElementById("view");
  const OFFSET = { HST: "-10:00", JST: "+09:00" };

  /* ---------- time ---------- */
  // ?now=2026-10-15T09:00-10:00 で任意の時刻を再現できる（確認用）
  const nowParam = new URLSearchParams(location.search).get("now");
  const nowOffset = nowParam ? new Date(nowParam).getTime() - Date.now() : 0;
  const now = () => new Date(Date.now() + nowOffset);

  const fmt = (tz, opts) => new Intl.DateTimeFormat("ja-JP", { timeZone: tz, ...opts });
  const fHST = fmt("Pacific/Honolulu", { hour: "numeric", minute: "2-digit" });
  const fJST = fmt("Asia/Tokyo", { hour: "numeric", minute: "2-digit" });
  const fDayHST = fmt("Pacific/Honolulu", { weekday: "short" });
  const fDayJST = fmt("Asia/Tokyo", { weekday: "short" });

  function tickClocks() {
    const d = now();
    document.getElementById("clock-hst").textContent = `${fDayHST.format(d)} ${fHST.format(d)}`;
    document.getElementById("clock-jst").textContent = `${fDayJST.format(d)} ${fJST.format(d)}`;
  }

  const evTime = (day, ev) =>
    ev.at ? new Date(`${ev.date || day.date}T${ev.at}:00${OFFSET[ev.tz || day.tz]}`) : null;

  function currentDayIndex() {
    const t = now();
    const i = DAYS.findIndex((d) => t < new Date(d.end));
    return i === -1 ? DAYS.length - 1 : i;
  }

  function nowNext(day) {
    const t = now();
    let cur = -1;
    day.events.forEach((ev, i) => {
      const at = evTime(day, ev);
      if (at && at <= t) cur = i;
    });
    const next = day.events.findIndex((ev, i) => i > cur && evTime(day, ev));
    return { cur, next };
  }

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mapUrl = (p) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q)}`;
  const dirUrl = (p) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.q)}`;
  const telLabel = (n) => (n === "911" ? "911" : n.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3"));

  const icon = {
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.2"/></svg>',
    go: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h13M12 6l6 6-6 6"/></svg>',
    tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    out: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  };
  const a = (href, label, cls = "pill", ico = "") =>
    `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${ico}${esc(label)}</a>`;
  const placeLinks = (p, opts = {}) => {
    if (!p) return "";
    let h = a(mapUrl(p), "地図", opts.cls || "pill", icon.pin);
    if (opts.dir) h += a(dirUrl(p), "ここへ行く", "pill ghost", icon.go);
    if (opts.tel && p.tel) h += `<a class="pill ghost" href="tel:${p.tel}">${icon.tel}電話</a>`;
    if (opts.url && p.url) h += a(p.url, "公式サイト", "pill ghost", icon.out);
    return h;
  };

  /* ---------- pieces ---------- */
  function timeline(day, { live = false } = {}) {
    const { cur } = live ? nowNext(day) : { cur: -2 };
    return `<ol class="tl">${day.events
      .map((ev, i) => {
        const p = PLACES[ev.place];
        const cls = ["ev", ev.key && "key", live && i < cur && "past", live && i === cur && "current"].filter(Boolean).join(" ");
        const tag = ev.booked ? '<span class="tag done">予約済み</span>' : ev.todo ? '<span class="tag todo">要予約</span>' : "";
        const links = [p ? placeLinks(p) : "", ev.link ? a(ev.link, "予約ページ", "pill ghost", icon.out) : ""].join("");
        return `<li class="${cls}"${live && i === cur ? ' aria-current="step"' : ""}>
          <div class="ev-time">${esc(ev.t)}</div>
          <div class="ev-marker"><span class="ev-dot"></span></div>
          <div class="ev-body">
            <div class="ev-title">${esc(ev.title)}${tag}</div>
            ${ev.note ? `<div class="ev-note">${esc(ev.note)}</div>` : ""}
            ${links ? `<div class="ev-links">${links}</div>` : ""}
          </div>
        </li>`;
      })
      .join("")}</ol>`;
  }

  function sections(day, openFirst = false) {
    return (day.sections || [])
      .map((s, i) => {
        let body = "";
        if (s.items) body += `<ul class="dots">${s.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
        if (s.options)
          body += s.options
            .map((o) => {
              const p = PLACES[o.place];
              return `<div class="opt"><div class="opt-name">${esc(o.name || p.name)}</div>
                <div class="opt-desc">${esc(o.desc || "")}${p && p.info ? `<br>${esc(p.info)}` : ""}</div>
                ${p ? `<div class="ev-links">${placeLinks(p, { tel: true, url: true })}</div>` : ""}</div>`;
            })
            .join("");
        return `<details class="fold"${openFirst && i === 0 ? " open" : ""}><summary>${esc(s.title)}</summary><div class="fold-body">${body}</div></details>`;
      })
      .join("");
  }

  function hero(day) {
    return `<section class="hero"><div class="wrap">
      <span class="day-chip">${day.n}日目　${esc(day.label)}</span>
      <h1>${esc(day.title)}</h1>
      <p class="lead">${esc(day.lead)}</p>
    </div></section>`;
  }

  /* ---------- views ---------- */
  function renderToday() {
    const di = currentDayIndex();
    const day = DAYS[di];
    const t = now();
    const tripOver = t >= new Date(DAYS[DAYS.length - 1].end);
    const { cur, next } = nowNext(day);
    const c = day.events[cur];
    const n = day.events[next];

    let card;
    if (tripOver) {
      card = `<div class="now"><div class="now-kicker">おかえりなさい</div><div class="now-title">すてきな旅でしたね</div></div>`;
    } else {
      const head = c
        ? `<div class="now-kicker">いま　${esc(c.t)}</div><div class="now-title">${esc(c.title)}</div>${c.note ? `<div class="now-note">${esc(c.note)}</div>` : ""}`
        : `<div class="now-kicker">${di === 1 ? "機内で休憩中" : "この日の最初の予定まで"}</div><div class="now-title">${n ? esc(n.title) : "自由時間"}</div>${n ? `<div class="now-note">${esc(n.t)}から</div>` : ""}`;
      const focus = c || n;
      const fp = focus && PLACES[focus.place];
      const actions = fp ? `<div class="now-actions">${placeLinks(fp, { dir: true, tel: true })}</div>` : "";
      const nextRow = c && n ? `<div class="now-next"><span class="k">つぎ</span><span class="v"><b>${esc(n.t)}</b>　${esc(n.title)}</span></div>` : "";
      card = `<div class="now" aria-live="polite">${head}${actions}${nextRow}</div>`;
    }

    const todos = day.events.filter((e) => e.todo);
    const notice = todos.length
      ? `<div class="notice"><b>この日にやること</b><br>${todos.map((e) => `${esc(e.t)}　${esc(e.title)}`).join("<br>")}</div>`
      : "";

    view.innerHTML = `${hero(day)}
      <div class="wrap">
        ${card}
        ${notice}
        <section class="block"><h2>今日の予定</h2>${timeline(day, { live: true })}</section>
        ${day.sections && day.sections.length ? `<section class="block"><h2>候補とメモ</h2>${sections(day)}</section>` : ""}
        <div class="quick">
          <a class="pill" href="#days/${day.n}">この日の詳細</a>
          <a class="pill" href="#info/emergency">緊急のとき</a>
          <a class="pill" href="#info/bookings">予約とやること</a>
        </div>
      </div>`;
    // 現在の行が見えるように
    const curEl = view.querySelector(".ev.current");
    if (curEl && !renderToday.scrolled) {
      renderToday.scrolled = true;
    }
  }

  function switcher(active) {
    const today = currentDayIndex();
    return `<nav class="switcher" aria-label="日付"><div class="row">${DAYS.map(
      (d) => `<a class="sw${d.n === today ? " today" : ""}" href="#days/${d.n}" aria-current="${d.n === active}">
        <b>${d.n}日目</b><span>${esc(d.label.split(" ")[0].replace("10月", "10/").replace("日", ""))}</span></a>`
    ).join("")}</div></nav>`;
  }

  function renderDay(n) {
    const day = DAYS[n] || DAYS[currentDayIndex()];
    const live = day.n === currentDayIndex();
    view.innerHTML = `${switcher(day.n)}${hero(day)}
      <div class="wrap">
        <section class="block"><h2>スケジュール</h2>${timeline(day, { live })}</section>
        ${day.sections && day.sections.length ? `<section class="block"><h2>候補とメモ</h2>${sections(day, true)}</section>` : ""}
      </div>`;
    const cur = view.querySelector(`.sw[aria-current="true"]`);
    if (cur) cur.scrollIntoView({ inline: "center", block: "nearest" });
  }

  const CATS = [
    ["stay", "泊まる"], ["do", "観光・体験"], ["eat", "食べる"], ["shop", "買う"],
    ["airport", "空港"], ["transit", "乗り場・駅"], ["help", "困ったとき"],
  ];

  function placeDays() {
    const map = {};
    const add = (id, n) => { if (!id) return; (map[id] ||= new Set()).add(n); };
    DAYS.forEach((d) => {
      d.events.forEach((e) => add(e.place, d.n));
      (d.sections || []).forEach((s) => (s.options || []).forEach((o) => add(o.place, d.n)));
    });
    return map;
  }

  function renderPlaces(filter) {
    const days = placeDays();
    const active = CATS.some(([k]) => k === filter) ? filter : "all";
    const groups = CATS.filter(([k]) => active === "all" || k === active)
      .map(([k, label]) => {
        const items = Object.entries(PLACES).filter(([, p]) => p.cat === k);
        if (!items.length) return "";
        return `<section class="block"><h2>${label}</h2>${items
          .map(([id, p]) => {
            const ds = days[id] ? [...days[id]].sort().map((n) => `${n}日目`).join("、") : "";
            return `<div class="opt">
              <div class="opt-head"><div class="opt-name">${esc(p.name)}</div>${ds ? `<span class="days-of">${ds}</span>` : ""}</div>
              <div class="opt-desc">${[p.addr, p.info].filter(Boolean).map(esc).join("<br>")}</div>
              <div class="ev-links">${placeLinks(p, { dir: true, tel: true, url: true })}</div>
            </div>`;
          })
          .join("")}</section>`;
      })
      .join("");
    view.innerHTML = `<div class="switcher"><div class="chips" role="group" aria-label="種類で絞り込む">
        <a class="chip" href="#places" aria-pressed="${active === "all"}">すべて</a>
        ${CATS.map(([k, l]) => `<a class="chip" href="#places/${k}" aria-pressed="${active === k}">${l}</a>`).join("")}
      </div></div>
      <div class="wrap">
        <div class="page-head"><h1>地図</h1><p>「地図」でGoogleマップを開きます。「ここへ行く」は今いる場所からの経路です。</p></div>
        ${groups}
      </div>`;
  }

  const CHECK_KEY = "hawaii-checked";
  const getChecked = () => { try { return JSON.parse(localStorage.getItem(CHECK_KEY)) || {}; } catch { return {}; } };

  function renderInfo(anchor) {
    const checked = getChecked();
    const statusLabel = { done: "予約済み", todo: "これから", maybe: "当日判断" };
    const bookings = BOOKINGS.map((b, i) => {
      const p = PLACES[b.place];
      const on = checked[i] ?? b.status === "done";
      return `<label class="book${on ? " checked" : ""}">
        <input type="checkbox" data-check="${i}"${on ? " checked" : ""}>
        <div>
          <div class="when">${b.day}日目　${esc(b.when)}</div>
          <div class="what">${esc(b.what)}<span class="status ${b.status}">${statusLabel[b.status]}</span></div>
          ${b.note ? `<div class="note">${esc(b.note)}</div>` : ""}
          ${b.link || p ? `<div class="ev-links">${b.link ? a(b.link, "開く", "pill ghost", icon.out) : ""}${p ? placeLinks(p) : ""}</div>` : ""}
        </div>
      </label>`;
    }).join("");

    const group = (g) => {
      let h = `<div class="group"><h3>${esc(g.h)}</h3>`;
      if (g.rows) h += `<dl class="rows">${g.rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;
      if (g.list) h += `<ul class="dots">${g.list.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
      if (g.tel)
        h += `<ul class="tel-list">${g.tel.map(([nm, num, sub]) => `<li class="tel-row"><div><div class="nm">${esc(nm)}</div>${sub ? `<div class="sub">${esc(sub)}</div>` : ""}</div><a class="pill ${num === "911" ? "hot" : ""}" href="tel:${num}">${icon.tel}${telLabel(num)}</a></li>`).join("")}</ul>`;
      if (g.places)
        h += g.places.map((id) => { const p = PLACES[id]; return `<div class="opt"><div class="opt-name">${esc(p.name)}</div><div class="opt-desc">${esc(p.addr || "")}</div><div class="ev-links">${placeLinks(p, { dir: true, tel: true })}</div></div>`; }).join("");
      if (g.links) h += `<div class="links">${g.links.map(([l, u]) => a(u, l, "pill", icon.out)).join("")}</div>`;
      return h + "</div>";
    };

    const secs = [{ id: "bookings", title: "予約とやること" }, ...INFO];
    view.innerHTML = `<div class="switcher"><nav class="chips" aria-label="情報の目次">
        ${secs.map((s) => `<a class="chip" href="#info/${s.id}" aria-pressed="${anchor === s.id}">${esc(s.title)}</a>`).join("")}
      </nav></div>
      <div class="wrap">
        <section class="info-sec" id="sec-bookings"><h2>予約とやること</h2>
          <p class="muted small" style="margin-top:10px">済んだらチェック。この端末に保存されます。</p>${bookings}</section>
        ${INFO.map((s) => `<section class="info-sec" id="sec-${s.id}"><h2>${esc(s.title)}</h2>${s.groups.map(group).join("")}</section>`).join("")}
        <p class="foot">時刻・料金・営業時間は2026年10月時点の調べです。当日は公式サイトでも確認してください。</p>
      </div>`;

    view.querySelectorAll("[data-check]").forEach((el) =>
      el.addEventListener("change", () => {
        const c = getChecked();
        c[el.dataset.check] = el.checked;
        localStorage.setItem(CHECK_KEY, JSON.stringify(c));
        el.closest(".book").classList.toggle("checked", el.checked);
      })
    );
    if (anchor) {
      const t = document.getElementById(`sec-${anchor}`);
      if (t) requestAnimationFrame(() => t.scrollIntoView({ block: "start" }));
    }
  }

  /* ---------- router ---------- */
  function route() {
    const [tab = "today", arg] = location.hash.replace(/^#/, "").split("/");
    const prevTab = route.tab;
    route.tab = tab;
    if (tab === "days") renderDay(arg !== undefined ? Number(arg) : currentDayIndex());
    else if (tab === "places") renderPlaces(arg);
    else if (tab === "info") renderInfo(arg);
    else renderToday();
    document.querySelectorAll(".tabs a").forEach((el) => el.setAttribute("aria-current", el.dataset.tab === (["days", "places", "info"].includes(tab) ? tab : "today") ? "page" : "false"));
    if (!(tab === "info" && arg) && (prevTab !== tab || tab === "days")) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  tickClocks();
  route();
  setInterval(() => {
    tickClocks();
    if (route.tab === "today" || !route.tab) {
      const y = window.scrollY;
      renderToday();
      window.scrollTo(0, y);
    }
  }, 30000);

  if ("serviceWorker" in navigator && window.__BUILT__) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
