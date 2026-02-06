"use client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

// This function is a React component called Login
// It represents the login page UI + logic
export default function Login() {
  // useState hook to store the user's email input
  // email → current value
  // setEmail → function to update email
  const [email, setEmail] = useState("");

  // useState hook to store the user's password input
  const [password, setPassword] = useState("");

  // useState hook to store messages
  // Used for showing errors or success messages to the user
  const [message, setMessage] = useState("");

  // Create a Supabase client that works in the browser
  // This lets us talk to Supabase Auth (login/signup)
  const supabase = createBrowserSupabaseClient();

  // Function that runs when user clicks "Login"
  // "async" because we call Supabase (server request)
  async function handleSignIn(e) {
    // Prevents the browser from refreshing the page
    // (default behavior of HTML forms)
    e.preventDefault();

    // Clear any old message before starting login
    setMessage("");

    // Call Supabase to sign in using email & password
    // Destructure the "error" from the response
    const { error } = await supabase.auth.signInWithPassword({
      email, // email entered by the user
      password, // password entered by the user
    });

    // If Supabase returns an error (wrong password, no user, etc.)
    if (error) {
      // Show the error message to the user
      setMessage(`❌ ${error.message}`);
      return; // Stop the function here
    }

    // If login is successful, show success message
    setMessage("✅ Login successful! Redirecting...");

    // Redirect user to Mainpage after login
    // (Simple redirect method)
    window.location.href = "/Mainpage";
  }

  // Function that runs when user clicks "Sign Up"
  async function handleSignUp() {
    // Clear previous messages
    setMessage("");

    // Call Supabase to create a new user account
    const { error } = await supabase.auth.signUp({
      email, // new user's email
      password, // new user's password
    });

    // If signup fails (email exists, weak password, etc.)
    if (error) {
      // Show error message
      setMessage(`❌ ${error.message}`);
      return; // Stop execution
    }

    // If signup succeeds, tell user to verify email
    setMessage("📩 Check your email to confirm.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm rounded-xl shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">Login</CardTitle>
          <CardDescription>Welcome back! Please sign in.</CardDescription>

          <CardAction>
            <Button variant="link" onClick={handleSignUp}>
              Create account
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.startsWith("❌") ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
