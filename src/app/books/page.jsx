"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.error("Error loading books:", err))
      .finally(() => setLoading(false));
  }, []);

  
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="text-center py-20 text-sm font-medium">Loading books...</div>;
  }

  const categories = ["All", "Story", "Tech", "Science"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>
      
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search books by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {/* Main Layout with Sidebar and Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Category Sidebar */}
        <div className="md:col-span-1 bg-white border p-4 rounded-xl shadow-sm h-fit">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Categories</h3>
          <div className="flex flex-col space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Book Cards Grid */}
        <div className="md:col-span-3">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-sm">No books found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="border bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={book.image_url} alt={book.title} className="w-full h-48 object-cover rounded-md mb-3" />
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-medium">{book.category}</span>
                    <h2 className="font-bold text-lg line-clamp-1 mt-1">{book.title}</h2>
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
          )}
        </div>
      </div>
    </div>
  );
}