"use client";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="text-center py-20 text-sm">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white border p-8 rounded-xl shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <img
            src={session?.user?.image || "https://via.placeholder.com/150"}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>
        <h1 className="text-2xl font-black mb-1">{session?.user?.name || "User Name"}</h1>
        <p className="text-sm text-gray-500 mb-6">{session?.user?.email || "user@example.com"}</p>

        <div className="flex justify-center gap-4">
          <Link
            href="/profile/update"
            className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
          >
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}