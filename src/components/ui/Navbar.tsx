import Link from "next/link";
import { ReactElement } from "react";

export default function Navbar(): ReactElement {
  return (
    <nav className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
      <div className="flex items-center justify-between">
        <div>
          <Link
            className="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
            href="/"
          >
            Trailers_JCRC
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent">
        <Link
          className="mt-4 block h-10 transform rounded-md border px-5 py-2 text-center text-sm capitalize text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 lg:mt-0 lg:w-auto"
          href="/login"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
