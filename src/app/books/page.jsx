"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const categories = ["All", "Story", "Tech", "Science"];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search books by title..."
          className="border px-4 py-2 rounded-md w-full max-w-xl text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg h-fit border">
          <h3 className="font-bold text-base mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    selectedCategory === cat ? "bg-black text-white font-medium" : "hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                <img src={book.image_url} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">{book.category}</span>
                  <h2 className="font-bold text-base mt-2">{book.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">By {book.author}</p>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/books/${book.id}`} className="bg-black text-white px-3 py-1 rounded text-xs">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">No books found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
