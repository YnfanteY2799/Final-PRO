import supa from "@/utils/supa";
import { ReactElement, useEffect, useState } from "react";

export type Trailer = {
  Titulo: string;
  Año: string;
  Director: string;
  Actores: string;
  Resena: string;
  ImagenPortada: string;
  LinkTrailer: string;
};

export default function AdminPage(): ReactElement {
  const [sdata, setSData] = useState([] as Array<Trailer>);

  const getTrailers = async () => {
    const { data } = await supa.from("trailer").select();
    const manipuledData: Array<Trailer> = (data ?? []).map((x) => {
      return {
        Titulo: x.titulo,
        Año: x["año"],
        Director: x.director,
        Actores: x.actores,
        Resena: x.resena,
        ImagenPortada: x.imagenportada,
        LinkTrailer: x.linktrailer,
      };
    });

    setSData(manipuledData);
  };

  useEffect(() => {
    getTrailers();
  }, []);

  return (
    <div className="container px-4 mx-auto my-12 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {sdata.map((x) => (
          <div className="w-full px-1 my-1 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  className="block w-full h-auto"
                  src={x.ImagenPortada}
                />
              </a>

              <header className="flex items-center justify-between p-2 leading-tight md:p-4">
                <h1 className="text-lg">
                  <a className="text-black no-underline hover:underline" href="#">
                    {x.Titulo}
                  </a>
                </h1>
                <p className="text-sm text-grey-darker">{x.Año}</p>
              </header>

              <footer className="flex items-center justify-between p-2 leading-none md:p-4">
                <p className="ml-2 text-sm">Director : {x.Director}</p>
                <br />
                <p className="ml-2 text-sm">Actores : {x.Actores}</p>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
