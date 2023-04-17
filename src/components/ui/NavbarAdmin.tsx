import Link from "next/link";
import { ReactElement } from "react";

export default function Navbar({ add = () => {}, logout = () => {} }): ReactElement {
  return (
    <nav className="container p-6 mx-auto lg:flex lg:items-center lg:justify-between bg-slate-600">
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

      <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent">
        <button
          className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-300 transform border rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 lg:mt-0 lg:w-auto"
          onClick={add}
        >
          Añadir
        </button>
        <button
          className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-300 transform border rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 lg:mt-0 lg:w-auto"
          onClick={logout}
        >
          Salir
        </button>
      </div>
    </nav>
  );
}
