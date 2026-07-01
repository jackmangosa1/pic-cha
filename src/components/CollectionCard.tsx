import { Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface Collection {
  id: string;
  name: string;
  photoCount: number;
  createdAt: string;
  creatorName: string;
}

interface Props {
  collection: Collection;
  onDelete: (id: string) => void;
}

export function CollectionCard({ collection, onDelete }: Props) {
  return (
    <Link
      to="/collections/$id"
      params={{ id: collection.id }}
      search={{ name: collection.name, createdAt: collection.createdAt }}
      className="block w-full max-w-sm rounded-[24px] border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="truncate text-base font-bold text-foreground">
          {collection.name}
        </span>
        <span className="shrink-0 text-xs font-medium text-muted-foreground/70">
          {collection.photoCount}{" "}
          {collection.photoCount === 1 ? "Photo" : "Photos"}
        </span>
      </div>

      <p className="mt-1.5 text-sm text-muted-foreground/60">
        {collection.createdAt}
      </p>

      <div className="mt-10 flex items-center justify-start">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(collection.id);
          }}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none"
        >
          <Trash2 className="size-3.5 shrink-0" />
          Delete
        </button>
      </div>
    </Link>
  );
}
