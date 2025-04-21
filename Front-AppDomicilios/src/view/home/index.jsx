import axios from "axios";
import { useEffect, useState } from "react";
import { handleWhatsappClick } from "../../API/Whassapp";
import Loader from "../../components/content/loader";

export default function Home() {
  const [empresa, setEmpresa] = useState({});
  const [loader, setloader] = useState(false);
  let texto =
    "Hola, Sr. Administrador. ¿Podría ayudarme con un domiciliario, por favor?";
  useEffect(() => {
    const Get = async () => {
      try {
        setloader(true);
        const response = await axios.get("/api/empresas/controller.php");
        setEmpresa(response.data[0]);

        return setloader(false);
      } catch (error) {
        console.log(error);
        return setloader(false);
      }
    };
    Get();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center mt-20">
        <div>
          <h1 class="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
            {empresa.nombre ? empresa.nombre : "Pagina Web"}
            <span class="text-green-500 ml-2">
              {empresa.descripcion ? empresa.descripcion : "Domicilios"}
            </span>
          </h1>
          <label class="mt-3 text-lg text-gray-800">
            {empresa.email}
            <br />
            {empresa.direccion}
          </label>

          <div class="mt-7 grid gap-3 w-full sm:inline-flex">
            <button
              onClick={() => handleWhatsappClick(texto)}
              class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-700  disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              Domiciliario
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <a
              class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-400 hover:text-white"
              href="/shop/negocios"
            >
              Comprar
            </a>
          </div>

          <div class="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
            <a
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary "
            >
              <span className="mr-2">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12.6152" r="12" fill="#00C951" />
                  <rect
                    x="7.99893"
                    y="14.979"
                    width="8.18182"
                    height="1.63636"
                    fill="white"
                  />
                  <rect
                    x="11.2717"
                    y="7.61523"
                    width="1.63636"
                    height="4.09091"
                    fill="white"
                  />
                  <path
                    d="M12.0898 14.1606L14.9241 11.0925H9.25557L12.0898 14.1606Z"
                    fill="white"
                  />
                </svg>
              </span>
              Download App
            </a>
          </div>
        </div>

        <div class="relative ms-4">
          <img
            class="w-full rounded-md h-100"
            /*  src="/SVG PAGINA/undraw_pair-programming_9jyg.svg" */
            src={
              empresa.logo
                ? empresa.logo
                : "/SVG PAGINA/undraw_pair-programming_9jyg.svg"
            }
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
  );
}
