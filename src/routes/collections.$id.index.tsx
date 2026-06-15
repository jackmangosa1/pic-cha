import { createFileRoute } from "@tanstack/react-router";
import { CollectionDetailPage } from "@/pages/CollectionDetailPage";

export const Route = createFileRoute("/collections/$id/")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: String(search.name ?? "Untitled"),
    createdAt: String(search.createdAt ?? ""),
  }),
  component: CollectionDetailPage,
});
