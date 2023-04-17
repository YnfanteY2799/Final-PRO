import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import supa from "@/utils/supa";
import FormModal from "@/components/ui/FormModal";
import NavbarAdmin from "@/components/ui/NavbarAdmin";

export type Trailer = {
  Id: number;
  Titulo: string;
  Año: string;
  Director: string;
  Actores: string;
  Resena: string;
  ImagenPortada: string;
  LinkTrailer: string;
};

export default function AdminPage(): ReactElement {
  const { push } = useRouter();

  const [sdata, setSData] = useState([] as Array<Trailer>);
  const [isModalOpen, setIsModalOpen] = useState(false as boolean);
  const [currentMov, setCurrentMov] = useState({} as Trailer);

  const getTrailers = async () => {
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

    setSData(manipuledData);
  };

  function editNumber(id: number) {
    setCurrentMov(sdata.filter((x) => x.Id === id)[0]);
    setIsModalOpen(!isModalOpen);
  }

  async function deleteRow(id: number) {
    const { data } = await supa.from("trailer").delete().eq("id", id).select();
    setSData((_) => _.filter((x) => x.Id !== (data ?? [])[0].id));
  }

  async function addRow(userData: Trailer): Promise<void> {
    if (!sdata.map((x) => x.Id).includes(userData.Id)) {
      await supa.from("trailer").insert({
        id: sdata.length + 2,
        titulo: userData.Titulo,
        año: userData["Año"],
        director: userData.Director,
        actores: userData.Actores,
        resena: userData.Resena,
        imagenportada: userData.ImagenPortada,
        linktrailer: userData.LinkTrailer,
      });
    } else {
      await supa
        .from("trailer")
        .update({
          id: userData.Id,
          titulo: userData.Titulo,
          año: userData["Año"],
          director: userData.Director,
          actores: userData.Actores,
          resena: userData.Resena,
          imagenportada: userData.ImagenPortada,
          linktrailer: userData.LinkTrailer,
        })
        .eq("id", userData.Id);
    }

    getTrailers();
    setIsModalOpen(false);
  }

  useEffect(() => {
    const isAdmin = localStorage.getItem("IsAdmin");
    if (isAdmin !== "true") push("/");

    getTrailers();
  }, []);

  return (
    <>
      <NavbarAdmin
        add={() => {
          setIsModalOpen(!isModalOpen);
          setCurrentMov({} as Trailer);
        }}
        logout={() => {
          localStorage.removeItem("IsAdmin");
          push("/");
        }}
      />
      <div className="container px-4 mx-auto my-12 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {sdata.map((x, i) => (
            <div className="w-full px-1 my-1 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={i}>
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

                <footer className="items-center justify-between p-2 leading-none md:p-4">
                  <p className="ml-2 text-sm">Director : {x.Director}</p>
                  <p className="ml-2 text-sm">Actores : {x.Actores}</p>
                  <p className="flex justify-between ml-2 text-sm">
                    Acciones : <button onClick={() => editNumber(x.Id)}>editar</button>
                    <button onClick={() => deleteRow(x.Id)}>borrar</button>
                  </p>
                </footer>
              </article>
            </div>
          ))}
        </div>

        <FormModal
          isOpen={isModalOpen}
          close={() => {
            setIsModalOpen(!setIsModalOpen);
            setCurrentMov({} as Trailer);
          }}
          doss={addRow}
          data={currentMov}
        />
      </div>
    </>
  );
}
