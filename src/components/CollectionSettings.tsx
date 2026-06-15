import { useState, useRef } from "react";
import { Accordion, Switch } from "radix-ui";
import { ChevronDown, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CollectionSettings() {
  const [browseAll, setBrowseAll] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogo(URL.createObjectURL(file));
    e.target.value = "";
  }

  return (
    <div className="max-w-2xl">
      <Accordion.Root type="multiple" defaultValue={["guest-settings", "branding"]}>

        {/* Guest Settings */}
        <Accordion.Item value="guest-settings" className="border-b border-border">
          <Accordion.Header asChild>
            <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left focus-visible:outline-none">
              <span className="text-base font-semibold text-foreground">
                Guest Settings
              </span>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="pb-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Browse All Photos
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Allow guests to see a "View All" toggle to browse the entire
                    collection, not just their matches.
                  </p>
                </div>
                <Switch.Root
                  checked={browseAll}
                  onCheckedChange={setBrowseAll}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    browseAll ? "bg-primary" : "bg-input",
                  )}
                >
                  <Switch.Thumb
                    className={cn(
                      "pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
                      browseAll ? "translate-x-4" : "translate-x-0",
                    )}
                  />
                </Switch.Root>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        {/* Branding & Theme */}
        <Accordion.Item value="branding" className="border-b border-border">
          <Accordion.Header asChild>
            <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left focus-visible:outline-none">
              <span className="text-base font-semibold text-foreground">
                Branding & Theme
              </span>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="space-y-6 pb-6">

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name or brand"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              {/* Logo */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Logo
                </label>
                <p className="text-sm text-muted-foreground">
                  Your logo will appear on the guest page and can be used as a
                  watermark on photos.
                </p>
                <input
                  type="file"
                  ref={logoRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                {logo ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3">
                    <img
                      src={logo}
                      alt="Logo preview"
                      className="size-14 rounded-md object-contain"
                    />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">
                        Logo uploaded
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Will appear as watermark on guest photos
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLogo(null)}
                      className="gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => logoRef.current?.click()}
                    className="flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/10 text-sm text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground"
                  >
                    <Upload className="size-4" />
                    Upload logo
                  </button>
                )}
              </div>

            </div>
          </Accordion.Content>
        </Accordion.Item>

      </Accordion.Root>
    </div>
  );
}
