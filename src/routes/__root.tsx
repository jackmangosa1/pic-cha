import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CollectionProvider } from "@/contexts/CollectionContext";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <CollectionProvider>
      <Navbar />
      <Outlet />
    </CollectionProvider>
  );
}
