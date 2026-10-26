"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

function BookDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === String(id));
        setBook(found || null);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, [id]);

  const handleBorrow = () => {
    if (!session) {
      toast.error("Please login to borrow this book!");
      router.push("/login");
      return;
    }
    toast.success(`Successfully borrowed "${book?.title}"!`);
  };

  if (!book) return <div className="text-center py-20 text-sm">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border p-6 rounded-xl shadow-sm">
        <div>
          <img src={book.image_url} alt={book.title} className="w-full h-96 object-cover rounded-lg" />
        </div>
        <div className="space-y-4">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">{book.category}</span>
          <h1 className="text-2xl font-black">{book.title}</h1>
          <p className="text-sm text-gray-600 font-medium">Author: {book.author}</p>
          <p className="text-sm text-gray-700">{book.description}</p>
          <p className="text-sm font-semibold text-black">Available Quantity: {book.available_quantity} copies left</p>

          <button
            onClick={handleBorrow}
            disabled={book.available_quantity === 0}
            className="w-full bg-black text-white py-2 rounded-md text-sm font-medium mt-4 hover:bg-gray-800 transition"
          >
            {book.available_quantity > 0 ? "Borrow This Book" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm">Loading...</div>}>
      <BookDetailsContent />
    </Suspense>
  );
}