import { FormEvent, ReactElement, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from "next/router";

import { toast, Toaster } from "react-hot-toast";
import supa from "@/utils/supa";

export type Users = {
  id: number;
  nombre: string;
  password: string;
};

export type User = {
  nombre: string;
  password: string;
};

export default function LoginPage(): ReactElement {
  // Hooks
  const { push } = useRouter();

  // Estado
  const [us, setUs] = useState({} as User);

  async function doSmit(e: FormEvent) {
    e.preventDefault();

    const { data } = await supa.from("usuario").select().eq("nombre", us.nombre);

    const userExists = (data ?? []).filter(({ password }) => password === us.password);

    if (userExists.length > 0) {
      toast.success("Credenciales correctas, se le redireccionara acontinuacion");

      setTimeout(() => push("/admin"), 5000);
      localStorage.setItem("IsAdmin", "true");
    } else {
      toast.error("Las credenciales provistas no son las correspondientes");
      localStorage.setItem("IsAdmin", "false");
    }
  }

  return (
    <div className="flex h-screen">
      {/* Izquierda */}

      <div className="items-center justify-around hidden w-full bg-black lg:flex lg:w-1/2">
        <div className="inset-0 z-0 bg-black opacity-20" />
        <div className="flex-col items-center w-full px-20 mx-auto space-y-6">
          <h1 className="font-sans text-4xl font-bold text-white">Simple App</h1>
          <p className="mt-1 text-white">The simplest app to use</p>
          <div className="flex justify-center mt-6 lg:justify-start">
            <a
              href="#"
              className="px-4 py-2 mt-4 mb-2 font-bold text-indigo-800 transition-all duration-500 bg-white hover:bg-indigo-700 hover:text-white hover:-translate-y-1 rounded-2xl"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Derecha */}
      <div className="flex items-center justify-center w-full space-y-8 bg-white lg:w-1/2">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="p-5 bg-white rounded-md shadow-2xl" onSubmit={doSmit}>
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello Again!</h1>
            <p className="mb-8 text-sm font-normal text-gray-600">Welcome Back</p>
            <div className="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl">
              <AiOutlineMail />
              <input
                className="w-full pl-2 border-none outline-none "
                name="email"
                placeholder="Email Address"
                onChange={({ target: { value } }) => setUs({ ...us, nombre: value })}
              />
            </div>
            <div className="flex items-center px-3 py-2 mb-12 border-2 rounded-2xl ">
              <RiLockPasswordLine />
              <input
                className="w-full pl-2 border-none outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={({ target: { value } }) => setUs({ ...us, password: value })}
              />
            </div>
            <button
              type="submit"
              className="block w-full py-2 mt-5 mb-2 font-semibold text-white transition-all duration-500 bg-indigo-600 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1"
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <span className="ml-2 text-sm transition-all duration-500 cursor-pointer hover:text-blue-500 hover:-translate-y-1">
                Forgot Password ?
              </span>

              <a
                href="#"
                className="ml-2 text-sm transition-all duration-500 cursor-pointer hover:text-blue-500 hover:-translate-y-1"
              >
                Don't have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
