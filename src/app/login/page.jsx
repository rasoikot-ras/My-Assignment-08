"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.error) {
        setErrorMsg(res.error.message || "Invalid email or password!");
      } else {
        router.push("/");
      }
    } catch (err) {
      setErrorMsg("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setErrorMsg("Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-300 text-center font-medium">
          {errorMsg}
        </div>
      )}

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        type="button"
        disabled={googleLoading}
        className="w-full mb-6 flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.15v3.14C3.16 21.32 7.22 24 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.39-1.5-.39-2.24s.14-1.52.39-2.24V6.62H1.15C.42 8.08 0 9.71 0 12s.42 3.92 1.15 5.38l4.12-3.14z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.16 2.68 1.15 6.62l4.12 3.14c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
        {googleLoading ? "Connecting..." : "Continue with Google"}
      </button>

      <div className="relative mb-6 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
        <span className="relative bg-white px-2 text-xs text-gray-500 uppercase">Or login with email</span>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 font-medium flex items-center justify-center text-sm transition"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="font-bold underline">
          Register here
        </Link>
      </p>
    </div>
  );
}