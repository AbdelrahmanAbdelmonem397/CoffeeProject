import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { coffees } from "@/lib/coffees";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/coffees")({
  head: () => ({
    meta: [
      { title: "Coffees — Ember & Oak" },
      { name: "description", content: "Browse our current selection of single-origin coffees and signature blends." },
      { property: "og:title", content: "Coffees — Ember & Oak" },
      { property: "og:description", content: "Single-origin coffees and signature blends, roasted in micro-batches." },
      { property: "og:url", content: "/coffees" },
    ],
    links: [{ rel: "canonical", href: "/coffees" }],
  }),
  component: CoffeesPage,
});

const filters = ["All", "Light", "Medium", "Dark", "Blends"] as const;
type Filter = (typeof filters)[number];

function CoffeesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { user, addToBag } = useAuth();

  const visible = useMemo(() => {
    if (filter === "All") return coffees;
    if (filter === "Blends") return coffees.filter((c) => c.origin.toLowerCase().includes("blend"));
    return coffees.filter((c) => c.roast.toLowerCase().includes(filter.toLowerCase()));
  }, [filter]);

  const onAdd = (c: (typeof coffees)[number]) => {
    if (!user) {
      toast.error("Sign in to add coffees to your bag");
      return;
    }
    addToBag({
      id: c.id,
      name: c.name,
      origin: c.origin,
      price: c.price,
      roast: c.roast,
      image: c.image,
    });
    setJustAdded(c.id);
    toast.success(`${c.name} added to your bag`);
    setTimeout(() => setJustAdded((v) => (v === c.id ? null : v)), 1500);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20 animate-fade-in">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-primary">The menu</p>
        <h1 className="mt-3 text-5xl md:text-6xl">Current coffees</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A small, rotating selection — roasted this week, shipped tomorrow.
          Every bag includes brew notes for filter and espresso.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition hover:scale-105 ${
                active
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <article
            key={c.id}
            className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-warm animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
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
                <h2 className="text-2xl">{c.name}</h2>
                <p className="text-sm text-muted-foreground">{c.origin}</p>
              </div>
              <span className="serif text-xl text-primary">{c.price}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{c.notes}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{c.roast}</span>
              <button
                onClick={() => onAdd(c)}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-warm px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90 hover:scale-105"
              >
                {justAdded === c.id ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" /> Add to bag
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>

      {!user && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Sign in</Link> to save items to your bag.
        </p>
      )}
    </section>
  );
}
