import { useEffect, useState } from "react";
import { Moon, Sun, Camera } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Link } from "@tanstack/react-router";

const NAV_LINKS = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
];

export function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient">
            <Camera className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight">Pic-Cha</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
