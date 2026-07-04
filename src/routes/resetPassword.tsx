import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resetPassword")({
  component: ResetPasswordPage,
});
