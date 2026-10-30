export function PrivacyIt() {
  return (
    <>
      <h1 className="font-display font-bold text-display-sm mb-8">
        Privacy e <span className="text-primary">Cookie Policy</span>
      </h1>
      <p className="text-sm text-typography-muted mb-12">
        Ultimo aggiornamento: Ottobre 2026
      </p>

      <div className="space-y-10 text-typography/80 leading-relaxed">
        {/* Titolare */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            1. Titolare del trattamento
          </h2>
          <p>
            Andrea Vannetti — Web Developer
            <br />
            Sede legale: Via Alcide de Gasperi, 11 - 53013 Gaiole in Chianti
            (SI), Toscana, Italia
            <br />
            P.IVA: 01631290523
            <br />
            Email:{" "}
            <a
              href="mailto:info@andreavannetti.dev"
              className="text-primary hover:underline"
            >
              info@andreavannetti.dev
            </a>
          </p>
        </div>

        {/* Dati raccolti */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            2. Dati personali raccolti
          </h2>
          <p className="mb-4">
            Il sito raccoglie dati personali nelle seguenti modalità:
          </p>

          <h3 className="font-display font-semibold text-lg text-typography mb-2">
            2.1 Form di contatto
          </h3>
          <p className="mb-4">
            Quando compili il form di contatto, vengono raccolti: nome, cognome,
            indirizzo email, e facoltativamente azienda, numero di telefono,
            indirizzo del sito web esistente e indicazione di budget. Questi
            dati vengono utilizzati esclusivamente per rispondere alla tua
            richiesta e non vengono condivisi con terze parti. I dati vengono
            inviati tramite il servizio Resend (Resend Inc., USA) che agisce
            come responsabile del trattamento per il solo invio dell&apos;email.
          </p>

          <h3 className="font-display font-semibold text-lg text-typography mb-2">
            2.2 Dati di navigazione e pubblicitari
          </h3>
          <p className="mb-2">
            Previo consenso tramite il banner cookie, il sito utilizza il tag
            Google (Google Ireland Limited), che invia dati a due servizi:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-typography">Google Analytics 4</strong>:
              dati aggregati sulla navigazione, come pagine visitate, durata
              della visita, dispositivo e provenienza geografica approssimativa.
              Google Analytics 4 non registra l&apos;indirizzo IP.
            </li>
            <li>
              <strong className="text-typography">Google Ads</strong>: dati
              necessari a misurare le azioni compiute sul sito dopo aver
              cliccato un annuncio (ad esempio l&apos;invio di una richiesta di
              contatto) e a mostrare annunci a chi ha già visitato il sito
              (remarketing).
            </li>
          </ul>
        </div>

        {/* Finalità */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            3. Finalità del trattamento
          </h2>
          <p>
            I dati personali sono trattati per le seguenti finalità: rispondere
            alle richieste inviate tramite il form di contatto; inviare
            un&apos;email di conferma ricezione; analizzare in forma aggregata
            l&apos;utilizzo del sito per migliorarne contenuti e prestazioni;
            misurare l&apos;efficacia delle campagne pubblicitarie su Google
            Ads.
          </p>
        </div>

        {/* Base giuridica */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            4. Base giuridica
          </h2>
          <p>
            Il trattamento dei dati del form di contatto si basa sul consenso
            espresso dall&apos;utente tramite l&apos;apposito checkbox. Il
            trattamento dei dati di navigazione tramite cookie analitici si basa
            sul consenso espresso tramite il banner cookie.
          </p>
        </div>

        {/* Conservazione */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            5. Conservazione dei dati
          </h2>
          <p>
            <p>
              I dati raccolti tramite il form di contatto vengono conservati per
              il tempo necessario a gestire la richiesta e comunque non oltre 12
              mesi. I dati raccolti da Google Analytics vengono conservati per
              un massimo di 14 mesi. I dati di Google Ads vengono conservati
              secondo le policy di Google.
            </p>
          </p>
        </div>

        {/* Cookie */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            6. Cookie
          </h2>

          <h3 className="font-display font-semibold text-lg text-typography mb-2">
            6.1 Strumenti tecnici
          </h3>
          <p className="mb-4">
            Il sito utilizza la memoria locale del browser (localStorage, voce{" "}
            <code className="text-primary text-sm">cookie_consent</code>) per
            ricordare la preferenza espressa dall&apos;utente riguardo ai
            cookie. Questo strumento non richiede consenso in quanto necessario
            al funzionamento del sito.
          </p>

          <h3 className="font-display font-semibold text-lg text-typography mb-2">
            6.2 Cookie di terze parti (analitici e pubblicitari)
          </h3>
          <p className="mb-4">
            Previo consenso, il tag Google (gtag.js) può installare cookie di
            Google Analytics per finalità statistiche e cookie di Google Ads per
            la misurazione delle conversioni e, ove attivo, il remarketing.
            Questi cookie vengono attivati solo dopo che l&apos;utente ha
            espresso il proprio consenso tramite il banner, e il consenso può
            essere revocato in qualsiasi momento.
          </p>

          <h3 className="font-display font-semibold text-lg text-typography mb-2">
            6.3 Come gestire i cookie
          </h3>
          <p>
            Puoi modificare le tue preferenze sui cookie in qualsiasi momento
            cliccando su &quot;Gestisci cookie&quot; nel footer del sito. Puoi
            inoltre configurare il tuo browser per rifiutare tutti i cookie o
            per ricevere un avviso prima che un cookie venga installato.
          </p>
        </div>

        {/* Terze parti */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            7. Servizi di terze parti
          </h2>
          <p className="mb-2">
            Il sito si avvale dei seguenti servizi di terze parti:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-typography">Vercel Inc.</strong> (USA) —
              Hosting del sito web
            </li>
            <li>
              <strong className="text-typography">
                Google Ireland Limited
              </strong>{" "}
              — Google Analytics (statistiche di navigazione) e Google Ads
              (misurazione delle campagne pubblicitarie)
            </li>
            <li>
              <strong className="text-typography">Resend Inc.</strong> (USA) —
              Invio email dal form di contatto
            </li>
            <li>
              <strong className="text-typography">Calendly LLC</strong> (USA) —
              Prenotazione appuntamenti (link esterno, nessun dato raccolto dal
              sito)
            </li>
          </ul>
          <p className="mt-4">
            Alcuni di questi servizi hanno sede negli Stati Uniti. Il
            trasferimento dei dati avviene in conformità al Data Privacy
            Framework UE-USA o, in alternativa, sulla base di clausole
            contrattuali standard approvate dalla Commissione Europea.
          </p>
        </div>

        {/* Diritti */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            8. Diritti dell&apos;utente
          </h2>
          <p className="mb-2">
            Ai sensi del GDPR (Regolamento UE 2016/679), hai il diritto di:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accedere ai tuoi dati personali</li>
            <li>Richiederne la rettifica o la cancellazione</li>
            <li>Opporti al trattamento</li>
            <li>Richiedere la limitazione del trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
          </ul>
          <p className="mt-4">
            Per esercitare questi diritti, scrivi a{" "}
            <a
              href="mailto:info@andreavannetti.dev"
              className="text-primary hover:underline"
            >
              info@andreavannetti.dev
            </a>
            . Hai inoltre il diritto di proporre reclamo al Garante per la
            protezione dei dati personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.garanteprivacy.it
            </a>
            ).
          </p>
        </div>

        {/* Modifiche */}
        <div>
          <h2 className="font-display font-semibold text-xl text-typography mb-4">
            9. Modifiche alla presente policy
          </h2>
          <p>
            Il titolare si riserva il diritto di modificare questa privacy
            policy in qualsiasi momento. Le modifiche saranno pubblicate su
            questa pagina con indicazione della data di ultimo aggiornamento.
          </p>
        </div>
      </div>
    </>
  );
}
