/* Piano Alimentare Famiglia - logica app (vanilla JS, dati in localStorage) */
(() => {
  const KEY = 'pianoAlimentare.v1';
  const SPESA_KEY = 'pianoAlimentare.spesa';

  let state = load();
  let ui = {
    view: 'oggi',
    persona: state.persone[0].id,
    giorno: ((new Date().getDay() + 6) % 7), // 0 = lunedì
    filtro: 'tutte',
    schedaPasto: 'pranzo',
  };

  /* ---------- persistenza ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.version === DATA_VERSION) return s;
      }
    } catch (e) {}
    return defaultState();
  }
  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (t.hidden = true), 1800);
  }

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const persona = () => state.persone.find((p) => p.id === ui.persona);
  const isBambina = (p) => p.tipo === 'bambina';
  const isScuola = (p, g) => isBambina(p) && g <= 4;
  function menuCell(pid, g, pasto) {
    const m = state.menu[pid] ||= {};
    const d = m[g] ||= {};
    return d[pasto] ?? '';
  }
  function setMenuCell(pid, g, pasto, val) {
    state.menu[pid][g] ||= {};
    state.menu[pid][g][pasto] = val;
    save();
  }
  function scheda(p) { return state.schede[p.scheda]; }
  function prefDi(p, txt) { return isBambina(p) ? (state.preferenze[p.id] || {})[txt] : undefined; }

  /* ---------- rendering ---------- */
  function render() {
    // barra persone
    $('#personeBar').innerHTML = state.persone.map((p) =>
      `<button data-p="${p.id}" class="${p.id === ui.persona ? 'active' : ''}">${p.emoji} ${esc(p.nome)}</button>`).join('');
    $('#personeBar').querySelectorAll('button').forEach((b) => b.onclick = () => { ui.persona = b.dataset.p; render(); });

    document.querySelectorAll('.tabs button').forEach((b) => {
      b.classList.toggle('active', b.dataset.view === ui.view);
      b.onclick = () => { ui.view = b.dataset.view; render(); window.scrollTo(0, 0); };
    });

    const v = $('#view');
    ({ oggi: renderOggi, settimana: renderSettimana, schede: renderSchede, spesa: renderSpesa, impostazioni: renderImpostazioni })[ui.view](v);
  }

  function mealHTML(p, g, m) {
    const txt = menuCell(p.id, g, m.id);
    const scuola = m.id === 'pranzo' && isScuola(p, g);
    return `<div class="meal" data-g="${g}" data-m="${m.id}">
      <div class="ico">${m.emoji}</div>
      <div class="body">
        <div class="name">${m.nome}${scuola ? ' <span class="pill">scuola</span>' : ''}</div>
        <div class="txt ${txt ? '' : 'empty'}">${txt ? esc(txt) : 'Da decidere - tocca per scegliere'}</div>
      </div>
      <div class="chev">›</div>
    </div>`;
  }
  function bindMeals(root, p) {
    root.querySelectorAll('.meal').forEach((el) => el.onclick = () => openEditor(p, +el.dataset.g, el.dataset.m));
  }

  function renderOggi(v) {
    const p = persona();
    const g = ((new Date().getDay() + 6) % 7);
    v.innerHTML = `
      <div class="card">
        <div class="day-header"><h2>${p.emoji} ${esc(p.nome)} - oggi, ${GIORNI[g]}</h2></div>
        ${PASTI.map((m) => mealHTML(p, g, m)).join('')}
      </div>
      <div class="card">
        <h2>Tutta la famiglia oggi</h2>
        ${state.persone.filter((x) => x.id !== p.id).map((x) => `
          <h3>${x.emoji} ${esc(x.nome)}</h3>
          ${PASTI.map((m) => { const t = menuCell(x.id, g, m.id); return t ? `<div class="muted"><b>${m.nome}:</b> ${esc(t).replace(/\n/g, ' · ')}</div>` : ''; }).join('')}
        `).join('')}
      </div>`;
    bindMeals(v, p);
  }

  function renderSettimana(v) {
    const p = persona();
    v.innerHTML = `
      <div class="week-nav">${GIORNI.map((n, i) => `<button data-g="${i}" class="${i === ui.giorno ? 'active' : ''}">${n.slice(0, 3)}</button>`).join('')}</div>
      <div class="card">
        <div class="day-header"><h2>${p.emoji} ${esc(p.nome)} - ${GIORNI[ui.giorno]}</h2>
          <button class="btn small" id="copiaGiorno">Copia a…</button></div>
        ${PASTI.map((m) => mealHTML(p, ui.giorno, m)).join('')}
      </div>
      <div class="card">
        <h2>Riepilogo settimana</h2>
        <div class="grid-week">
        ${GIORNI.map((n, g) => `<div><h3>${n}</h3>${PASTI.map((m) => { const t = menuCell(p.id, g, m.id); return t ? `<div class="muted"><b>${m.emoji}</b> ${esc(t).replace(/\n/g, ' · ')}</div>` : ''; }).join('') || '<div class="muted">-</div>'}</div>`).join('')}
        </div>
      </div>`;
    v.querySelectorAll('.week-nav button').forEach((b) => b.onclick = () => { ui.giorno = +b.dataset.g; render(); });
    bindMeals(v, p);
    $('#copiaGiorno').onclick = () => openCopia(p);
  }

  function openCopia(p) {
    const others = state.persone.filter((x) => x.id !== p.id);
    openModal(`Copia ${GIORNI[ui.giorno]} di ${p.nome}`, `
      <p class="muted">Copia i pasti di questo giorno in un altro giorno o a un'altra persona.</p>
      <h3>In un altro giorno (stessa persona)</h3>
      <div class="row">${GIORNI.map((n, i) => i === ui.giorno ? '' : `<button class="btn small" data-day="${i}">${n}</button>`).join('')}</div>
      <h3>A un'altra persona (stesso giorno)</h3>
      <div class="row">${others.map((x) => `<button class="btn small" data-who="${x.id}">${x.emoji} ${esc(x.nome)}</button>`).join('')}</div>
    `);
    $('#modalBody').querySelectorAll('[data-day]').forEach((b) => b.onclick = () => {
      state.menu[p.id][+b.dataset.day] = clone(state.menu[p.id][ui.giorno]); save(); closeModal(); render(); toast('Copiato');
    });
    $('#modalBody').querySelectorAll('[data-who]').forEach((b) => b.onclick = () => {
      state.menu[b.dataset.who][ui.giorno] = clone(state.menu[p.id][ui.giorno]); save(); closeModal(); render(); toast('Copiato');
    });
  }

  /* ---------- editor pasto ---------- */
  function openEditor(p, g, pastoId) {
    const m = PASTI.find((x) => x.id === pastoId);
    const cats = scheda(p)[pastoId] || [];
    const cur = menuCell(p.id, g, pastoId);
    const bambina = isBambina(p);
    openModal(`${m.emoji} ${m.nome} - ${p.nome}, ${GIORNI[g]}`, `
      <textarea id="edTxt" placeholder="Scrivi il pasto (una riga per alimento) oppure tocca le opzioni qui sotto">${esc(cur)}</textarea>
      <div class="row" style="margin:8px 0 12px">
        <button class="btn primary" id="edSave">Salva</button>
        <button class="btn" id="edClear">Svuota</button>
        ${isScuola(p, g) && pastoId === 'pranzo' ? `<button class="btn" id="edMensa">Mensa</button>` : ''}
      </div>
      ${bambina ? `<div class="filter">
        <button data-f="tutte" class="${ui.filtro === 'tutte' ? 'active' : ''}">Tutte</button>
        <button data-f="si" class="${ui.filtro === 'si' ? 'active' : ''}">👍 Le piacciono</button>
        <button data-f="nonno" class="${ui.filtro === 'nonno' ? 'active' : ''}">Escludi 👎</button>
      </div>` : ''}
      <p class="muted">Tocca un'opzione per aggiungerla al pasto.</p>
      ${cats.map((c, ci) => `<details class="cat" ${ci < 2 ? 'open' : ''}><summary>${esc(c.cat)}</summary>
        <div class="opt-list">${c.items.filter((t) => filtroOk(p, t)).map((t) => {
          const pr = prefDi(p, t);
          return `<div class="opt chip ${pr || ''}" data-t="${esc(t)}"><span class="t">${esc(t)}</span></div>`;
        }).join('') || '<div class="muted">Nessuna opzione con questo filtro</div>'}</div></details>`).join('')}
    `);
    const ta = $('#edTxt');
    $('#edSave').onclick = () => { setMenuCell(p.id, g, pastoId, ta.value.trim()); closeModal(); render(); toast('Salvato'); };
    $('#edClear').onclick = () => { ta.value = ''; };
    const mensa = $('#edMensa'); if (mensa) mensa.onclick = () => { ta.value = 'Mensa scolastica'; };
    $('#modalBody').querySelectorAll('.filter button').forEach((b) => b.onclick = () => { ui.filtro = b.dataset.f; openEditor(p, g, pastoId); $('#edTxt').value = ta.value; });
    $('#modalBody').querySelectorAll('.opt.chip').forEach((el) => el.onclick = () => {
      const t = el.dataset.t;
      ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + t;
      ta.scrollTop = ta.scrollHeight;
    });
  }
  function filtroOk(p, t) {
    if (!isBambina(p)) return true;
    const pr = prefDi(p, t);
    if (ui.filtro === 'si') return pr === 'si';
    if (ui.filtro === 'nonno') return pr !== 'no';
    return true;
  }

  /* ---------- schede ---------- */
  function renderSchede(v) {
    const p = persona();
    const bambina = isBambina(p);
    const cats = scheda(p)[ui.schedaPasto] || [];
    const isNutri = !bambina && (ui.schedaPasto === 'pranzo' || ui.schedaPasto === 'cena');
    v.innerHTML = `
      <div class="week-nav">${PASTI.map((m) => `<button data-m="${m.id}" class="${m.id === ui.schedaPasto ? 'active' : ''}">${m.emoji} ${m.nome}</button>`).join('')}</div>
      ${bambina ? `<div class="notice">Opzioni condivise per Mia e Nicole. Segna per <b>${esc(p.nome)}</b>: 👍 le piace, 👎 non le piace. Le preferenze sono separate per ogni bambina.</div>`
        : isNutri ? `<div class="notice">Scheda della nutrizionista per <b>${esc(p.nome)}</b>: scegli 1 alimento per categoria.</div>`
        : `<div class="notice">Non presente nelle schede della nutrizionista: proposte da confermare con lei.</div>`}
      <div class="row" style="margin-bottom:10px"><button class="btn small primary" id="addCat">+ Categoria</button></div>
      ${cats.map((c, ci) => `<div class="card">
        <div class="day-header"><h2>${esc(c.cat)}</h2>
          <div class="row"><button class="btn small" data-addi="${ci}">+ Alimento</button><button class="icon-btn" data-editc="${ci}">✎</button></div></div>
        <div class="opt-list">${c.items.map((t, ii) => {
          const pr = prefDi(p, t);
          return `<div class="opt ${pr || ''}"><span class="t">${esc(t)}</span>
            ${bambina ? `<div class="pref"><button data-pref="si" data-t="${esc(t)}" class="${pr === 'si' ? 'on' : ''}">👍</button><button data-pref="no" data-t="${esc(t)}" class="${pr === 'no' ? 'on' : ''}">👎</button></div>` : ''}
            <button class="edit" data-editi="${ci}:${ii}">✎</button></div>`;
        }).join('')}</div>
      </div>`).join('')}`;
    v.querySelectorAll('.week-nav button').forEach((b) => b.onclick = () => { ui.schedaPasto = b.dataset.m; render(); });
    v.querySelectorAll('[data-pref]').forEach((b) => b.onclick = () => {
      const prefs = state.preferenze[p.id] ||= {};
      const t = b.dataset.t, val = b.dataset.pref;
      if (prefs[t] === val) delete prefs[t]; else prefs[t] = val;
      save(); render();
    });
    $('#addCat').onclick = () => {
      const name = prompt('Nome categoria:'); if (!name) return;
      (scheda(p)[ui.schedaPasto] ||= []).push({ cat: name, items: [] }); save(); render();
    };
    v.querySelectorAll('[data-addi]').forEach((b) => b.onclick = () => {
      const t = prompt('Alimento (es. "80g pasta integrale"):'); if (!t) return;
      cats[+b.dataset.addi].items.push(t.trim()); save(); render();
    });
    v.querySelectorAll('[data-editc]').forEach((b) => b.onclick = () => {
      const ci = +b.dataset.editc;
      const name = prompt('Rinomina categoria (vuoto = elimina):', cats[ci].cat);
      if (name === null) return;
      if (name.trim() === '') { if (confirm('Eliminare la categoria e i suoi alimenti?')) cats.splice(ci, 1); }
      else cats[ci].cat = name.trim();
      save(); render();
    });
    v.querySelectorAll('[data-editi]').forEach((b) => b.onclick = () => {
      const [ci, ii] = b.dataset.editi.split(':').map(Number);
      const t = prompt('Modifica alimento (vuoto = elimina):', cats[ci].items[ii]);
      if (t === null) return;
      if (t.trim() === '') cats[ci].items.splice(ii, 1); else cats[ci].items[ii] = t.trim();
      save(); render();
    });
  }

  /* ---------- lista spesa ---------- */
  function renderSpesa(v) {
    let done = {};
    try { done = JSON.parse(localStorage.getItem(SPESA_KEY) || '{}'); } catch (e) {}
    const lines = [];
    for (const p of state.persone) for (let g = 0; g < 7; g++) for (const m of PASTI) {
      const t = menuCell(p.id, g, m.id);
      if (!t || t === 'Mensa scolastica') continue;
      t.split('\n').map((x) => x.trim()).filter(Boolean).forEach((x) => lines.push({ txt: x, who: p.nome, day: GIORNI[g].slice(0, 3) }));
    }
    const grouped = {};
    for (const l of lines) (grouped[l.txt.toLowerCase()] ||= { txt: l.txt, who: new Set(), n: 0 }).who.add(l.who), grouped[l.txt.toLowerCase()].n++;
    const arr = Object.values(grouped).sort((a, b) => a.txt.localeCompare(b.txt));
    v.innerHTML = `
      <div class="card">
        <div class="day-header"><h2>🛒 Lista spesa della settimana</h2><button class="btn small" id="spesaReset">Deseleziona</button></div>
        <p class="muted">Generata da tutti i menù. Spunta ciò che hai già preso.</p>
        ${arr.map((l) => `<label class="spesa-line ${done[l.txt] ? 'done' : ''}"><input type="checkbox" data-t="${esc(l.txt)}" ${done[l.txt] ? 'checked' : ''}>
          <span>${esc(l.txt)}${l.n > 1 ? ` <b>×${l.n}</b>` : ''}</span><span class="who">${[...l.who].join(', ')}</span></label>`).join('') || '<p class="muted">Nessun pasto pianificato.</p>'}
      </div>`;
    v.querySelectorAll('input[type=checkbox]').forEach((c) => c.onchange = () => {
      if (c.checked) done[c.dataset.t] = 1; else delete done[c.dataset.t];
      localStorage.setItem(SPESA_KEY, JSON.stringify(done)); render();
    });
    $('#spesaReset').onclick = () => { localStorage.removeItem(SPESA_KEY); render(); };
  }

  /* ---------- impostazioni ---------- */
  function renderImpostazioni(v) {
    v.innerHTML = `
      <div class="card">
        <h2>Note</h2>
        <textarea id="note">${esc(state.note || '')}</textarea>
        <div class="row" style="margin-top:8px"><button class="btn primary" id="noteSave">Salva note</button></div>
      </div>
      <div class="card">
        <h2>Condividi con l'altro telefono</h2>
        <p class="muted">I dati sono salvati su questo dispositivo. Per averli anche sull'altro telefono: esporta il file e importalo dall'altra parte (es. via WhatsApp).</p>
        <div class="row">
          <button class="btn primary" id="expBtn">📤 Esporta / condividi</button>
          <button class="btn" id="impBtn">📥 Importa</button>
          <input type="file" id="impFile" accept="application/json,.json" hidden>
        </div>
      </div>
      <div class="card">
        <h2>Ripristino</h2>
        <p class="muted">Riporta schede e menù ai valori iniziali della nutrizionista. Le preferenze delle bambine vengono mantenute.</p>
        <div class="row">
          <button class="btn" id="resetMenu">Ripristina menù settimanali</button>
          <button class="btn danger" id="resetAll">Ripristina tutto</button>
        </div>
      </div>
      <div class="card">
        <h2>Installa come app</h2>
        <p class="muted">Android/Chrome: menu ⋮ → "Aggiungi a schermata Home". iPhone/Safari: Condividi → "Aggiungi a Home".</p>
        <p class="muted">Versione dati ${DATA_VERSION}</p>
      </div>`;
    $('#noteSave').onclick = () => { state.note = $('#note').value; save(); toast('Note salvate'); };
    $('#expBtn').onclick = exportData;
    $('#impBtn').onclick = () => $('#impFile').click();
    $('#impFile').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const s = JSON.parse(r.result);
          if (!s.menu || !s.schede) throw new Error('formato');
          state = s; state.version = DATA_VERSION; save(); render(); toast('Importato');
        } catch (err) { alert('File non valido'); }
      };
      r.readAsText(f);
    };
    $('#resetMenu').onclick = () => { if (!confirm('Ripristinare i menù settimanali predefiniti?')) return; state.menu = defaultState().menu; save(); render(); toast('Menù ripristinati'); };
    $('#resetAll').onclick = () => {
      if (!confirm('Ripristinare TUTTO (schede e menù)? Le preferenze delle bambine restano.')) return;
      const prefs = state.preferenze; state = defaultState(); state.preferenze = prefs; save(); render(); toast('Ripristinato');
    };
  }

  async function exportData() {
    const json = JSON.stringify(state, null, 2);
    const name = `piano-alimentare-${new Date().toISOString().slice(0, 10)}.json`;
    const file = new File([json], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Piano alimentare' }); return; } catch (e) { if (e.name === 'AbortError') return; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file); a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------- modal ---------- */
  function openModal(title, html) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = html;
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; }
  $('#modalClose').onclick = closeModal;
  $('#modal').onclick = (e) => { if (e.target.id === 'modal') closeModal(); };

  /* ---------- avvio ---------- */
  render();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
