import { FormEvent, ReactElement, useEffect, useState } from "react";
import { Trailer } from "@/pages/admin";
import supa from "@/utils/supa";
import Modal from "./Modal";

export default function Hero(): ReactElement {
  const [searchWord, setSearchWord] = useState("Ts" as string);
  const [trailers, setTrailers] = useState([] as Array<Trailer>);
  const [baseTrailers, setBaseTrailers] = useState([] as Array<Trailer>);
  const [isModalOpen, setIsModalOpen] = useState(false as boolean);
  const [videoSrc, setVideoSrc] = useState("" as string);
  const [selectedText, setSelectedText] = useState("" as string);

  async function goSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const manipuledData: Array<Trailer> = baseTrailers.filter((x) =>
      x.Titulo.toLowerCase().includes(searchWord.toLowerCase())
    );

    setTrailers(manipuledData);
  }

  async function fetchTrailers() {
    const { data } = await supa.from("trailer").select();
    const manipuledData: Array<Trailer> = (data ?? []).map((x) => {
      return {
        Id: x.id,
        Titulo: x.titulo,
        Año: x["año"],
        Director: x.director,
        Actores: x.actores,
        Resena: x.resena,
        ImagenPortada: x.imagenportada,
        LinkTrailer: x.linktrailer,
      };
    });

    setTrailers(manipuledData);
    setBaseTrailers(manipuledData);
  }

  useEffect(() => {
    fetchTrailers();
  }, []);

  return (
    <div className="container px-6 py-16 mx-auto text-center pt-28">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
          Busca los trailers de tus peliculas favoritas.
        </h1>

        <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:border-gray-700 dark:focus-within:border-blue-300">
          <form className="flex flex-col md:flex-row" onSubmit={(e) => goSearch(e)}>
            <input
              placeholder="Titulo de la pelicula"
              onChange={({ target: { value } }) => setSearchWord(value)}
              className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:placeholder-transparent focus:outline-none focus:ring-0 dark:text-gray-200"
            />

            <button
              type="submit"
              className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-28">
        <div className="container px-4 mx-auto my-12 md:px-12">
          <div className="flex flex-wrap gap-0 -mx-1 lg:-mx-4">
            {trailers.map((x, i) => (
              <div
                className="w-full px-1 my-1 border border-white md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                key={i}
              >
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    alt="Placeholder"
                    className="block w-full h-auto text-white"
                    src={x.ImagenPortada}
                  />

                  <header className="flex items-center justify-between p-2 leading-tight md:p-4">
                    <h1 className="text-lg">
                      <h2
                        className="text-white no-underline hover:underline"
                        onClick={() => {
                          setVideoSrc(x.LinkTrailer);
                          setIsModalOpen(!isModalOpen);
                          setSelectedText(x.Resena);
                        }}
                      >
                        {x.Titulo}
                      </h2>
                    </h1>
                    <p className="text-sm text-white">{x.Año}</p>
                  </header>

                  <footer className="flex items-center justify-between p-2 leading-none md:p-4">
                    <p className="ml-2 text-sm text-white">Director : {x.Director}</p>
                    <br />
                    <p className="ml-2 text-sm text-white">Actores : {x.Actores}</p>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        src={videoSrc}
        close={() => setIsModalOpen(!isModalOpen)}
        text={selectedText}
      />
    </div>
  );
}
