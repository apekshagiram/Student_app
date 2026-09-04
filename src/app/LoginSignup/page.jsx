"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function Login() {
  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();

    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
      return;
    }

    setMessage("✅ Login successful!");

    router.push("/dashboard");
    router.refresh();
  }

  async function handleSignUp() {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
      return;
    }

    setMessage("📩 Account created. Check your email to verify it.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm rounded-xl shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            Login
          </CardTitle>

          <CardDescription>
            Welcome back! Please sign in.
          </CardDescription>

          <CardAction>
            <Button
              variant="link"
              onClick={handleSignUp}
            >
              Create account
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSignIn}
            className="space-y-4"
          >
            <div className="space-y-1">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>

              <Input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.startsWith("❌")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}