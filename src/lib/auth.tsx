import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Purchase = {
  id: string;
  name: string;
  origin: string;
  price: string;
  roast: string;
  image: string;
  quantity: number;
  purchasedAt: number;
};

export type BagItem = {
  id: string;
  name: string;
  origin: string;
  price: string;
  roast: string;
  image: string;
  quantity: number;
};

export type User = {
  email: string;
  name: string;
  avatar: string;
  purchases: Purchase[];
  bag: BagItem[];
};

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  updateUser: (patch: Partial<Pick<User, "name" | "email" | "avatar">>) => void;
  addToBag: (item: Omit<BagItem, "quantity">) => void;
  updateBagQty: (id: string, qty: number) => void;
  removeFromBag: (id: string) => void;
  clearBag: () => void;
  checkout: () => number;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "ember_oak_user";

function readUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw) as User;
    // backfill
    if (!u.bag) u.bag = [];
    if (!u.purchases) u.purchases = [];
    return u;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(readUser());
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const patch = (fn: (u: User) => User) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = fn(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value: AuthContextValue = {
    user,
    signIn: (email) => {
      const name = email.split("@")[0]?.replace(/[._-]/g, " ") || "Coffee Lover";
      const existing = readUser();
      const next: User =
        existing && existing.email === email
          ? existing
          : {
              email,
              name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
              avatar: "",
              purchases: [],
              bag: [],
            };
      persist(next);
    },
    signOut: () => persist(null),
    updateUser: (p) => patch((prev) => ({ ...prev, ...p })),
    addToBag: (item) =>
      patch((prev) => {
        const existing = prev.bag.find((b) => b.id === item.id);
        const bag = existing
          ? prev.bag.map((b) => (b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b))
          : [...prev.bag, { ...item, quantity: 1 }];
        return { ...prev, bag };
      }),
    updateBagQty: (id, qty) =>
      patch((prev) => ({
        ...prev,
        bag: prev.bag
          .map((b) => (b.id === id ? { ...b, quantity: Math.max(0, qty) } : b))
          .filter((b) => b.quantity > 0),
      })),
    removeFromBag: (id) =>
      patch((prev) => ({ ...prev, bag: prev.bag.filter((b) => b.id !== id) })),
    clearBag: () => patch((prev) => ({ ...prev, bag: [] })),
    checkout: () => {
      let count = 0;
      patch((prev) => {
        count = prev.bag.reduce((s, b) => s + b.quantity, 0);
        const now = Date.now();
        const newPurchases: Purchase[] = prev.bag.map((b) => ({ ...b, purchasedAt: now }));
        return { ...prev, purchases: [...newPurchases, ...prev.purchases], bag: [] };
      });
      return count;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
