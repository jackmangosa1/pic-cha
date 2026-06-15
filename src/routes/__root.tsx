import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
    </div>
  ),
});
