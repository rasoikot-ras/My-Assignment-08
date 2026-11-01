"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await authClient.signUp.email({
        email,
        password,
        name,
        image,
      });

      if (res?.error) {
       
        setErrorMsg(res.error.message || "Registration failed! Email might already be registered.");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setErrorMsg(err?.message || "User already exists or registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>

    
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-300 text-center font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 font-medium"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-bold underline">
          Login
        </Link>
      </p>
    </div>
  );
}