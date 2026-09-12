# Piano Alimentare Famiglia

App web (PWA) per gestire i menù settimanali di Ale, Marti, Mia e Nicole.
Nessun backend, nessuna build: si apre da GitHub Pages e si installa sul telefono.

**App online:** https://alessiovinci87.github.io/nutrizionista/

## Cosa contiene

- **Schede della nutrizionista** per Ale e Marti (pranzo e cena) con tutte le alternative e le grammature, ricopiate dai fogli.
- **Menù settimanale predefinito** lun-ven dalla tabella della nutrizionista; sabato e domenica proposti a partire dalle schede.
- **Colazione, spuntino e merenda adulti**: non erano nei fogli, sono proposte da confermare con la nutrizionista.
- **Mia e Nicole**: ampio elenco di opzioni sane per colazione, spuntino, merenda, cena (e pranzo sab/dom). Lun-ven il pranzo è la mensa. Per ogni bambina si segnano le preferenze 👍/👎 e si filtrano le opzioni quando si compone il menù.
- **Tutto modificabile**: alimenti, categorie, menù di ogni giorno. Lista spesa generata dai menù.
- **Condivisione tra telefoni**: Altro → Esporta / Importa (file JSON, ad esempio via WhatsApp).

## Sviluppo

Apri `index.html` con un qualsiasi server statico (es. `npx serve .`). File:

- `data.js` – dati predefiniti (schede, opzioni, menù).
- `app.js` – logica UI, salvataggio in `localStorage`.
- `style.css`, `index.html`, `manifest.json`, `sw.js` – interfaccia e PWA.

Per modificare i valori predefiniti edita `data.js` e incrementa `DATA_VERSION` se vuoi forzare il ricaricamento sui dispositivi (attenzione: azzera le modifiche locali).
