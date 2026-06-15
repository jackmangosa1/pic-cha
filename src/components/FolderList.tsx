import { useState } from "react";
import { Folder, FolderPlus, Pencil, Trash2 } from "lucide-react";
import { CreateItemDialog } from "@/components/CreateItemDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export interface FolderItem {
  id: string;
  name: string;
}

interface Props {
  folders: FolderItem[];
  onNew: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  newDialogOpen: boolean;
  onNewDialogOpenChange: (open: boolean) => void;
}

export function FolderList({
  folders,
  onNew,
  onRename,
  onDelete,
  onSelect,
  newDialogOpen,
  onNewDialogOpenChange,
}: Props) {
  const [renameTarget, setRenameTarget] = useState<FolderItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FolderItem | null>(null);

  if (folders.length === 0) {
    return (
      <>
        <button
          onClick={() => onNewDialogOpenChange(true)}
          className="flex items-center gap-2 pt-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <FolderPlus className="size-4" />
          <span>Create a folder to organize photos</span>
        </button>

        <CreateItemDialog
          open={newDialogOpen}
          onOpenChange={onNewDialogOpenChange}
          onSubmit={onNew}
          title="New Folder"
          description="Create a new folder to organize photos."
          placeholder="Folder name"
        />
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Folders
          </span>
          <button
            onClick={() => onNewDialogOpenChange(true)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FolderPlus className="size-3.5" />
            New
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => onSelect(folder.id)}
              className="group flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-xs transition-shadow hover:shadow-sm hover:border-primary/40"
            >
              <Folder className="size-4 shrink-0 text-primary" />
              <span className="max-w-32 truncate">{folder.name}</span>

              <div
                className="ml-1 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setRenameTarget(folder)}
                  title="Rename folder"
                  aria-label="Rename folder"
                  className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Pencil className="size-3" />
                </button>
                <button
                  onClick={() => setDeleteTarget(folder)}
                  title="Delete folder"
                  aria-label="Delete folder"
                  className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateItemDialog
        open={newDialogOpen}
        onOpenChange={onNewDialogOpenChange}
        onSubmit={onNew}
        title="New Folder"
        description="Create a new folder to organize photos."
        placeholder="Folder name"
      />

      <CreateItemDialog
        open={renameTarget !== null}
        onOpenChange={(open) => {
          if (!open) setRenameTarget(null);
        }}
        onSubmit={(name) => {
          if (renameTarget) onRename(renameTarget.id, name);
          setRenameTarget(null);
        }}
        title="Rename Folder"
        description="Enter a new name for this folder."
        placeholder="Folder name"
        submitLabel="Save"
        initialValue={renameTarget?.name ?? ""}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (deleteTarget) onDelete(deleteTarget.id);
          setDeleteTarget(null);
        }}
        title="Delete Folder"
        description={`"${deleteTarget?.name}" will be permanently deleted. Photos inside will not be deleted.`}
      />
    </>
  );
}
