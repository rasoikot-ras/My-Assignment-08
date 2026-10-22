"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setFeaturedBooks(data.slice(0, 4)));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 py-6">
      <section className="bg-gray-50 border rounded-2xl py-16 px-6 text-center">
        <h1 className="text-4xl font-black mb-4">Find Your Next Read</h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto mb-6">
          Explore a vast digital library collection, filter by categories, and borrow titles instantly.
        </p>
        <Link href="/books" className="bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium">
          Browse Now
        </Link>
      </section>

      <section className="bg-gray-100 py-2.5 px-4 rounded-md text-xs font-medium overflow-hidden">
        <div className="whitespace-nowrap animate-pulse">
          📢 New Arrivals: Clean Code & The Alchemist | Special Discount on Annual Memberships Available Now!
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <img src={book.image_url} alt={book.title} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-sm truncate">{book.title}</h3>
                <p className="text-xs text-gray-500 mt-1">By {book.author}</p>
                <div className="mt-4 flex justify-end">
                  <Link href={`/books/${book.id}`} className="bg-black text-white px-3 py-1 rounded text-xs">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border p-6 rounded-xl bg-gray-50 text-center">
        <h2 className="text-xl font-bold mb-4">Why Choose Our Library?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>⚡ Instant Digital Borrowing</div>
          <div>🛡️ Secure Authentication</div>
          <div>📚 Diverse Categories</div>
        </div>
      </section>

      <section className="pb-8 text-center">
        <h2 className="text-xl font-bold mb-4">Trusted Readers</h2>
        <p className="text-sm text-gray-600 italic">"The best platform to manage and explore books seamlessly!"</p>
      </section>
    </div>
  );
}