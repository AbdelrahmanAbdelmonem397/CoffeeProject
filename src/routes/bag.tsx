import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Your Bag — Ember & Oak" },
      { name: "description", content: "Review your selected coffees and checkout." },
    ],
  }),
  component: BagPage,
});

const parsePrice = (p: string) => Number(p.replace(/[^0-9.]/g, "")) || 0;

function BagPage() {
  const { user, updateBagQty, removeFromBag, checkout } = useAuth();

  if (!user) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center animate-fade-in">
        <ShoppingBag className="h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl">Your bag awaits</h1>
        <p className="mt-2 text-muted-foreground">Sign in to start adding coffees to your bag.</p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.02]"
        >
          Sign in
        </Link>
      </section>
    );
  }

  const items = user.bag;
  const subtotal = items.reduce((s, b) => s + parsePrice(b.price) * b.quantity, 0);
  const shipping = items.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const onCheckout = () => {
    const count = checkout();
    toast.success(`Order placed — ${count} bag${count === 1 ? "" : "s"} on the way`);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20 animate-fade-in">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-primary">Your bag</p>
        <h1 className="mt-3 text-5xl md:text-6xl">Ready to brew</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Review your selection, adjust quantities, and checkout when you're ready.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-5 serif text-2xl">Your bag is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Browse our current roasts and add a few bags — fresh-roasted and shipped the next morning.
          </p>
          <Link
            to="/coffees"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.02]"
          >
            Browse coffees <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            {items.map((b, i) => {
              const line = parsePrice(b.price) * b.quantity;
              return (
                <li
                  key={b.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50 hover:shadow-warm animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <img
                    src={b.image}
                    alt={b.name}
                    width={160}
                    height={128}
                    loading="lazy"
                    className="h-28 w-28 shrink-0 rounded-xl object-cover sm:h-32 sm:w-32"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="serif text-xl truncate">{b.name}</h3>
                        <p className="truncate text-sm text-muted-foreground">{b.origin}</p>
                        <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] text-accent-foreground">
                          {b.roast}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromBag(b.id)}
                        aria-label={`Remove ${b.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-border bg-background">
                        <button
                          onClick={() => updateBagQty(b.id, b.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-accent"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{b.quantity}</span>
                        <button
                          onClick={() => updateBagQty(b.id, b.quantity + 1)}
                          aria-label="Increase quantity"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-accent"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="serif text-xl text-primary">${line.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{b.price} each</div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-warm lg:sticky lg:top-28">
            <h3 className="serif text-2xl">Order summary</h3>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="text-foreground tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd className="text-foreground tabular-nums">${shipping.toFixed(2)}</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
                <dt className="serif">Total</dt>
                <dd className="serif text-primary tabular-nums">${total.toFixed(2)}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-warm px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.02]"
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Roasted to order · Ships the next morning
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
