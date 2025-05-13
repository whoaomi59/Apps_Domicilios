import { useState } from "react";
import Header from "../header";
import Navbar from "../navbar";

export default function Container({ children, usuarios, Roles, nombre }) {
  const [statemenu, setstatemenu] = useState(false);

  const Toggle = () => {
    setstatemenu(true);
  };

  return (
    <div className="relative font-[sans-serif] pt-[70px] h-screen">
      <Header usuarios={usuarios} Toggle={Toggle} nombre={nombre} />
      <div>
        <div className="flex items-start">
          <Navbar toggle={statemenu} Roles={Roles} />
          <button
            onClick={() => setstatemenu((prev) => !prev)}
            className="lg:hidden w-8 h-8 z-[100] fixed top-[74px] left-[10px] cursor-pointer bg-green-500 flex items-center justify-center rounded-full outline-none transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              className="w-3 h-3"
              viewBox="0 0 55.752 55.752"
            >
              <path
                d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
                data-original="#000000"
              />
            </svg>
          </button>

          <section className="main-content w-full overflow-auto p-6">
            <div className="overflow-x-auto">{children}</div>
            <footer className="w-full bg-gray-100 text-center py-4 mt-4 ">
              <p className="text-sm text-gray-600">
                Desarrollado por{" "}
                <span className="font-semibold text-green-600">
                  [Jhon Mario Chilito]
                </span>{" "}
                — Apasionado por crear soluciones web modernas y eficientes.
                💻🚀
              </p>
              <div className="mt-2 flex justify-center gap-4 text-gray-500 text-sm">
                <a
                  href="https://github.com/whoaomi59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/jhon-mario-chilito-calderon-b3b41b20a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:whoaomi11@gmail.com"
                  className="hover:text-green-600 transition"
                >
                  Contáctame
                </a>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
