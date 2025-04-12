import axios from "axios";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header({ setFilter }) {
  const [empresa, setEmpresa] = useState({});
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          "/api/categorias_negocios/controller.php"
        );
        setData(response.data);
      } catch (error) {
        alert("Error al obtener negocios: " + error);
      } finally {
        setLoader(false);
      }
    };
    fetchNegocios();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData([]);
    } else {
      const resultados = data.filter((negocio) =>
        negocio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(searchTerm);
      setFilteredData(resultados);
    }
  }, [searchTerm, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = data.find((neg) =>
      neg.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (found) {
      setFilter(found.id);
    }
  };

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
              onSubmit={handleSubmit}
              className="flex relative w-full max-w-lg border border-solid border-gray-300 p-1 focus-within:outline focus-within:outline-2"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex-1 h-9 w-full bg-white px-3 py-2 text-sm text-black focus:outline-none"
                  placeholder="Buscar Por Categorias...."
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredData.length > 0 && (
                  <ul className="absolute top-full mt-1 z-10 w-full bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-md shadow-md">
                    {filteredData.map((negocio, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSearchTerm(negocio.nombre);
                          setFilter(negocio.id);
                          setFilteredData([]);
                        }}
                      >
                        {negocio.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                className="relative w-auto cursor-pointer bg-green-500 px-6 py-2 text-center font-semibold text-white"
              >
                <MagnifyingGlassIcon className="w-5" />
              </button>
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
