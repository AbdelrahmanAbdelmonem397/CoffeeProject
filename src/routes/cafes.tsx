import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock } from "lucide-react";
import roasteryImg from "@/assets/cafe-roastery.jpg";
import harbourImg from "@/assets/cafe-harbour.jpg";
import northImg from "@/assets/cafe-north.jpg";

export const Route = createFileRoute("/cafes")({
  head: () => ({
    meta: [
      { title: "Cafés — Ember & Oak" },
      { name: "description", content: "Visit our roastery and neighbourhood cafés. Three quiet rooms for slow mornings." },
      { property: "og:title", content: "Cafés — Ember & Oak" },
      { property: "og:description", content: "Three quiet rooms for slow mornings — find your nearest Ember & Oak." },
      { property: "og:url", content: "/cafes" },
    ],
    links: [{ rel: "canonical", href: "/cafes" }],
  }),
  component: CafesPage,
});

const cafes = [
  {
    name: "The Roastery",
    address: "14 Linden Lane, Old Quarter",
    hours: "Mon — Sun · 7:00 — 19:00",
    note: "Our workshop and flagship bar. Watch the roast through the glass wall.",
    image: roasteryImg,
  },
  {
    name: "Harbour Room",
    address: "9 Quay Street, Marina District",
    hours: "Mon — Fri · 7:30 — 18:00",
    note: "A tiny five-seat bar by the water. Filter only, no laptops.",
    image: harbourImg,
  },
  {
    name: "North Branch",
    address: "212 Birchwood Ave., Northside",
    hours: "Daily · 8:00 — 17:00",
    note: "Our quietest room. Big tables, slow service, very good pastries.",
    image: northImg,
  },
];

function CafesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20 animate-fade-in">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-primary">Visit</p>
        <h1 className="mt-3 text-5xl md:text-6xl">Three quiet rooms.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Each café serves the same coffee but lives at a different pace. Come
          sit, read, stay a little longer than you planned.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cafes.map((c, i) => (
          <article
            key={c.name}
            className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-warm animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-hero">
              <img
                src={c.image}
                alt={`${c.name} interior`}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            <h2 className="mt-6 text-2xl">{c.name}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {c.address}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {c.hours}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{c.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
