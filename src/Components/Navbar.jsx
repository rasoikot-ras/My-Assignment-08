"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="border-b px-2 bg-base-100">
      <nav className="flex justify-between items-center py-3 max-w-7xl mx-auto w-full">
        {/* Left: Website Logo (links to Home) */}
        <div className="flex gap-2 items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <h3 className="font-black text-xl text-primary">📚 BookHaven</h3>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li>
            <Link href={"/"} className="hover:text-primary transition">Home</Link>
          </li>
          <li>
            <Link href={"/books"} className="hover:text-primary transition">All Books</Link>
          </li>
          {session && (
            <li>
              <Link href={"/profile"} className="hover:text-primary transition">My Profile</Link>
            </li>
          )}
        </ul>

        {/* Right: Conditional Rendering (Login/Logout & User Name) */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm hidden sm:inline">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="btn btn-error btn-sm text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <Link href={"/login"} className="btn btn-primary btn-sm">
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