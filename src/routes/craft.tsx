import { createFileRoute } from "@tanstack/react-router";
import craftImg from "@/assets/craft.jpg";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [
      { title: "Our Craft — Ember & Oak" },
      { name: "description", content: "How we source, roast, and rest our specialty coffees — from green bean to brewed cup." },
      { property: "og:title", content: "Our Craft — Ember & Oak" },
      { property: "og:description", content: "Source, roast, rest, brew — the slow path from green bean to cup." },
      { property: "og:url", content: "/craft" },
    ],
    links: [{ rel: "canonical", href: "/craft" }],
  }),
  component: CraftPage,
});

const steps = [
  { n: "01", t: "Source", d: "We travel to farms each harvest, taste lots cup by cup, and commit only to what moves us." },
  { n: "02", t: "Rest", d: "Green beans rest in breathable storage to settle moisture before they ever see fire." },
  { n: "03", t: "Roast", d: "Tiny 2kg batches on a 1956 Probat. Profiles tuned by ear, eye and a hundred Friday cuppings." },
  { n: "04", t: "Brew", d: "Recipes for filter, AeroPress and espresso ship with every bag. No guesswork." },
];

function CraftPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">Our craft</p>
            <h1 className="mt-3 text-5xl md:text-6xl">The slow path from bean to cup.</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              We're a two-person workshop in the old linden district. No
              shortcuts, no white-labelling, no mystery blends — just careful,
              repeatable coffee.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-warm opacity-25 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-warm">
              <img src={craftImg} alt="Roaster pouring green beans into a copper drum" loading="lazy" width={1400} height={1200} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {steps.map((s) => (
            <article key={s.n} className="rounded-2xl border border-border bg-card/60 p-8 backdrop-blur">
              <span className="font-mono text-sm text-primary">{s.n}</span>
              <h2 className="mt-3 text-3xl">{s.t}</h2>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <blockquote className="serif text-3xl leading-snug md:text-4xl">
          "Coffee should taste like the place it came from — not like the
          roaster's habits."
        </blockquote>
        <p className="mt-5 text-sm uppercase tracking-widest text-muted-foreground">
          — Ines, head roaster
        </p>
      </section>
    </>
  );
}
