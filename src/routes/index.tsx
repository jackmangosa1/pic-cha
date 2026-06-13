import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p className="text-muted-foreground">Welcome to Pic-Cha!</p>
    </main>
  ),
});
