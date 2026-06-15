import { useState } from "react";
import dayjs from "dayjs";
import { Images, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionCard, type Collection } from "@/components/CollectionCard";
import { CreateItemDialog } from "@/components/CreateItemDialog";


const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Test",
    photoCount: 1,
    createdAt: "2026-06-11",
  },
];

export function CollectionListPage() {
  const [collections, setCollections] =
    useState<Collection[]>(INITIAL_COLLECTIONS);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCreate(name: string) {
    const formatted = dayjs().format("YYYY-MM-DD");
    setCollections((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, photoCount: 0, createdAt: formatted },
    ]);
  }

  function handleDelete(id: string) {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <main className="mx-auto max-w-7xl px-8 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Collections
          </h1>
          <span className="text-sm font-normal text-muted-foreground/60">
            {collections.length}
          </span>
        </div>

        <Button
          size="sm"
          onClick={() => setDialogOpen(true)}
          className="rounded-full px-4 py-4 font-medium shadow-none gap-1.5"
        >
          <Plus className="size-4" strokeWidth={2.5} />
          New Collection
        </Button>
      </div>

      {collections.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <Images className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            No collections yet.{" "}
            <button
              onClick={() => setDialogOpen(true)}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Create one
            </button>{" "}
            to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              collection={col}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreate}
        title="Create New Collection"
        description="You can create multiple collections to organize your photos."
        placeholder="Collection Name"
      />
    </main>
  );
}
