import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, Leaf, Flame } from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";
import { coffees } from "@/lib/coffees";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ember & Oak — Slow-roasted specialty coffee" },
      {
        name: "description",
        content:
          "Single-origin beans and signature blends, roasted in small batches at our workshop. Shipped fresh, brewed slow.",
      },
      { property: "og:title", content: "Ember & Oak — Specialty Coffee Roastery" },
      { property: "og:description", content: "Slow-roasted specialty coffee, shipped fresh." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = coffees.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
              <Flame className="h-3 w-3 text-primary animate-pulse" /> Est. 2018
            </span>
            <h1 className="mt-5 text-5xl leading-tight md:text-7xl">
              Slow roasted.<br />
              <span className="text-gradient">Brewed with care.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              A tiny workshop coaxing the best from each green bean — one
              micro-batch, one quiet morning at a time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/coffees"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-105"
              >
                Shop coffees
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/craft"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur transition hover:border-primary/60 hover:scale-105"
              >
                Our craft
              </Link>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="absolute -inset-6 rounded-3xl bg-gradient-warm opacity-25 blur-3xl animate-pulse" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-warm transition duration-500 hover:scale-[1.02]">
              <img src={heroImg} alt="Freshly roasted beans pouring from a copper scoop" width={1600} height={1200} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Sourced direct", desc: "Long-term relationships with farms we visit and pay above fair." },
            { icon: Flame, title: "Roasted small", desc: "Two-kilo micro-batches on a 1956 Probat. Tasted every Friday." },
            { icon: Coffee, title: "Brewed slow", desc: "Recipes and ratios printed on every bag. No guesswork at home." },
          ].map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/60 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-warm animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm transition group-hover:rotate-6 group-hover:scale-110">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-2xl">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">This week</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Featured roasts</h2>
          </div>
          <Link to="/coffees" className="hidden text-sm text-muted-foreground transition hover:text-foreground hover:translate-x-1 md:inline-flex">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((c, i) => (
            <Link
              to="/coffees"
              key={c.id}
              className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-warm animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[5/4] overflow-hidden rounded-xl bg-gradient-hero">
                <img
                  src={c.image}
                  alt={`${c.name} coffee bag`}
                  width={800}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.origin}</p>
                </div>
                <span className="serif text-xl text-primary">{c.price}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.notes}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-warm md:p-16">
          <div className="absolute inset-0 bg-gradient-hero opacity-80" aria-hidden />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl">Coffee, by post.</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Join the subscription and get fresh roasts on your doorstep every
              fortnight. Pause or skip any time.
            </p>
            <Link
              to="/coffees"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-105"
            >
              Browse the menu <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
