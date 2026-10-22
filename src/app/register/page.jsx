"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUp.email({ name, email, password, image: photoUrl });
      if (res.error) {
        toast.error(res.error.message || "Registration failed!");
      } else {
        toast.success("Registration Successful! Please Login.");
        router.push("/login");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google authentication failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4 my-6">
      <div className="w-full max-w-md border p-6 rounded-xl shadow-sm bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" className="w-full border px-3 py-2 rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" className="w-full border px-3 py-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Photo URL</label>
            <input type="url" className="w-full border px-3 py-2 rounded-md" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input type="password" className="w-full border px-3 py-2 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-medium" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="divider my-4 text-xs text-gray-400 text-center">OR</div>
        <button onClick={handleGoogleLogin} className="w-full border py-2 rounded-md font-medium text-sm">
          Continue with Google
        </button>
        <p className="text-xs text-center mt-4">
          Already have an account? <Link href="/login" className="font-semibold underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}