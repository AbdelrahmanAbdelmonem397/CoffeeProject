import { Link, useNavigate } from "@tanstack/react-router";
import { Flame, LogIn, LogOut, ShoppingBag, User as UserIcon } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const links = [
  { to: "/", label: "Home" },
  { to: "/coffees", label: "Coffees" },
  { to: "/craft", label: "Our Craft" },
  { to: "/cafes", label: "Cafés" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 animate-fade-in">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/70 glass px-5 py-2.5 transition-shadow hover:shadow-warm">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-warm transition group-hover:rotate-12 group-hover:scale-110">
            <Flame className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="serif text-lg font-medium tracking-tight">
            Ember <span className="text-muted-foreground">&amp;</span> Oak
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              className="relative transition hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/bag"
            aria-label="Bag"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 transition hover:border-primary/60 hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            {user && user.bag.length > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {user.bag.reduce((s, b) => s + b.quantity, 0)}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm transition hover:border-primary/60 hover:scale-105"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-warm">
                    <UserIcon className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
                <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
              </Link>
              <button
                onClick={() => {
                  signOut();
                  toast.success("Signed out");
                  navigate({ to: "/" });
                }}
                aria-label="Sign out"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 transition hover:border-destructive/60 hover:text-destructive hover:rotate-12"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-105"
            >
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-warm">
              <Flame className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="serif text-lg">Ember &amp; Oak</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Slow-roasted specialty coffee from a small workshop. Sourced
            transparently, roasted in micro-batches, shipped fresh.
          </p>
        </div>
        <div>
          <h4 className="serif text-base">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-foreground hover:translate-x-0.5 inline-block">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="serif text-base">Visit</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Old Quarter Roastery</li>
            <li>14 Linden Lane</li>
            <li>Open daily · 7am — 7pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ember &amp; Oak Roastery. All rights reserved.
      </div>
    </footer>
  );
}
