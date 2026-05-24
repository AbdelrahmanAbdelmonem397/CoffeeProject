import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ember & Oak" },
      { name: "description", content: "Wholesale, press, or just to say hello. We answer every message." },
      { property: "og:title", content: "Contact — Ember & Oak" },
      { property: "og:description", content: "Wholesale, press, or a kind hello — we read everything." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20 animate-fade-in">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">Say hello</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Get in touch.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Wholesale enquiries, press, training requests, or just thoughts on a
            cup you loved — we read everything.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-warm">
                <Mail className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">Email</p>
                <a href="mailto:hello@emberoak.coffee" className="text-lg transition hover:text-primary">
                  hello@emberoak.coffee
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-warm">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">Phone</p>
                <p className="text-lg">+1 (415) 555 — 0142</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-warm">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">Roastery</p>
                <p className="text-lg">14 Linden Lane, Old Quarter</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            toast.success("Message sent — we'll be in touch within two days.");
            form.reset();
          }}
          className="rounded-3xl border border-border bg-card p-7 shadow-warm md:p-9 transition hover:shadow-warm"
        >
          <h2 className="text-2xl">Send a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We reply within two working days.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground" htmlFor="msg">Message</label>
              <textarea
                id="msg"
                rows={5}
                className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                placeholder="Tell us what's on your mind…"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.01]"
            >
              <Send className="h-4 w-4 transition group-hover:translate-x-0.5" /> Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
