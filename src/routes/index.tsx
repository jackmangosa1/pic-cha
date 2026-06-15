import { createFileRoute } from "@tanstack/react-router";
import { CollectionListPage } from "@/pages/CollectionListPage";

export const Route = createFileRoute("/")({
  component: CollectionListPage,
});
