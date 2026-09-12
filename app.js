/* Piano Alimentare Famiglia - logica app (vanilla JS, dati in localStorage) */
(() => {
  const KEY = 'pianoAlimentare.v1';
  const APP_VERSION = '1.5';
  const VIEWS = ['oggi', 'settimana', 'alimenti', 'spesa', 'altro'];

  /* ---------- icone (SVG inline, stile lucide) ---------- */
  const I = {
    colazione: '<svg class="i" viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/></svg>',
    spuntino: '<svg class="i" viewBox="0 0 24 24"><path d="M12 6c-1.5-2-4.5-2-6.5 0-3 3-2 9 2 13 1.3 1.3 3 1.3 4.5 0 1.5 1.3 3.2 1.3 4.5 0 4-4 5-10 2-13-2-2-5-2-6.5 0Z"/><path d="M12 6V3M12 3c1.5 0 3-1 3-1"/></svg>',
    pranzo: '<svg class="i" viewBox="0 0 24 24"><path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M12 11V4M8 4l4 3 4-3"/></svg>',
    merenda: '<svg class="i" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><circle cx="8.5" cy="10.5" r="1"/><circle cx="12" cy="15.5" r="1"/><circle cx="16" cy="12.5" r="1"/></svg>',
    cena: '<svg class="i" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    home: '<svg class="i" viewBox="0 0 24 24"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    calendar: '<svg class="i" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
    book: '<svg class="i" viewBox="0 0 24 24"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4Z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7Z"/></svg>',
    cart: '<svg class="i" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6"/></svg>',
    settings: '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
    x: '<svg class="i" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    check: '<svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    plus: '<svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    chev: '<svg class="i" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    pencil: '<svg class="i" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    copy: '<svg class="i" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    print: '<svg class="i" viewBox="0 0 24 24"><path d="M6 9V3h12v6"/><rect x="6" y="14" width="12" height="7"/><path d="M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/></svg>',
    share: '<svg class="i" viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4M12 2v13"/></svg>',
    download: '<svg class="i" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="m7 10 5 5 5-5M12 15V3"/></svg>',
    refresh: '<svg class="i" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
    info: '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    up: '<svg class="i" viewBox="0 0 24 24"><path d="M7 10v12"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 7a2 2 0 0 1-1.9 1.4H7V10l4-8a3 3 0 0 1 3 3Z"/></svg>',
    down: '<svg class="i" viewBox="0 0 24 24"><path d="M17 14V2"/><path d="M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2.3-7A2 2 0 0 1 6.5 3H17v11l-4 8a3 3 0 0 1-3-3Z"/></svg>',
    school: '<svg class="i" viewBox="0 0 24 24"><path d="m2 8 10-5 10 5-10 5Z"/><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"/><path d="M22 8v6"/></svg>',
    leaf: '<svg class="i" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z"/><path d="M4 20c4-4 6-6 10-10"/></svg>',
    trash: '<svg class="i" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
  };
  const TAB_ICON = { oggi: 'home', settimana: 'calendar', alimenti: 'book', spesa: 'cart', altro: 'settings' };
  const TAB_NAME = { oggi: 'Oggi', settimana: 'Settimana', alimenti: 'Alimenti', spesa: 'Spesa', altro: 'Altro' };
  const PCOL = { ale: '#2563eb', marti: '#db2777', mia: '#ea580c', nicole: '#16a34a' };

  let state = load();
  state.spesa ||= [];      // lista della spesa: {txt}
  state.catalogo ||= [];   // prodotti aggiunti a mano al catalogo
  state.spesaDone ||= {};  // spuntate: {txt:1}
  const oggiIdx = (new Date().getDay() + 6) % 7;
  const ui = {
    view: location.hash === '#tabella' ? 'settimana' : VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'oggi',
    persona: state.persone[0].id,
    giorno: oggiIdx,
    settMode: location.hash === '#tabella' ? 'tabella' : 'giorno',
    filtro: 'tutte',
    alimPasto: 'pranzo',
    spesaMode: 'lista',
    spesaQ: '',
    tipoOpen: {},
    tab: { persone: ['ale', 'marti'], pasti: ['pranzo', 'cena'], weekend: false },
  };

  /* ---------- persistenza ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const s = JSON.parse(raw); if (s && s.version === DATA_VERSION) return s; }
    } catch (e) {}
    return defaultState();
  }
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 1600);
  }

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtItem = (t) => esc(t).replace(/^(\d+\s?(?:g|gr|ml|kg)\b)/i, '<b>$1</b>');
  const persona = () => state.persone.find((p) => p.id === ui.persona);
  const byId = (id) => state.persone.find((p) => p.id === id);
  const isBambina = (p) => p.tipo === 'bambina';
  const isScuola = (p, g) => isBambina(p) && g <= 4;
  const pasto = (id) => PASTI.find((m) => m.id === id);
  const mealVars = (id) => `--mc:var(--m-${id});--mcs:var(--m-${id}-soft)`;
  const avatar = (p, cls = '') => `<div class="avatar ${cls}" style="--c:${PCOL[p.id] || '#64748b'}">${esc(p.nome[0])}</div>`;
  const lines = (t) => String(t || '').split('\n').map((x) => x.trim()).filter(Boolean);
  function menuCell(pid, g, m) { const d = (state.menu[pid] ||= {})[g] ||= {}; return d[m] ?? ''; }
  function setMenuCell(pid, g, m, val) { (state.menu[pid][g] ||= {})[m] = val; save(); }
  const scheda = (p) => state.schede[p.scheda];
  const prefDi = (p, t) => isBambina(p) ? (state.preferenze[p.id] || {})[t] : undefined;
  function prodotto(t) {
    let s = String(t || '').replace(/\(.*?\)/g, ' ').replace(/\b\d+([.,]\d+)?\s?(g|gr|ml|kg|l)\b/gi, ' ');
    s = s.replace(/\b(circa|oppure|con)\b\s*$/i, '').replace(/\s+/g, ' ').replace(/\s+([,.])/g, '$1').trim().replace(/^[,.\-\s]+|[,.\-\s]+$/g, '');
    return s ? s[0].toUpperCase() + s.slice(1) : '';
  }
  function catalogo() {
    const map = new Map();
    const put = (raw, src) => { const n = prodotto(raw); if (!n || n === 'Mensa scolastica') return; const k = n.toLowerCase(); const e = map.get(k) || { txt: n, menu: false }; if (src === 'menu') e.menu = true; map.set(k, e); };
    for (const key of Object.keys(state.schede)) for (const m of Object.keys(state.schede[key])) for (const c of state.schede[key][m]) for (const t of c.items) put(t, 'scheda');
    for (const p of state.persone) for (let g = 0; g < 7; g++) for (const m of PASTI) for (const x of lines(menuCell(p.id, g, m.id))) put(x, 'menu');
    for (const t of state.catalogo) put(t, 'custom');
    return [...map.values()].sort((x, y) => x.txt.localeCompare(y.txt, 'it'));
  }
  const TIPOLOGIE = [
    ['Pane, cereali e dolci', /\b(dolc|pane|panino|carasau|spianata|fette biscottate|crackers|grissini|gallette|taralli|piadina|focaccia|toast|cereali|fiocchi|avena|muesli|porridge|farro|cous ?cous|orzo|polenta|pancake|crêpe|cr[eè]pe|tortin[oa]|plumcake|muffin|ciambella|torta|biscott|barretta|popcorn)/i],
    ['Pasta e riso', /\b(pasta|pastina|gnocchi|lasagne|riso|risotto|basmati|arborio|insalata di riso)/i],
    ['Pesce', /\b(tonno|salmone|merluzzo|nasello|orata|pesce|polpo|calamar|seppi|gamber|platessa|sogliola|bastoncini|spada|sockeye)/i],
    ['Carne', /\b(pollo|tacchino|vitello|vitellone|manzo|bovino|hamburger|fettina|polpett|carne|spezzatino|arrosto|cotoletta|scaloppin|straccetti|bocconcini|involtini|spiedini)/i],
    ['Salumi', /\b(bresaola|prosciutto|crudo sgrassato|stick)/i],
    ['Uova', /\b(uov[ao]|albume|frittata|omelette)/i],
    ['Latticini e formaggi', /\b(latte|yogurt|ricotta|grana|parmigiano|formagg|mozzarell|stracchino|crescenza|primo sale|budino|gelato|burro|pro milk|spalmabile)/i],
    ['Legumi', /\b(ceci|lenticchi|fagioli|piselli|legumi|hummus|fave)/i],
    ['Verdure', /\b(verdur|ortaggi|zucchin|zucca|carciof|cipoll|asparag|broccol|cavol|bieta|cicoria|verza|fungh|champignon|spinaci|fagiolini|pomodor|carot|finocch|insalata|lattuga|radicchio|cetriol|peperon|melanzan|mais|barbabietol|patat|purè|pinzimonio|minestr|passato|vellutata|zuppa|sformato|avocado)/i],
    ['Frutta secca', /\b(mandorl|noci|nocciol|frutta secca|uvetta)/i],
    ['Frutta', /\b(frutt|mela|mele|pera|pere|banan|mandarin|clementin|aranci|spremuta|uva|fragol|pesc[ah]|albicocc|prugn|kiwi|anguria|melone|ciliegi|mirtill|lampon|ananas|macedonia|frullato|ghiacciolo)/i],
    ['Condimenti', /\b(olio|pesto|miele|marmellata|cacao|cioccolat|zafferano|curry|sale|limone|salvia|basilico|cannella)/i],
    ['Bevande', /\b(acqua|succo|tè|tisana|latte vegetale)/i],
    ['Piatti pronti', /\b(pizza|pizzetta|mensa)/i],
  ];
  const tipologia = (t) => (TIPOLOGIE.find(([, re]) => re.test(t)) || ['Altro'])[0];
  const TIPO_ORDINE = [...TIPOLOGIE.map((x) => x[0]), 'Altro'];
  const inSpesa = (t) => state.spesa.some((x) => x.txt.toLowerCase() === String(t).toLowerCase());
  function toggleSpesa(t) {
    const i = state.spesa.findIndex((x) => x.txt.toLowerCase() === t.toLowerCase());
    if (i >= 0) { delete state.spesaDone[state.spesa[i].txt]; state.spesa.splice(i, 1); save(); return false; }
    addSpesa(t); return true;
  }
  function addSpesa(txt) {
    const t = String(txt || '').trim(); if (!t) return false;
    if (state.spesa.some((x) => x.txt.toLowerCase() === t.toLowerCase())) return false;
    state.spesa.push({ txt: t }); delete state.spesaDone[t]; save(); return true;
  }
  function dateOf(g) { const d = new Date(); d.setDate(d.getDate() - oggiIdx + g); return d; }

  /* ---------- rendering ---------- */
  function render() {
    $('#brandDate').textContent = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
    $('.brand-logo').innerHTML = I.leaf;
    $('#personeBar').innerHTML = state.persone.map((p) =>
      `<button class="avatar-btn ${p.id === ui.persona ? 'active' : ''}" data-p="${p.id}">${avatar(p)}<span>${esc(p.nome)}</span></button>`).join('');
    $$('#personeBar button').forEach((b) => b.onclick = () => { ui.persona = b.dataset.p; render(); });
    $('#tabs').innerHTML = VIEWS.map((v) => `<button data-view="${v}" class="${v === ui.view ? 'active' : ''}">${I[TAB_ICON[v]]}<span>${TAB_NAME[v]}</span></button>`).join('');
    $$('#tabs button').forEach((b) => b.onclick = () => { ui.view = b.dataset.view; history.replaceState(null, '', '#' + ui.view); render(); window.scrollTo(0, 0); });
    const v = $('#view');
    ({ oggi: renderOggi, settimana: renderSettimana, alimenti: renderAlimenti, spesa: renderSpesa, altro: renderAltro })[ui.view](v);
  }

  function mealCard(p, g, m) {
    const txt = menuCell(p.id, g, m.id);
    const scuola = m.id === 'pranzo' && isScuola(p, g);
    const ls = lines(txt);
    return `<div class="meal-card" style="${mealVars(m.id)}" data-g="${g}" data-m="${m.id}">
      <div class="stripe"></div>
      <div class="inner">
        <div class="meal-ico">${I[m.id]}</div>
        <div class="body">
          <div class="title">${m.nome}${scuola ? `<span class="badge">a scuola</span>` : ''}</div>
          ${ls.length ? `<ul>${ls.map((l) => `<li>${fmtItem(l)}</li>`).join('')}</ul>` : `<div class="empty">${I.plus} Scegli cosa mangiare</div>`}
        </div>
        <div class="chev">${I.chev}</div>
      </div>
    </div>`;
  }
  const bindMeals = (root, p) => $$('.meal-card', root).forEach((el) => el.onclick = () => openEditor(p, +el.dataset.g, el.dataset.m));

  function renderOggi(v) {
    const p = persona(); const g = oggiIdx;
    v.innerHTML = `
      <div class="section-title"><span>I pasti di ${esc(p.nome)} oggi</span></div>
      ${PASTI.map((m) => mealCard(p, g, m)).join('')}
      <div class="section-title"><span>Il resto della famiglia</span></div>
      <div class="people-today">
        ${state.persone.filter((x) => x.id !== p.id).map((x) => `<div class="mini" data-p="${x.id}">
          <div class="head">${avatar(x, 'sm')} ${esc(x.nome)}</div>
          ${PASTI.map((m) => { const t = lines(menuCell(x.id, g, m.id)); return t.length ? `<div class="line" style="${mealVars(m.id)}"><b>${m.nome}</b><span>${t.map(fmtItem).join(' · ')}</span></div>` : ''; }).join('') || '<div class="muted">Nessun pasto pianificato</div>'}
        </div>`).join('')}
      </div>`;
    bindMeals(v, p);
    $$('.mini', v).forEach((el) => el.onclick = () => { ui.persona = el.dataset.p; render(); window.scrollTo(0, 0); });
  }

  function renderSettimana(v) {
    v.innerHTML = `<div class="seg"><button data-s="giorno" class="${ui.settMode === 'giorno' ? 'active' : ''}">Giorno per giorno</button><button data-s="tabella" class="${ui.settMode === 'tabella' ? 'active' : ''}">Tabella settimanale</button></div><div id="settBody"></div>`;
    $$('.seg button', v).forEach((b) => b.onclick = () => { ui.settMode = b.dataset.s; render(); });
    (ui.settMode === 'giorno' ? renderGiorno : renderTabella)($('#settBody'));
  }

  function renderGiorno(v) {
    const p = persona();
    v.innerHTML = `
      <div class="days">${GIORNI.map((n, i) => `<button class="day ${i === ui.giorno ? 'active' : ''} ${i === oggiIdx ? 'today' : ''}" data-g="${i}"><span class="dn">${n.slice(0, 3)}</span><span class="dd">${dateOf(i).getDate()}</span></button>`).join('')}</div>
      <div class="section-title"><span>${esc(p.nome)} · ${GIORNI[ui.giorno]}</span><button class="btn small ghost" id="copiaGiorno">${I.copy} Copia giorno</button></div>
      ${PASTI.map((m) => mealCard(p, ui.giorno, m)).join('')}`;
    $$('.day', v).forEach((b) => b.onclick = () => { ui.giorno = +b.dataset.g; render(); });
    bindMeals(v, p);
    $('#copiaGiorno').onclick = () => openCopia(p);
  }

  function openCopia(p) {
    const others = state.persone.filter((x) => x.id !== p.id);
    openSheet(`${I.copy} Copia ${GIORNI[ui.giorno]} di ${esc(p.nome)}`, `
      <div class="section-title"><span>In un altro giorno</span></div>
      <div class="copy-grid">${GIORNI.map((n, i) => i === ui.giorno ? '' : `<button class="btn" data-day="${i}">${n}</button>`).join('')}</div>
      <div class="section-title"><span>A un'altra persona, stesso giorno</span></div>
      <div class="copy-grid">${others.map((x) => `<button class="btn" data-who="${x.id}">${avatar(x, 'xs')} ${esc(x.nome)}</button>`).join('')}</div>`);
    $$('[data-day]', $('#sheetBody')).forEach((b) => b.onclick = () => { state.menu[p.id][+b.dataset.day] = clone(state.menu[p.id][ui.giorno]); save(); closeSheet(); render(); toast('Giorno copiato'); });
    $$('[data-who]', $('#sheetBody')).forEach((b) => b.onclick = () => { state.menu[b.dataset.who][ui.giorno] = clone(state.menu[p.id][ui.giorno]); save(); closeSheet(); render(); toast('Copiato'); });
  }

  /* ---------- tabella settimanale ---------- */
  function renderTabella(v) {
    const t = ui.tab;
    const persone = state.persone.filter((p) => t.persone.includes(p.id));
    const pasti = PASTI.filter((m) => t.pasti.includes(m.id));
    const giorni = t.weekend ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4];
    const toggle = (arr, id) => { const i = arr.indexOf(id); if (i >= 0) arr.splice(i, 1); else arr.push(id); };
    v.innerHTML = `
      <div class="no-print">
        <div class="chips scroll">${state.persone.map((p) => `<button class="chip ${t.persone.includes(p.id) ? 'active' : ''}" data-tp="${p.id}"><span class="dot" style="--c:${PCOL[p.id]}"></span>${esc(p.nome)}</button>`).join('')}</div>
        <div class="chips scroll">${PASTI.map((m) => `<button class="chip c-pasto ${t.pasti.includes(m.id) ? 'active' : ''}" style="${mealVars(m.id)}" data-tm="${m.id}">${m.nome}</button>`).join('')}<button class="chip ${t.weekend ? 'active' : ''}" data-tw>+ Sabato e domenica</button></div>
      </div>
      <div class="tab-wrap"><table class="tab-week">
        <thead><tr><th class="corner"></th>${giorni.map((g) => `<th class="${g === oggiIdx ? 'today' : ''}">${GIORNI[g]}<br><small>${dateOf(g).getDate()}</small></th>`).join('')}</tr></thead>
        <tbody>
        ${pasti.map((m) => `
          <tr class="sec" style="${mealVars(m.id)}"><td colspan="${giorni.length + 1}">${I[m.id]}${m.nome}</td></tr>
          ${persone.map((p) => `<tr style="${mealVars(m.id)}">
            <th class="rowh"><div class="who">${avatar(p, 'sm')}${esc(p.nome)}</div></th>
            ${giorni.map((g) => { const ls = lines(menuCell(p.id, g, m.id)); return `<td class="cell ${ls.length ? '' : 'empty'}" data-p="${p.id}" data-g="${g}" data-m="${m.id}">${ls.length ? ls.map((l) => `<div>${fmtItem(l)}</div>`).join('') : 'vuoto'}</td>`; }).join('')}
          </tr>`).join('')}`).join('')}
        </tbody>
      </table></div>
      <div class="row no-print" style="margin-top:4px"><button class="btn ghost" id="stampa">${I.print} Stampa / PDF</button><span class="muted">Tocca una casella per cambiarla.</span></div>`;
    $$('[data-tp]', v).forEach((b) => b.onclick = () => { toggle(t.persone, b.dataset.tp); render(); });
    $$('[data-tm]', v).forEach((b) => b.onclick = () => { toggle(t.pasti, b.dataset.tm); render(); });
    $('[data-tw]', v).onclick = () => { t.weekend = !t.weekend; render(); };
    $$('td.cell', v).forEach((td) => td.onclick = () => openEditor(byId(td.dataset.p), +td.dataset.g, td.dataset.m));
    $('#stampa').onclick = () => window.print();
  }

  /* ---------- editor pasto (selezione a tocco) ---------- */
  function openEditor(p, g, pastoId) {
    const m = pasto(pastoId);
    const cats = scheda(p)[pastoId] ||= [];
    let picked = lines(menuCell(p.id, g, pastoId));
    const bambina = isBambina(p);
    const isNutri = !bambina && (pastoId === 'pranzo' || pastoId === 'cena');

    const body = () => `
      <div class="picked" style="${mealVars(pastoId)}">
        <div class="lbl">${m.nome} di ${esc(p.nome)} · ${GIORNI[g]}</div>
        <div class="items">${picked.length ? picked.map((t, i) => `<span class="tag"><span class="tt" data-ed="${i}" title="Tocca per modificare">${fmtItem(t)}</span><button data-rm="${i}" aria-label="Togli">${I.x}</button></span>`).join('') : '<span class="empty">Niente ancora: tocca le opzioni qui sotto</span>'}</div>
      </div>
      ${isScuola(p, g) && pastoId === 'pranzo' ? `<button class="btn ghost block" id="edMensa">${I.school} Mensa scolastica</button>` : ''}
      ${bambina ? `<div class="chips" style="margin-top:10px">
        <button class="chip ${ui.filtro === 'tutte' ? 'active' : ''}" data-f="tutte">Tutte</button>
        <button class="chip ${ui.filtro === 'si' ? 'active' : ''}" data-f="si">${I.up} Solo quelle che le piacciono</button>
        <button class="chip ${ui.filtro === 'nonno' ? 'active' : ''}" data-f="nonno">Nascondi quelle che non le piacciono</button>
      </div>` : isNutri ? `<div class="note" style="margin-top:10px">${I.info}<span>Scheda della nutrizionista: scegli <b>un</b> alimento per ogni gruppo.</span></div>` : ''}
      ${cats.map((c) => { const items = c.items.filter((t) => filtroOk(p, t)); return `<div class="grp" style="${mealVars(pastoId)}"><h3>${esc(c.cat)}<small>${items.length}</small></h3>
        <div class="opts">${items.map((t) => { const on = picked.includes(t); const pr = prefDi(p, t); return `<button class="opt ${on ? 'on' : ''} ${pr === 'no' ? 'no' : ''} ${pr === 'si' ? 'like' : ''}" data-t="${esc(t)}">${on ? I.check : ''}${fmtItem(t)}</button>`; }).join('') || '<span class="muted">Nessuna opzione con questo filtro</span>'}</div></div>`; }).join('')}
      <div class="addfree"><input type="text" id="edFree" placeholder="Altro… (es. 100g pasta)"><button class="btn primary" id="edAdd">${I.plus}</button></div>
      <p class="muted" style="margin:6px 2px 0">Tocca una voce scelta per modificarla. Le voci nuove vengono salvate negli Alimenti (gruppo "Aggiunti da me") e messe in lista della spesa.</p>`;

    openSheet(`<div class="meal-ico" style="${mealVars(pastoId)}">${I[m.id]}</div>${m.nome}`, body(),
      `<button class="btn ghost" id="edCancel">Annulla</button><button class="btn primary" id="edSave">${I.check} Salva</button>`);

    const bind = () => {
      const sb = $('#sheetBody');
      $$('[data-rm]', sb).forEach((b) => b.onclick = () => { picked.splice(+b.dataset.rm, 1); refresh(); });
      $$('.opt', sb).forEach((b) => b.onclick = () => { const t = b.dataset.t; const i = picked.indexOf(t); if (i >= 0) picked.splice(i, 1); else picked.push(t); refresh(); });
      $$('[data-f]', sb).forEach((b) => b.onclick = () => { ui.filtro = b.dataset.f; refresh(); });
      const mensa = $('#edMensa'); if (mensa) mensa.onclick = () => { picked = ['Mensa scolastica']; refresh(); };
      $$('[data-ed]', sb).forEach((el) => el.onclick = () => {
        const i = +el.dataset.ed; const inp = document.createElement('input'); inp.type = 'text'; inp.value = picked[i]; inp.className = 'tag-edit';
        el.replaceWith(inp); inp.focus();
        const done = () => { const t = inp.value.trim(); if (t) picked[i] = t; else picked.splice(i, 1); refresh(); };
        inp.onblur = done; inp.onkeydown = (e) => { if (e.key === 'Enter') inp.blur(); if (e.key === 'Escape') { inp.value = picked[i]; inp.blur(); } };
      });
      const add = () => {
        const t = $('#edFree').value.trim(); if (!t) return; picked.push(t);
        const known = cats.some((c) => c.items.some((x) => x.toLowerCase() === t.toLowerCase()));
        if (!known) { let g = cats.find((c) => c.cat === 'Aggiunti da me'); if (!g) { g = { cat: 'Aggiunti da me', items: [] }; cats.push(g); } g.items.push(t); }
        const pn = prodotto(t); if (pn && !state.catalogo.some((x) => x.toLowerCase() === pn.toLowerCase())) state.catalogo.push(pn); addSpesa(pn); save(); refresh(); toast('Aggiunto anche alla lista della spesa');
      };
      $('#edAdd').onclick = add;
      $('#edFree').onkeydown = (e) => { if (e.key === 'Enter') add(); };
    };
    const refresh = () => { const sb = $('#sheetBody'); const y = sb.scrollTop; sb.innerHTML = body(); bind(); sb.scrollTop = y; };
    bind();
    $('#edSave').onclick = () => { setMenuCell(p.id, g, pastoId, picked.join('\n')); closeSheet(); render(); toast('Salvato'); };
    $('#edCancel').onclick = closeSheet;
  }
  function filtroOk(p, t) {
    if (!isBambina(p)) return true;
    const pr = prefDi(p, t);
    if (ui.filtro === 'si') return pr === 'si';
    if (ui.filtro === 'nonno') return pr !== 'no';
    return true;
  }

  /* ---------- alimenti (schede) ---------- */
  function renderAlimenti(v) {
    const p = persona(); const bambina = isBambina(p);
    const cats = scheda(p)[ui.alimPasto] || [];
    const isNutri = !bambina && (ui.alimPasto === 'pranzo' || ui.alimPasto === 'cena');
    v.innerHTML = `
      <div class="chips scroll">${PASTI.map((m) => `<button class="chip c-pasto ${m.id === ui.alimPasto ? 'active' : ''}" style="${mealVars(m.id)}" data-m="${m.id}">${m.nome}</button>`).join('')}</div>
      ${bambina ? `<div class="note">${I.info}<span>Opzioni per le bambine. Segna per <b>${esc(p.nome)}</b> cosa le piace (${I.up.replace('class="i"', 'class="i" style="width:14px;height:14px;vertical-align:-2px"')}) e cosa no: quando scegli un pasto puoi filtrare.</span></div>`
        : isNutri ? `<div class="note">${I.info}<span>Scheda della nutrizionista per <b>${esc(p.nome)}</b>: un alimento per gruppo, con le grammature indicate.</span></div>`
        : `<div class="note">${I.info}<span>Non presente nelle schede della nutrizionista: proposte da confermare con lei.</span></div>`}
      ${cats.map((c, ci) => `<div class="card">
        <div class="cat-head"><h2>${esc(c.cat)}</h2><div class="row"><button class="btn small ghost" data-addi="${ci}">${I.plus} Aggiungi</button><button class="icon-btn" data-editc="${ci}" aria-label="Modifica categoria">${I.pencil}</button></div></div>
        ${c.items.map((t, ii) => { const pr = prefDi(p, t); return `<div class="food ${pr === 'no' ? 'no' : ''}"><span class="t">${fmtItem(t)}</span>
          ${bambina ? `<div class="thumbs"><button class="si ${pr === 'si' ? 'on' : ''}" data-pref="si" data-t="${esc(t)}">${I.up}</button><button class="no ${pr === 'no' ? 'on' : ''}" data-pref="no" data-t="${esc(t)}">${I.down}</button></div>` : ''}
          <button class="edit ${inSpesa(prodotto(t)) ? 'incart' : ''}" data-cart="${esc(prodotto(t))}" aria-label="Metti in lista spesa">${I.cart}</button>
          <button class="edit" data-editi="${ci}:${ii}" aria-label="Modifica">${I.pencil}</button></div>`; }).join('') || '<div class="muted">Nessun alimento</div>'}
      </div>`).join('')}
      <button class="btn ghost block" id="addCat">${I.plus} Nuovo gruppo</button>`;
    $$('.chips [data-m]', v).forEach((b) => b.onclick = () => { ui.alimPasto = b.dataset.m; render(); });
    $$('[data-cart]', v).forEach((b) => b.onclick = () => { toast(toggleSpesa(b.dataset.cart) ? 'Messo in lista spesa' : 'Tolto dalla lista'); render(); });
    $$('[data-pref]', v).forEach((b) => b.onclick = () => { const prefs = state.preferenze[p.id] ||= {}; const t = b.dataset.t, val = b.dataset.pref; if (prefs[t] === val) delete prefs[t]; else prefs[t] = val; save(); render(); });
    $('#addCat').onclick = () => openTextSheet('Nuovo gruppo', 'Nome del gruppo', '', (name) => { (scheda(p)[ui.alimPasto] ||= []).push({ cat: name, items: [] }); });
    $$('[data-addi]', v).forEach((b) => b.onclick = () => openTextSheet('Aggiungi alimento', 'Es. 80g pasta integrale', '', (t) => cats[+b.dataset.addi].items.push(t)));
    $$('[data-editc]', v).forEach((b) => b.onclick = () => { const ci = +b.dataset.editc; openTextSheet('Modifica gruppo', 'Nome del gruppo', cats[ci].cat, (name) => cats[ci].cat = name, () => cats.splice(ci, 1)); });
    $$('[data-editi]', v).forEach((b) => b.onclick = () => { const [ci, ii] = b.dataset.editi.split(':').map(Number); openTextSheet('Modifica alimento', 'Alimento', cats[ci].items[ii], (t) => cats[ci].items[ii] = t, () => cats[ci].items.splice(ii, 1)); });
  }
  function openTextSheet(title, placeholder, value, onSave, onDelete) {
    openSheet(esc(title), `<input type="text" id="tsVal" placeholder="${esc(placeholder)}" value="${esc(value)}">`,
      `${onDelete ? `<button class="btn danger" id="tsDel">${I.trash} Elimina</button>` : ''}<button class="btn primary" id="tsOk">${I.check} Salva</button>`);
    const inp = $('#tsVal'); setTimeout(() => inp.focus(), 50);
    const ok = () => { const t = inp.value.trim(); if (!t) return; onSave(t); save(); closeSheet(); render(); };
    $('#tsOk').onclick = ok; inp.onkeydown = (e) => { if (e.key === 'Enter') ok(); };
    if (onDelete) $('#tsDel').onclick = () => { if (confirm('Eliminare?')) { onDelete(); save(); closeSheet(); render(); } };
  }

  /* ---------- spesa: catalogo alimenti + lista ---------- */
  function renderSpesa(v) {
    const done = state.spesaDone;
    const nList = state.spesa.length, nDone = state.spesa.filter((x) => done[x.txt]).length;
    v.innerHTML = `<div class="seg"><button data-s="lista" class="${ui.spesaMode === 'lista' ? 'active' : ''}">${I.cart} Lista (${nList - nDone})</button><button data-s="alimenti" class="${ui.spesaMode === 'alimenti' ? 'active' : ''}">${I.book} Tutti gli alimenti</button></div><div id="spesaBody"></div>`;
    $$('.seg button', v).forEach((b) => b.onclick = () => { ui.spesaMode = b.dataset.s; render(); });
    (ui.spesaMode === 'lista' ? renderLista : renderCatalogo)($('#spesaBody'));
  }

  function renderLista(v) {
    const done = state.spesaDone;
    const items = [...state.spesa].sort((a, b) => (done[a.txt] ? 1 : 0) - (done[b.txt] ? 1 : 0) || a.txt.localeCompare(b.txt, 'it'));
    const left = items.filter((x) => !done[x.txt]).length;
    v.innerHTML = `
      <div class="card"><div class="addfree" style="margin-top:0"><input type="text" id="spesaNew" placeholder="Aggiungi alla lista… (es. latte)"><button class="btn primary" id="spesaAdd">${I.plus}</button></div></div>
      ${items.length ? `<div class="section-title"><span>${left} da prendere · ${items.length - left} presi</span><button class="btn small ghost" id="spesaClearDone">${I.trash} Togli i presi</button></div>
      ${(() => { const groups = {}; for (const l of items) (groups[tipologia(l.txt)] ||= []).push(l); return TIPO_ORDINE.filter((k) => groups[k]).map((k) => `<div class="tipo-h">${esc(k)}</div><div class="card">${groups[k].map((l) => `<div class="spesa-line ${done[l.txt] ? 'done' : ''}" data-t="${esc(l.txt)}"><div class="chk">${I.check}</div><span class="t">${esc(l.txt)}</span><button class="edit" data-del="${esc(l.txt)}" aria-label="Togli dalla lista">${I.x}</button></div>`).join('')}</div>`).join(''); })()}`
      : `<div class="card" style="text-align:center;padding:28px 16px"><div style="color:#b0b7c0;margin-bottom:8px">${I.cart.replace('class="i"', 'class="i" style="width:40px;height:40px"')}</div><p style="font-weight:700">La lista è vuota</p><p class="muted" style="margin-top:4px">Vai in <b>Tutti gli alimenti</b> e flagga quello che ti serve, oppure scrivilo qui sopra.</p><button class="btn primary" id="goCat" style="margin-top:14px">${I.book} Tutti gli alimenti</button></div>`}
      ${items.length ? `<div class="row" style="margin:4px 6px"><button class="btn small ghost" id="addWeek">${I.calendar} Aggiungi tutto ciò che serve per i menù della settimana</button></div>` : ''}`;
    const add = () => { const t = $('#spesaNew').value.trim(); if (!t) return; addSpesa(t); render(); };
    $('#spesaAdd').onclick = add; $('#spesaNew').onkeydown = (e) => { if (e.key === 'Enter') add(); };
    $$('.spesa-line', v).forEach((el) => el.onclick = (e) => { if (e.target.closest('[data-del]')) return; const t = el.dataset.t; if (done[t]) delete done[t]; else done[t] = 1; save(); render(); });
    $$('[data-del]', v).forEach((b) => b.onclick = () => { toggleSpesa(b.dataset.del); render(); });
    const cd = $('#spesaClearDone'); if (cd) cd.onclick = () => { state.spesa = state.spesa.filter((x) => !done[x.txt]); for (const k of Object.keys(done)) if (!inSpesa(k)) delete done[k]; save(); render(); };
    const gc = $('#goCat'); if (gc) gc.onclick = () => { ui.spesaMode = 'alimenti'; render(); };
    const aw = $('#addWeek'); if (aw) aw.onclick = () => { let n = 0; for (const c of catalogo()) if (c.menu && addSpesa(c.txt)) n++; render(); toast(n ? `${n} prodotti aggiunti` : 'Già tutti in lista'); };
  }

  function renderCatalogo(v) {
    const q = ui.spesaQ.trim().toLowerCase();
    const all = catalogo();
    const match = (c) => !q || c.txt.toLowerCase().includes(q);
    const week = all.filter((c) => c.menu && match(c));
    const rest = all.filter(match);
    const row = (c) => `<div class="spesa-line flag ${inSpesa(c.txt) ? 'done' : ''}" data-t="${esc(c.txt)}"><div class="chk">${I.check}</div><span class="t">${esc(c.txt)}</span>${state.catalogo.some((x) => x.toLowerCase() === c.txt.toLowerCase()) ? `<button class="edit" data-delcat="${esc(c.txt)}" aria-label="Elimina dal catalogo">${I.trash}</button>` : ''}</div>`;
    v.innerHTML = `
      <div class="card">
        <input type="text" id="catQ" placeholder="Cerca un alimento…" value="${esc(ui.spesaQ)}">
        <div class="addfree" style="margin-top:8px"><input type="text" id="catNew" placeholder="Nuovo prodotto (es. detersivo, latte)"><button class="btn primary" id="catAdd">${I.plus}</button></div>
      </div>
      <p class="muted" style="margin:0 6px 10px">Flagga un alimento per metterlo in lista: lo ritrovi in <b>Lista</b> con la spunta per il supermercato.</p>
      ${!q && week.length ? `<div class="section-title"><span>Nei menù di questa settimana</span><button class="btn small ghost" id="flagWeek">${I.check} Flagga tutti</button></div><div class="card">${week.map(row).join('')}</div>` : ''}
      ${(() => { const groups = {}; for (const c of rest) (groups[tipologia(c.txt)] ||= []).push(c); const keys = TIPO_ORDINE.filter((k) => groups[k]);
        return keys.length ? keys.map((k) => `<details class="tipo" ${q || ui.tipoOpen[k] !== false ? 'open' : ''} data-k="${esc(k)}"><summary><span>${esc(k)}</span><span class="cnt">${groups[k].filter((c) => inSpesa(c.txt)).length ? `<b>${groups[k].filter((c) => inSpesa(c.txt)).length} in lista</b> · ` : ''}${groups[k].length}</span></summary><div class="card">${groups[k].map(row).join('')}</div></details>`).join('')
        : '<div class="card"><p class="muted">Nessun alimento trovato. Aggiungilo qui sopra.</p></div>'; })()}`;
    const qi = $('#catQ'); qi.oninput = () => { ui.spesaQ = qi.value; renderCatalogo(v); const q2 = $('#catQ'); q2.focus(); q2.setSelectionRange(q2.value.length, q2.value.length); };
    const add = () => { const t = prodotto($('#catNew').value); if (!t) return; if (!state.catalogo.some((x) => x.toLowerCase() === t.toLowerCase())) state.catalogo.push(t); addSpesa(t); save(); render(); toast('Aggiunto e messo in lista'); };
    $('#catAdd').onclick = add; $('#catNew').onkeydown = (e) => { if (e.key === 'Enter') add(); };
    $$('.spesa-line.flag', v).forEach((el) => el.onclick = (e) => { if (e.target.closest('[data-delcat]')) return; toggleSpesa(el.dataset.t); renderSpesa($('#view')); });
    $$('details.tipo', v).forEach((d) => d.ontoggle = () => { ui.tipoOpen[d.dataset.k] = d.open; });
    $$('[data-delcat]', v).forEach((b) => b.onclick = () => { state.catalogo = state.catalogo.filter((x) => x.toLowerCase() !== b.dataset.delcat.toLowerCase()); save(); render(); });
    const fw = $('#flagWeek'); if (fw) fw.onclick = () => { let n = 0; for (const c of week) if (addSpesa(c.txt)) n++; render(); toast(n ? `${n} prodotti in lista` : 'Già tutti in lista'); };
  }

  /* ---------- altro ---------- */
  function renderAltro(v) {
    v.innerHTML = `
      <div class="section-title"><span>Condividi con l'altro telefono</span></div>
      <div class="card">
        <p class="muted" style="margin-bottom:10px">I menù sono salvati su questo telefono. Per averli anche sull'altro: esporta e invia il file (es. WhatsApp), poi importalo dall'altra parte.</p>
        <div class="row"><button class="btn primary" id="expBtn">${I.share} Esporta</button><button class="btn" id="impBtn">${I.download} Importa</button><input type="file" id="impFile" accept="application/json,.json" hidden></div>
      </div>
      <div class="section-title"><span>Note</span></div>
      <div class="card"><textarea id="note">${esc(state.note || '')}</textarea><div class="row" style="margin-top:8px"><button class="btn" id="noteSave">${I.check} Salva note</button></div></div>
      <div class="section-title"><span>Ripristino</span></div>
      <div class="card">
        <p class="muted" style="margin-bottom:10px">Riporta i menù o tutto ai valori iniziali della nutrizionista. Le preferenze delle bambine restano.</p>
        <div class="row"><button class="btn" id="resetMenu">${I.refresh} Solo i menù</button><button class="btn danger" id="resetAll">${I.trash} Tutto</button></div>
      </div>
      <div class="section-title"><span>Aggiornamento</span></div>
      <div class="card"><p class="muted" style="margin-bottom:10px">Versione <b>${APP_VERSION}</b>. Se non vedi le ultime novità, forza l'aggiornamento.</p><button class="btn primary" id="forceUpdate">${I.refresh} Aggiorna app</button></div>
      <div class="section-title"><span>Installa come app</span></div>
      <div class="card muted">iPhone: apri in Safari, Condividi → "Aggiungi alla schermata Home".<br>Android: menu ⋮ → "Aggiungi a schermata Home".</div>`;
    $('#noteSave').onclick = () => { state.note = $('#note').value; save(); toast('Note salvate'); };
    $('#forceUpdate').onclick = async () => {
      toast('Aggiorno…');
      try { if ('serviceWorker' in navigator) { const regs = await navigator.serviceWorker.getRegistrations(); for (const r of regs) await r.unregister(); } if (window.caches) { for (const k of await caches.keys()) await caches.delete(k); } } catch (e) {}
      location.href = location.pathname + '?v=' + Date.now() + '#altro';
    };
    $('#expBtn').onclick = exportData;
    $('#impBtn').onclick = () => $('#impFile').click();
    $('#impFile').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return; const r = new FileReader();
      r.onload = () => { try { const s = JSON.parse(r.result); if (!s.menu || !s.schede) throw 0; state = s; state.version = DATA_VERSION; state.spesa ||= []; state.spesaDone ||= {}; state.catalogo ||= []; save(); render(); toast('Importato'); } catch (err) { alert('File non valido'); } };
      r.readAsText(f);
    };
    $('#resetMenu').onclick = () => { if (!confirm('Ripristinare i menù settimanali predefiniti?')) return; state.menu = defaultState().menu; save(); render(); toast('Menù ripristinati'); };
    $('#resetAll').onclick = () => { if (!confirm('Ripristinare TUTTO (schede e menù)?')) return; const prefs = state.preferenze; state = defaultState(); state.preferenze = prefs; state.spesa = []; state.spesaDone = {}; state.catalogo = []; save(); render(); toast('Ripristinato'); };
  }
  async function exportData() {
    const name = `piano-alimentare-${new Date().toISOString().slice(0, 10)}.json`;
    const file = new File([JSON.stringify(state, null, 2)], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: 'Piano alimentare' }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------- sheet ---------- */
  function openSheet(title, html, foot) {
    $('#sheetTitle').innerHTML = title; $('#sheetBody').innerHTML = html;
    const f = $('#sheetFoot'); f.innerHTML = foot || ''; f.hidden = !foot;
    $('#sheet').hidden = false; document.body.style.overflow = 'hidden'; $('#sheetBody').scrollTop = 0;
  }
  function closeSheet() { $('#sheet').hidden = true; document.body.style.overflow = ''; }
  $('#sheetClose').innerHTML = I.x; $('#sheetClose').onclick = closeSheet;
  $('#sheet').onclick = (e) => { if (e.target.id === 'sheet') closeSheet(); };

  render();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
