import SearchPage from "@/pages/SearchPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  validateSearch: (search: { collectionId?: string }) => {
    return {
      collectionId: search.collectionId ?? "",
    };
  },
  component: SearchPage,
});
