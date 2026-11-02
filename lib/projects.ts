export type ProjectLocale = "it" | "en";

export type ProjectDraft = {
  seoTitle: string;
  seoDescription: string;
  context: string;
  challenge: string;
  approach: string;
  activities: string[];
};

export type LocalizedText = Record<ProjectLocale, string>;

export type ProjectSection =
  | { type: "editorial"; id: string; title: LocalizedText; paragraphs: LocalizedText[] }
  | { type: "image"; id: string; src: string; alt: LocalizedText; layout: "wide" | "split" | "mobile" }
  | {
      type: "palette-typography";
      id: string;
      title: LocalizedText;
      description: LocalizedText;
      colors: { name: LocalizedText; value: string }[];
      typefaces: { name: string; use: LocalizedText }[];
    }
  | { type: "interaction"; id: string; title: LocalizedText; body: LocalizedText; image: string; alt: LocalizedText }
  | { type: "principles"; id: string; title: LocalizedText; items: { title: LocalizedText; body: LocalizedText }[] }
  | { type: "gallery"; id: string; title: LocalizedText; images: { src: string; alt: LocalizedText }[] }
  | { type: "technical"; id: string; title: LocalizedText; items: { title: LocalizedText; body: LocalizedText }[] };

export type RealProjectCaseStudy = {
  intro: LocalizedText;
  information: { label: LocalizedText; value: LocalizedText }[];
  sections: ProjectSection[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  status: "live" | "in-sviluppo";
  featured?: boolean;
  label?: string;
  technologies: string[];
  url?: string;
  github?: string;
  translationKey: string;
  draft: Record<ProjectLocale, ProjectDraft>;
  caseStudy?: RealProjectCaseStudy;
};

/*
 * Story fields in `draft` are editorial placeholders for the six projects
 * without a verified case study. TecnoChianti's `caseStudy` and SEO fields
 * are transcribed from its existing published case study. Replace placeholder
 * copy with verified material before removing noindex from those detail pages.
 * Project names, cover paths, links, statuses, and existing stack data are
 * retained from the archive; TecnoChianti's live status and stack are verified
 * against its published case study.
 */
export const projects: Project[] = [
  {
    id: "radici",
    slug: "radici-in-chianti",
    title: "Radici in Chianti",
    image: "/images/radici.webp",
    status: "live",
    featured: true,
    technologies: ["React", "TypeScript", "WordPress Headless", "Material UI", "Vite"],
    url: "https://www.radicinchianti.org",
    translationKey: "radici",
    draft: {
      it: {
        seoTitle: "Radici in Chianti — case study provvisorio",
        seoDescription: "Anteprima provvisoria del case study Radici in Chianti.",
        context: "Testo provvisorio: questa sezione racconterà il contesto dell’associazione e il ruolo del progetto digitale nella valorizzazione del territorio.",
        challenge: "Testo provvisorio: qui saranno descritte le esigenze verificate, come organizzazione dei contenuti, consultazione degli itinerari e accesso alle informazioni locali.",
        approach: "Testo provvisorio: il racconto finale documenterà le scelte di struttura, interfaccia e integrazione tecnica effettivamente adottate.",
        activities: ["Architettura dei contenuti e delle pagine", "Interfaccia responsive e componenti riutilizzabili", "Integrazione dei contenuti con il CMS"],
      },
      en: {
        seoTitle: "Radici in Chianti — provisional case study",
        seoDescription: "Provisional preview of the Radici in Chianti case study.",
        context: "Placeholder: this section will explain the association’s context and the role of the digital project in presenting the local area.",
        challenge: "Placeholder: verified needs will be documented here, such as content organization, trail discovery, and access to local information.",
        approach: "Placeholder: the final story will document the information architecture, interface, and technical integrations actually delivered.",
        activities: ["Content and page architecture", "Responsive interface and reusable components", "CMS content integration"],
      },
    },
  },
  {
    id: "succulentarte",
    slug: "succulentarte",
    title: "Succulentarte",
    image: "/images/succulentarte.webp",
    status: "live",
    technologies: ["React", "TypeScript", "Vite", "Material UI"],
    url: "https://www.succulentarte.com",
    translationKey: "succulentarte",
    draft: {
      it: {
        seoTitle: "Succulentarte — case study provvisorio",
        seoDescription: "Anteprima provvisoria del case study Succulentarte.",
        context: "Testo provvisorio: il progetto presenta un’attività artigianale in cui le composizioni vegetali sono il fulcro della comunicazione.",
        challenge: "Testo provvisorio: la pagina dovrà dare spazio alle creazioni, rendere semplice la consultazione della galleria e facilitare il contatto.",
        approach: "Testo provvisorio: il case study definitivo descriverà come immagini, gerarchie e percorsi di navigazione sono stati organizzati.",
        activities: ["Presentazione dell’attività e delle creazioni", "Organizzazione della galleria fotografica", "Accesso diretto alle informazioni di contatto"],
      },
      en: {
        seoTitle: "Succulentarte — provisional case study",
        seoDescription: "Provisional preview of the Succulentarte case study.",
        context: "Placeholder: the project presents a craft business whose succulent arrangements are central to its communication.",
        challenge: "Placeholder: the page needs to foreground the work, make the gallery easy to browse, and make contact straightforward.",
        approach: "Placeholder: the final case study will explain how imagery, hierarchy, and navigation were organized.",
        activities: ["Business and work presentation", "Photo gallery organization", "Direct access to contact information"],
      },
    },
  },
  {
    id: "casanova",
    slug: "casanova-di-bricciano",
    title: "Casanova di Bricciano",
    image: "/images/casanova-bricciano.webp",
    status: "live",
    technologies: ["WordPress"],
    url: "https://www.casanovadibricciano.it",
    translationKey: "casanova",
    draft: {
      it: {
        seoTitle: "Casanova di Bricciano — case study provvisorio",
        seoDescription: "Anteprima provvisoria del case study Casanova di Bricciano.",
        context: "Testo provvisorio: il sito racconta una realtà agricola e vinicola legata al paesaggio e all’identità del Chianti Classico.",
        challenge: "Testo provvisorio: il contenuto dovrà rendere comprensibili la storia, l’offerta e le diverse esperienze disponibili in italiano e inglese.",
        approach: "Testo provvisorio: il racconto finale specificherà come sono stati strutturati i contenuti multilingua e i percorsi di visita.",
        activities: ["Organizzazione dei contenuti aziendali", "Struttura per le esperienze e l’ospitalità", "Percorsi di consultazione in due lingue"],
      },
      en: {
        seoTitle: "Casanova di Bricciano — provisional case study",
        seoDescription: "Provisional preview of the Casanova di Bricciano case study.",
        context: "Placeholder: the website tells the story of an agricultural and wine estate rooted in the Chianti Classico landscape.",
        challenge: "Placeholder: the content needs to clarify the estate’s story, offer, and experiences in both Italian and English.",
        approach: "Placeholder: the final story will specify how multilingual content and visitor journeys were structured.",
        activities: ["Business content organization", "Structure for experiences and hospitality", "Browsing paths in two languages"],
      },
    },
  },
  {
    id: "cresta",
    slug: "cresta-dell-angiolo",
    title: "Cresta dell'Angiolo",
    image: null,
    status: "in-sviluppo",
    technologies: ["React", "TypeScript", "WordPress Headless", "Vite"],
    translationKey: "cresta",
    draft: {
      it: {
        seoTitle: "Cresta dell’Angiolo — case study provvisorio",
        seoDescription: "Anteprima provvisoria del case study Cresta dell’Angiolo.",
        context: "Testo provvisorio: il progetto riguarda un itinerario escursionistico sul crinale dei Monti del Chianti.",
        challenge: "Testo provvisorio: chi pianifica il cammino deve trovare con chiarezza tappe, indicazioni logistiche e informazioni sul percorso.",
        approach: "Testo provvisorio: il case study documenterà la relazione tra mappa, tappe e contenuti di approfondimento una volta verificati i materiali.",
        activities: ["Struttura informativa dell’itinerario", "Consultazione di tappe e indicazioni", "Integrazione dei contenuti gestibili"],
      },
      en: {
        seoTitle: "Cresta dell’Angiolo — provisional case study",
        seoDescription: "Provisional preview of the Cresta dell’Angiolo case study.",
        context: "Placeholder: the project concerns a hiking route along the ridge of the Chianti Mountains.",
        challenge: "Placeholder: hikers planning the route need clear access to stages, practical guidance, and route information.",
        approach: "Placeholder: the final case study will document how maps, stages, and supporting content work together once materials are verified.",
        activities: ["Route information structure", "Stage and practical information browsing", "Integration of editable content"],
      },
    },
  },
  {
    id: "cantinetta",
    slug: "la-cantinetta-del-chianti",
    title: "La Cantinetta del Chianti",
    image: "/images/cantinetta.webp",
    status: "live",
    technologies: ["Next.js", "TypeScript", "WordPress Headless", "Material UI"],
    url: "https://www.lacantinettadelchianti.it/it",
    github: "https://github.com/AndreaV89/cantinetta-del-chianti",
    translationKey: "cantinetta",
    draft: {
      it: {
        seoTitle: "La Cantinetta del Chianti — case study provvisorio",
        seoDescription: "Anteprima provvisoria del case study La Cantinetta del Chianti.",
        context: "Testo provvisorio: il progetto digitale presenta un’enoteca storica e il suo catalogo di vini e prodotti del territorio.",
        challenge: "Testo provvisorio: le persone devono esplorare categorie, album fotografici e schede prodotto con una gerarchia chiara.",
        approach: "Testo provvisorio: il racconto finale descriverà il sistema visivo e il collegamento tra CMS e interfaccia una volta verificati i dettagli.",
        activities: ["Struttura per vini e prodotti tipici", "Organizzazione degli album fotografici", "Interfaccia collegata ai contenuti del CMS"],
      },
      en: {
        seoTitle: "La Cantinetta del Chianti — provisional case study",
        seoDescription: "Provisional preview of the La Cantinetta del Chianti case study.",
        context: "Placeholder: the digital project presents a historic wine shop and its selection of wines and local products.",
        challenge: "Placeholder: visitors need to explore categories, photo albums, and product details through a clear hierarchy.",
        approach: "Placeholder: the final story will describe the visual system and CMS-to-interface connection once the details are verified.",
        activities: ["Structure for wines and local products", "Photo album organization", "Interface connected to CMS content"],
      },
    },
  },
  {
    id: "glam",
    slug: "glam-events-in-tuscany",
    title: "Glam Events in Tuscany",
    image: "/images/glamevents.webp",
    status: "live",
    label: "seoGeoOnly",
    technologies: [],
    url: "https://www.glameventsintuscany.com",
    translationKey: "glam",
    draft: {
      it: {
        seoTitle: "Glam Events in Tuscany — case study provvisorio",
        seoDescription: "Anteprima provvisoria del case study SEO e GEO per Glam Events in Tuscany.",
        context: "Testo provvisorio: l’incarico riguarda la visibilità organica di un’agenzia che organizza eventi e matrimoni in Toscana.",
        challenge: "Testo provvisorio: i contenuti devono rispondere con precisione alle ricerche delle coppie e descrivere in modo strutturato i servizi.",
        approach: "Testo provvisorio: il case study definitivo dettaglierà gli interventi SEO e GEO effettivamente svolti, senza attribuire risultati non misurati.",
        activities: ["Revisione della struttura dei contenuti", "Dati strutturati e markup semantico", "Ottimizzazione per la ricerca organica e assistita"],
      },
      en: {
        seoTitle: "Glam Events in Tuscany — provisional case study",
        seoDescription: "Provisional preview of the SEO and GEO case study for Glam Events in Tuscany.",
        context: "Placeholder: the engagement concerns organic visibility for a Tuscany-based wedding and events agency.",
        challenge: "Placeholder: content needs to answer couples’ searches clearly and describe the services in a structured way.",
        approach: "Placeholder: the final case study will detail the SEO and GEO work actually completed, without claiming unmeasured results.",
        activities: ["Content structure review", "Structured data and semantic markup", "Organic and AI-assisted search optimization"],
      },
    },
  },
  {
    id: "tecnochianti",
    slug: "tecnochianti",
    title: "TecnoChianti",
    image: "/images/projects/tecnochianti/home.webp",
    status: "live",
    technologies: ["Next.js 16", "React 19", "TypeScript", "CSS Modules", "Vercel"],
    url: "https://tecnochianti.it",
    translationKey: "tecnochianti",
    draft: {
      it: {
        seoTitle: "TecnoChianti — Sito per studio di architettura in Chianti",
        seoDescription: "Case study del sito per uno studio di architettura del Chianti: tipografia protagonista, colline che diventano disegno e nessun effetto superfluo.",
        context: "Tre professionisti, due architetti e un perito industriale, che progettano edifici privati e recuperano il patrimonio esistente in contesti di pregio paesaggistico.",
        challenge: "Serviva un sito che presentasse i loro lavori con un tono formale e affermato.",
        approach: "Architettura tipografica: fondo color carta, caratteri protagonisti e un solo colore, il terracotta, usato come un timbro.",
        activities: ["Design e sviluppo", "Architettura editoriale e sistema responsive", "Interazioni e approfondimenti tecnici"],
      },
      en: {
        seoTitle: "TecnoChianti — Website for an architecture studio in Chianti",
        seoDescription: "Case study for an architecture studio in Chianti: typography first, hills that turn into drawings, and nothing superfluous.",
        context: "Three professionals, two architects and an industrial engineer, who design private buildings and restore existing heritage in protected landscapes.",
        challenge: "They needed a website that presented their work with a formal, confident tone.",
        approach: "Typographic architecture: a paper-coloured background, type in the lead role and a single colour, terracotta, used like a stamp.",
        activities: ["Design and development", "Editorial architecture and responsive system", "Interactions and technical details"],
      },
    },
    caseStudy: {
      intro: {
        it: "Per uno studio di architettura del Chianti: tipografia protagonista, colline che diventano disegno, nessun effetto superfluo.",
        en: "For an architecture studio in Chianti: typography first, hills that turn into drawings, nothing superfluous.",
      },
      information: [
        { label: { it: "Luogo", en: "Location" }, value: { it: "Radda in Chianti", en: "Radda in Chianti" } },
        { label: { it: "Ruolo", en: "Role" }, value: { it: "Design e sviluppo", en: "Design and development" } },
        { label: { it: "Settore", en: "Sector" }, value: { it: "Architettura", en: "Architecture" } },
        { label: { it: "Stato", en: "Status" }, value: { it: "Online · tecnochianti.it", en: "Online · tecnochianti.it" } },
      ],
      sections: [
        {
          type: "editorial", id: "project", title: { it: "Il progetto", en: "The project" },
          paragraphs: [
            { it: "Tre professionisti, due architetti e un perito industriale, che progettano edifici privati e recuperano il patrimonio esistente in contesti di pregio paesaggistico.", en: "Three professionals, two architects and an industrial engineer, who design private buildings and restore existing heritage in protected landscapes." },
            { it: "Serviva un sito che presentasse i loro lavori con un tono formale e affermato.", en: "They needed a website that presented their work with a formal, confident tone." },
          ],
        },
        { type: "image", id: "manifesto", src: "/images/projects/tecnochianti/manifesto.webp", alt: { it: "Manifesto dello studio nella homepage TecnoChianti", en: "The studio manifesto on the TecnoChianti homepage" }, layout: "split" },
        {
          type: "palette-typography", id: "direction", title: { it: "La direzione", en: "The direction" },
          description: { it: "Architettura tipografica: fondo color carta, caratteri protagonisti e un solo colore, il terracotta, usato come un timbro.", en: "Typographic architecture: a paper-coloured background, type in the lead role and a single colour, terracotta, used like a stamp." },
          colors: [
            { name: { it: "Carta", en: "Paper" }, value: "#F4F2EE" },
            { name: { it: "Terracotta", en: "Terracotta" }, value: "#B5654A" },
          ],
          typefaces: [
            { name: "Saira", use: { it: "Titoli e progetti", en: "Headings and projects" } },
            { name: "Hanken Grotesk", use: { it: "Testi", en: "Body text" } },
          ],
        },
        {
          type: "interaction", id: "landscape", title: { it: "Le colline diventano un disegno", en: "The hills become a drawing" },
          body: { it: "Nella pagina Studio, scorrendo, il video del territorio sfuma in bianco e nero, poi nel colore della carta, e i crinali si tracciano come linee di un progetto architettonico.", en: "On the Studio page, as you scroll, the landscape video fades to black and white, then to paper, and the ridgelines are drawn like the lines of an architectural plan." },
          image: "/images/projects/tecnochianti/studio-lines.webp",
          alt: { it: "I crinali delle colline tracciati come linee di un progetto", en: "Hill ridgelines drawn as architectural plan lines" },
        },
        { type: "image", id: "studio-video", src: "/images/projects/tecnochianti/studio-video.webp", alt: { it: "Pagina Studio con il video del territorio", en: "Studio page with a video of the landscape" }, layout: "wide" },
        {
          type: "editorial", id: "studio-copy", title: { it: "Lo Studio", en: "The studio" },
          paragraphs: [
            {
              it: "TecnoChianti nasce nel 2013 come raggruppamento di professionisti in grado di assicurare una copertura qualificata alla propria committenza, anche grazie alla collaborazione consolidata con partner esterni. Lo studio può così offrire servizi di progettazione architettonica e strutturale per interventi di ogni livello di complessità, oltre che di progettazione impiantistica, con una particolare attenzione al tema della sostenibilità ambientale e della progettazione di edifici a basso consumo energetico.",
              en: "TecnoChianti was founded in 2013 as a group of professionals able to provide clients with qualified coverage, also through established collaboration with external partners. The studio offers architectural and structural design for projects of every level of complexity, as well as building systems design, with particular attention to environmental sustainability and low-energy buildings.",
            },
            {
              it: "Con sede operativa a Radda in Chianti e attivo principalmente tra le province di Siena, Firenze e Arezzo, lo studio estende la propria operatività all'intero territorio regionale e a più ampio raggio.",
              en: "Based in Radda in Chianti and primarily active across the provinces of Siena, Florence, and Arezzo, the studio also works throughout Tuscany and beyond.",
            },
            {
              it: "Progettiamo edifici privati e curiamo il recupero e la valorizzazione del patrimonio edilizio esistente in contesti di pregio paesaggistico.",
              en: "We design private buildings and restore and enhance existing architectural heritage in areas of significant landscape value.",
            },
          ],
        },
        {
          type: "interaction", id: "works", title: { it: "I lavori dello studio", en: "The studio’s work" },
          body: { it: "Foto in bianco e nero che prendono colore al passaggio. Ogni progetto ha una scheda essenziale: luogo, anno, stato, tipologia, categoria, poi descrizione e galleria.", en: "Black and white photos that come into colour on hover. Each project has a concise sheet: location, year, status, type, category, then a description and gallery." },
          image: "/images/projects/tecnochianti/works.webp",
          alt: { it: "Elenco dei lavori dello studio in bianco e nero", en: "The studio’s work index in black and white" },
        },
        {
          type: "principles", id: "not-visible", title: { it: "Quello che non si vede", en: "What you don’t see" },
          items: [
            { title: { it: "In italiano e in inglese", en: "In Italian and English" }, body: { it: "Ogni pagina ha la sua versione inglese, con indirizzi tradotti.", en: "Every page has an English version, with translated URLs." } },
            { title: { it: "Rispetta i visitatori", en: "Respects visitors" }, body: { it: "Nessun tracciamento senza consenso. Privacy e cookie policy verificate da un consulente legale.", en: "No tracking without consent. Privacy and cookie policies reviewed by a legal consultant." } },
            { title: { it: "Pronto per Google", en: "Ready for Google" }, body: { it: "Veloce, accessibile e strutturato per farsi trovare.", en: "Fast, accessible and structured to be found." } },
          ],
        },
        {
          type: "gallery", id: "mobile", title: { it: "Su ogni schermo", en: "On every screen" },
          images: [
            { src: "/images/projects/tecnochianti/mobile-home.webp", alt: { it: "Homepage TecnoChianti su telefono", en: "TecnoChianti homepage on a phone" } },
            { src: "/images/projects/tecnochianti/mobile-project.webp", alt: { it: "Scheda progetto TecnoChianti su telefono", en: "TecnoChianti project page on a phone" } },
          ],
        },
        {
          type: "technical", id: "technical", title: { it: "Per i curiosi: com’è fatto", en: "For the curious: how it’s built" },
          items: [
            { title: { it: "Statico e veloce", en: "Static and fast" }, body: { it: "Next.js 16 con pagine pre-generate, React 19, TypeScript e CSS Modules. Hosting su Vercel.", en: "Next.js 16 with pre-generated pages, React 19, TypeScript and CSS Modules. Hosted on Vercel." } },
            { title: { it: "Dalle colline alle linee", en: "From hills to lines" }, body: { it: "I crinali sono estratti dal primo frame del video con uno script OpenCV, trasformati in tracciati SVG e disegnati durante lo scroll. L’animazione resta fluida anche su Safari.", en: "The ridgelines are extracted from the video’s first frame with an OpenCV script, turned into SVG paths and drawn on scroll. The animation stays smooth on Safari too." } },
            { title: { it: "Parole che si colorano", en: "Words that fill with colour" }, body: { it: "Il testo di presentazione dello studio si riempie di colore parola per parola durante lo scroll.", en: "The studio introduction fills with colour word by word as you scroll." } },
            { title: { it: "Transizioni di pagina", en: "Page transitions" }, body: { it: "Al clic, un pannello scuro con il logo sale, la pagina cambia sotto e il pannello esce verso l’alto. Funziona anche al cambio lingua, quando la pagina si ricarica.", en: "On click, a dark panel with the logo rises, the page changes underneath, and the panel exits upwards. It works on language switch too, when the page reloads." } },
            { title: { it: "Due lingue", en: "Two languages" }, body: { it: "URL tradotti (/lavori ↔ /en/works), hreflang e lingua corretta già nell’HTML statico.", en: "Translated URLs (/lavori ↔ /en/works), hreflang, and the correct language already in the static HTML." } },
            { title: { it: "Privacy", en: "Privacy" }, body: { it: "Google Analytics 4 viene caricato solo dopo il consenso (Consent Mode v2). Se il consenso viene revocato, i cookie Analytics vengono eliminati.", en: "Google Analytics 4 loads only after consent (Consent Mode v2). If consent is withdrawn, Analytics cookies are deleted." } },
            { title: { it: "Modulo di contatto", en: "Contact form" }, body: { it: "Invio dei messaggi via Resend allo studio e ai professionisti, con protezione antispam e dominio configurato per l’invio.", en: "Form sends email via Resend to the studio and its professionals, with spam protection and a sending domain configured." } },
            { title: { it: "SEO e accessibilità", en: "SEO and accessibility" }, body: { it: "Sitemap, robots, dati strutturati Schema.org, immagine social e pagina 404. Immagini WebP, testi alternativi, supporto a reduce motion e navigazione da tastiera.", en: "Sitemap, robots, Schema.org structured data, social image, and 404 page. WebP images, alt text, reduced-motion support, and keyboard navigation." } },
          ],
        },
      ],
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectPath(slug: string) {
  return { pathname: "/progetti/[slug]" as const, params: { slug } };
}
