import { createFileRoute } from "@tanstack/react-router";
import { FolderDetailPage } from "@/pages/FolderDetailPage";

export const Route = createFileRoute("/collections/$id/folders/$folderId")({
  validateSearch: (search: Record<string, unknown>) => ({
    folderName: String(search.folderName ?? "Folder"),
    collectionName: String(search.collectionName ?? "Collection"),
    createdAt: String(search.createdAt ?? ""),
  }),
  component: FolderDetailPage,
});
