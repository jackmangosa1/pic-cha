import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft, KeyIcon } from "lucide-react";

export const ResetPasswordPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-16 py-12 md:px-96">
      <KeyIcon size={52} />

      <div className="space-y-3 mt-8">
        <h1 className="text-3xl font-bold  text-center">
          Forgot your password?
        </h1>
        <h1 className="text-gray-400 text-sm">
          Enter your email so that we can send you the password reset code
        </h1>
      </div>

      <Field className="mt-24 w-full">
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          className="rounded-2xl"
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </Field>
      <Button className="bg-primary text-white rounded-2xl md:px-66 px-42 mt-5">
        Send Email
      </Button>

      <a href="/login">
        <div className="flex items-center justify-center mt-5 hover:font-bold cursor-pointer">
          <ArrowLeft size={20} />
          <h1>Back to Login</h1>
        </div>
      </a>
    </section>
  );
};
