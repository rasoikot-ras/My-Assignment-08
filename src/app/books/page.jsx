"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.error("Error loading books:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20 text-sm font-medium">Loading books...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search books by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="border bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <img src={book.image_url} alt={book.title} className="w-full h-48 object-cover rounded-md mb-3" />
              <h2 className="font-bold text-lg line-clamp-1">{book.title}</h2>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
            </div>
            <Link
              href={`/books/${book.id}`}
              className="mt-4 block text-center bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}