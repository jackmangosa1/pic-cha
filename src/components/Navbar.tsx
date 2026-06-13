import { useEffect, useState } from "react";
import { DropdownMenu } from "radix-ui";
import {
  Moon,
  Sun,
  User,
  CreditCard,
  LogOut,
  RotateCcw,
  Coins,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_USER = {
  name: "Jacques Mangosa",
  email: "Jacques.Mangosa@dccs.eu",
  credits: 28,
  initials: "JM",
  tutorialProgress: 40,
};

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient">
            <Camera className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight">Pic-Cha</span>
        </a>

        {/* Nav links */}
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* User dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                aria-label="Open user menu"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {MOCK_USER.initials}
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 min-w-[220px] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
              >
                {/* User info header */}
                <div className="px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">
                      {MOCK_USER.name}
                    </p>
                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      <Coins className="size-3" />
                      {MOCK_USER.credits}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {MOCK_USER.email}
                  </p>
                </div>

                <DropdownMenu.Separator className="my-1 h-px bg-border" />

                <DropdownMenu.Item className={itemCls}>
                  <User className="size-4 shrink-0" />
                  Profile
                </DropdownMenu.Item>

                <DropdownMenu.Item className={itemCls}>
                  <CreditCard className="size-4 shrink-0" />
                  Billing
                </DropdownMenu.Item>

                <DropdownMenu.Item className={cn(itemCls, "justify-between")}>
                  <span className="flex items-center gap-2.5">
                    <RotateCcw className="size-4 shrink-0" />
                    Reset Tutorial
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {MOCK_USER.tutorialProgress}%
                  </span>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="my-1 h-px bg-border" />

                <DropdownMenu.Item
                  className={cn(
                    itemCls,
                    "text-destructive focus:bg-destructive/10 focus:text-destructive",
                  )}
                >
                  <LogOut className="size-4 shrink-0" />
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}

const itemCls =
  "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-muted focus:bg-muted";
