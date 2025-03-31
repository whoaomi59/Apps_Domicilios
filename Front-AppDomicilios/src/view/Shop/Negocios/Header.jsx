import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const [empresa, setEmpresa] = useState({});
  useEffect(() => {
    const Get = async () => {
      try {
        const response = await axios.get("/api/empresas/controller.php");
        return setEmpresa(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, []);
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="grid items-center gap-8 sm:gap-20 md:grid-cols-2">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl md:leading-snug text-green-500">
              {empresa.nombre}
            </h2>
            <div className="mb-6 max-w-lg text-sm text-gray-500 sm:text-base md:mb-12">
              <p>
                {empresa.descripcion}, {empresa.direccion}
              </p>
              <p>{empresa.email}</p>
              <p>{empresa.telefono}</p>
            </div>

            {/* Form */}
            <form
              name="email-form"
              method="get"
              className="flex relative w-full max-w-lg border border-solid border-gray-300 p-1 focus-within:outline focus-within:outline-2"
            >
              <input
                type="email"
                className="flex-1 h-9 w-full bg-white px-3 py-6 text-sm text-black focus:outline-none"
                placeholder="Buscar Negocio...."
                required=""
              />
              <input
                type="submit"
                value="Buscar"
                className="relative w-auto cursor-pointer bg-green-500 px-6 py-2 text-center font-semibold text-white"
              />
            </form>
          </div>
          <div>
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/burger-king-banner-design-template-a886c11d0e725b8a66d051fb64b63064_screen.jpg?ts=1733380826"
              alt=""
              className="mx-auto inline-block h-full w-full max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
