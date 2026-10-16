"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="border-b px-4 bg-white">
      <nav className="flex justify-between items-center py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Link href={"/"} className="font-black text-xl">
            BookHaven
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/books"}>All Books</Link></li>
          {session && <li><Link href={"/profile"}>My Profile</Link></li>}
        </ul>

        <div className="flex items-center gap-4 text-sm">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link
                href={"/login"}
                className="bg-black text-white px-4 py-1.5 rounded-md text-xs font-medium hover:bg-gray-800 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;