import App from "../App";
import { LoginForm } from "@/features/auth";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-8">
      {/* <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-2xl">ISP Platform</h1>
          <p className="text-muted-foreground">
            Static frontend demo with mock data
          </p>
        </header>

        <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 className="mb-4">Sign In</h2>
          <LoginForm />
        </section>

        <footer className="text-center text-caption text-muted-foreground">
          <Link href="/dashboard" className="underline hover:text-foreground transition-colors">
            Skip to Dashboard →
          </Link>
        </footer>
      </div> */}
      <App />
    </main>
  );
}
