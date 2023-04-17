import { FormEvent, ReactElement, useEffect, useState } from "react";
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
  const [users, setUsers] = useState([] as Array<Users>);
  const [us, setUs] = useState({} as User);

  async function getInitialUsers() {
    const { data } = await supa.from("usuario").select();

    const uData: Array<Users> = (data ?? []).map(({ id, nombre, password }) => {
      return {
        id,
        nombre,
        password,
      };
    });

    setUsers([...uData]);
  }

  function doSmit(e: FormEvent) {
    e.preventDefault();
    const userExists = users.filter(
      (x) => x.nombre === us.nombre && x.password === us.password
    ).length;

    if (userExists > 0) {
      toast.success("Credenciales correctas, se le redireccionara acontinuacion");

      setTimeout(() => push("/"), 5000);
    } else {
      toast.error("Las credenciales provistas no son las correspondientes");
    }
  }

  useEffect(() => {
    getInitialUsers();
  }, []);

  return (
    <div className="h-screen flex">
      {/* Izquierda */}

      <div className="hidden lg:flex w-full lg:w-1/2 bg-black justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0" />
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="#"
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Derecha */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={doSmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <AiOutlineMail />
              <input
                className=" pl-2 w-full outline-none border-none"
                name="email"
                placeholder="Email Address"
                onChange={({ target: { value } }) => setUs({ ...us, nombre: value })}
              />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <RiLockPasswordLine />
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={({ target: { value } }) => setUs({ ...us, password: value })}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                Forgot Password ?
              </span>

              <a
                href="#"
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
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
