import { DropdownMenu, Tooltip } from "radix-ui";
import { User, CreditCard, LogOut, Coins } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const itemCls =
  "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-muted focus:bg-muted";

const MOCK_USER = {
  name: "Jacques Mangosa",
  email: "Jacques.Mangosa@dccs.eu",
  credits: 28,
  initials: "JM",
  tutorialProgress: 40,
};

export function UserDropdown() {
  const navigate = useNavigate();

  return (
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
          className="z-50 min-w-55 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium">{MOCK_USER.name}</p>
              <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="flex shrink-0 cursor-default items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      <Coins className="size-3" />
                      {MOCK_USER.credits}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={6}
                      className="z-60 rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                    >
                      Photo credits
                      <Tooltip.Arrow className="fill-foreground" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {MOCK_USER.email}
            </p>
          </div>

          <DropdownMenu.Separator className="my-1 h-px bg-border" />

          <DropdownMenu.Item
            className={itemCls}
            onSelect={() => navigate({ to: "/profile" })}
          >
            <User className="size-4 shrink-0" />
            Profile
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={itemCls}
            onSelect={() => navigate({ to: "/billing" })}
          >
            <CreditCard className="size-4 shrink-0" />
            Billing
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
  );
}
