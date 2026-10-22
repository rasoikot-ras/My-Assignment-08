"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/profile");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-center">Update Information</h2>
        <form onSubmit={handleUpdate} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="url"
              className="w-full border px-3 py-2 rounded-md"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-medium" disabled={loading}>
            {loading ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}