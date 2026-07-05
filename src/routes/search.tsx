import SearchPhotoPage from "@/pages/SearchPhotoPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  validateSearch: (search: { collectionId?: string }) => {
    return {
      collectionId: search.collectionId ?? "",
    };
  },
  component: SearchPhotoPage,
});
