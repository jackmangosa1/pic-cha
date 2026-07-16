import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import GoogleIcon from "@/assets/icons/GoogleIcon";

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background/60">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <div >
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <h1 className="text-muted-foreground">Sign in to your account to continue</h1>

            </CardHeader>
            <CardContent>
              <form>
                <FieldGroup >
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
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
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
                  <a
                    href="/resetPassword"
                    className="ml-auto text-sm underline-offset-4 hover:underline hover:text-primary"
                  >
                    Forgot your password?
                  </a>
                  <Field>
                    <Button type="submit">Login</Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="/signup">Sign up</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </div>
        </div >
      </div>
    </div>

  );
}
