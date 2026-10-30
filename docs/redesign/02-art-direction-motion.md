# Art direction e motion design

Proposta di direzione per il redesign di Andrea Vannetti, da usare come base per wireframe e prototipo interattivo. Non è una UI definitiva: copy, intensità del motion, proporzioni cromatiche e modalità di collaborazione restano da validare.

Il riferimento qualitativo è la sperimentazione editoriale dei portfolio premiati e pubblicati su Awwwards: ritmo, personalità e uso intenzionale del browser come spazio narrativo. Non si replica un sito o un effetto specifico.

## 1. Concept creativo e principi dell'identità

### Concept: «Oltre la superficie» come metodo di lettura

**[Ipotesi creativa]** La home si comporta come una sequenza di livelli di un progetto digitale. In superficie si vede il risultato; scorrendo si incontrano contesto, decisioni, sviluppo e relazione. La metafora non deve diventare un finto terminale o una simulazione tecnica: usa screenshot e dettagli autentici del lavoro di Andrea, e mostra codice solo quando è pertinente e verificabile.

«Oltre la superficie» è già il titolo della hero italiana, ma non viene assunto come copy definitivo. Può diventare una regola di composizione: superfici nere e chiare, maschere tipografiche, sovrapposizione tra testo e interfaccia reale, aperture che rivelano il livello successivo.

La riconoscibilità non deve dipendere dal ritratto o dal nome in grande. Deve rimanere anche in una schermata senza fotografia: logo originale, Clash Display, nero/lime, sintassi `</ >`, griglia editoriale, annotazioni Fira Code e transizioni nette. La hero dovrà comunque comunicare subito ruolo, servizi, pubblico e valore; logo e segni identitari accompagnano una descrizione comprensibile, non la sostituiscono.

### Principi di composizione

1. **Tipografia come struttura.** Titoli grandi organizzano colonne, tagli e ritmo; non sono decorazioni sovrapposte a una griglia di card.
2. **Contrasto netto.** Nero, lime, viola profondo e avorio tecnico; forme e cambi colore decisi, bordi visibili e poche superfici per schermata. Niente gradienti morbidi, pastelli o verde bosco.
3. **Prova prima dell'effetto.** Screenshot, interfacce, mappe, tracce e pagine reali hanno priorità su mockup astratti e stock.
4. **Motion con funzione.** Ogni trasformazione spiega una relazione: il titolo apre due percorsi, un frame mostra una decisione, la preview diventa un progetto concluso.
5. **Percorsi sempre disponibili.** Le CTA per clienti e collaborazioni sono raggiungibili da menu e hero senza scroll, pin o attese.
6. **Contenuto prima dell'animazione.** Testi e link esistono nel flusso semantico anche senza motion o JavaScript.

## 2. Sistema cromatico e tipografico

### Palette di lavoro

| Token proposto | Valore | Uso da esplorare | Stato |
|---|---|---|---|
| Nero | `#0A0A0A` | Hero, frame di progetto, navigazione, sezioni di contrasto. | Identità confermata e già presente. |
| Lime | `#95E600` | CTA primarie, marker, selezioni, numerazione e dettagli di codice. Usarlo con disciplina, non come riempimento universale. | Identità confermata e già presente. |
| Viola profondo | `#55227F` | Momento collaborazioni o passaggio tra due pubblici; campitura piena o blocco tipografico. Limitare la sua funzione a un accento riconoscibile. | Colore richiesto da esplorare. |
| Avorio tecnico | `#E9E9E4` | Superfici editoriali per casi studio, sezioni di lettura e materiali di progetto. Testo scuro e lime/viola vanno testati su questa superficie. | Colore richiesto da esplorare. |
| Testo chiaro/scuro | Da definire per token semantici | Testo principale, secondario, disabilitato e bordi su ogni superficie. | Da verificare con contrasto reale. |

**Regola di alternanza proposta:** evitare che tutto il sito sia nero. Costruire sequenze per contrasto — per esempio hero nero, editoriale chiaro, caso studio nero, servizi chiari, collaborazione viola/nero — dopo aver testato ritmo e leggibilità nei wireframe. Non alternare i colori con uno schema meccanico se il contenuto richiede continuità.

Nero/lime e i font nominati sono già presenti nel progetto. `#55227F` e `#E9E9E4` sono nuove ipotesi. Evitare di portare automaticamente nel nuovo sistema il grigio dim attuale: il contrasto va misurato per ciascuna combinazione, soprattutto per microtipografia e testo piccolo.

### Tipografia

- **Clash Display**: titoli editoriali, parole-sezione, numeri e dichiarazioni. Conserva il carattere riconoscibile dell'attuale sito.
- **Space Grotesk**: paragrafi, CTA e interfaccia leggibile.
- **Fira Code**: coordinate, stati, annotazioni, indici e frammenti tecnici.

**[Ipotesi]** Usare tre scale espressive: parola-monumento (titolo o nome del progetto), testo di lettura (sottotitolo e narrazione) e microtipo tecnica (ruolo, numero, stato, coordinate). Creare contrasti di dimensione e allineamento con composizione a griglia, senza ridurre il corpo descrittivo a una didascalia.

Le maschere tipografiche devono rivelare o cambiare contenuto senza rimuovere il titolo accessibile. Su mobile i titoli possono andare a capo e ridurre la scala; non devono dipendere da una singola riga larga quanto il desktop.

## 3. Linguaggio visivo tech

### Elementi da usare

- **Coordinate e metadata reali:** `01 / 06`, nome progetto, stato live/in sviluppo, ruolo o stack, solo quando il dato è confermato.
- **Sintassi come punteggiatura:** tag e parentesi (`<project>`, `</process>`, `// note`) come segni editoriali. Usarli per orientare o etichettare, non per simulare un'interfaccia terminale.
- **Griglia visibile:** linee sottili, colonne numerate, margini e baselines che possono interrompersi o slittare durante il passaggio tra sezioni.
- **Finestre di progetto:** screenshot autentici dentro frame netti, con bordi, titolo finestra e stato. Il frame è una cornice di lettura, non una falsa app interattiva.
- **Preview di sviluppo:** mostrare una preview consultabile solo se esiste un artefatto pubblico o uno screenshot autorizzato. Non esporre URL privati, credenziali, dati o progetti riservati.
- **Immagini full-bleed:** espandere un'immagine reale per dare peso al progetto; mantenere testo e comandi di navigazione fuori dall'area che può essere ritagliata.
- **Segni di processo:** mappa Leaflet, GPX, struttura CMS, stati di revisione o frammenti Figma/codice solo quando documentano una scelta reale e Andrea ne autorizza la pubblicazione.

### Elementi da evitare

- Codice casuale, log di sistema finti, cursori lampeggianti senza significato e griglie HUD generiche.
- Immagini stock di scrivanie, laptop, persone o paesaggi non appartenenti ai progetti.
- Mockup che suggeriscono risultati o funzionalità non presenti nei siti reali.
- Effetti blur/glow usati come scorciatoia visiva, gradienti morbidi e superfici pastello.

**[Ipotesi]** La firma visiva può essere una «finestra editoriale»: una grande area di testo o screenshot incorniciata da coordinate e annotazioni tecniche, con bordi che diventano guide di lettura nel passaggio successivo. Il pattern va verificato con contenuti veri prima di renderlo ricorrente.

## 4. Motion storyboard della homepage

Storyboard proposto in sette momenti. Il normale scroll verticale resta la navigazione principale; pin e trasformazioni sono progressive enhancement. Le CTA restano presenti e utilizzabili senza attendere una sequenza.

### 0. Navigazione persistente — orientarsi in ogni momento

- **Obiettivo e messaggio:** mantenere visibili identità, sezioni e due ingressi di conversione.
- **Contenuto disponibile:** logo, route Progetti/Servizi/Chi sono/Contatti, selettore IT/EN, CTA contatto. La voce Collaborazioni è nuova.
- **Composizione:** fascia essenziale con logo a sinistra, indice centrale e CTA separate per cliente e collaborazione; menu mobile esplicito.
- **Stato iniziale:** logo e navigazione sono subito leggibili sul fondo della hero; niente intro a schermo pieno.
- **Durante lo scroll:** la fascia può diventare più compatta e passare da trasparente a nero pieno con bordo netto; transizione breve e non dipendente da blur esteso.
- **Stato finale/transizione:** resta una barra stabile mentre la griglia editoriale scorre sotto.
- **Hover/click:** sottolineatura o marker lime; click naviga direttamente, senza attesa di animazioni.
- **CTA:** link persistenti «Progetto» e «Collaborazione»; etichette da approvare.
- **Mobile:** menu disclosure a schermo intero o pannello, con link, lingua e gli stessi due ingressi.
- **Accessibilità/performance/reduced motion:** focus visibile, `aria-expanded` e `aria-controls`; Escape chiude, focus gestito e ripristinato; transizioni ridotte o rimosse con `prefers-reduced-motion`.

### 1. Hero — dichiarare subito cosa fa Andrea

- **Obiettivo UX e messaggio:** identificare immediatamente web designer/developer, servizi, pubblici e valore del rapporto diretto. Il claim finale non è deciso.
- **Contenuto realmente disponibile:** titolo attuale «Oltre la superficie», sottotitolo su idee/progetti web e affiancamento dal wireframe al lancio; badge di disponibilità esistente da riconfermare; CTA a progetti e contatti.
- **Composizione editoriale:** fondo nero; grande titolo Clash Display disposto su due piani, con una parola che può essere mascherata da una fascia lime. Riga descrittiva breve in Space Grotesk e microtipo Fira Code per ruolo/stato. Logo originale come segno di firma; foto non necessaria.
- **Stato iniziale:** titolo, descrizione e due CTA sono già presenti nel primo frame, leggibili senza animazione. Una maschera può iniziare in posizione aperta o completarsi rapidamente senza occultare la semantica.
- **Durante lo scroll:** il titolo si scinde in due assi tipografici; una linea/parentesi lime scende e diventa l'indice dei due percorsi. Parallax molto contenuto e solo decorativo; la lettura non viene rallentata.
- **Stato finale/transizione:** le due parole o colonne diventano due ingressi distinti — progetto cliente e collaborazione professionale — che introducono il momento successivo.
- **Hover/click:** CTA con inversione netta di fondo/testo o marker che si sposta; target minimo comodo, stato hover non necessario per capire il link.
- **CTA:** due link espliciti e non ambigui. Esempi provvisori: «Ho un progetto» e «Cerco un partner di sviluppo».
- **Mobile:** titolo su righe multiple, descrizione sopra le CTA, CTA una sotto l'altra o affiancate se c'è spazio; nessun testo orizzontale troncato.
- **Accessibilità/performance/reduced motion:** contenuto SSR e ordine semantico; evitare animazioni lettera per lettera obbligatorie; motion ridotto mostra il frame finale. Il titolo non deve usare solo testo CSS mascherato o essere duplicato agli screen reader.

### 2. Biforcazione — scegliere il contesto

- **Obiettivo UX e messaggio:** far capire che Andrea lavora con clienti finali e con altri professionisti, senza mischiare promesse e prove.
- **Contenuto realmente disponibile:** percorso clienti supportato da PMI/professionisti e dai servizi esistenti; la collaborazione con agenzie è un pubblico definito nel brief, ma modalità, capacità e condizioni non sono ancora documentate.
- **Composizione editoriale:** due campi tipografici asimmetrici che proseguono il gesto della hero. Campo cliente nero/avorio; campo collaborazione può introdurre il viola profondo. I campi sono due destinazioni, non card ripetute.
- **Stato iniziale:** due titoli, brevi descrizioni e link visibili nel flusso.
- **Durante lo scroll:** una regola verticale si apre in due binari; il contenuto del binario selezionato può aumentare di scala mentre l'altro resta leggibile. Nessun percorso collassa o sparisce.
- **Stato finale/transizione:** il binario cliente porta alla prova di progetto; quello professionale può portare a una banda/capitolo collaborazioni più avanti nella home e alla relativa pagina.
- **Hover/click:** hover aumenta contrasto e sposta leggermente il marker; click segue link semantico. Il focus tastiera produce lo stesso feedback.
- **CTA:** «Vedi i progetti»/«Scopri i servizi»; «Parliamo di collaborazione» è ipotesi e richiede contenuto validato.
- **Mobile:** presentazione verticale dei due ingressi con descrizioni complete e link sempre visibili; vietato affidarsi al drag o all'hover.
- **Accessibilità/performance/reduced motion:** mantenere un normale elenco di link; selezione non solo cromatica; motion ridotto elimina lo sdoppiamento animato, ma conserva i due percorsi.

### 3. Caso studio in evidenza — dal risultato alla decisione

- **Obiettivo UX e messaggio:** dare una prova concreta del modo di affrontare problemi reali.
- **Contenuto realmente disponibile:** Radici in Chianti; associazione che promuove il territorio, mappa Leaflet con clustering e filtri, eventi, partner, percorsi e tracce GPX; stack e screenshot disponibili. Non ci sono metriche di impatto documentate.
- **Composizione editoriale:** titolo grande a sinistra, immagine autentica a destra dentro una finestra tecnica; sotto o a margine, indice «contesto / sfida / scelte» e note Fira Code. Evitare di dichiarare un esito commerciale assente.
- **Stato iniziale:** immagine in scala editoriale, titolo e contesto già leggibili; label «Progetto in evidenza» e stato solo se aggiornati.
- **Durante lo scroll:** immagine si espande verso il bordo della viewport. Il frame si apre in una composizione ampia; a lato scorrono contesto e sfida della mappa. Piccoli marker possono evidenziare filtri, clustering o GPX nello screenshot, senza creare controlli che simulino funzionalità non dimostrate.
- **Stato finale/transizione:** l'immagine torna a una cornice più stretta; il bordo si trasforma in una riga/griglia che introduce gli altri lavori.
- **Hover/click:** hover su area cliccabile mostra label/link; screenshot non interattivo non deve sembrare un pulsante. Click apre la pagina caso studio quando esisterà; il link live resta separato.
- **CTA:** «Apri il caso studio» solo dopo aver costruito la pagina; altrimenti «Vedi il progetto» porta all'URL live o all'indice attuale.
- **Mobile:** immagine in aspect ratio leggibile prima della narrazione; testo poi in colonna, senza pin; i dettagli essenziali non sono nascosti in hotspot.
- **Accessibilità/performance/reduced motion:** immagine con alt descrittivo; caricamento dimensionato e progressivo; una sola immagine grande prioritaria per viewport; pin/scale disattivati in reduced motion e fallback statico completo.

### 4. Indice dei progetti — una sequenza, non una griglia uniforme

- **Obiettivo UX e messaggio:** far confrontare contesti, contributi e stato dei lavori.
- **Contenuto realmente disponibile:** oltre a Radici: Succulentarte, Casanova di Bricciano, Cresta dell'Angiolo, Cantinetta del Chianti, Glam Events in Tuscany e TecnoChianti; alcune immagini, URL, stack e stati live/in sviluppo. Glam è indicato come lavoro SEO/GEO.
- **Composizione editoriale:** successione di tavole con scale e rapporti diversi — screenshot ampio, titolo laterale, numero e tipo di contributo. Non tutte le voci hanno lo stesso livello di dettaglio; separare esplicitamente lavori live e in sviluppo.
- **Stato iniziale:** prima tavola parzialmente visibile e indice dei lavori consultabile; preferire una lista/indice testuale a uno slider chiuso.
- **Durante lo scroll:** ogni immagine può passare da crop a frame largo; il suo bordo guida all'immagine successiva. Lo scroll cambia la composizione, non blocca il lettore per più viewport.
- **Stato finale/transizione:** ultimo lavoro si ritrae in un indice compatto che apre metodo e servizi.
- **Hover/click:** focus/hover rivela titolo, ruolo e link; su touch questi dettagli sono già visibili. Filtri per tipo solo se le categorie sono verificate e utili.
- **CTA:** «Tutti i progetti» e link contestuale a un caso studio.
- **Mobile:** tavole verticali e immagini non oltre la larghezza viewport; nessuna galleria obbligata a trascinamento orizzontale.
- **Accessibilità/performance/reduced motion:** alt e label degli stati; lazy loading sotto la piega; poster statici e dimensioni stabili per evitare layout shift; transizioni ridotte a tagli/variazioni di bordo.

### 5. Servizi — scegliere attraverso un indice editoriale

- **Obiettivo UX e messaggio:** collegare un problema a un servizio e a un primo passo.
- **Contenuto realmente disponibile:** sei aree — sviluppo web, WordPress, e-commerce, SEO/performance, UI/UX e consulenza digitale — con descrizioni e feature list. I testi includono affermazioni su velocità, tempi e prezzo da verificare.
- **Composizione editoriale:** indice verticale a numeri grandi e voci tipografiche; una voce attiva apre a fianco una fascia di descrizione e inclusioni. Alternativa: sequenza editoriale a due colonne con la parola-servizio grande e note contestuali, non sei card uguali.
- **Stato iniziale:** tutte le voci sono titoli/link leggibili, la prima selezione ha contenuto visibile anche senza JS.
- **Durante lo scroll:** il numero di sezione resta come marker; il titolo attivo cambia quando entra nella zona di lettura. Su desktop si può usare uno sticky breve, non una sequenza orizzontale di sei pannelli.
- **Stato finale/transizione:** la lista si ricompone in una singola riga di indice, che diventa la timeline del metodo.
- **Hover/click:** hover sottolinea la voce; click o Invio apre il dettaglio o aggiorna la regione associata. Se si usa un tab pattern, rispettare tastiera e ARIA; se è navigazione, usare link normali.
- **CTA:** «Approfondisci» per il servizio selezionato e «Raccontami cosa ti serve» verso il contatto.
- **Mobile:** lista verticale con disclosure/accordion nativo o link alle pagine; contenuti non esclusi dal rendering iniziale. Nessun pin lungo.
- **Accessibilità/performance/reduced motion:** stati attivi non solo lime; annuncio accessibile degli aggiornamenti dinamici; contenuto leggibile se lo script non parte. Reduced motion disattiva sticky trasformativo.

### 6. Metodo e preview — rendere visibile il rapporto

- **Obiettivo UX e messaggio:** dimostrare confronto diretto, feedback e visibilità durante lo sviluppo.
- **Contenuto realmente disponibile:** sei fasi già descritte: primo contatto, analisi/proposta, design/prototipi, sviluppo con anteprime regolari, lancio/formazione, supporto post-lancio. Il brief conferma che il cliente può seguire lo sviluppo tramite preview; dettagli e strumenti non sono definiti.
- **Composizione editoriale:** una linea di processo che alterna testo e una finestra preview autentica/sanitizzata. La finestra può mostrare lo stesso artefatto in tre stati autorizzati — struttura, revisione, risultato — solo se esistono immagini che documentano davvero le fasi.
- **Stato iniziale:** primo passo e timeline sono leggibili come contenuto ordinario; preview non necessaria per capire il processo.
- **Durante lo scroll:** marker lime avanza lungo la linea; la finestra cambia crop o stato al cambio di fase, collegando «wireframe» a «preview» e «preview» a «live». Nessun progress bar deve suggerire avanzamento reale di un progetto corrente.
- **Stato finale/transizione:** l'ultimo frame diventa un link a un caso studio o si apre in una finestra ampia, poi si richiude come bordo del capitolo collaborazioni.
- **Hover/click:** eventuali controlli «prima/dopo» o stati sono azionabili anche da tastiera e hanno etichette. Non simulare un accesso a preview privata.
- **CTA:** «Parliamo del tuo progetto»; per i professionisti, invito distinto verso il percorso collaborazione.
- **Mobile:** fasi in colonna; preview in immagine statica; no timeline orizzontale o pin che trattengano lo scroll.
- **Accessibilità/performance/reduced motion:** fasi marcate con titoli/ordine, non solo progress; immagini responsive e autorizzate; stato finale statico per reduced motion; nessun contenuto essenziale in tooltip.

### 7. Collaborazioni — cambio di registro

- **Obiettivo UX e messaggio:** creare un momento immediatamente riconoscibile per agenzie, studi e freelance.
- **Contenuto realmente disponibile:** il pubblico è definito dalla strategia; il repository non descrive modalità, disponibilità, tariffe o casi di collaborazione. Non affermarle.
- **Composizione editoriale:** passaggio netto a viola profondo `#55227F` o a una superficie chiara con accento viola; grande parola/indice in Clash e nota tecnica in Fira Code. A fianco, uno screenshot di progetto o un dettaglio di implementazione che mostri lavoro reale e autorizzato.
- **Stato iniziale:** CTA e intestazione del percorso sono già presenti nel flusso e nel menu; il colore distintivo non è l'unico indicatore del pubblico.
- **Durante lo scroll:** la griglia si divide in due colonne — «interfaccia» e «implementazione» — che si ricongiungono su una preview; il gesto comunica collaborazione, non attribuisce a Andrea servizi non confermati.
- **Stato finale/transizione:** l'accento viola rientra in un bordo/marker, riportando a una CTA finale comune o a contatti distinti.
- **Hover/click:** link e CTA hanno affordance immediata e focus equivalente; eventuale rivelazione dei dettagli non richiede hover.
- **CTA:** «Parliamo di una collaborazione» verso pagina/form dedicati, dopo aver verificato le modalità effettive.
- **Mobile:** blocco verticale in superficie contrastante; contenuti e CTA visibili senza animazione di divisione; evitare sezione viola full-screen obbligatoria.
- **Accessibilità/performance/reduced motion:** contrasto del viola e dei link da validare; non codificare la distinzione solo col colore; ridurre spostamenti e mantenere la navigazione diretta.

### 8. Chiusura — conversione senza ostacoli

- **Obiettivo UX e messaggio:** far compiere un'azione coerente con il percorso scelto.
- **Contenuto realmente disponibile:** CTA generale, link diretti, form, email/telefono/WhatsApp e Calendly; promessa di risposta entro 24 ore presente nei testi e da confermare.
- **Composizione editoriale:** titolo breve su fondo che riprende il primo frame; la linea o parentesi iniziata nella hero si chiude accanto alle due CTA. Nessuna animazione deve coprire i controlli.
- **Stato iniziale:** contenuto e CTA sono nel normale flusso; ancore da navigazione possono raggiungerli direttamente.
- **Durante lo scroll:** elemento grafico si stabilizza; nessun pin o countdown prima della CTA.
- **Stato finale/transizione:** click porta a contatto con contesto/servizio preselezionato solo se non include dati personali in URL; il form annuncia esito e conserva alternative di contatto.
- **Hover/click:** affordance netta; link esterni etichettati e comportamento coerente.
- **CTA:** una per percorso: progetto cliente e collaborazione professionale.
- **Mobile:** CTA grandi, disposte in colonna, raggiungibili senza scroll supplementare dopo il titolo.
- **Accessibilità/performance/reduced motion:** focus dopo navigazione interna gestito correttamente; stato del form annunciato; nessun contenuto promozionale che impedisca l'azione.

## 5. Pattern di interazione riutilizzabili

| Pattern | Uso | Comportamento base e fallback |
|---|---|---|
| Maschera tipografica | Hero e aperture di capitolo. | Una fascia rivela o ritaglia il titolo; testo resta nel DOM e leggibile senza animazione. |
| Bordo che diventa griglia | Transizioni tra hero, progetto e indice. | Una linea lime cresce/si sposta e diventa guida; fallback: divisore statico. |
| Frame che si espande | Screenshot di progetto o preview. | Scala/crop graduale; click separato per aprire il progetto; fallback: immagine statica con didascalia. |
| Indice editoriale attivo | Servizi e fasi di lavoro. | Marker segue la sezione; voci sono link o controlli semanticamente appropriati, con gestione tastiera. |
| Cambio di superficie | Passaggio da progetto a collaborazione. | Taglio netto tra nero, avorio e viola; fallback cromatico statico, nessun crossfade necessario. |
| Menu disclosure | Navigazione mobile. | Apertura/chiusura, Escape, focus visibile e ripristinato; navigazione accessibile anche senza animazione. |
| Preview annotata | Metodo e casi studio. | Annotazioni collegate a dettagli autentici; nessun hotspot obbligatorio e nessun dato riservato. |

Evitare componenti «magnetici» che spostano il puntatore, hover-only, scroll hijacking, autoplay video non controllabile e slider senza controlli da tastiera.

## 6. Comportamento desktop e mobile

### Desktop

- Usare griglia editoriale e margini larghi; sfruttare pin soltanto in momenti brevi e con contenuto che resta comprensibile fuori dal pin.
- Le espansioni full-screen devono conservare un'uscita visibile e non nascondere testo o navigazione.
- Limitare il numero di sequenze pinned: proposta iniziale **una o due al massimo** nella home, da validare con prototipo e contenuti reali.
- Il normale scroll resta verticale e nativo; nessun obbligo di wheel orizzontale per leggere progetti o servizi.

### Mobile e tablet

- Ridurre composizione e trasformazione, non contenuti o gerarchia. Stessa informazione, ordine lineare e CTA equivalenti.
- Disattivare pin complessi e trasformare gli step in blocchi verticali. Non usare `window.innerWidth` come unica fonte per decisioni strutturali senza fallback SSR.
- Titoli, frame e superfici devono adattarsi a viewport stretta e landscape; controllare zoom, text reflow, safe area e tastiera virtuale nel form.
- Evitare overflow orizzontale reale: verificare `vw`, parole monumentali, trasformazioni e cornici. `overflow-x: hidden` non è una correzione per elementi che escono dalla viewport.
- Touch non ha hover: label e azioni importanti sono visibili o attivabili con tap; target comodi e distanza sufficiente.

## 7. Strategia tecnica per le animazioni

### Framer Motion: scelta iniziale

Framer Motion è già installato e usato per reveal, menu, parallax e scroll-linked animation. È adeguato per transizioni di componenti, stato menu, immagini, maschere semplici e `useScroll` circoscritto. La prima iterazione dovrebbe restare su questa libreria per evitare doppio runtime e coordinamento superfluo.

### GSAP e ScrollTrigger: uso selettivo, non predefinito

GSAP con ScrollTrigger può offrire un vantaggio se il prototipo richiede timeline scrubbed sincronizzate tra molti elementi, pinning lungo o sequenze narrative con entrata/uscita precisa. Non è necessario aggiungerlo solo per avere effetti di scroll.

Se il prototipo dimostra un caso che Framer gestisce male, valutare un singolo esperimento con GSAP, senza installare in questa fase:

- istanziare nel client, isolare l'integrazione e fare cleanup/revert al cambio route/unmount;
- non animare lo stesso elemento sia con Framer sia con GSAP;
- usare `gsap.matchMedia()` per breakpoint e riduzione del motion;
- ricalcolare trigger dopo font/immagini e contenuti che cambiano altezza;
- testare pin, `pinSpacing`, viewport mobile, orientamento e scroll restoration;
- mantenere fallback di flusso senza pin.

### Smooth scroll, App Router e i18n

- La base corrente ha `scroll-behavior: smooth`; non aggiungere subito un motore di smooth scrolling. ScrollTrigger deve osservare lo scroll nativo. Verificare ancore, `scrollIntoView`, focus e ripristino scroll.
- Evitare di combinare smooth scrolling custom, `scroll-behavior: smooth` e pin: può produrre desincronizzazione, ritardi o salti, specialmente su mobile.
- Con navigazione localizzata client-side, chiudere menu, rimuovere trigger e aggiornare posizione/observer quando cambia pathname o lingua. Le route devono restare normali link Next/next-intl.
- Animazioni e client components non devono diventare requisito per il rendering del contenuto: il server consegna testo, immagini e CTA; l'animazione migliora progressivamente il frame.

### Caricamento e stabilità

- Dimensionare gli asset, usare immagini responsive e lazy loading sotto la piega; assegnare proporzioni per evitare layout shift. Caricare in priorità solo l'asset principale visibile.
- Preferire trasformazioni `transform`/`opacity`; limitare blur, ombre enormi, filtri e compositing permanente su mobile.
- Attendere font e dimensioni media prima di calcolare pin; non basare timeline su altezza hardcoded che cambia con localizzazione o testo.
- Verificare build static/prerender, hydration e navigazione diretta per entrambi i locali; evitare accesso a `window` durante render server.

## 8. Rischi UX, accessibilità e performance

### Rischi e contromisure da portare nei prototipi

- **Intro che ritarda le conversioni:** CTA sempre nella hero e nel menu; nessun preloader o sequenza obbligatoria.
- **Pin che intrappola o disorienta:** durata breve, avanzamento naturale, nessun horizontal scroll obbligato; fallback verticale e test con tastiera.
- **Contenuto nascosto dalla motion:** testo server-rendered e visibile come default; observer aggiunge movimento, non rende disponibile il contenuto.
- **Reduced motion assente:** `prefers-reduced-motion` come requisito di progetto; ridurre parallax, pin, loop, zoom e scroll-linked effects, mostrando lo stato finale.
- **Tastiera e focus:** skip link, focus-visible, ordine semantico, menu apribile/chiudibile, Escape e ritorno del focus; non spostare focus durante lo scroll.
- **Contrasto cromatico:** testare lime/viola/avorio/nero per testo normale, grande, bordi e stati; non comunicare stato o percorso solo col colore.
- **Overflow:** titoli mascherati, viewport unit e scale possono uscire lateralmente; testare a 320 CSS px, zoom 200%, landscape e con stringhe inglesi più lunghe.
- **Performance mobile:** evitare molte immagini full-resolution simultanee, animazioni di layout costose e grandi superfici blur. Le immagini esistenti includono asset oltre 1 MB; preparare crop/dimensioni per le tavole selezionate.
- **Privacy dei clienti:** preview e screenshot devono essere pubblici o autorizzati; rimuovere dati personali, staging URL e credenziali.
- **Affidabilità SSR/idratazione:** layout e selezione responsive devono essere stabili prima dell'hydration; non usare stati client per decidere se il contenuto fondamentale esiste.
- **CTA doppie poco chiare:** i due pubblici devono distinguersi con testo, destinazione e contesto, senza obbligare l'utente a interpretare una metafora visiva.

### Criteri minimi di accettazione del prototipo

1. Si possono raggiungere richiesta progetto e collaborazione da tastiera e dal primo viewport.
2. Tutti i contenuti si leggono con motion disattivato e con JavaScript non disponibile.
3. Nessuna sezione richiede swipe orizzontale o hover per scoprire testo essenziale.
4. In `prefers-reduced-motion: reduce`, non ci sono parallax, loop o pin narrativi; le transizioni non essenziali diventano immediate.
5. Navigazione tra `/` e `/en` non lascia overlay o trigger attivi e mantiene contenuti/CTA corretti.
6. Non si osservano overflow orizzontali, layout shift significativo o immagini di progetto sfocate/usate senza permesso.

## 9. Elementi da validare

1. Quale descrizione immediata di Andrea (ruolo + servizi + pubblici + valore) è accurata e prioritaria? Il claim «Oltre la superficie» resta, cambia o diventa solo filo visivo?
2. Le due CTA e i nomi dei percorsi sono chiari ai clienti e ai partner senza spiegazione a voce?
3. Quali progetti hanno screenshot, preview di sviluppo, wireframe o dettagli di codice pubblicabili e autorizzati?
4. Si possono documentare le fasi del processo e rendere visibile una preview reale senza esporre ambienti riservati?
5. Qual è il ruolo reale di Andrea in ciascun progetto e quali scelte può raccontare in prima persona?
6. Quali modalità di collaborazione professionale sono effettivamente offerte? Quali prove/portfolio sono pertinenti?
7. Quanta parte della home può essere pinned prima che la narrazione diventi faticosa? Il movimento migliora comprensione e contatto?
8. Viola e avorio funzionano come capitoli distinti o devono rimanere accenti? Verificare palette, contrasto e associazioni di brand.
9. L'esperienza deve riconoscersi anche senza fotografia e senza nome in hero: quali dimensioni di logo e segni tipografici lo garantiscono?
10. Quali utenti, dispositivi e condizioni di rete usare per testare mobile, reduced motion, tastiera e caricamento immagini?
11. Framer Motion basta per il motion storyboard? Solo un test con timeline/pin complessi può giustificare GSAP.
12. Quali eventi di conversione per percorso sono autorizzati e come si coordinano con consenso e tag attuali?

## 10. Primo esperimento interattivo consigliato

### Hero → doppio percorso → primo progetto

**[Ipotesi di prototipo]** Realizzare per primo un esperimento limitato a tre momenti: hero, scelta pubblico, apertura di Radici in Chianti. È il tratto che verifica insieme identità, chiarezza delle due CTA e potenziale dello scroll storytelling senza progettare tutto il sito.

**Comportamento desktop:** il primo frame mostra ruolo, descrizione, logo e due CTA. Scorrendo, il titolo si apre lungo una parentesi lime; la parentesi diventa due binari con ingressi cliente/collaborazione. Nessun binario è obbligatorio: i link funzionano subito. Proseguendo, il binario cliente conduce a un'immagine autentica di Radici che si espande nel viewport e lascia emergere le note verificate su mappa, filtri e GPX. Il bordo dell'immagine si ricompone in una guida per l'indice progetti.

**Comportamento mobile/reduced motion:** stessa sequenza semantica in colonna; titolo statico o reveal immediato; due link sempre visibili; immagine Radici in frame verticale/ampio senza pin. L'animazione completa è un miglioramento, non una condizione di accesso.

**Dati da usare:** testi attuali della hero come materiale provvisorio, ruolo e promessa da riscrivere solo dopo approvazione; asset Radici già presenti; dettagli di sfida e funzionalità nei JSON IT/EN. Nessuna metrica o testimonianza.

**Cosa valutare nel test:**

- Entro il primo viewport le persone sanno dire cosa fa Andrea e quale CTA scegliere?
- Clienti e professionisti trovano il proprio ingresso senza percorrere la narrazione?
- L'espansione dell'immagine aiuta a leggere il caso o ritarda il passaggio ai dettagli?
- Il prototipo resta chiaro con motion ridotto, su mobile e da tastiera?
- Lo storytelling suggerisce un processo reale senza attribuire risultati non verificati?

**Esito atteso:** decidere intensità e ruolo del motion, disposizione dei due ingressi e formato del primo caso studio. Non approva automaticamente copy, palette finale, GSAP o animazioni delle pagine interne.
