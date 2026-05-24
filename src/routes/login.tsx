import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Flame, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Ember & Oak" },
      { name: "description", content: "Sign in to your Ember & Oak account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter an email and password");
      return;
    }
    signIn(email, password);
    toast.success("Welcome back!");
    navigate({ to: "/profile" });
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 animate-fade-in">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-warm md:p-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-warm">
            <Flame className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="serif text-xl">Ember &amp; Oak</span>
        </div>
        <h1 className="mt-6 text-3xl">Welcome back.</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your roasts and orders.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-muted-foreground">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-muted-foreground">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-warm px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:scale-[1.01]"
          >
            <LogIn className="h-4 w-4 transition group-hover:-translate-x-0.5" /> Sign in
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Demo account — any email and password will work.
          </p>
        </form>
      </div>
    </section>
  );
}
