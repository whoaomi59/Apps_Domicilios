import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import Loader from "../../../components/content/loader";

const categorias = [
  { id: "", nombre: "Todos", icono: "🛍️" },
  { id: "1", nombre: "Comida", icono: "🍔" },
  { id: "2", nombre: "Ropa", icono: "👗" },
  { id: "3", nombre: "Tecnología", icono: "💻" },
  { id: "4", nombre: "Hogar", icono: "🏠" },
];

export default function NegociosShop() {
  const [data, setData] = useState([]);
  const [horaActual, setHoraActual] = useState(new Date());
  const [loader, setloader] = useState(false);
  const [Filter, setFilter] = useState("");

  function estaAbierto(horarioInicial, horarioFinal) {
    const ahora = new Date();
    const horaActualMin = ahora.getHours() * 60 + ahora.getMinutes();

    const [horaIni, minIni] = horarioInicial.split(":").map(Number);
    const [horaFin, minFin] = horarioFinal.split(":").map(Number);

    const inicioMin = horaIni * 60 + minIni;
    const finMin = horaFin * 60 + minFin;

    return horaActualMin >= inicioMin && horaActualMin <= finMin;
  }

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        setloader(true);
        const response = await axios.get(
          "/Shop/negocios/controller.php?Get=Get"
        );
        setData(response.data);
        return setloader(false);
      } catch (error) {
        console.log(error);
        return setloader(false);
      }
    };
    fetchNegocios();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const negociosFiltrados = data.filter((item) => {
    if (!Filter || Filter === "") return true;
    return item.categoria_id.toString() === Filter.toString();
  });

  if (loader) {
    return <Loader />;
  }

  return (
    <section>
      <Header setFilter={setFilter} />
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="w-full overflow-x-auto scrollbar-hide  py-4">
          <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-max">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition 
          ${
            Filter === cat.id
              ? "bg-green-400 text-white border-green-400 shadow-md"
              : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
          }`}
              >
                <span className="text-xl">{cat.icono}</span>
                <span>{cat.nombre}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {negociosFiltrados.map((item, index) => {
            const negocioAbierto = estaAbierto(
              item.Horario_inicial,
              item.Horario_final
            );

            return (
              <div key={index} className="relative">
                {item.estado === "0" && negocioAbierto ? (
                  <a
                    href={`/shop/productos/${item.id}`}
                    className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10 relative"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), 
                      url(${item.img ? item.img : img.logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-opacity-30 rounded-md" />
                    <div className="relative z-10">
                      <img
                        src={item.logo}
                        alt="logo"
                        className="inline-block h-16 w-16 object-cover rounded-full bg-white"
                      />
                      <h3 className="text-xl font-semibold text-white">
                        {item.nombre}
                      </h3>
                      <div className="flex mt-2">
                        <span className="text-sm text-gray-100 mr-2">
                          {item.Horario_inicial}
                        </span>
                        <span className="text-sm text-gray-100">
                          {item.Horario_final}
                        </span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10 relative bg-gray-400">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-opacity-30 rounded-md" />
                    <div className="relative z-10">
                      <img
                        src={item.logo}
                        alt="logo"
                        className="inline-block h-16 w-16 object-cover rounded-full  bg-white"
                      />
                      <h3 className="text-xl font-semibold text-white">
                        {item.nombre}
                      </h3>
                      <div className="flex mt-2">
                        <span className="text-sm text-gray-100 mr-2">
                          {item.Horario_inicial}
                        </span>
                        <span className="text-sm text-gray-100">
                          {item.Horario_final}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
