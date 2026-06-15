import { useState } from "react";
import { Dialog } from "radix-ui";
import { X, Copy, Share2, ExternalLink, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRPoster } from "@/components/QRPoster";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string;
  collectionName: string;
}

const SHARED_BY = "Jacques Mangosa";
const BASE_URL = "https://pic-cha.app/collections";

export function ShareDialog({
  open,
  onOpenChange,
  collectionId,
  collectionName,
}: Props) {
  const shareUrl = `${BASE_URL}/${collectionId}`;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: collectionName,
          text: `Check out the "${collectionName}" photo collection on Pic-Cha!`,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing or user cancelled:", error);
      }
    } else {
      handleCopy();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Close className="absolute right-4 top-4 z-10 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <X className="size-4" />
          </Dialog.Close>

          <div className="flex min-h-115">
            <div className="flex w-72 shrink-0 flex-col border-r border-border p-6">
              <Dialog.Title className="text-base font-semibold">
                Share with Guests
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                Share this collection so guests can search for their photos.
              </Dialog.Description>

              <div className="mt-6 flex-1">
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                  Collection link
                </p>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <span className="truncate">{shareUrl}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopy}
                    title={copied ? "Copied!" : "Copy link"}
                    aria-label={copied ? "Copied!" : "Copy link"}
                    className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="size-4 text-primary" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>

                  <button
                    onClick={handleNativeShare}
                    title="Share via device options"
                    aria-label="Share via device options"
                    className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Share2 className="size-4" />
                  </button>

                  <button
                    onClick={() => window.open(shareUrl, "_blank")}
                    title="Open link"
                    aria-label="Open link"
                    className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ExternalLink className="size-4" />
                  </button>
                </div>

                <Button
                  size="sm"
                  className="rounded-full px-4 gap-1.5 font-medium shadow-none"
                >
                  <Download className="size-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-muted/30 p-8">
              <QRPoster
                collectionName={collectionName}
                shareUrl={shareUrl}
                sharedBy={SHARED_BY}
              />
              <p className="text-xs text-muted-foreground">
                Preview (8.5&quot; × 11&quot;)
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
