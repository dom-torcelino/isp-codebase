"use client";

import { useState, type FormEvent } from "react";
import {Button} from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Static demo: no side effects, no store calls, no API calls
    console.log("Static login form submitted", { email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-1">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          className="w-full border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="demo@example.com"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          className="w-full border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" variant="default" className="w-full">
  <LogIn className="w-4 h-4 mr-2" />
  Sign in. (static demo)
</Button>

      <p className="text-caption text-muted-foreground text-center">
        This is a static demo. Any email/password will work.
      </p>
    </form>
  );
}
