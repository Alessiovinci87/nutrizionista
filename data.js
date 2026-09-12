/* Dati predefiniti: indicazioni della nutrizionista (Marti e Ale) + opzioni per Mia e Nicole.
   Tutto è modificabile dall'app; "Ripristina predefiniti" riparte da qui. */

const DATA_VERSION = 1;

const GIORNI = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const PASTI = [
  { id: 'colazione', nome: 'Colazione', emoji: '☕' },
  { id: 'spuntino',  nome: 'Spuntino',  emoji: '🍎' },
  { id: 'pranzo',    nome: 'Pranzo',    emoji: '🍝' },
  { id: 'merenda',   nome: 'Merenda',   emoji: '🥪' },
  { id: 'cena',      nome: 'Cena',      emoji: '🍽️' },
];

const PERSONE = [
  { id: 'ale',    nome: 'Ale',    emoji: '🧔', tipo: 'adulto',  scheda: 'ale' },
  { id: 'marti',  nome: 'Marti',  emoji: '👩', tipo: 'adulto',  scheda: 'marti' },
  { id: 'mia',    nome: 'Mia',    emoji: '👧', tipo: 'bambina', scheda: 'bambine', eta: 10 },
  { id: 'nicole', nome: 'Nicole', emoji: '🧒', tipo: 'bambina', scheda: 'bambine', eta: 6 },
];

/* ---------- Colazione / spuntino / merenda adulti ----------
   NON presenti nelle schede della nutrizionista: proposte sane, da confermare con lei. */
const COLAZIONE_ADULTI = [
  { cat: 'Proposte (da confermare con la nutrizionista)', items: [
    '150g yogurt greco 0% + 30g fiocchi d\'avena + frutta fresca',
    '200ml latte parzialmente scremato + 40g cereali integrali',
    '2 fette biscottate integrali + marmellata senza zuccheri aggiunti + caffè/tè',
    '50g pane integrale + 100g ricotta + miele (1 cucchiaino)',
    '1 uovo strapazzato + 1 fetta di pane integrale + pomodoro',
    '150g yogurt bianco + 20g frutta secca + 1 frutto',
    'Porridge: 40g avena + 200ml latte + cannella + frutta',
    'Caffè/tè + 1 frutto + 20g mandorle',
  ]},
];
const SPUNTINO_ADULTI = [
  { cat: 'Proposte (da confermare con la nutrizionista)', items: [
    '1 frutto fresco di stagione',
    '20g frutta secca (mandorle, noci)',
    '125g yogurt greco 0%',
    '3 gallette di riso/mais',
    '1 frutto + 10g mandorle',
    'Verdure crude (carote, finocchio)',
  ]},
];
const MERENDA_ADULTI = SPUNTINO_ADULTI;

/* ---------- MARTI ---------- */
const SCHEDA_MARTI = {
  colazione: COLAZIONE_ADULTI,
  spuntino: SPUNTINO_ADULTI,
  merenda: MERENDA_ADULTI,
  pranzo: [
    { cat: 'Carboidrati (scegline 1)', items: [
      '80g pasta di semola di grano duro (preferibilmente integrale)',
      '80g riso basmati (o altro tipo es. riso venere, riso rosso, preferibilmente integrali)',
      '80g farro (oppure mix di cereali)',
      '80g cous cous',
      '80g riso arborio (o altro tipo per risotti)',
      '500g patate',
      '90g pane tipo 00 (preferibilmente integrale)',
    ]},
    { cat: 'Proteine (scegline 1)', items: [
      '60g tonno al naturale (1 scatoletta piccola)',
      '100g gamberetti surgelati',
      '70g filetto di vitello',
      '50g filetti di tonno al naturale',
      '150g albume d\'uovo di gallina',
      '50g salmone selvaggio sockeye affumicato (mezza porzione)',
      '40g bresaola (oppure crudo sgrassato - occasionalmente)',
      '50g prosciutto cotto a cubetti',
      '40g carne macinata di vitello',
      '60g ricotta Granarolo proteica',
      '15g grana padano DOP (1 cucchiaio)',
      '55g uova di gallina (1 uovo medio)',
    ]},
    { cat: 'Verdure cotte (scegline 1)', items: [
      '200g zucchine (1 zucchina media)',
      '40g piselli surgelati',
      '120g fagiolini',
      '80g spinaci',
      '150g funghi misti',
      '100g verdure o ortaggi',
    ]},
    { cat: 'Verdure crude (scegline 1)', items: [
      '120g pomodorini',
      '70g carote (1 carota media)',
      '200g finocchio',
      '150g insalata (mix verdure crude es. lattuga, radicchio, carote, pomodoro)',
      '90g verdure o ortaggi',
    ]},
    { cat: 'Condimento (scegline 1)', items: [
      '10g olio di oliva extravergine (2 cucchiaini)',
      '20g pesto alla genovese (1 cucchiaio raso)',
    ]},
  ],
  cena: [
    { cat: 'Carboidrati (scegline 1)', items: [
      '50g pane carasau (circa 2 fogli)',
      '60g spianata sarda',
      '60g pane tipo 0 (preferibilmente integrale)',
      '50g riso basmati (o altro tipo di cereale)',
      '200g patate',
      '50g pane grattugiato',
    ]},
    { cat: 'Proteine (scegline 1)', items: [
      '120g filetto di vitello',
      '110g petto di pollo',
      '110g petto di tacchino',
      '150g merluzzo surgelato (oppure fresco)',
      '150g nasello',
      '125g cuori di filetti di salmone selvaggio surgelato (1 porzione)',
      '200g polpo',
      '160g calamaro',
      '100g filetti di orata selvatica',
      '100g pesce spada',
      '100g filetto di manzo (oppure vitellone)',
      '55g uova di gallina (1 uovo medio) con 100g albume d\'uovo',
      '125g ricotta Granarolo proteica',
      '100g hamburger di bovino (100% carne)',
      '110g uova di gallina (2 uova medie)',
      '100g ricotta di vacca',
    ]},
    { cat: 'Verdure (scegline 1)', items: [
      '200g verdure o ortaggi',
      '200g cavolfiore (o broccoli)',
      '300g bieta (o cicoria)',
      '150g cavolo verza',
      '400g zucchine (2 zucchine medie)',
      '200g funghi champignon',
      '200g zucca delica',
    ]},
    { cat: 'Condimento', items: [
      '10g olio di oliva extravergine (2 cucchiaini)',
    ]},
  ],
};

/* ---------- ALE ---------- */
const SCHEDA_ALE = {
  colazione: COLAZIONE_ADULTI,
  spuntino: SPUNTINO_ADULTI,
  merenda: MERENDA_ADULTI,
  pranzo: [
    { cat: 'Carboidrati (scegline 1)', items: [
      '120g pasta di semola di grano duro (preferibilmente integrale)',
      '120g farro (oppure mix di cereali)',
      '120g cous cous',
      '120g riso basmati (o altro tipo es. riso venere, riso rosso, preferibilmente integrali)',
      '120g riso arborio (o altro tipo per risotti)',
      '500g patate',
      '140g pane tipo 00 (preferibilmente integrale)',
    ]},
    { cat: 'Proteine (scegline 1)', items: [
      '110g tonno al naturale (2 scatolette piccole o 1 grande)',
      '110g petto di pollo',
      '120g filetto di vitello',
      '180g gamberetti surgelati',
      '100g filetti di tonno al naturale',
      '250g albume d\'uovo di gallina',
      '100g salmone selvaggio sockeye affumicato (una porzione)',
      '70g bresaola (oppure crudo sgrassato - occasionalmente)',
      '50g salmone selvaggio sockeye affumicato con 40g formaggio fresco spalmabile Pro Milk (2 cucchiaini)',
      '55g uova di gallina (1 uovo medio) con 100g albume d\'uovo',
      '50g prosciutto cotto a cubetti con 55g uova di gallina (1 uovo medio)',
      '80g carne macinata di vitello',
      '125g ricotta Granarolo proteica',
      '30g grana padano DOP (1 cucchiaio + 1 cubetto)',
    ]},
    { cat: 'Verdure cotte (scegline 1)', items: [
      '200g zucchine (1 zucchina media)',
      '40g piselli surgelati',
      '120g fagiolini',
      '80g spinaci',
      '150g funghi misti',
      '100g verdure o ortaggi',
    ]},
    { cat: 'Verdure crude (scegline 1)', items: [
      '70g carote (1 carota media)',
      '200g finocchio',
      '150g insalata (mix verdure crude es. lattuga, radicchio, carote, pomodoro)',
      '100g verdure o ortaggi',
    ]},
    { cat: 'Condimento (scegline 1)', items: [
      '15g olio di oliva extravergine (3 cucchiaini)',
      '30g pesto alla genovese (1 cucchiaio)',
    ]},
  ],
  cena: [
    { cat: 'Carboidrati (scegline 1)', items: [
      '110g pane integrale',
      '100g spianata sarda',
      '100g pane tipo 0',
      '80g riso basmati (o altro tipo di cereale)',
      '350g patate',
      '80g pane grattugiato',
    ]},
    { cat: 'Proteine (scegline 1)', items: [
      '220g petto di pollo (2 fettine)',
      '210g petto di tacchino',
      '240g filetto di vitello',
      '300g merluzzo surgelato (oppure fresco)',
      '300g nasello',
      '240g cuori di filetti di salmone selvaggio surgelato (2 porzioni)',
      '300g polpo',
      '320g calamaro',
      '180g filetti di orata selvatica',
      '200g pesce spada',
      '180g filetto di manzo (oppure vitellone)',
      '110g uova di gallina (2 uova medie) con 150g albume d\'uovo',
      '150g hamburger di bovino (100% carne)',
      '170g uova di gallina (3 uova medie)',
      '150g ricotta di vacca',
    ]},
    { cat: 'Verdure (scegline 1)', items: [
      '200g verdure o ortaggi',
      '200g cavolfiore (o broccoli)',
      '300g bieta (o cicoria)',
      '150g cavolo verza',
      '400g zucchine (2 zucchine medie)',
      '200g funghi champignon',
      '200g zucca delica',
    ]},
    { cat: 'Condimento', items: [
      '15g olio di oliva extravergine (3 cucchiaini)',
    ]},
  ],
};

/* ---------- BAMBINE (Mia 10 anni, Nicole 6 anni) ----------
   Opzioni sane ed equilibrate, il più ampie possibile: si segnano le preferenze (piace / non piace)
   e poi si compone il menù. Porzioni indicative: Nicole circa 2/3 di Mia. */
const SCHEDA_BAMBINE = {
  colazione: [
    { cat: 'Latte e derivati', items: [
      'Latte con cereali integrali (fiocchi di mais/avena) senza zuccheri aggiunti',
      'Latte con cacao amaro e fette biscottate integrali',
      'Latte e biscotti secchi (4-5 biscotti)',
      'Yogurt bianco/greco con frutta fresca a pezzi',
      'Yogurt con muesli e miele',
      'Yogurt alla frutta senza zuccheri aggiunti + 1 fetta di pane',
      'Latte con 2 cucchiai di fiocchi d\'avena e banana (porridge)',
      'Latte vegetale (avena/mandorla) con cereali',
    ]},
    { cat: 'Pane e cereali', items: [
      'Pane integrale con marmellata',
      'Pane con miele',
      'Pane con burro e marmellata (poco burro)',
      'Pane con crema di nocciole senza olio di palma (occasionale)',
      'Pane con ricotta e miele',
      'Fette biscottate con marmellata',
      'Pancake all\'avena con frutta (fatti in casa)',
      'Fetta di torta casalinga (es. allo yogurt, alle carote, alle mele)',
      'Plumcake fatto in casa',
      'Ciambella semplice',
      'Crackers integrali + 1 frutto',
    ]},
    { cat: 'Frutta e frullati', items: [
      'Frullato di latte e banana',
      'Frullato di latte e fragole/frutti di bosco',
      'Frullato yogurt e pesca',
      'Spremuta d\'arancia + biscotti secchi',
      'Macedonia con yogurt',
      'Banana + pane e marmellata',
    ]},
    { cat: 'Salate', items: [
      'Uovo strapazzato con pane tostato',
      'Pane con formaggio fresco (crescenza/stracchino)',
      'Toast con prosciutto cotto e formaggio (occasionale)',
      'Pane con avocado schiacciato',
    ]},
  ],
  spuntino: [
    { cat: 'Frutta', items: [
      'Mela', 'Pera', 'Banana', 'Mandarini / clementine', 'Arancia a spicchi', 'Uva',
      'Fragole', 'Pesca / albicocche', 'Prugne', 'Kiwi', 'Anguria / melone (estate)', 'Ciliegie',
      'Mirtilli / lamponi', 'Ananas a pezzi', 'Macedonia di frutta', 'Frutta disidratata (albicocche, uvetta) piccola porzione',
    ]},
    { cat: 'Secco e latticini', items: [
      'Crackers integrali (1 pacchetto piccolo)', 'Grissini', 'Gallette di riso/mais', 'Pane e olio',
      'Yogurt da bere', 'Yogurt piccolo', 'Formaggino / cubetto di parmigiano', 'Taralli (piccola porzione)',
      'Biscotti secchi (2-3)', 'Barretta di cereali senza zuccheri aggiunti', 'Frutta secca (per Mia; per Nicole tritata/in crema)',
    ]},
    { cat: 'Bevande', items: [
      'Succo di frutta 100% senza zuccheri aggiunti (piccolo)', 'Spremuta', 'Latte', 'Acqua e limone',
    ]},
  ],
  pranzo: [
    { cat: 'Lunedì-Venerdì', items: [
      'Mensa scolastica',
    ]},
    { cat: 'Primi piatti', items: [
      'Pasta al pomodoro (con basilico)', 'Pasta al pesto', 'Pasta con zucchine', 'Pasta con piselli e prosciutto cotto',
      'Pasta al ragù di carne', 'Pasta con tonno e pomodoro', 'Pasta con broccoli', 'Pasta con lenticchie',
      'Pasta con crema di zucca', 'Pasta con ricotta e spinaci', 'Pasta e fagioli', 'Pasta e ceci',
      'Pasta in bianco con olio e parmigiano', 'Pasta al burro e salvia', 'Lasagne (occasionale)', 'Gnocchi al pomodoro',
      'Risotto allo zafferano', 'Risotto con zucchine', 'Risotto alla zucca', 'Risotto con piselli', 'Risotto con funghi',
      'Riso con verdure', 'Riso al pomodoro', 'Cous cous con verdure', 'Farro con pomodorini e mozzarella',
      'Minestra di verdure con pastina', 'Passato di verdure con crostini', 'Vellutata di zucca', 'Vellutata di carote e patate',
      'Minestrone con orzo', 'Zuppa di legumi', 'Pizza margherita fatta in casa (weekend)', 'Focaccia con pomodorini (weekend)',
    ]},
    { cat: 'Secondi', items: [
      'Petto di pollo alla griglia', 'Bocconcini di pollo al forno (impanati leggeri)', 'Straccetti di pollo con limone', 'Cotoletta al forno',
      'Polpette di carne al sugo', 'Polpette di carne al forno', 'Hamburger di manzo fatto in casa', 'Fettina di vitello ai ferri',
      'Arrosto di tacchino a fette', 'Spezzatino con patate', 'Filetto di merluzzo al forno', 'Bastoncini di pesce al forno',
      'Salmone al forno', 'Sogliola / platessa al forno', 'Polpette di pesce', 'Tonno con fagioli', 'Gamberetti saltati',
      'Frittata (semplice / con zucchine / con patate / con spinaci)', 'Uovo sodo', 'Uovo in camicia / all\'occhio di bue',
      'Mozzarella con pomodoro', 'Formaggio fresco (crescenza, primo sale, ricotta)', 'Parmigiano a scaglie',
      'Prosciutto cotto (occasionale)', 'Bresaola con parmigiano (occasionale)', 'Polpette di legumi', 'Hummus con pane',
      'Burger di lenticchie', 'Piselli con uovo', 'Lenticchie in umido', 'Ceci al pomodoro', 'Fagioli all\'uccelletto',
    ]},
    { cat: 'Contorni', items: [
      'Patate al forno', 'Purè di patate', 'Patate lesse con olio', 'Carote crude a bastoncini', 'Carote cotte al burro/olio',
      'Zucchine trifolate', 'Zucchine grigliate', 'Fagiolini con olio', 'Piselli in padella', 'Spinaci saltati',
      'Broccoli al vapore', 'Cavolfiore gratinato', 'Zucca al forno', 'Pomodorini', 'Insalata verde', 'Insalata mista',
      'Cetrioli', 'Finocchi crudi', 'Mais', 'Peperoni al forno', 'Melanzane al forno', 'Verdure grigliate miste',
      'Verdure crude con pinzimonio', 'Cavolo cappuccio', 'Barbabietola',
    ]},
    { cat: 'Pane', items: [
      'Pane integrale', 'Pane bianco (1 fetta)', 'Grissini', 'Crackers',
    ]},
    { cat: 'Frutta / dolce', items: [
      'Frutta fresca di stagione', 'Macedonia', 'Yogurt', 'Gelato (occasionale, weekend)', 'Dolce casalingo (occasionale)',
    ]},
  ],
  merenda: [
    { cat: 'Dolci', items: [
      'Pane e marmellata', 'Pane e miele', 'Pane e crema di nocciole (occasionale)', 'Yogurt con frutta',
      'Yogurt con cereali', 'Frullato di frutta e latte', 'Fetta di torta casalinga', 'Plumcake / muffin fatti in casa',
      'Biscotti secchi (3-4) + latte', 'Fette biscottate con marmellata', 'Budino fatto in casa', 'Gelato (occasionale)',
      'Macedonia', '1 frutto + 2 quadretti cioccolato fondente', 'Banana con yogurt', 'Pancake con marmellata',
      'Crêpe con marmellata', 'Cereali con latte', 'Barretta di cereali', 'Ghiacciolo alla frutta fatto in casa (estate)',
    ]},
    { cat: 'Salate', items: [
      'Pane e olio', 'Pane e pomodoro', 'Pane con prosciutto cotto', 'Pane con formaggio', 'Toast', 'Piadina piccola con formaggio',
      'Focaccia (piccola porzione)', 'Pizzetta (occasionale)', 'Crackers con formaggino', 'Grissini con prosciutto',
      'Popcorn fatti in casa (poco sale)', 'Taralli', 'Verdure crude con hummus', 'Uovo sodo', 'Mozzarelline con pomodorini',
      'Frutta secca (per Mia)',
    ]},
    { cat: 'Bevande', items: [
      'Latte', 'Latte e cacao', 'Spremuta', 'Succo 100% (piccolo)', 'Tè deteinato / tisana alla frutta', 'Acqua',
    ]},
  ],
  cena: [
    { cat: 'Primi / piatto unico', items: [
      'Minestra di verdure con pastina', 'Passato di verdure con crostini', 'Vellutata di zucca con parmigiano',
      'Vellutata di carote e patate', 'Minestrone con orzo', 'Zuppa di legumi con pane', 'Pastina in brodo',
      'Riso e piselli', 'Riso con zucchine', 'Riso al pomodoro (porzione piccola)', 'Pasta e fagioli', 'Pasta e ceci',
      'Pasta con lenticchie', 'Pasta al pomodoro (porzione piccola)', 'Cous cous con verdure e pollo', 'Farro con verdure',
      'Pizza margherita fatta in casa (weekend / occasionale)', 'Piadina con verdure e formaggio', 'Toast integrale con prosciutto e pomodoro',
      'Insalata di riso (estate)', 'Polenta con formaggio / sugo',
    ]},
    { cat: 'Secondi di carne', items: [
      'Petto di pollo alla griglia', 'Bocconcini di pollo al forno', 'Straccetti di pollo con limone', 'Pollo al curry leggero con riso',
      'Cotoletta di pollo/tacchino al forno', 'Fettina di vitello ai ferri', 'Fettina di tacchino', 'Polpette al sugo',
      'Polpette al forno', 'Hamburger fatto in casa', 'Spezzatino con patate e carote', 'Arrosto di tacchino', 'Involtini di pollo con prosciutto e formaggio',
      'Scaloppina al limone', 'Pollo con patate al forno', 'Spiedini di pollo e verdure',
    ]},
    { cat: 'Secondi di pesce', items: [
      'Filetto di merluzzo al forno', 'Merluzzo in umido con pomodoro', 'Bastoncini di pesce al forno', 'Salmone al forno',
      'Salmone al vapore con patate', 'Platessa / sogliola al forno', 'Orata al forno', 'Polpette di pesce', 'Tonno con patate',
      'Gamberetti saltati', 'Pesce spada alla griglia', 'Seppie con piselli', 'Nasello impanato al forno', 'Tortino di pesce e patate',
    ]},
    { cat: 'Secondi con uova / formaggi / legumi', items: [
      'Frittata semplice', 'Frittata di zucchine', 'Frittata di patate', 'Frittata di spinaci', 'Uova strapazzate',
      'Uovo sodo con verdure', 'Uovo al tegamino', 'Omelette con formaggio', 'Mozzarella con pomodoro', 'Stracchino / crescenza con pane',
      'Ricotta con verdure', 'Primo sale', 'Formaggio con pane e pomodorini', 'Lenticchie in umido', 'Ceci al pomodoro',
      'Fagioli all\'uccelletto', 'Polpette di legumi', 'Burger di lenticchie', 'Hummus con pane e verdure', 'Piselli con uovo',
      'Prosciutto cotto (occasionale)', 'Bresaola con parmigiano (occasionale)',
    ]},
    { cat: 'Contorni', items: [
      'Patate al forno', 'Purè di patate', 'Patate lesse', 'Carote crude', 'Carote cotte', 'Zucchine trifolate',
      'Zucchine grigliate', 'Fagiolini', 'Piselli', 'Spinaci', 'Broccoli', 'Cavolfiore', 'Zucca al forno', 'Pomodorini',
      'Insalata verde', 'Insalata mista', 'Cetrioli', 'Finocchi', 'Mais', 'Peperoni', 'Melanzane', 'Verdure grigliate',
      'Pinzimonio', 'Verdure al vapore miste', 'Polpettine di verdure al forno', 'Sformato di verdure',
    ]},
    { cat: 'Pane', items: [
      'Pane integrale', 'Pane bianco (1 fetta)', 'Grissini', 'Crackers', 'Pane carasau',
    ]},
    { cat: 'Frutta / dolce', items: [
      'Frutta fresca', 'Macedonia', 'Yogurt', 'Mela cotta', 'Budino (occasionale)',
    ]},
  ],
};

const SCHEDE = { marti: SCHEDA_MARTI, ale: SCHEDA_ALE, bambine: SCHEDA_BAMBINE };

/* ---------- Menù settimanali predefiniti ----------
   Lun-Ven adulti: dalla tabella della nutrizionista. Sab-Dom: proposte composte con le schede. */
const MENU_MARTI = {
  0: { pranzo: '70g pasta\n40g stick bresaola\nCarciofi', cena: '60g pane\n2 uova\nVerdure' },
  1: { pranzo: '110g patate\n120g ceci\nVerdure', cena: '70g basmati\n60g tonno\nBroccoli' },
  2: { pranzo: '70g pasta\n50g ricotta\nZucchine', cena: '60g pane\n100g fettina\nFunghi' },
  3: { pranzo: '200g patate\n2 uova\nCipolle', cena: '90g panino\n40g bresaola\nInsalata' },
  4: { pranzo: '70g farro\n50g salmone\nAsparagi', cena: '60g pane\n100g hamburger\nZucchine' },
  5: { pranzo: '80g riso basmati\n100g gamberetti\n200g zucchine\n10g olio EVO', cena: '200g patate\n150g merluzzo al forno\n200g cavolfiore\n10g olio EVO' },
  6: { pranzo: '80g pasta\n15g grana padano\n120g pomodorini\n20g pesto', cena: '60g pane tipo 0\n110g petto di pollo\n200g verdure\n10g olio EVO' },
};
const MENU_ALE = {
  0: { pranzo: '120g pasta\n70g stick bresaola\nCarciofi', cena: '110g pane\n3 uova\nVerdure' },
  1: { pranzo: '300g patate\n120g ceci\nVerdure', cena: '120g basmati\n110g tonno\nBroccoli' },
  2: { pranzo: '120g pasta\n100g ricotta\nZucchine', cena: '110g pane\n180g fettina\nFunghi' },
  3: { pranzo: '350g patate\n3 uova\nCipolle', cena: '140g panino\n70g bresaola\nInsalata' },
  4: { pranzo: '120g pasta\n100g salmone\nAsparagi', cena: '110g pane\n150g hamburger\nZucchine' },
  5: { pranzo: '120g riso basmati\n180g gamberetti\n200g zucchine\n15g olio EVO', cena: '350g patate\n300g merluzzo al forno\n200g cavolfiore\n15g olio EVO' },
  6: { pranzo: '120g pasta\n30g grana padano\n70g carote\n30g pesto', cena: '100g pane tipo 0\n220g petto di pollo\n200g verdure\n15g olio EVO' },
};
for (const m of [MENU_MARTI, MENU_ALE]) {
  for (let g = 0; g < 7; g++) {
    m[g].colazione = '';
    m[g].spuntino = '';
    m[g].merenda = '';
  }
}

const MENSA = 'Mensa scolastica';
const MENU_BAMBINE_BASE = {
  0: { colazione: 'Latte con cereali integrali', spuntino: 'Mela', pranzo: MENSA, merenda: 'Pane e marmellata', cena: 'Minestra di verdure con pastina\nMozzarella con pomodoro\nPane' },
  1: { colazione: 'Yogurt con frutta e muesli', spuntino: 'Crackers integrali', pranzo: MENSA, merenda: 'Yogurt con frutta', cena: 'Petto di pollo alla griglia\nPatate al forno\nCarote crude' },
  2: { colazione: 'Pane e miele + latte', spuntino: 'Banana', pranzo: MENSA, merenda: 'Pane e olio', cena: 'Filetto di merluzzo al forno\nPurè di patate\nFagiolini' },
  3: { colazione: 'Latte e biscotti secchi', spuntino: 'Mandarini', pranzo: MENSA, merenda: 'Frullato di frutta e latte', cena: 'Frittata di zucchine\nInsalata\nPane' },
  4: { colazione: 'Frullato di latte e banana + fette biscottate', spuntino: 'Grissini', pranzo: MENSA, merenda: 'Fetta di torta casalinga', cena: 'Pasta e fagioli\nPomodorini' },
  5: { colazione: 'Pancake all\'avena con frutta', spuntino: 'Pera', pranzo: 'Pasta al pomodoro\nPolpette al forno\nZucchine\nFrutta', merenda: 'Pane e crema di nocciole', cena: 'Pizza margherita fatta in casa\nInsalata mista' },
  6: { colazione: 'Latte con cacao e fette biscottate', spuntino: 'Uva', pranzo: 'Risotto con zucchine\nFettina di vitello\nCarote cotte\nFrutta', merenda: 'Yogurt con cereali', cena: 'Vellutata di zucca con crostini\nStracchino\nPane' },
};

function clone(o) { return JSON.parse(JSON.stringify(o)); }

function defaultState() {
  return {
    version: DATA_VERSION,
    persone: clone(PERSONE),
    schede: clone(SCHEDE),
    preferenze: { mia: {}, nicole: {} },
    menu: {
      ale: clone(MENU_ALE),
      marti: clone(MENU_MARTI),
      mia: clone(MENU_BAMBINE_BASE),
      nicole: clone(MENU_BAMBINE_BASE),
    },
    note: 'Colazione, spuntino e merenda degli adulti NON sono nelle schede della nutrizionista: le proposte sono da confermare con lei.',
  };
}
