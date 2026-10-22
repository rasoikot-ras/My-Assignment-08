const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
        <div>
          <h3 className="font-black text-black text-base mb-1">BookHaven</h3>
          <p className="text-xs">Digital library platform for seamless book borrowing[cite: 1].</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-bold text-black mb-2">Contact Us</h4>
          <p className="text-xs">Email: support@bookhaven.com</p>
          <p className="text-xs">Phone: +880 1234 567890</p>
        </div>

        <div className="flex gap-4 text-xs font-medium">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">Instagram</a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-6 border-t pt-4">
        © 2026 BookHaven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;