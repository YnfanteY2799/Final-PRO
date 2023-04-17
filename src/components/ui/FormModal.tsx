import { FormEvent, ReactElement, useEffect, useState } from "react";
import { Trailer } from "@/pages/admin";

export type FormModalProps = {
  isOpen?: boolean;
  close?: () => void;
  data: Trailer;
  doss?: (s: any) => void;
};

export default function FormModal({
  isOpen,
  close,
  data,
  doss,
}: FormModalProps): ReactElement {
  const [curr, setCurr] = useState({} as Trailer);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    doss && doss(curr);
  }

  function handlePopulate() {
     if (Object.entries(data).length > 1) setCurr(data); 
     else setCurr({} as Trailer)
  }

  useEffect(() => {
    handlePopulate();
  }, [data]);

  return isOpen ? (
    <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center h-screen bg-center bg-no-repeat bg-cover outline-none min-w-screen animated fadeIn faster focus:outline-none">
      <div className="absolute inset-0 z-0 bg-black opacity-80" onClick={close}></div>
      <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white shadow-lg rounded-xl ">
        <div className="justify-center flex-auto p-5 text-center">
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Titulo
              </label>
              <input
                type="text"
                name="Titulo"
                value={curr.Titulo}
                onChange={({ target: { value } }) => setCurr({ ...curr, Titulo: value })}
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Año
              </label>
              <input
                type="number"
                name="anio"
                value={curr["Año"]}
                onChange={({ target: { value } }) => setCurr({ ...curr, Año: value })}
                placeholder="DD/MM/YYYY"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Director(es)
              </label>
              <input
                type="text"
                name="director"
                value={curr.Director}
                onChange={({ target: { value } }) =>
                  setCurr({ ...curr, Director: value })
                }
                placeholder="Directores"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Actor(es)
              </label>
              <input
                type="text"
                name="actor"
                id="subject"
                value={curr.Actores}
                onChange={({ target: { value } }) => setCurr({ ...curr, Actores: value })}
                placeholder="Actores"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Imagen de Portada
              </label>
              <input
                name="image"
                id="subject"
                value={curr.ImagenPortada}
                onChange={({ target: { value } }) =>
                  setCurr({ ...curr, ImagenPortada: value })
                }
                placeholder="Link imagen"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Trailer
              </label>
              <input
                id="subject"
                name="trailer"
                value={curr.LinkTrailer}
                onChange={({ target: { value } }) =>
                  setCurr({ ...curr, LinkTrailer: value })
                }
                placeholder="Link de youtube"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Reseña
              </label>
              <textarea
                name="resenia"
                placeholder=""
                value={curr.Resena}
                onChange={({ target: { value } }) => setCurr({ ...curr, Resena: value })}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* <!--footer--> */}
            <div className="p-3 mt-2 space-x-4 text-center md:block">
              <button
                type="submit"
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
              >
                save
              </button>
              <button
                onClick={close}
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-red-500 border border-red-500 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
