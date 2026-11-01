import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
   
      <h1 className="text-7xl md:text-9xl font-extrabold text-gray-900 tracking-widest">
        404
      </h1>
      
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute font-semibold mb-16">
        Page Not Found
      </div>

    
      <p className="text-gray-600 text-lg md:text-xl max-w-md mt-4 mb-8">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      
      <Link
        href="/"
        className="bg-black text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-800 transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}