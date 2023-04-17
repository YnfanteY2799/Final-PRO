import { ReactElement } from "react";

export default function Modal({
  isOpen = false,
  src = "",
  close = () => {},
  text = "",
}): ReactElement {
  return isOpen ? (
    <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center h-screen bg-center bg-no-repeat bg-cover outline-none min-w-screen animated fadeIn faster focus:outline-none">
      <div className="absolute inset-0 z-0 bg-black opacity-80" onClick={close}></div>
      <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white shadow-lg rounded-xl ">
        {/* <!--content--> */}
        <div className="">
          {/* <!--body--> */}
          <div className="justify-center flex-auto p-5 text-center">
            <iframe
              width="450"
              height="350"
              src={src ?? "https://www.youtube.com/embed/tTfNxgGP0qw"}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p>
              <h2>RESEÑA :</h2>
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
