import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#5D4B8C] px-4 py-8 md:px-6 lg:px-8 text-white ">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Page Keeper</h1>
            </div>
            <p className="text-sm">
              Page Keeper is your trusted online bookstore. We offer a wide
              selection of books across various genres, from fiction to
              non-fiction, fantasy to mystery, and everything in between.
              Whether you're a bookworm or a casual reader, Page Keeper has
              something for everyone.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Our Address</h3>
            <p className="text-sm">
              789 Book Street, Suite 202
              <br />
              City, State, ZIP Code
              <br />
              Country
            </p>
          </div>

          <div className="space-y-6 flex flex-col  ">
            <div className="space-y-6 flex flex-col items-start ">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/about" className="text-sm hover:text-gray-300">
                  About Us
                </Link>
                <Link to="/contact" className="text-sm hover:text-gray-300">
                  Contact
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-sm hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm hover:text-gray-300">
                  Terms & Conditions
                </Link>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/pagekeeper"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/pagekeeper"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/pagekeeper"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/pagekeeper"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Page Keeper. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
