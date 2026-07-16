"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import GoogleIcon from "@/assets/icons/GoogleIcon";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background/60">
        <div className="w-full max-w-full">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <h1 className="text-muted-foreground">Get started with PicCha today</h1>

              </CardHeader>
              <CardContent>
                <form>
                  <FieldGroup>
                    <Field>
                      <Button variant="outline" type="button">
                        <GoogleIcon />
                        Login with Google
                      </Button>
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content] m-4">
                      Or continue with
                    </FieldSeparator>
                    <Field>
                      <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                      <Input
                        className="w-full"
                        id="fullName"
                        type="text"
                        placeholder="Kevin Bahati"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        className="w-full"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <div className="relative">
                        <Input
                          className="w-full"
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                      <div className="relative">
                        <Input
                          className="w-full"
                          id="password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </Field>
                    <Field>
                      <Button type="submit">Sign Up</Button>
                    </Field>
                    <FieldDescription>
                      Already have an account? <a href="/login">Sign in</a>
                    </FieldDescription>
                  </FieldGroup>
                </form>

              </CardContent>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
