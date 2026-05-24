import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, LogOut, ShoppingBag, User as UserIcon, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Ember & Oak" },
      { name: "description", content: "Your Ember & Oak account, orders and preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, signOut, updateUser } = useAuth();
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!hydrated) return null;

  if (!user) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center animate-fade-in">
        <h1 className="text-3xl">You're signed out</h1>
        <p className="mt-2 text-muted-foreground">Sign in to view your profile and orders.</p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.02]"
        >
          Sign in
        </Link>
      </section>
    );
  }

  const onAvatar = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateUser({ avatar: String(reader.result) });
      toast.success("Photo updated");
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    updateUser({ name, email });
    toast.success("Profile saved");
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-16 animate-fade-in">
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-border bg-card p-6 shadow-warm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-warm">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-12 w-12 text-primary-foreground" />
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-warm transition hover:scale-110 hover:text-primary"
                aria-label="Change photo"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onAvatar(f);
                }}
              />
            </div>
            <h2 className="serif mt-4 text-2xl">{user.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            <button
              onClick={() => {
                signOut();
                toast.success("Signed out");
                navigate({ to: "/" });
              }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm transition hover:border-destructive/60 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-warm">
            <h3 className="serif text-2xl">Account details</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground">Display name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                />
              </div>
            </div>
            <button
              onClick={save}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.02]"
            >
              <Save className="h-4 w-4" /> Save changes
            </button>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-warm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-warm">
                <ShoppingBag className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="serif text-2xl">Your orders</h3>
                <p className="text-sm text-muted-foreground">
                  {user.purchases.length === 0
                    ? "No orders yet — add a coffee to your bag to get started."
                    : `${user.purchases.length} item${user.purchases.length === 1 ? "" : "s"} in total`}
                </p>
              </div>
            </div>

            {user.purchases.length === 0 ? (
              <Link
                to="/coffees"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm transition hover:border-primary/60"
              >
                Browse coffees →
              </Link>
            ) : (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {user.purchases.map((p, i) => (
                  <li
                    key={`${p.id}-${p.purchasedAt}`}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background p-3 transition hover:border-primary/50 hover:shadow-warm animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate serif text-lg">{p.name}</p>
                        <span className="text-sm text-primary">{p.price}</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{p.origin}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                        {new Date(p.purchasedAt).toLocaleDateString()} · {p.roast}
                        {p.quantity > 1 ? ` · ×${p.quantity}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
