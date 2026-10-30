# Strategia UX e architettura informativa

Documento di lavoro per il redesign del sito di Andrea Vannetti. Serve da base per wireframe e art direction; le proposte indicate come ipotesi richiedono revisione e conferma prima della progettazione UI.

## Criteri di lettura

- **[Presente]**: contenuto, route o funzionalità rintracciati nel codice e nei file di traduzione.
- **[Ipotesi]**: proposta di struttura o comportamento da validare con Andrea. Non costituisce un'informazione già confermata.
- Non si introducono risultati, testimonianze, metriche o dettagli sui clienti che non siano documentati nel repository.

## 1. Sitemap IT/EN

Il routing corrente usa `next-intl`, `localePrefix: "as-needed"`, italiano predefinito e rilevamento automatico della lingua disattivato. Gli URL italiani non hanno prefisso; quelli inglesi usano `/en`. La tabella distingue le route esistenti dalle nuove proposte.

| Sezione | Italiano: attuale | English: current | Stato e ruolo |
|---|---|---|---|
| Home | `/` | `/en` | **[Presente]** Pagina di ingresso e presentazione generale. |
| Progetti | `/progetti` | `/en/projects` | **[Presente]** Elenco e progetto in evidenza. |
| Servizi | `/servizi` | `/en/services` | **[Presente]** Panoramica e dettaglio dei sei servizi nella stessa pagina. |
| Chi sono | `/chi-sono` | `/en/about` | **[Presente]** Profilo, principi e contesto professionale. |
| Contatti | `/contatti` | `/en/contact` | **[Presente]** Canali diretti, Calendly, recensione e form. |
| Privacy e cookie | `/privacy-policy` | `/en/privacy-policy` | **[Presente]** Pagina localizzata, `noindex`; non inclusa nella sitemap attuale. |
| Collaborazioni | — | — | **[Ipotesi]** `/collaborazioni` e `/en/partnerships` (alternativa da valutare: `/en/collaborate`). Percorso dedicato per agenzie, studi e professionisti. |
| Dettaglio servizio | — | — | **[Ipotesi]** `/servizi/[slug]` e `/en/services/[slug]`. La scelta tra sei pagine e un gruppo più piccolo va fatta dopo aver verificato domanda e contenuti. |
| Caso studio | — | — | **[Ipotesi]** `/progetti/[slug]` e `/en/projects/[slug]`. Aprire una pagina solo quando è possibile documentare il lavoro senza colmare lacune con contenuti inventati. |

### Possibili route di dettaglio

Slugs indicativi, non approvati. Le coppie linguistiche dovranno avere mapping esplicito in `i18n/routing.ts` e alternates reciproci.

| Servizio [ipotesi] | IT | EN |
|---|---|---|
| Sviluppo web | `/servizi/sviluppo-web` | `/en/services/web-development` |
| WordPress | `/servizi/wordpress` | `/en/services/wordpress` |
| E-commerce | `/servizi/e-commerce` | `/en/services/e-commerce` |
| SEO e performance | `/servizi/seo-performance` | `/en/services/seo-performance` |
| UI/UX design | `/servizi/ui-ux-design` | `/en/services/ui-ux-design` |
| Consulenza digitale | `/servizi/consulenza-digitale` | `/en/services/digital-consulting` |

Per i casi studio, mantenere slug derivati dal nome del progetto solo dopo aver scelto la forma canonica e verificato che gli URL dei siti siano ancora attivi. Le pagine in sviluppo non devono sembrare lavori completati.

## 2. User journey

### PMI e professionisti

1. **Ingresso e orientamento** — **[Ipotesi]** La home chiarisce subito a chi Andrea si rivolge, quali problemi può affrontare e quale primo passo fare. CTA primaria: raccontare il progetto; alternativa: vedere lavori pertinenti.
2. **Valutazione** — **[Presente]** La pagina Progetti descrive lavori in ambiti come territorio, vino, ospitalità, artigianato ed eventi. **[Ipotesi]** Un caso studio porta dal contesto alla sfida, alle scelte e alle evidenze disponibili.
3. **Scelta del servizio** — **[Presente]** Sono descritti sviluppo web, WordPress, e-commerce, SEO/performance, UI/UX e consulenza. **[Ipotesi]** Pagine o blocchi mirati aiutano a capire quale percorso è adatto senza obbligare a conoscere la tecnologia.
4. **Fiducia nel processo** — **[Presente]** Il testo descrive primo confronto, proposta, design iterato, anteprime durante lo sviluppo, lancio, formazione e supporto successivo concordato.
5. **Contatto** — **[Presente]** Form, email, telefono, WhatsApp e prenotazione Calendly. **[Ipotesi]** Il form si adatta al contesto d'ingresso e chiede solo ciò che serve per un primo confronto.
6. **Conferma** — **[Presente]** Messaggio di successo del form e email di conferma; il testo italiano attuale promette risposta entro 24 ore. Verificare che l'impegno sia ancora valido prima di mantenerlo.

### Agenzie, studi e freelance

1. **Ingresso dedicato** — **[Ipotesi]** Link sempre visibile «Collaborazioni» o «Per agenzie», con promessa e linguaggio separati dal percorso per il cliente finale.
2. **Compatibilità** — **[Ipotesi]** Spiegare in quali fasi e modalità Andrea può contribuire, come si coordina con il team e che tipo di consegne può prendere in carico. Questi dettagli non sono definiti nel codice.
3. **Prova** — **[Presente]** Il portfolio mostra competenze tecniche e progetti. **[Ipotesi]** Selezionare lavori utili a dimostrare collaborazione tecnica, qualità di implementazione e handoff; non attribuire ad Andrea responsabilità non documentate.
4. **Disponibilità e modalità** — **[Ipotesi]** Rendere visibili capacità, disponibilità, processi, strumenti e condizioni di collaborazione dopo conferma con Andrea.
5. **Contatto professionale** — **[Ipotesi]** Form breve con organizzazione, ruolo, competenza richiesta, fase del progetto, tempi e modalità di contatto. Campi e opzioni vanno approvati; non presumere white-label, NDA o tariffe.
6. **Avvio** — **[Presente]** Calendly è già disponibile come canale di prenotazione. Verificare che sia adatto anche ai lead professionali.

## 3. Homepage: architettura proposta

L'ordine sotto è un'ipotesi da testare con wireframe. L'obiettivo è far scegliere il percorso e costruire fiducia con evidenze, senza trasformare la pagina in una successione di schede identiche.

| Sezione | Obiettivo UX | Contenuto | CTA | Stato |
|---|---|---|---|---|
| Hero editoriale | Rendere chiari ruolo, valore e pubblico in pochi secondi. | Mantenere un segnale riconoscibile: logo, nero/lime, Clash Display, lessico tech/codice. Riscrivere il claim solo dopo aver deciso la promessa centrale. Badge «Disponibile per nuovi progetti» esiste già, ma va verificato. | «Ho un progetto» / «Cerco un partner di sviluppo» — seconda CTA e segmentazione sono ipotesi. | Hero e CTA a progetti/contatti **presenti**; messaggio a doppio pubblico **ipotesi**. |
| Scelta del percorso | Ridurre l'ambiguità tra acquisto di un progetto e collaborazione. | Due ingressi con descrizioni diverse e link a percorsi dedicati. Evitare card generiche duplicate. | CTA contestuale per clienti e professionisti. | **Ipotesi.** |
| Prova attraverso un progetto | Mostrare come Andrea ragiona e cosa ha costruito. | Radici in Chianti è già presentato come progetto in evidenza; ci sono sfida tecnica, mappa, eventi, partner, percorsi GPX e immagine. Usare solo risultati documentabili. | «Leggi il caso studio» se il contenuto viene integrato; oggi il link porta alla lista progetti. | Progetto e descrizione **presenti**; case study approfondito **ipotesi**. |
| Lavori selezionati | Consentire confronto per contesto e contributo, non solo per stack. | Selezione di progetti live e lavoro SEO/GEO; separare chiaramente progetti live e in sviluppo. | «Vedi tutti i progetti». | Portfolio di sette voci **presente**; selezione editoriale e tassonomie **ipotesi**. |
| Metodo di lavoro | Rendere tangibile rapporto diretto, confronto e anteprime. | Primo contatto → analisi/proposta → design e feedback → sviluppo con preview → lancio/formazione → supporto concordato. | «Parliamone» o «Come funziona». | Processo **presente** nei testi servizi; sua sintesi in home **ipotesi**. |
| Servizi per problema | Aiutare chi non sa scegliere una tecnologia o un servizio. | Sei servizi esistenti; partire da bisogni del cliente e collegare alla soluzione, senza sovrapporre sei card uguali. | «Trova il servizio adatto» / «Vedi i servizi». | Sei servizi e descrizioni **presenti**; gerarchia per bisogni **ipotesi**. |
| Identità e relazione | Spiegare chi segue il progetto e perché il rapporto è diretto. | Bio, base nel Chianti, lavoro da remoto in Italia, principi di chiarezza e supporto. | «Conosci Andrea». | Bio, ritratto e principi **presenti**; collocazione in home **ipotesi**. |
| CTA conclusiva | Convertire senza confondere i due pubblici. | Richiamo dei due ingressi oppure CTA contestuale se l'utente ha già scelto il percorso. | Contatto cliente / contatto professionale. | CTA generica **presente**; doppia uscita **ipotesi**. |

Il marquee delle tecnologie può restare come dettaglio identitario o prova secondaria; non dovrebbe sostituire casi studio, benefici o contributo concreto.

## 4. Organizzazione delle pagine

### Servizi

- **[Presente]** Hero, problemi affrontati, sei servizi con descrizioni e liste «include», processo in sei fasi, FAQ e CTA.
- **[Ipotesi]** Aprire con bisogni riconoscibili; presentare per ogni servizio destinatari, risultato atteso, confini, processo e prova pertinente. Non promettere performance, SEO o supporto senza definire misurazione e perimetro.
- **[Ipotesi]** La pagina indice orienta e confronta; i dettagli rispondono a dubbi specifici e convertono. Le FAQ esistenti possono essere mantenute dove pertinenti, dopo revisione di prezzi e tempi.

### Progetti

- **[Presente]** Radici in Chianti in evidenza; sei altre voci con stato, descrizione, tecnologia, screenshot o placeholder e link esterni quando disponibili.
- **[Ipotesi]** L'indice può organizzare i lavori per tipologia di problema/contributo (es. web app, CMS, e-commerce, SEO/GEO) solo quando i tag sono coerenti con il lavoro reale. Distinguere «live», «in sviluppo» e «SEO/GEO» con etichette testuali accessibili.
- **[Ipotesi]** Le pagine dettaglio dovrebbero documentare il progetto e non essere solo una scheda ampliata. Non pubblicare placeholder come risultati.

### Chi sono

- **[Presente]** Bio, località, tipi di attività seguite, ritratto, quattro principi, motto e CTA.
- **[Ipotesi]** Dare più peso a come si lavora insieme, al confronto diretto e alle preview; mantenere il profilo personale e la radice territoriale senza ridurre la proposta al solo mercato locale.
- Verificare motto, foto, aggiornamento della disponibilità e ogni formulazione che descrive supporto continuativo.

### Contatti

- **[Presente]** Email, telefono, WhatsApp, Calendly, social, QR per recensione Google e form qualificante.
- **[Ipotesi]** Separare l'accesso al form cliente da quello professionale, precompilando solo il contesto non sensibile. Mantenere i canali diretti visibili e chiarire cosa succede dopo l'invio.
- Revisione UX/accessibilità: ridurre campi iniziali, rendere condizionali le domande successive, associare label ed errori, preservare messaggio di successo e alternativa ai canali digitali.

## 5. Pagine di dettaglio

### Dettaglio servizio — struttura da validare

1. Esigenza e destinatario, descritti con esempi reali.
2. Problema che il servizio può affrontare e risultato atteso, senza KPI inventati.
3. Ambito: deliverable, esclusioni e dipendenze dal cliente.
4. Processo e momenti di confronto/preview.
5. Tecnologie solo come scelta motivata, non come beneficio autonomo.
6. Caso studio pertinente, quando disponibile.
7. FAQ specifiche, indicazioni su tempi/prezzi solo dopo conferma.
8. CTA a form o call con il servizio già selezionato.

**[Ipotesi]** Non è necessario pubblicare sei pagine al lancio. Valutare prima quali servizi sono prioritari e hanno contenuti distinti; accorpare gli altri nell'indice se una pagina autonoma sarebbe sottile o ripetitiva.

### Caso studio — struttura da validare

1. Cliente/progetto e contesto, con autorizzazioni e denominazione confermate.
2. Situazione iniziale e problema, riportando solo fatti verificabili.
3. Ruolo di Andrea, responsabilità e collaboratori, da confermare.
4. Vincoli e obiettivi concordati.
5. Scelte progettuali e tecniche con motivazione.
6. Processo, feedback e anteprime, se documentabili.
7. Soluzione e funzionalità, con immagini/artefatti autorizzati.
8. Risultati: metriche solo se esistono dati, periodo e fonte; altrimenti descrivere il risultato qualitativo senza numeri.
9. Link al progetto live, stato attuale e stack verificati.
10. CTA al servizio o al percorso coerente.

**[Ipotesi]** Partire dai progetti con più materiale disponibile. Radici ha già descrizione della sfida e funzionalità; Cantinetta, Casanova, Succulentarte e Glam hanno descrizioni e asset; per gli altri la scheda è incompleta o il lavoro è in sviluppo. Nessuna di queste descrizioni dimostra da sola impatto commerciale.

## 6. Inventario dei contenuti e lacune

### Materiale effettivamente presente

| Elemento | Disponibilità nel repository | Verifiche necessarie |
|---|---|---|
| Posizionamento | Bio: freelance nel Chianti, tra Siena e Firenze; lavoro in Toscana e Italia; focus citati su ristoranti, agriturismi, B&B e PMI. | Confermare segmenti prioritari e promessa comune ai due pubblici. |
| Metodo | Testi su primo contatto, analisi/proposta, wireframe, revisioni, preview, lancio, formazione e supporto successivo. | Chiarire tempi di feedback, strumenti, confini e modalità del supporto concordato. |
| Servizi | Sviluppo web, WordPress classico/headless, e-commerce, SEO/performance, UI/UX, consulenza. Sono presenti descrizioni e feature list IT/EN. | Confermare perimetro, priorità, offerte attuali e responsabilità condivise. |
| Radici in Chianti | Live; associazione di promozione sociale; mappa Leaflet, clustering, filtri, eventi, partner, GPX/profili altimetrici, WordPress headless/REST; WebP e link al sito. | Ruolo personale, collaborazione, problema iniziale, risultati, autorizzazioni e link attuale. |
| Succulentarte | Live; attività di Renzo Vannetti; galleria e contatti; screenshot e URL; stack React/TypeScript/Vite/MUI nel codice. | Risultati, contributo preciso, autorizzazione a presentare relazione familiare e lavoro. |
| Casanova di Bricciano | Live; azienda vinicola, storia, terreni, apicoltura, degustazioni/agriturismo; sito dichiarato bilingue; screenshot e URL; WordPress. | Ruolo, scelte, risultati e verifica dello stato bilingue/live. |
| Cresta dell'Angiolo | In sviluppo; descrizione di cammino di 70 km, tappe, mappa e contenuti logistici; stack React/TypeScript/WP headless nel codice; senza screenshot/URL. | Stato, data pubblicabile, asset e autorizzazione; non presentare come lavoro concluso. |
| Cantinetta del Chianti | Live; screenshot, URL e repository GitHub; WordPress headless/Next; descrizione di galleria, filtri e palette merlot. | Ruolo, processo, risultati, disponibilità dei dati e verifica link. |
| Glam Events in Tuscany | Live; screenshot/URL; descrizione di consulenza SEO/GEO, contenuti e schema markup; etichetta «Solo SEO/GEO». | Metriche e fonte, ruolo esatto, periodo di lavoro, autorizzazione e definizione di GEO usata. |
| TecnoChianti | In sviluppo; descrizione del concept «architettura tipografica», fondo chiaro/terracotta e immagini; niente screenshot/URL; stack Next/TypeScript nel codice. | Stato, ruolo, asset, decisioni approvate e data di pubblicazione. |
| Profilo e fiducia | Ritratto, principi, link social, Calendly e QR recensione Google. | Testimonianze, loghi e citazioni: non presenti come contenuti approvati; chiedere autorizzazione e fonte. |
| Conversione | Form con contatto, azienda, sito, budget, messaggio e privacy; email di conferma con promessa di risposta entro 24 ore. | Verificare SLA, range budget, campi necessari e trattamento dati. |

### Affermazioni da verificare prima di riuso

Nei testi attuali compaiono: caricamento sotto i 2 secondi, tempi di progetto di 2–4 o 4–6 settimane, prezzo indicativo da circa 1.000€, risposta entro 24 ore, supporto/manutenzione e attività SEO. Sono **affermazioni già presenti**, non risultati verificati dall'audit. Confermare condizioni, periodo, eccezioni e disponibilità prima di usarle come promesse commerciali.

### Informazioni non trovate o non dimostrate

- Dati di conversione, traffico, posizionamento, performance prima/dopo o ricavi attribuibili ai progetti.
- Testimonianze scritte, case study con risultati misurati, loghi cliente autorizzati o citazioni.
- Modalità e capacità di collaborazione con agenzie: white-label, sviluppo in affiancamento, handoff, disponibilità, tariffe, NDA e strumenti.
- Ruolo puntuale di Andrea, team/collaboratori e responsabilità su ciascun progetto.
- Priorità commerciali, budget/valore minimo dei progetti e capacità mensile.
- Prove documentali delle promesse quantitative riportate nelle FAQ e nei servizi.

Queste lacune sono domande da porre al cliente, non spazi da completare con copy ipotetico.

## 7. Conversioni ed eventi

### Presente nel codice

- Google Tag (`GT-5TJZGKMH`) caricato solo quando `VERCEL_ENV` è `production`.
- Default consent negato; scelta accetta/rifiuta memorizzata in `localStorage`.
- Click su telefono, email, WhatsApp e Calendly tracciati come conversione e `generate_lead` con metodo.
- Invio form riuscito tracciato come conversione e `generate_lead` con metodo `form`.
- Il backend usa Resend per la mail al titolare e la conferma al mittente.

### Proposta da validare

| Evento proposto | Quando | Parametri ammessi |
|---|---|---|
| `journey_select` | Scelta esplicita tra cliente e collaborazione. | `journey_type` (`client` / `partner`), `placement`. |
| `service_cta_click` | CTA verso un servizio o dettaglio. | `service_id`, `placement`. |
| `case_study_open` | Apertura caso studio. | `project_id`, `placement`. |
| `contact_start` | Primo focus/interazione con form. | `journey_type`, `form_id`. |
| `contact_submit_success` | Risposta positiva dall'API. | `journey_type`, `form_id`, `service_id` se selezionato. |
| `contact_submit_error` | Errore di invio, senza contenuto o dati personali. | `form_id`, `error_category`. |
| `contact_method_click` | Click a email, telefono, WhatsApp o Calendly. | `method`, `placement`, `journey_type` se noto. |

Non inviare a GA/Google Ads nome, email, telefono, messaggio, URL del sito, budget o altri dati personali. Definire un solo evento primario per ciascuna conversione e rivedere il tracker attuale per evitare doppio conteggio tra click e submit. Mantenere consenso e configurazione privacy coerenti con gli strumenti effettivamente attivi.

## 8. SEO e i18n da preservare

- **[Presente]** `metadataBase`, title template, descrizioni, Open Graph/Twitter, icone, manifest e `lang` sull'elemento HTML.
- **[Presente]** Canonical e `hreflang` IT/EN con `x-default` italiano tramite `lib/seo.ts`; mantenere alternates reciproci anche per ogni nuova route.
- **[Presente]** `sitemap.ts` genera URL localizzati per home, servizi, progetti, contatti e profilo; privacy è esclusa e `noindex`. Aggiornare sitemap per nuove pagine pubblicabili, non per bozze.
- **[Presente]** `robots.txt` consente il crawl e dichiara la sitemap.
- **[Presente]** JSON-LD `Person`, `ProfessionalService` e `WebSite`; aggiornare solo dati verificati, mantenendo consistenti identità, area servita e profili social.
- **[Presente]** Slug IT/EN sono mappati in `i18n/routing.ts`; i messaggi sono duplicati per lingua in file JSON separati.

### Redirect e migrazione URL

**[Raccomandazione]** Conservare le route esistenti per home, indice progetti/servizi, profilo, contatti e privacy. Se il redesign cambia slug o elimina una route, definire redirect permanenti 301/308 verso il contenuto più vicino, evitando di mandare tutti gli URL alla home. Preparare una tabella vecchio → nuovo URL per entrambe le lingue; controllare link interni, canonical, alternates, sitemap e Search Console al rilascio.

L'attuale middleware non effettua redirect automatico basato su lingua/cookie: mantenere URL deterministici e rispettare la scelta esplicita dell'utente, salvo decisione SEO motivata.

## 9. Ipotesi da verificare prima dei wireframe

1. Quale pubblico ha priorità economica e quale CTA deve essere primaria sulla home?
2. Quali forme di collaborazione professionale Andrea accetta davvero e con quale disponibilità?
3. Quali servizi vuole acquisire, quali non vuole più promuovere e quali sono i relativi confini?
4. Il primo contatto è una call gratuita? Quanto dura, come viene prenotata e cosa riceve il prospect dopo?
5. Sono confermati tempi, prezzo indicativo, risposta entro 24 ore e supporto mensile citati nei testi attuali?
6. Quali clienti autorizzano nome, logo, screenshot, risultati, testimonianze e descrizione del ruolo?
7. Esistono analytics, Search Console, dati performance o report SEO da usare come evidenza? Qual è il periodo e la fonte?
8. Quali progetti sono attivi, completati o non più rappresentativi? I relativi URL sono ancora corretti?
9. Qual è il logo master e quali font devono restare? L'uso di superfici chiare/viola è approvato per quali parti e con quali regole di contrasto?
10. Il sito deve restare bilingue in ogni pagina e con traduzione editoriale completa? Chi mantiene i contenuti EN?
11. Quali strumenti e eventi analytics sono autorizzati e quali sono gli obiettivi di conversione distinti per i due journey?
12. L'informativa privacy e il consenso cookie descrivono ancora correttamente tag, Resend, calendly e trattamento dei dati? La verifica legale va fatta con il titolare.

## 10. Direzione per la fase successiva

La direzione da esplorare è un'esperienza editoriale a forte tipografia e gerarchia, con segni di codice e superfici materiche/tecniche; nero, lime e logo fungono da continuità, mentre viola profondo e superfici chiare restano variabili da testare. Neo-brutalismo e immersione dovranno sostenere orientamento, leggibilità e scelta del percorso, non diventare effetti fini a sé stessi.

Prima dell'art direction definitiva, preparare wireframe separati per: home con doppio ingresso, pagina indice servizi, dettaglio servizio, indice progetti, caso studio, pagina collaborazioni e contatto. Validare prima contenuti e priorità, poi confrontare una variante più scura e una con superfici chiare/viola usando gli stessi contenuti e le stesse CTA.
