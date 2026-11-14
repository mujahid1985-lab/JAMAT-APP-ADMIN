// ============================================================
//  Premium UI components + user session / activity tracking
// ============================================================
import { esc, qs, toBn, cleanHtml, simpleHtml, textToHtml, autoDir, plainText } from './islamic.js';
import { db, doc, getDoc, getDocs, collection, setDoc, query, where } from './firebase.js';
import { T, setLabels } from './labels.js';
import { RI } from './icons.js';
export { esc, qs, toBn, cleanHtml, simpleHtml, textToHtml, autoDir, plainText, T, RI };

/* ---------------- icons (inline svg, no CDN) ---------------- */
const S = (p, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
export const ICON = {
  home: S('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>'),
  search: S('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>'),
  user: S('<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c.7-3.8 3.7-5.8 7.5-5.8s6.8 2 7.5 5.8"/>'),
  back: S('<path d="m14.5 5-7 7 7 7"/>'),
  next: S('<path d="m9.5 5 7 7-7 7"/>'),
  check: S('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  out: S('<path d="M9 4.5H5.5v15H9"/><path d="M16 8l4 4-4 4"/><path d="M20 12H9.5"/>'),
  eye: S('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>'),
  flame: S('<path d="M12 3c.5 3.2 4.5 5 4.5 9.5a4.5 4.5 0 0 1-9 0c0-1.8.8-3 1.8-4 .2 1.2.9 1.8 1.7 2C11 8.5 11 5.5 12 3Z"/>'),
  book: S('<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5Z"/><path d="M12 6v13"/>'),
  clock: S('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  cal: S('<rect x="4" y="5.5" width="16" height="14.5" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>'),
  edit: S('<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16v4Z"/>'),
  shield: S('<path d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6l7-2.5Z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
  eyeoff: S('<path d="M3 3l18 18"/><path d="M10.6 6A9.5 9.5 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.8M6.5 7.5A16 16 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.6-.3 3.7-.8"/>'),
  mail: S('<rect x="3.5" y="5.5" width="17" height="13" rx="3"/><path d="m4.5 8 7.5 5.5L19.5 8"/>'),
  lock: S('<rect x="5" y="10.5" width="14" height="9.5" rx="3"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>'),
  plus: S('<path d="M12 5v14M5 12h14"/>'),
  minus: S('<path d="M5 12h14"/>'),
  cross: S('<path d="M6 6l12 12M18 6 6 18"/>'),
  quiz: S('<rect x="5" y="5" width="14" height="16" rx="3"/><rect x="9" y="3" width="6" height="4" rx="1.6"/><path d="m8.8 13.4 2.4 2.4 4.2-4.6"/>'),
  trophy: S('<path d="M8 4h8v6a4 4 0 0 1-8 0Z"/><path d="M8 6H5.5v1.5A2.8 2.8 0 0 0 8 10.3M16 6h2.5v1.5a2.8 2.8 0 0 1-2.5 2.8"/><path d="M12 14v3.5M8.5 20h7M10 17.5h4"/>'),
};
/* big line icons for the round badge of every button (brown line + tan fill) */
const BI = (p) => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const F = 'fill="var(--c3)" fill-opacity=".45"';
export const BIG = {
  clip: BI(`<rect x="13" y="10" width="38" height="48" rx="5" ${F}/><rect x="23" y="5" width="18" height="10" rx="4" fill="var(--c4)"/><path d="M21 28h22M21 36h22M21 44h22"/><circle cx="18" cy="28" r=".5"/><circle cx="18" cy="36" r=".5"/><circle cx="18" cy="44" r=".5"/>`),
  note: BI(`<path d="M20 12 52 24 42 54 10 42Z" ${F}/><path d="M16 22l-4 12M21 24l-4 12M26 26l-4 12" stroke-width="3"/><path d="M9 18 15 52" stroke="none"/><path d="M8 40 22 56l3-10Z" fill="var(--c4)"/>`),
  ledger: BI(`<rect x="6" y="14" width="52" height="38" rx="4" ${F}/><path d="M32 14v38M12 24h14M12 31h14M12 38h14M38 24h14M38 31h14M38 38h14" stroke-width="2.6"/>`),
  book: BI(`<path d="M6 16c8-3 18-3 26 2 8-5 18-5 26-2v34c-8-3-18-3-26 2-8-5-18-5-26-2Z" ${F}/><path d="M32 18v34"/>`),
  list: BI(`<rect x="12" y="8" width="40" height="48" rx="6" ${F}/><path d="M22 22h20M22 32h20M22 42h12"/>`),
  file: BI(`<path d="M14 6h26l12 12v40H14Z" ${F}/><path d="M40 6v12h12"/><path d="M32 30v14m-7-6 7 7 7-7"/>`),
  notes: BI(`<path d="M12 8h40v34L38 56H12Z" ${F}/><path d="M38 56V42h14"/><path d="M20 20h24M20 29h24M20 38h10"/>`),
  audio: BI(`<path d="M12 40V32a20 20 0 0 1 40 0v8" /><rect x="8" y="36" width="10" height="16" rx="4" ${F}/><rect x="46" y="36" width="10" height="16" rx="4" ${F}/>`),
  video: BI(`<circle cx="32" cy="32" r="24" ${F}/><path d="M26 22v20l16-10Z" fill="currentColor"/>`)
};
const DIA = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5 21.5 12 12 21.5 2.5 12Z"/></svg>`;
export { DIA };

/* ---- colour palette: 4 colours [background, primary, accent, light]; set from admin, applied on every page ---- */
export function applyPalette(p) {
  if (!Array.isArray(p) || p.length !== 4 || !p.every(c => /^#[0-9a-f]{6}$/i.test(c))) return;
  const r = document.documentElement.style; ['--c1', '--c2', '--c3', '--c4'].forEach((k, i) => r.setProperty(k, p[i]));
  try { localStorage.setItem('p_pal3', JSON.stringify(p)); } catch (e) { /* ignore */ }
}
export const DEFAULT_PALETTES = [
  { id: 'p1', c: ['#DDDEDD', '#103C4A', '#8DB3BF', '#DDDEDD'] },
  { id: 'p2', c: ['#DEE2DD', '#17493A', '#9CC4B0', '#DEE2DD'] },
  { id: 'p3', c: ['#DDE0E6', '#1F3C6B', '#9DB4DA', '#DDE0E6'] },
  { id: 'p4', c: ['#E4DEDE', '#5B1F2E', '#D1A0AB', '#E4DEDE'] },
  { id: 'p5', c: ['#E0DDE6', '#3F2D6B', '#B7A6DB', '#E0DDE6'] }
];
/* auto mode: every 24h the next colour box of the saved list is used (computed from the saved start time, no server needed) */
export function autoPalette(s) {
  if (!s || s.paletteVer !== 3 || !s.paletteAuto || !Array.isArray(s.paletteBoxes) || !s.paletteBoxes.length) return null;
  const n = s.paletteBoxes.length, d = Math.max(0, Math.floor((Date.now() - (s.paletteAutoStart || Date.now())) / 86400000));
  const b = s.paletteBoxes[(((s.paletteAutoIdx || 0) + d) % n + n) % n];
  return b && b.c;
}
try { applyPalette(JSON.parse(localStorage.getItem('p_pal3') || 'null')); } catch (e) { /* ignore */ }


/* ---------------- tiny helpers: page header, bars, badges, buttons, group cards ---------------- */
export function titleBox({ title = '', sub = '' } = {}) { return `<section class="p-card p-soon"><h3 class="p-t">${esc(title)}</h3></section>`; }
export const plaqueHead = titleBox;
export const heroHtml = () => '';
export function mountBg() { /* flat design: nothing to draw */ }
/* bottom bar (like a phone app): হোম · যাচাই · লিডারবোর্ড · প্রোফাইল. `active` = which one is lit */
export function mountNav(active = '') {
  if (document.getElementById('pNav')) return;
  const items = [['home', 'index.html', 'nav_home', ICON.home], ['quiz', 'quiz.html', 'nav_quiz', ICON.quiz], ['lb', 'leaderboard.html', 'nav_lb', ICON.trophy], ['me', 'profile.html', 'nav_me', ICON.user]];
  const nav = document.createElement('nav'); nav.id = 'pNav'; nav.className = 'p-navbar'; nav.setAttribute('aria-label', T('aria_nav'));
  nav.innerHTML = '<div class="p-nav-in">' + items.map(([k, h, l, ic]) => `<a class="p-ni${k === active ? ' on' : ''}" href="${h}"${k === active ? ' aria-current="page"' : ''}><i class="ic">${ic}</i><span>${esc(T(l))}</span></a>`).join('') + '</div>';
  document.body.appendChild(nav); document.body.classList.add('p-has-nav');
}
export function hideNav(off = true) { const n = document.getElementById('pNav'); if (n) n.hidden = off; document.body.classList.toggle('p-has-nav', !off && !!n); }
export function mountClouds() { /* no decoration */ }

// header (back button + centred title) and an optional dark bar under it; both stay on screen while scrolling
export function topHtml({ title = '', back = 'index.html', bar = '', noBack = false } = {}) {
  return `<div class="p-stick" id="pStick"><header class="p-top"><div class="p-top-in">${noBack ? '' : `<a class="p-back" id="pBack" href="${esc(back)}" aria-label="${esc(T('aria_back'))}">${RI.back}</a>`}<h1 id="pTitle"><span class="tt">${esc(title)}</span></h1></div></header>${bar}</div>`;
}
export function setTop(title, sub, note) { const t = document.getElementById('pTitle'); if (!t || title == null) return; t.innerHTML = `<span class="tt">${esc(title)}</span>` + (sub ? `<span class="ts">${esc(sub)}</span>` : '') + (note ? `<span class="ts sn">${esc(note)}</span>` : ''); t.classList.toggle('two', !!(sub || note)); t.classList.toggle('three', !!(sub && note)); fitTitle(); }
// the page title never gets cut: it shrinks to fit on one line, and only if it is still too long it takes two lines
export function fitTitle() {
  const h = document.getElementById('pTitle'); if (!h) return;
  const run = () => {
    const cs = getComputedStyle(h), avail = h.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); if (avail <= 0) return;
    const free = Math.max(0, h.clientHeight - parseFloat(cs.paddingTop));
    h.querySelectorAll('.tt,.ts').forEach((el) => {
      el.classList.remove('wrap'); el.style.fontSize = ''; el.style.lineHeight = '';
      const w = () => el.scrollWidth, two = el.classList.contains('ts') || h.classList.contains('two');
      if (w() <= avail + 0.5) return;
      const min = two ? 0.74 : 0.66;
      let sc = Math.max(min, avail / w() - 0.01); el.style.fontSize = (sc * (el.classList.contains('sn') ? 40 : el.classList.contains('ts') ? 58 : 100)).toFixed(1) + (el.classList.contains('ts') ? '%' : '%');
      if (w() <= avail + 0.5) return;
      el.classList.add('wrap'); let k = 0; const maxH = two ? free * 0.5 : free * 0.92;
      while (el.scrollHeight > maxH && k++ < 14) { sc *= 0.94; el.style.fontSize = (sc * (el.classList.contains('sn') ? 40 : el.classList.contains('ts') ? 58 : 100)).toFixed(1) + '%'; }
    });
  };
  run(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(run); if (!window._fitRs) { window._fitRs = 1; addEventListener('resize', () => fitTitle()); }
}

export const n2 = (n) => toBn(String(n).padStart(2, '0'));
export const bd = (txt, id = '') => `<b class="p-bd"${id ? ` id="${id}"` : ''}><i>${esc(txt)}</i></b>`;
// change a badge's number with a smooth roll (new number slides in from the bottom when it grows, from the top when it shrinks)
export function rollNum(el, txt, dir = 1) {
  if (!el) return; const ch = [...String(txt)];
  const ok = el._sl && el._sl.length === ch.length && el.firstElementChild && el.firstElementChild.classList.contains('s');
  if (!ok) { el.innerHTML = ch.map(c => `<span class="s"><i>${esc(c)}</i></span>`).join(''); el._sl = [...el.children]; return; }
  ch.forEach((c, k) => {
    const slot = el._sl[k]; let cur = slot.lastElementChild; if (cur.textContent === c) return;
    if (!dir) { slot.innerHTML = `<i>${esc(c)}</i>`; return; }
    slot.getAnimations({ subtree: true }).forEach(a => a.finish());
    cur = slot.lastElementChild;
    const nw = document.createElement('i'); nw.textContent = c; slot.appendChild(nw);
    const o = { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' };
    cur.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${-dir * 110}%)`, opacity: 0 }], o).onfinish = () => cur.remove();
    nw.animate([{ transform: `translateY(${dir * 110}%)`, opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], o);
  });
}
export const rollBadge = rollNum;

export const loaderHtml = (n = 4) => `<div class="p-skel">${'<i></i>'.repeat(n)}</div>`;
export const msgHtml = (text, err = false) => `<p class="p-msg${err ? ' err' : ''}">${esc(text)}</p>`;
export const emptyHtml = (icon, title, sub = '') => `<div class="p-empty"><h3>${esc(title)}</h3>${sub ? `<p>${esc(sub)}</p>` : ''}</div>`;
export const divider = () => '';
export const ICONKEY = { book: 'b0', file: 'b1', notes: 'b2', audio: 'b3', video: 'b4' };

// big button. With `icon` (book page) it is the slim icon button; without it the roomy centred button (home / syllabus list)
export function boxBtn({ label, sub = '', sub2 = '', href = '#', i = 0, anim = true, icon = '', cls = '' }) {
  const ik = ICONKEY[icon];
  return `<a class="p-btn${ik ? ' ico' : ''}${cls ? ' ' + cls : ''}${anim ? ' rv' : ''}" href="${esc(href)}" style="--i:${Math.min(i, 10)}">${ik ? `<i class="ic">${RI[ik]}</i>` : ''}<span class="tx"><span class="p-t">${esc(label)}</span>${sub ? `<small>${esc(sub)}</small>` : ''}${sub2 ? `<small class="p-sy">${esc(sub2)}</small>` : ''}</span></a>`;
}
export const homeBtnHtml = boxBtn;
export const sectionBtnHtml = boxBtn;
// books are shown in groups (cards with a title band); a group = books sharing the same `grp` text, in order of first appearance
export function groupBooks(items) {
  const out = [], idx = {};
  items.forEach(b => { const k = (b.grp || '').trim(); if (!(k in idx)) { idx[k] = out.length; out.push({ title: k, items: [] }); } out[idx[k]].items.push(b); });
  return out;
}
export const topicMode = (t) => t.mode || (t.link ? 'doc' : 'text');   // text = plain row | page = info card + 5 buttons | doc = text directly | list = card of text rows | parts = card of book-like parts
export const BN_LETTERS = ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ'];
/* numbering styles for lists: id -> sample generator (used by the site and the admin) */
const ROMAN = (n) => { const m = [[1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'], [100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'], [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']]; let s = ''; m.forEach(([v, r]) => { while (n >= v) { s += r; n -= v; } }); return s; };
const ALPHA = (k, up) => { let s = '', n = k + 1; while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode((up ? 65 : 97) + r) + s; n = Math.floor((n - 1) / 26); } return s; };
const toAr = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
const BN_ORD = ['১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];
const BN_WORD = ['প্রথম', 'দ্বিতীয়', 'তৃতীয়', 'চতুর্থ', 'পঞ্চম', 'ষষ্ঠ', 'সপ্তম', 'অষ্টম', 'নবম', 'দশম'];
export const NUM_STYLES = [
  ['letter', 'ক খ গ', (k) => (BN_LETTERS[k % BN_LETTERS.length] || '') + (k >= BN_LETTERS.length ? n2(Math.floor(k / BN_LETTERS.length) + 1) : '')],
  ['digit', '০১ ০২ ০৩', (k) => n2(k + 1)],
  ['bn', '১ ২ ৩', (k) => toBn(k + 1)],
  ['en', '1 2 3', (k) => String(k + 1)],
  ['en0', '01 02 03', (k) => String(k + 1).padStart(2, '0')],
  ['ENU', 'A B C', (k) => ALPHA(k, true)],
  ['enl', 'a b c', (k) => ALPHA(k, false)],
  ['RO', 'I II III', (k) => ROMAN(k + 1).toUpperCase()],
  ['ro', 'i ii iii', (k) => ROMAN(k + 1)],
  ['ord', '১ম ২য়', (k) => BN_ORD[k] || toBn(k + 1) + 'তম'],
  ['word', 'প্রথম দ্বিতীয়', (k) => BN_WORD[k] || toBn(k + 1) + 'তম'],
  ['ar', '١ ٢ ٣', (k) => toAr(k + 1)]
];
export const numFmt = (style, k) => { const s = NUM_STYLES.find(x => x[0] === style) || NUM_STYLES[0]; return s[2](k); };
export const numOk = (s) => NUM_STYLES.some(x => x[0] === s) ? s : 'letter';
export const letterOf = (k) => numFmt('letter', k) + ')';
export const totalHtml = (n) => esc(T('bk_total')).replace('{n}', `<b class="p-bd">${n2(n)}</b>`);
export function groupCardHtml({ title = '', rows = [], i = 0, anim = true, tip = '' }) {
  return `<section class="p-gr${anim ? ' rv' : ''}" style="--i:${Math.min(i, 8)}"><h3 class="p-t"><span>${esc(title)}</span><span>${totalHtml(rows.length)}</span></h3>` +
    rows.map(r => { const inner = `<i class="n">${typeof r.n === 'number' ? n2(r.n) : esc(r.n)}</i><span class="tx"><span class="p-t">${esc(r.label)}</span>${r.sy ? `<small class="p-sy">${esc(r.sy)}</small>` : ''}</span>`;
      return `<div class="p-gr-row${r.done ? ' is-done' : ''}${r.href ? '' : ' plain'}" data-id="${esc(r.id)}">${r.href ? `<a class="p-lnk" href="${esc(r.href)}">${inner}</a>` : `<span class="p-lnk">${inner}</span>`}<button type="button" class="p-chk${r.done ? ' on' : ''}" data-chk="${esc(r.id)}" aria-pressed="${!!r.done}" title="${esc(tip)}" aria-label="${esc(tip)}">${RI.tick}</button></div>`; }).join('') + `</section>`;
}
// the book information card ("সংক্ষিপ্ত পরিচিতি"); rows = [[label, value], ...]
export function infoCardHtml(rows) {
  return `<section class="p-card p-info rv"><h3 class="p-t">${esc(T('b_info'))}</h3><div class="rows">${rows.map(([k, v]) => `<div><span>${esc(k)}</span><b><em>${esc(v || '')}</em></b></div>`).join('')}</div></section>`;
}
// rows of the information card for a book / topic page / part: the six fixed ones, then any extra ones the admin added
export function infoRows(b) {
  const base = [['b_name', b.name], ['b_author', b.author], ['b_trans', b.translator], ['b_pub', b.publisher], ['b_pages', b.pages ? toBn(b.pages) + ' ' + T('u_pages') : ''], ['b_price', b.price ? toBn(b.price) + ' ' + T('u_taka') : '']]
    .filter(([k, v], i) => i === 0 || String(v || '').trim()).map(([k, v]) => [T(k), v || '—']);
  const ex = (Array.isArray(b.extra) ? b.extra : []).filter(e => e && e.l && String(e.v || '').trim()).map(e => [e.l, e.v]);
  return base.concat(ex);
}
// small line under a name: "সিলেবাসের অন্তর্ভুক্ত" / "সিলেবাসের অন্তর্ভুক্ত নয়" (chosen by the admin when adding)
export const sylNote = (o) => { const v = o && typeof o.syl === 'string' ? o.syl.trim() : ''; return v === 'in' ? T('sy_in') : v === 'out' ? T('sy_out') : v; };
/* ---------------- site data (settings + home buttons) and editable texts ---------------- */
export const SITE_KEY = 'p_site_v3';
const readCache = () => { try { return JSON.parse(sessionStorage.getItem(SITE_KEY) || 'null'); } catch (e) { return null; } };
async function fetchSite() {
  const d = { s: {}, h: [] };
  try { const s = await getDoc(doc(db, 'settings', 'main')); if (s.exists()) { d.s = s.data(); const ap = autoPalette(d.s); if (ap || (d.s.paletteVer === 3 && d.s.palette)) applyPalette(ap || d.s.palette); } } catch (e) { /* ignore */ }
  try { sessionStorage.setItem(SITE_KEY, JSON.stringify({ t: Date.now(), d })); } catch (e) { /* ignore */ }
  return d;
}
export async function siteData() {
  const c = readCache();
  if (c) { if (Date.now() - c.t > 120000) fetchSite(); return c.d; }
  return fetchSite();
}
export function applyNoteSizes(z) { const r = document.documentElement.style; ['h1', 'h2', 'p'].forEach(k => { const v = z && +z[k]; if (v >= 1 && v <= 20) r.setProperty('--sz-' + k, String(v)); }); }
/* ---- writing (typography): font, weight, spacing and one size per kind of text; set from admin, applied on every page ---- */
export const TYPO_FONTS = [
  ['Hind Siliguri', 'হিন্দ শিলিগুড়ি'], ['Noto Sans Bengali', 'নোটো সানস বাংলা'], ['Noto Serif Bengali', 'নোটো সেরিফ বাংলা'],
  ['SolaimanLipi', 'সোলায়মান লিপি'], ['Kalpurush', 'কালপুরুষ'], ['Siyam Rupali', 'সিয়াম রূপালী'], ['Mukti', 'মুক্তি'],
  ['Lohit Bengali', 'লোহিত বাংলা'], ['Adorsho Lipi', 'আদর্শ লিপি'], ['BenSen', 'বেনসেন'], ['BenSen Handwriting', 'বেনসেন হাতের লেখা'],
  ['Tiro Bangla', 'তিরো বাংলা'], ['Baloo Da 2', 'বালু দা ২'], ['Anek Bangla', 'অনেক বাংলা'], ['Atma', 'আত্মা'], ['Mina', 'মিনা'],
  ['Galada', 'গালাদা'], ['Alkatra', 'অলকাত্রা'], ['Kalaa', 'কলা'], ['Siha', 'সিহা']
]; /* the 20 font files live in assets/fonts/ (see assets/fonts/README.txt); @font-face rules are at the top of app.css */
/* one card per kind of text: every text of that kind changes together by the same % (each keeps its own design size) */
export const TYPO_FAMS = [
  { k: 'ttl', n: 'পেজের শিরোনাম', w: 'সব পেজের উপরের বারের নাম', lo: 60, hi: 140 },
  { k: 'hom', n: 'হোম পেজের বাটন', w: 'সিলেবাস দেখুন, রুকন প্রস্তুতি…', lo: 60, hi: 150 },
  { k: 'crd', n: 'কার্ড ও বাটনের নাম', w: 'বই পড়ুন, অডিও শুনুন, ভিডিও দেখুন, বইয়ের নাম, কার্ডের নাম, যাচাইয়ের প্রশ্ন ও অপশন', lo: 60, hi: 150 },
  { k: 'mid', n: 'মাঝারি লেখা', w: 'তথ্যের সারি, সমস্ত/পঠিত/অপঠিত, পড়া %, লগইন ট্যাব ও ঘর, বার্তা, সঠিক/ভুল উত্তরের বার্তা', lo: 60, hi: 150 },
  { k: 'sml', n: 'ছোট লেখা', w: 'বাটনের নিচের লেখা, নম্বর ও ব্যাজ, সময়, “আরো দেখুন”, ভুলের বার্তা, নিচের বারের লেখা', lo: 60, hi: 150 },
  { k: 'toc', n: 'সূচিপত্র', w: 'সূচিপত্র বাটন ও তালিকার লেখা', lo: 60, hi: 150 },
  { k: 'nh1', n: 'নোটের বড় শিরোনাম', w: 'বইয়ের নোটের ভেতরে', lo: 50, hi: 200 },
  { k: 'nh2', n: 'নোটের ছোট শিরোনাম', w: 'বইয়ের নোটের ভেতরে', lo: 50, hi: 200 },
  { k: 'nbd', n: 'নোটের লেখা', w: 'বইয়ের নোটের মূল লেখা', lo: 50, hi: 200 }
]; /* lo/hi = the safe range (%) — inside it nothing overflows its box */
/* boxes of a fixed design size that hold text of a kind: they grow with the text (V = the % as a number) so nothing sticks out */
export const TYPO_BOXES = [
  ['sml', '.p-bd', 'height:calc(var(--p) * 2.7 * V);min-width:calc(var(--p) * 3.71 * V);border-radius:calc(var(--p) * .75 * V);'],
  ['sml', '.p-pct .p-bd', 'height:calc(var(--p) * 2.7 * V);min-width:calc(var(--p) * 7.21 * V);'],
  ['sml', '.p-gr-row .n', 'height:calc(var(--p) * 2.7 * V);width:calc(var(--p) * 3.71 * V);border-radius:calc(var(--p) * .75 * V);'],
  ['toc', '.p-tocbtn', 'height:calc(var(--p) * 4.08 * V);min-width:calc(var(--p) * 11.99 * V);'],
  ['crd', '.p-gr > h3', 'height:auto;min-height:calc(var(--p) * 5.44);'],
  ['crd', '.p-card:not(.p-aud):not(.p-vid) > h3', 'height:auto;min-height:calc(var(--p) * 4.88);'],
  ['crd', '.p-paper-card > h3', 'height:auto;min-height:calc(var(--p) * 5.98);'],
  ['crd', '.p-aud > h3, .p-vid > h3', 'height:auto;min-height:calc(var(--p) * 5.8);'],
  ['crd', '.p-submit', 'height:auto;min-height:calc(var(--p) * 6.63);'],
  ['mid', '.p-bar', 'height:auto;min-height:calc(var(--p) * 5.44);'],
  ['mid', '.p-tabs, .p-tabs button', 'height:auto;min-height:calc(var(--p) * 5.21);'],
  ['mid', '.p-field input', 'height:auto;min-height:calc(var(--p) * 6.21);']
];
export const TYPO_ROLES = [
  { f: 'ttl', sel: '.p-top h1', base: 5.25 },
  { f: 'hom', sel: '.p-btn:not(.ico):not(.slim) .p-t', base: 4.32 },
  { f: 'crd', sel: '.p-btn.slim .p-t', base: 3.3 },
  { f: 'crd', sel: '.p-btn.ico .p-t', base: 3.3 },
  { f: 'crd', sel: '.p-gr > h3, .p-card:not(.p-aud):not(.p-vid) > h3', base: 2.78 },
  { f: 'crd', sel: '.p-gr-row .p-t', base: 3.3 },
  { f: 'crd', sel: '.p-paper-card > h3', base: 3.3 },
  { f: 'crd', sel: '.p-aud > h3, .p-vid > h3', base: 3.3 },
  { f: 'crd', sel: '.p-soon p', base: 3.3 },
  { f: 'crd', sel: '.p-empty h3', base: 3.3 },
  { f: 'crd', sel: '.p-fulltext', base: 3.3 },
  { f: 'crd', sel: '.p-submit', base: 3.3 },
  { f: 'crd', sel: '.qz-q', base: 3.3 },
  { f: 'crd', sel: '.p-opt .p-t', base: 3.1 },
  { f: 'crd', sel: '.pf-nm', base: 4.2 },
  { f: 'mid', sel: '.p-bar, .p-bar .p-fil, .p-bar .p-fil > span', base: 2.8 },
  { f: 'mid', sel: '.p-info .rows > div', base: 2.78 },
  { f: 'mid', sel: '.p-pct', base: 2.8 },
  { f: 'mid', sel: '.p-tabs button', base: 2.78 },
  { f: 'mid', sel: '.p-field input', base: 2.9 },
  { f: 'mid', sel: '.p-msg', base: 2.8 },
  { f: 'mid', sel: '.p-toast', base: 2.8 },
  { f: 'mid', sel: '.qz-msg', base: 2.8 },
  { f: 'mid', sel: '.qz-note', base: 3.0 },
  { f: 'mid', sel: '.lb-pod .nm', base: 2.5 },
  { f: 'mid', sel: '.pf-tiles b', base: 4.4 },
  { f: 'sml', sel: '.p-btn small, .p-btn .p-sy', base: 1.89 },
  { f: 'sml', sel: '.p-bd, .p-bd i', base: 2.0 },
  { f: 'sml', sel: '.p-pct .p-bd, .p-pct .p-bd i', base: 1.85 },
  { f: 'sml', sel: '.p-sy', base: 1.75 },
  { f: 'sml', sel: '.p-gr-row .n', base: 2.0 },
  { f: 'sml', sel: '.p-aud .times', base: 1.8 },
  { f: 'sml', sel: '.p-more', base: 2.0 },
  { f: 'sml', sel: '.p-empty p', base: 2.2 },
  { f: 'sml', sel: '.p-err', base: 2.3 },
  { f: 'sml', sel: '.p-ni > span', base: 2.4 },
  { f: 'sml', sel: '.p-opt .l', base: 2.6 },
  { f: 'sml', sel: '.qz-new', base: 2.0 },
  { f: 'sml', sel: '.qz-top > span', base: 2.2 },
  { f: 'sml', sel: '.qz-ring .mid small', base: 2.0 },
  { f: 'sml', sel: '.lb-pod .pt', base: 2.0 },
  { f: 'sml', sel: '.lb-you', base: 1.6 },
  { f: 'sml', sel: '.pf-em', base: 2.1 },
  { f: 'sml', sel: '.pf-tiles span', base: 1.9 },
  { f: 'toc', sel: '.p-tocbtn', base: 2.4 },
  { f: 'toc', sel: '.p-toc .h1', base: 2.0 },
  { f: 'toc', sel: '.p-toc .h2', base: 1.55 },
  { f: 'nh1', sel: '.p-rich h1', fs: 'var(--p) * .25 * var(--sz-h1) * var(--rs)' },
  { f: 'nh2', sel: '.p-rich h2', fs: 'var(--p) * .25 * var(--sz-h2) * var(--rs)' },
  { f: 'nbd', sel: '.p-rich, .p-rich p, .p-rich li', fs: 'var(--p) * .25 * var(--sz-p) * var(--rs)' }
];
/* the font files are local (assets/fonts/ + @font-face in app.css): this only asks the browser to start fetching the chosen one early */
export function loadFont(f) { try { f = String(f || '').replace(/["'\\<>]/g, ''); if (f && document.fonts && document.fonts.load) { document.fonts.load('400 16px "' + f + '"'); document.fonts.load('700 16px "' + f + '"'); } } catch (e) { /* ignore */ } }
export function typoCss(t) {
  t = t || {}; const m = t.m || {}, out = [];
  const fam = t.font && t.font !== 'Hind Siliguri' ? "'" + String(t.font).replace(/['"\\<>]/g, '') + "', 'Hind Siliguri', sans-serif" : '';
  /* font: the whole site and the admin panel (everything except icons and Arabic text) */
  if (fam) out.push('html, body, html body :not(i):not(svg):not(svg *):not([class*="fa-"]):not([dir="rtl"]):not([dir="rtl"] *):not(.isl-bismillah):not(.ty-font):not(.ty-font *){font-family:' + fam + ' !important;}');
  const sel = '[class^="p-"], [class*=" p-"], [class^="p-"] *, [class*=" p-"] *';
  const w = +t.weight, ls = +t.space;
  const props = (w >= 400 && w <= 700 ? 'font-weight:' + w + ' !important;' : '') + (ls > 0 && ls <= 0.1 ? 'letter-spacing:' + ls + 'em !important;' : '');
  if (props) out.push('html :is(' + sel + '):not(i):not(svg):not(svg *):not([dir="rtl"]){' + props + '}');
  const FR = (k) => TYPO_FAMS.find(x => x.k === k) || { lo: 50, hi: 200 }, okv = (k) => { const v = +m[k], f = FR(k); return v >= f.lo && v <= f.hi && v !== 100 ? v : 0; };
  TYPO_ROLES.forEach(r => { const v = okv(r.f); if (v) out.push(r.sel.split(',').map(x => 'html ' + x.trim()).join(',') + '{font-size:calc(' + (r.fs || 'var(--p) * ' + r.base) + ' * ' + (v / 100) + ') !important;}'); });
  TYPO_BOXES.forEach(([f, sel, css]) => { const v = okv(f); if (v) out.push(sel.split(',').map(x => 'html ' + x.trim()).join(',') + '{' + css.replace(/ V\)/g, ' ' + (v / 100) + ')').replace(/;/g, ' !important;') + '}'); });
  return out.join('\n');
}
export function applyTypo(t) {
  let st = document.getElementById('typoStyle'); if (!st) { st = document.createElement('style'); st.id = 'typoStyle'; document.head.appendChild(st); }
  st.textContent = typoCss(t); if (t && t.font) loadFont(t.font);
  try { localStorage.setItem('p_typo', JSON.stringify(t || {})); } catch (e) { /* ignore */ }
}
try { applyTypo(JSON.parse(localStorage.getItem('p_typo') || 'null')); } catch (e) { /* ignore */ }
try { const d = await siteData(); setLabels(d.s && d.s.labels); const ap = autoPalette(d.s); if (ap) applyPalette(ap); applyNoteSizes(d.s && d.s.noteSizes); applyTypo(d.s && d.s.typo); } catch (e) { /* defaults are used */ }

/* ---------------- links helpers (Drive / YouTube / direct files) ---------------- */
const driveIdOf = (u) => { const m = String(u || '').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/); return m ? m[1] : ''; };
export const driveDl = (u) => { const id = driveIdOf(u); return id ? 'https://drive.google.com/uc?export=download&id=' + id : u; };
const ytIdOf = (u) => { const m = String(u || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/); return m ? m[1] : ''; };
export function mediaEmbed(url, kind) {
  const u = String(url || '').trim(); if (!/^https?:\/\//i.test(u)) return '';
  const e = esc(u), yt = ytIdOf(u), dr = driveIdOf(u);
  if (kind === 'pdf') return `<iframe class="pdf" src="${esc(dr ? 'https://drive.google.com/file/d/' + dr + '/preview' : u)}" title="PDF" loading="lazy"></iframe>`;
  if (kind === 'video') {
    if (yt) return `<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${yt}" title="video" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    if (dr) return `<iframe class="vid" src="https://drive.google.com/file/d/${dr}/preview" title="video" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    return `<video controls playsinline preload="metadata" src="${e}"></video>`;
  }
  if (dr) return `<iframe style="height:90px" src="https://drive.google.com/file/d/${dr}/preview" title="audio" loading="lazy"></iframe>`;
  if (yt) return `<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${yt}" title="audio" allow="encrypted-media" loading="lazy"></iframe>`;
  return `<audio controls preload="metadata" src="${e}"></audio>`;
}


/* ---------------- tiny press feedback only (the design has no page-change effects) ---------------- */


/* ---------------- session + activity ---------------- */
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export function streakOf(days = []) {
  const set = new Set(days); let n = 0; const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
export function ago(ts) {
  if (!ts) return '';
  const s = Math.max(0, (Date.now() - ts) / 1000);
  if (s < 60) return T('ago_now');
  if (s < 3600) return T('ago_min', { n: toBn(Math.floor(s / 60)) });
  if (s < 86400) return T('ago_hr', { n: toBn(Math.floor(s / 3600)) });
  if (s < 86400 * 30) return T('ago_day', { n: toBn(Math.floor(s / 86400)) });
  return fmtDate(ts);
}
export function fmtDate(ts) {
  try { return new Date(ts).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return ''; }
}
export const nameOf = (u, p) => (p && p.name) || (u && (u.displayName || (u.email || '').split('@')[0])) || T('user_def');

/* ---- own login system (data lives in Firestore `users`, Firebase Authentication NOT needed) ---- */
const SESSION_KEY = 'isl_uid';
const hex = (buf) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
/* Secure-context na thakle (http / VS Code) pure-JS SHA-256 + PBKDF2 — ফলাফল একই, তাই https লাগে না */
const K256 = new Uint32Array([0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]);
function sha256js(msg) {
  const l = msg.length, n = ((l + 9 + 63) >> 6) << 6, m = new Uint8Array(n); m.set(msg); m[l] = 0x80;
  const dv = new DataView(m.buffer); dv.setUint32(n - 4, (l * 8) >>> 0); dv.setUint32(n - 8, Math.floor(l / 0x20000000));
  const H = new Uint32Array([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]), w = new Uint32Array(64);
  const R = (x, c) => (x >>> c) | (x << (32 - c));
  for (let o = 0; o < n; o += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4);
    for (let i = 16; i < 64; i++) { const a = w[i-15], b = w[i-2]; w[i] = (w[i-16] + (R(a,7) ^ R(a,18) ^ (a >>> 3)) + w[i-7] + (R(b,17) ^ R(b,19) ^ (b >>> 10))) | 0; }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (R(e,6) ^ R(e,11) ^ R(e,25)) + ((e & f) ^ (~e & g)) + K256[i] + w[i]) | 0, t2 = ((R(a,2) ^ R(a,13) ^ R(a,22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H[0] += a; H[1] += b; H[2] += c; H[3] += d; H[4] += e; H[5] += f; H[6] += g; H[7] += h;
  }
  const out = new Uint8Array(32), o2 = new DataView(out.buffer); H.forEach((v, i) => o2.setUint32(i * 4, v)); return out;
}
function pbkdf2js(pass, salt, iters) {
  let k = pass; if (k.length > 64) k = sha256js(k);
  const ip = new Uint8Array(64).fill(0x36), op = new Uint8Array(64).fill(0x5c); k.forEach((v, i) => { ip[i] ^= v; op[i] ^= v; });
  const hmac = (d) => { const a = new Uint8Array(64 + d.length); a.set(ip); a.set(d, 64); const x = sha256js(a), b = new Uint8Array(96); b.set(op); b.set(x, 64); return sha256js(b); };
  const s1 = new Uint8Array(salt.length + 4); s1.set(salt); s1[s1.length - 1] = 1;
  let u = hmac(s1); const t = u.slice();
  for (let i = 1; i < iters; i++) { u = hmac(u); for (let j = 0; j < 32; j++) t[j] ^= u[j]; }
  return t;
}
const hasSubtle = () => !!(window.crypto && crypto.subtle);
export async function hashPw(pass, salt) {
  const P = new TextEncoder().encode(pass), S = new TextEncoder().encode(salt);
  if (!hasSubtle()) { await new Promise(r => setTimeout(r, 30)); return hex(pbkdf2js(P, S, 100000)); }
  const key = await crypto.subtle.importKey('raw', P, 'PBKDF2', false, ['deriveBits']);
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: S, iterations: 100000, hash: 'SHA-256' }, key, 256));
}
export async function uidOf(email) {
  const d = new TextEncoder().encode(String(email).trim().toLowerCase());
  return 'u_' + hex(hasSubtle() ? await crypto.subtle.digest('SHA-256', d) : sha256js(d)).slice(0, 32);
}
const publicUser = (d) => ({ uid: d.uid, email: d.email, displayName: d.name || '', photoURL: '' });
export async function signUp({ name, email, pass }) {
  email = email.trim().toLowerCase();
  const uid = await uidOf(email), ref = doc(db, 'users', uid);
  if ((await getDoc(ref)).exists()) throw Object.assign(new Error('exists'), { code: 'email-exists' });
  const salt = hex(crypto.getRandomValues(new Uint8Array(12))), now = Date.now();
  const d = { uid, name: name.trim(), email, salt, passHash: await hashPw(pass, salt), createdAt: now, lastLoginAt: now, activeDays: [dayKey()] };
  await setDoc(ref, d);
  localStorage.setItem(SESSION_KEY, uid);
  return publicUser(d);
}
export async function signIn(email, pass) {
  email = email.trim().toLowerCase();
  const uid = await uidOf(email), snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) throw Object.assign(new Error('nouser'), { code: 'no-user' });
  const d = snap.data();
  if ((await hashPw(pass, d.salt || '')) !== d.passHash) throw Object.assign(new Error('bad'), { code: 'bad-pass' });
  localStorage.setItem(SESSION_KEY, uid);
  return publicUser(d);
}

export async function requireUser() {
  let uid = null; try { uid = localStorage.getItem(SESSION_KEY); } catch (e) {}
  const goLogin = () => {
    const here = location.pathname.split('/').pop() || 'index.html';
    location.replace('login.html?next=' + encodeURIComponent(here + location.search));
    return new Promise(() => {});
  };
  if (!uid) return goLogin();
  const UK = 'p_user_' + uid;
  const verify = async () => {
    const snap = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) { try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(UK); } catch (e) {} return null; }
    profileCache = snap.data();
    try { sessionStorage.setItem(UK, JSON.stringify({ t: Date.now(), d: profileCache })); } catch (e) {}
    return profileCache;
  };
  try {
    const c = JSON.parse(sessionStorage.getItem(UK) || 'null');
    if (c && c.d && Date.now() - c.t < 15 * 60000) {           // fast path: no network wait
      profileCache = c.d;
      if (Date.now() - c.t > 60000) verify().then(d => { if (!d) goLogin(); }).catch(() => {});
      return publicUser(profileCache);
    }
  } catch (e) { /* fall through */ }
  try {
    const d = await verify();
    if (!d) return goLogin();
    return publicUser(d);
  } catch (e) { console.warn('session', e); return goLogin(); }
}

let profileCache = null;
export async function touchUser(u) {
  if (!u) return null;
  try {
    const TK = 'p_touch_' + u.uid + '_' + dayKey();
    if (sessionStorage.getItem(TK)) return profileCache;
    const ref = doc(db, 'users', u.uid), today = dayKey(), now = Date.now();
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const d = snap.data(), days = Array.isArray(d.activeDays) ? d.activeDays : [];
    let changed = false;
    if (!days.includes(today)) { days.push(today); d.activeDays = days.slice(-400); changed = true; }
    if (!sessionStorage.getItem('p_seen')) { d.lastLoginAt = now; changed = true; }
    if (changed) await setDoc(ref, { activeDays: d.activeDays, lastLoginAt: d.lastLoginAt }, { merge: true });
    try { sessionStorage.setItem('p_seen', '1'); sessionStorage.setItem(TK, '1'); } catch (e) {}
    profileCache = d;
  } catch (e) { console.warn('profile', e); }
  return profileCache;
}

export async function trackRead(u, note) {
  if (!u || !note) return;
  try {
    const id = u.uid + '_' + note.id, ref = doc(db, 'reads', id), now = Date.now();
    const snap = await getDoc(ref);
    const old = snap.exists() ? snap.data() : {};
    await setDoc(ref, { uid: u.uid, noteId: note.id, name: note.name || '', sectionId: note.sectionId || '', sectionName: note.sectionName || '',
      homeId: note.homeId || '', homeName: note.homeName || '', v: 3, count: (old.count || 0) + 1, firstAt: old.firstAt || now, lastAt: now });
    await setDoc(doc(db, 'users', u.uid), { lastRead: { id: note.id, name: note.name || '', sectionName: note.sectionName || '', at: now } }, { merge: true });
  } catch (e) { console.warn('track', e); }
}

/* ---------------- যাচাই (quiz): questions, points, results, leaderboard ----------------
   Everything lives in collections that already exist (no new Firestore collection / rule needed):
   settings/main      -> quizPts (points per right answer), quizCount {levelId: n}, quizHome (the রুকন প্রস্তুতি home; used by the admin)
   settings/qz_<lv>   -> q: [{id, t, o:[4 options], a: index of the right one, p: own points (0 = default), h: hidden}]
   users/<uid>        -> qz: {levelId: {p: best points, c, w, n: questions, mx: max points, x: tries, t}}
   settings/lb        -> e: {uid: {n: name, p: points, c: right, w: wrong, x: tries, t}}   (the leaderboard) */
export const QZ_PTS = 10, QZ_HOME = 'h_soon1', QZ_LETTERS = ['ক', 'খ', 'গ', 'ঘ'];
export const quizHomeId = (s) => (s && s.quizHome) || QZ_HOME;
export const quizCount = (s, lv) => Math.max(0, Math.floor(+(((s && s.quizCount) || {})[lv]) || 0));
export const quizPts = (s) => { const v = Math.floor(+(s && s.quizPts)); return v > 0 && v <= 1000 ? v : QZ_PTS; };
/* a question counts only when it has text, at least two options, a right option that is filled in, and is not hidden */
export const qOk = (q) => !!(q && !q.h && String(q.t || '').trim() && Array.isArray(q.o) && q.o.filter(x => String(x || '').trim()).length >= 2 && String(q.o[q.a] || '').trim());
export const qPts = (q, def) => { const v = Math.floor(+(q && q.p)); return v > 0 && v <= 1000 ? v : (def > 0 ? def : QZ_PTS); };
export async function loadLevel(lv) {
  const snap = await getDoc(doc(db, 'settings', 'qz_' + lv));
  const arr = snap.exists() && Array.isArray(snap.data().q) ? snap.data().q : [];
  return arr.filter(qOk);
}
/* sections (the levels) by id, in the admin's order; the page decides what to do with hidden / closed ones */
export async function sectionsByIds(ids) {
  const docs = await Promise.all([...new Set(ids)].map(id => getDoc(doc(db, 'section_buttons', id)).catch(() => null)));
  return docs.filter(d => d && d.exists() && d.data().v === 3).map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order || 0) - (b.order || 0));
}
/* the levels that have at least one question (counted in settings/main, so one read decides) and are open to everyone */
export async function quizLevels(s) {
  const ids = Object.keys((s && s.quizCount) || {}).filter(id => quizCount(s, id) > 0);
  return (await sectionsByIds(ids)).filter(x => !x.hidden && !x.locked);
}
/* the third home button is the যাচাই page (the admin turns it into kind "quiz"; until the admin was opened once the old "coming soon" button with যাচাই in its name counts too) */
export const isQuizHome = (h) => !!h && (h.kind === 'quiz' || (h.kind === 'soon' && /যাচাই/.test(String(h.name || ''))));
export function quizTotals(Q) {
  const t = { p: 0, c: 0, w: 0, n: 0, x: 0, lv: 0 };
  Object.values(Q || {}).forEach(r => { if (!r || !(+r.n > 0)) return; t.p += +r.p || 0; t.c += +r.c || 0; t.w += +r.w || 0; t.n += +r.n || 0; t.x += +r.x || 0; t.lv++; });
  return t;
}
export const accOf = (c, n) => (n > 0 ? Math.round((c / n) * 100) : 0);
/* leaderboard order: points, then right answers, then fewer wrong answers, then who got there first */
export const sortLeaders = (e) => Object.entries(e || {}).map(([uid, v]) => Object.assign({ uid }, v)).filter(v => v && (+v.x > 0 || +v.p > 0))
  .sort((a, b) => ((+b.p || 0) - (+a.p || 0)) || ((+b.c || 0) - (+a.c || 0)) || ((+a.w || 0) - (+b.w || 0)) || ((+a.t || 0) - (+b.t || 0)) || (a.uid < b.uid ? -1 : 1));
export async function loadLeaders() {
  const snap = await getDoc(doc(db, 'settings', 'lb'));
  return sortLeaders(snap.exists() ? snap.data().e : {});
}
/* the user's own data, read fresh (the 15-minute session copy can be older than the last quiz) */
export async function freshUser(u) {
  if (!u) return {};
  try {
    const snap = await getDoc(doc(db, 'users', u.uid));
    if (snap.exists()) { profileCache = snap.data(); try { sessionStorage.setItem('p_user_' + u.uid, JSON.stringify({ t: Date.now(), d: profileCache })); } catch (e) { /* ignore */ } }
  } catch (e) { console.warn('fresh', e); }
  return profileCache || {};
}
/* keep the best result of every level (retaking never lowers it, and never adds points twice), then refresh the leaderboard entry */
export async function saveQuizResult(u, lv, res) {
  const uref = doc(db, 'users', u.uid), snap = await getDoc(uref), d = snap.exists() ? snap.data() : {};
  const Q = Object.assign({}, d.qz || {}), old = Q[lv] || null, now = Date.now();
  const first = !old || !(+old.n > 0), better = !first && res.p > (+old.p || 0);
  const rec = (first || better) ? { p: res.p, c: res.c, w: res.w, n: res.n, mx: res.mx, x: (old ? +old.x || 0 : 0) + 1, t: now } : Object.assign({}, old, { x: (+old.x || 0) + 1 });
  Q[lv] = rec;
  const tot = quizTotals(Q);
  await setDoc(uref, { qz: { [lv]: rec } }, { merge: true });
  await setDoc(doc(db, 'settings', 'lb'), { e: { [u.uid]: { n: String(d.name || nameOf(u, d)).slice(0, 40), p: tot.p, c: tot.c, w: tot.w, x: tot.x, t: now } } }, { merge: true });
  profileCache = Object.assign({}, d, { qz: Q });
  try { sessionStorage.setItem('p_user_' + u.uid, JSON.stringify({ t: now, d: profileCache })); } catch (e) { /* ignore */ }
  return { rec, tot, first, better, old };
}

export function logout() { try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem('p_seen'); } catch (e) {} location.replace('login.html'); }
export const isLoggedIn = () => { try { return !!localStorage.getItem(SESSION_KEY); } catch (e) { return false; } };

export function avatarHtml(name, photo, cls = '') {
  const ch = esc((name || '?').trim().charAt(0).toUpperCase());
  return `<span class="p-avatar ${cls}">${photo ? `<img src="${esc(photo)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">` : ''}<em>${ch}</em></span>`;
}


/* ---------- long labels: show 2 lines + "আরো দেখুন" once the text runs past 2.5 lines ---------- */
export function clampAll(root = document) {
  const sel = '.p-btn .p-t';
  const run = () => root.querySelectorAll(sel).forEach((el) => {
    if (el.dataset.cl === 'open') return;
    el.classList.remove('clamp');
    const cs = getComputedStyle(el), lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3;
    const lines = el.scrollHeight / lh;
    if (lines > 2.55) {
      el.classList.add('clamp'); el.style.setProperty('--lh', lh + 'px');
      if (!el.nextElementSibling || !el.nextElementSibling.classList.contains('p-more')) {
        const m = document.createElement('span'); m.className = 'p-more'; m.setAttribute('role', 'button'); m.tabIndex = 0; m.textContent = T('more');
        el.after(m);
      }
    } else if (el.nextElementSibling && el.nextElementSibling.classList.contains('p-more') && el.dataset.cl !== 'open') el.nextElementSibling.remove();
  });
  if (!root.__clampBound) {
    root.__clampBound = true;
    const toggle = (e) => {
      const m = e.target.closest && e.target.closest('.p-more'); if (!m) return;
      e.preventDefault(); e.stopPropagation();
      const t = m.previousElementSibling, open = t.dataset.cl !== 'open';
      t.dataset.cl = open ? 'open' : ''; t.classList.toggle('clamp', !open); m.textContent = T(open ? 'less' : 'more');
    };
    root.addEventListener('click', toggle, true);
    root.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggle(e); });
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(run, 150); });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(run); run();
}

/* ---------- floating "back to the top" button for long reading pages ---------- */
export function scrollTopBtn() {
  if (document.getElementById('pUp')) return;
  const b = document.createElement('button'); b.type = 'button'; b.id = 'pUp'; b.className = 'p-up'; b.setAttribute('aria-label', T('to_top')); b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5l-7.5 8 1.8 1.7L11 9.9V20h2V9.9l4.7 4.8 1.8-1.7z" fill="currentColor"/></svg>';
  b.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(b);
  let on = false; const upd = () => { const v = scrollY > 300; if (v !== on) { on = v; b.classList.toggle('show', v); } };
  addEventListener('scroll', upd, { passive: true }); upd();
}

// long one-line texts end with "…"; tapping the dots opens the whole text (tap again to close)
export function markTrunc(root = document) {
  root.querySelectorAll('.p-gr-row .tx, .p-gr > h3').forEach((box) => {
    const t = box.matches('h3') ? box.firstElementChild : box.querySelector('.p-t'); if (!t) return;
    const host = box.closest('.p-gr-row, h3') || box, open = host.classList.contains('open');
    const cut = open || t.scrollWidth > t.clientWidth + 1;
    let d = box.querySelector(':scope > .p-dots');
    if (cut && !d) { d = document.createElement('i'); d.className = 'p-dots'; d.setAttribute('role', 'button'); d.setAttribute('aria-label', T('more')); box.appendChild(d); }
    else if (!cut && d) d.remove();
    if (d) d.textContent = open ? '▲' : '';
  });
  if (!window._dotsOn) {
    window._dotsOn = true;
    document.addEventListener('click', (e) => {
      const d = e.target.closest && e.target.closest('.p-dots'); if (!d) return;
      e.preventDefault(); e.stopPropagation();
      const host = d.closest('.p-gr-row') || d.closest('h3'); host.classList.toggle('open'); markTrunc(host.closest('.p-gr') || document);
    }, true);
  }
}
