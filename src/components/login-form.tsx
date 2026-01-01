import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import React, { useState } from "react";
import { fetchProfileThunk, loginUserThunk } from "@/features/user/user.thunk";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "@/features/user/user.slice";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    const actionResult = await dispatch(
      loginUserThunk({ email: email.trim(), password })
    );

    if (loginUserThunk.fulfilled.match(actionResult)) {
      const profileAction = await dispatch(fetchProfileThunk());

      const user = profileAction.payload;
      if (user?.role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      return;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="john@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </Field>
              {error && (
                <span className="text-sm text-red-500 font-medium text-left">
                  {error}
                </span>
              )}
              <Field>
                <Button type="submit" disabled={loading.signInLoading}>
                  {loading.signInLoading ? "Loading" : "Sign in"}
                </Button>
                <FieldDescription className="text-center font-medium">
                  Don&apos;t have an account?{" "}
                  <Link to={"/signup"}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
