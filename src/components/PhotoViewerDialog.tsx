import { useState } from "react";
import { Dialog } from "radix-ui";
import { X, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Photo } from "@/types/photo";

interface Props {
  photo: Photo | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function PhotoViewerDialog({ photo, onClose, onDelete }: Props) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!photo) return null;

  function handleDownload() {
    const a = document.createElement("a");
    a.href = photo!.url;
    a.download = photo!.name;
    a.click();
  }

  function handleConfirmDelete() {
    onDelete(photo!.id);
    onClose();
  }

  function handleClose() {
    setConfirmingDelete(false);
    onClose();
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="sr-only">{photo.name}</Dialog.Title>
          <Dialog.Description className="sr-only">Photo viewer</Dialog.Description>

          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 size-9 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </Button>
          </Dialog.Close>

          <img
            src={photo.url}
            alt={photo.name}
            className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />

          {/* Bottom bar */}
          <div className="mt-4 flex w-full max-w-lg items-center justify-between rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            {confirmingDelete ? (
              <>
                <p className="text-sm text-white/80">Delete this photo?</p>
                <div className="flex items-center gap-2 pl-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setConfirmingDelete(false)}
                    className="h-8 rounded-lg text-white/70 hover:bg-white/20 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleConfirmDelete}
                    className="h-8 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-none"
                  >
                    Delete
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="truncate text-sm font-medium text-white">
                  {photo.name}
                </p>
                <div className="flex items-center gap-1 pl-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    title="Download"
                    className="size-8 rounded-lg text-white/70 hover:bg-white/20 hover:text-white"
                  >
                    <Download className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setConfirmingDelete(true)}
                    title="Delete"
                    className="size-8 rounded-lg text-red-400 hover:bg-white/20 hover:text-red-300"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
