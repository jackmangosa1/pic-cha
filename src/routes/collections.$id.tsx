import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CollectionProvider } from "@/contexts/CollectionContext";

export const Route = createFileRoute("/collections/$id")({
  component: function CollectionLayout() {
    return (
      <CollectionProvider>
        <Outlet />
      </CollectionProvider>
    );
  },
});
