export type BlogLocale = "it" | "en";

export type BlogInline =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "emphasis"; value: string }
  | { type: "link"; value: string; href: string };

export type BlogBlock =
  | { type: "heading"; level: 2 | 3 | 4; id: string; text: string }
  | { type: "paragraph"; content: BlogInline[] }
  | { type: "list"; ordered: boolean; items: BlogInline[][] }
  | { type: "quote"; content: BlogInline[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "code"; language: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "separator" };

export type BlogPost = {
  id: string;
  slug: string;
  translationKey: "article1" | "article2" | "article3" | "article4";
  image: string;
  status: "draft" | "published";
  author: string;
  publishedAt: string | null;
  updatedAt: string | null;
  seoTitle: Record<BlogLocale, string>;
  seoDescription: Record<BlogLocale, string>;
  relatedIds: string[];
  content: Record<BlogLocale, BlogBlock[]>;
};

const text = (value: string): BlogInline => ({ type: "text", value });
const strong = (value: string): BlogInline => ({ type: "strong", value });
const paragraph = (...content: BlogInline[]): BlogBlock => ({ type: "paragraph", content });
const heading = (id: string, it: string, en: string): Record<BlogLocale, BlogBlock> => ({
  it: { type: "heading", level: 2, id, text: it },
  en: { type: "heading", level: 2, id, text: en },
});

/*
 * Tutti i corpi sono bozze dimostrative, da revisionare prima della pubblicazione.
 * Non contengono date, risultati, fonti o dichiarazioni professionali attribuite ad Andrea.
 */
export const blogPosts: BlogPost[] = [
  {
    id: "article-01", slug: "dal-codice-allesperienza", translationKey: "article1",
    image: "/images/blog/articolo1.webp", status: "draft", author: "Andrea Vannetti",
    publishedAt: null, updatedAt: null,
    seoTitle: { it: "Dal codice all'esperienza: cosa rende efficace un sito", en: "From code to experience: what makes a website effective" },
    seoDescription: { it: "Bozza editoriale sul rapporto tra struttura, contenuti e interazioni di un sito web.", en: "Editorial draft on the relationship between structure, content, and interactions on a website." },
    relatedIds: ["article-03", "article-04"],
    content: {
      it: [
        heading("struttura", "La struttura prima degli effetti", "Structure before effects").it,
        paragraph(text("Un sito efficace parte da una domanda semplice: che cosa deve riuscire a fare chi lo visita? La risposta aiuta a scegliere quali informazioni mettere in primo piano e quale percorso rendere più immediato.")),
        paragraph(strong("Progettare l’esperienza significa dare un ordine alle decisioni."), text(" La gerarchia dei contenuti, le etichette dei collegamenti e la disposizione delle pagine dovrebbero sostenere lo stesso obiettivo.")),
        heading("interazioni", "Interazioni che chiariscono", "Interactions that clarify").it,
        paragraph(text("Un movimento o un dettaglio visivo ha valore quando rende più chiara un’azione, mostra una relazione o restituisce un feedback. Se attira attenzione senza aiutare a capire, può diventare rumore.")),
        { type: "list", ordered: false, items: [[strong("Contenuto"), text(" comprensibile e facile da trovare.")], [strong("Interfaccia"), text(" coerente con le azioni richieste.")], [strong("Tecnica"), text(" al servizio di stabilità e accessibilità.")]] },
        heading("verifica", "Un progetto da verificare", "A project to validate").it,
        paragraph(text("La qualità non si deduce soltanto dall’aspetto. Va verificata sui dispositivi e nei contesti d’uso previsti, osservando dove le persone esitano e quali informazioni non trovano.")),
      ],
      en: [
        heading("structure", "Structure before effects", "Structure before effects").en,
        paragraph(text("An effective website starts with a simple question: what should visitors be able to do? The answer helps decide which information to prioritize and which paths to make clear.")),
        paragraph(strong("Designing an experience means ordering decisions."), text(" Content hierarchy, link labels, and page structure should support the same goal.")),
        heading("interactions", "Interactions that clarify", "Interactions that clarify").en,
        paragraph(text("Motion or a visual detail is useful when it clarifies an action, shows a relationship, or provides feedback. If it attracts attention without helping people understand, it can become noise.")),
        { type: "list", ordered: false, items: [[strong("Content"), text(" that is clear and easy to find.")], [strong("Interface"), text(" aligned with the actions it asks for.")], [strong("Technology"), text(" supporting stability and accessibility.")]] },
        heading("review", "A project to validate", "A project to validate").en,
        paragraph(text("Quality cannot be judged by appearance alone. It should be checked on the intended devices and in real use, noticing where people hesitate or cannot find information.")),
      ],
    },
  },
  {
    id: "article-02", slug: "headless-architetture-web", translationKey: "article2",
    image: "/images/blog/articolo2.webp", status: "draft", author: "Andrea Vannetti",
    publishedAt: null, updatedAt: null,
    seoTitle: { it: "Headless e architetture web: scegliere la struttura giusta", en: "Headless and web architecture: choosing the right structure" },
    seoDescription: { it: "Bozza editoriale per orientarsi tra architetture web e gestione dei contenuti.", en: "Editorial draft on web architecture and content management choices." },
    relatedIds: ["article-01", "article-03"],
    content: {
      it: [
        heading("partire-dalle-esigenze", "Partire dalle esigenze", "Start with the requirements").it,
        paragraph(text("La scelta di un’architettura dovrebbe seguire i bisogni del progetto: chi aggiorna i contenuti, quali canali devono riceverli e quanta libertà serve all’interfaccia. Il termine “headless” descrive una separazione, ma non è una risposta automatica.")),
        paragraph(text("Separare la gestione dei contenuti dalla loro presentazione può essere utile quando esistono più interfacce o flussi editoriali specifici. Introduce però integrazioni e responsabilità che vanno considerate fin dall’inizio.")),
        heading("costi", "Valutare anche la complessità", "Account for complexity").it,
        paragraph(strong("Ogni livello aggiunto ha un costo di manutenzione."), text(" Occorre capire chi seguirà gli aggiornamenti, come verranno gestiti anteprime e pubblicazioni e quali parti del sistema dipendono da servizi esterni.")),
        { type: "quote", content: [text("La struttura più adatta è quella che il progetto può mantenere nel tempo.")] },
        heading("decisione", "Una decisione contestuale", "A contextual decision").it,
        paragraph(text("Prima di scegliere, conviene descrivere i contenuti, i ruoli editoriali e i percorsi principali. Un confronto concreto tra requisiti e capacità del team rende la decisione più leggibile di una classifica di tecnologie.")),
      ],
      en: [
        heading("requirements", "Start with the requirements", "Start with the requirements").en,
        paragraph(text("Architecture should follow a project’s needs: who edits content, which channels need it, and how much freedom the interface requires. “Headless” describes a separation, but it is not an automatic answer.")),
        paragraph(text("Separating content management from presentation can help when several interfaces or specific editorial workflows are involved. It also introduces integrations and responsibilities that should be considered early.")),
        heading("complexity", "Account for complexity", "Account for complexity").en,
        paragraph(strong("Every additional layer has a maintenance cost."), text(" Consider who will manage updates, how previews and publishing will work, and which parts depend on external services.")),
        { type: "quote", content: [text("The right structure is one the project can maintain over time.")] },
        heading("decision", "A contextual decision", "A contextual decision").en,
        paragraph(text("Before choosing, describe the content, editorial roles, and key journeys. Comparing actual requirements with the team’s capacity makes the decision clearer than a technology ranking.")),
      ],
    },
  },
  {
    id: "article-03", slug: "design-system-identita", translationKey: "article3",
    image: "/images/blog/articolo3.webp", status: "draft", author: "Andrea Vannetti",
    publishedAt: null, updatedAt: null,
    seoTitle: { it: "Design system: coerenza senza perdere identità", en: "Design systems: consistency without losing identity" },
    seoDescription: { it: "Bozza editoriale su regole condivise, componenti e identità visiva.", en: "Editorial draft on shared rules, components, and visual identity." },
    relatedIds: ["article-01", "article-02"],
    content: {
      it: [
        heading("regole-condivise", "Regole condivise, non uniformità", "Shared rules, not uniformity").it,
        paragraph(text("Un design system raccoglie decisioni che si ripetono: colori, tipografia, spaziature, componenti e comportamenti. Il suo scopo è rendere queste scelte comprensibili e riutilizzabili, non rendere ogni pagina identica.")),
        paragraph(text("La coerenza nasce da regole applicate con criterio. Un componente può avere varianti quando cambiano contesto o priorità, purché le differenze siano intenzionali e documentate.")),
        heading("componenti", "Componenti con un ruolo", "Components with a purpose").it,
        { type: "list", ordered: true, items: [[text("Individuare gli elementi che si ripetono davvero.")], [text("Definire stati, varianti e requisiti di accessibilità.")], [text("Rivedere le regole quando i casi d’uso cambiano.")]] },
        heading("identita", "Lasciare spazio al progetto", "Make room for the project").it,
        paragraph(text("Un sistema utile chiarisce quali scelte sono condivise e quali appartengono a una singola pagina o a un contenuto speciale. Così l’identità può emergere senza rinunciare a una base solida.")),
      ],
      en: [
        heading("shared-rules", "Shared rules, not uniformity", "Shared rules, not uniformity").en,
        paragraph(text("A design system gathers recurring decisions: color, typography, spacing, components, and behavior. Its purpose is to make them understandable and reusable, not to make every page identical.")),
        paragraph(text("Consistency comes from applying rules with care. A component can have variants for different contexts or priorities, as long as those differences are intentional and documented.")),
        heading("components", "Components with a purpose", "Components with a purpose").en,
        { type: "list", ordered: true, items: [[text("Identify elements that genuinely recur.")], [text("Define states, variants, and accessibility requirements.")], [text("Review rules when use cases change.")]] },
        heading("identity", "Make room for the project", "Make room for the project").en,
        paragraph(text("A useful system clarifies which choices are shared and which belong to a specific page or special content. Identity can then emerge without giving up a solid foundation.")),
      ],
    },
  },
  {
    id: "article-04", slug: "performance-web", translationKey: "article4",
    image: "/images/blog/articolo4.webp", status: "draft", author: "Andrea Vannetti",
    publishedAt: null, updatedAt: null,
    seoTitle: { it: "Performance web: la velocità è parte del progetto", en: "Web performance: speed is part of the project" },
    seoDescription: { it: "Bozza editoriale sul ruolo delle performance nella progettazione web.", en: "Editorial draft on the role of performance in web design." },
    relatedIds: ["article-01", "article-03"],
    content: {
      it: [
        heading("oltre-il-tempo", "La performance è più del tempo di caricamento", "Performance is more than load time").it,
        paragraph(text("L’esperienza di un sito dipende da quanto rapidamente appare il contenuto, da quanto la pagina resta stabile e da come risponde alle azioni. Per questo le performance riguardano anche struttura e scelte di interfaccia.")),
        paragraph(text("Immagini sovradimensionate, script non necessari e interfacce che cambiano posizione possono appesantire o disorientare. Individuare il problema specifico è più utile che applicare ottimizzazioni senza contesto.")),
        heading("misurare", "Misurare prima di intervenire", "Measure before changing").it,
        paragraph(strong("Una verifica parte da un’esperienza riproducibile."), text(" Dispositivo, connessione, contenuti e percorso vanno considerati insieme. Dopo una modifica, si controlla che il miglioramento sia percepibile e che non abbia introdotto regressioni.")),
        heading("progettare", "Progettare con attenzione", "Design with care").it,
        paragraph(text("Formato delle immagini, caricamento delle risorse e comportamento dei componenti fanno parte delle decisioni iniziali. Tenerne conto durante il progetto aiuta a evitare interventi tardivi e preserva la qualità dell’esperienza.")),
      ],
      en: [
        heading("beyond-load", "Performance is more than load time", "Performance is more than load time").en,
        paragraph(text("A website experience depends on how quickly content appears, whether the page remains stable, and how it responds to actions. Performance is therefore connected to structure and interface choices too.")),
        paragraph(text("Oversized images, unnecessary scripts, and shifting layouts can slow things down or cause confusion. Finding the specific issue is more useful than applying optimizations without context.")),
        heading("measure", "Measure before changing", "Measure before changing").en,
        paragraph(strong("A check starts with a reproducible experience."), text(" Device, connection, content, and user journey all matter. After a change, verify that the improvement is noticeable and that it has not introduced regressions.")),
        heading("design", "Design with care", "Design with care").en,
        paragraph(text("Image formats, resource loading, and component behavior belong in early decisions. Considering them during design helps avoid late interventions and protects the quality of the experience.")),
      ],
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogReadingMinutes(post: BlogPost, locale: BlogLocale) {
  const words = post.content[locale].flatMap((block) => {
    if (block.type === "paragraph" || block.type === "quote") return block.content.map(({ value }) => value);
    if (block.type === "heading") return [block.text];
    if (block.type === "list") return block.items.flatMap((item) => item.map(({ value }) => value));
    if (block.type === "image") return [block.alt, block.caption ?? ""];
    if (block.type === "code") return [block.code];
    if (block.type === "table") return [...block.headers, ...block.rows.flat()];
    return [];
  }).join(" ").trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}
