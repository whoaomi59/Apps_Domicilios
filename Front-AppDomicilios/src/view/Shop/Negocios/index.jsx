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
        {/*   <div className="flex flex-wrap gap-3 px-4 py-4">
          {categorias.map((cat) => (
            <span
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm hover:bg-green-200 transition"
            >
              {cat.icono}
              {cat.nombre}
            </span>
          ))}
        </div> */}

        {/* <div className="flex flex-wrap gap-4 justify-center p-4">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center hover:bg-green-100 relative group"
            >
              <span className="text-xl">{cat.icono}</span>
              <div className="absolute bottom-[-30px] bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {cat.nombre}
              </div>
            </button>
          ))}
        </div> */}

        {/* <div className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="min-w-[100px] text-center p-3 bg-white rounded-lg shadow hover:bg-green-100 cursor-pointer"
            >
              <div className="text-2xl">{cat.icono}</div>
              <div className="text-sm mt-2">{cat.nombre}</div>
            </div>
          ))}
        </div> */}

        {/*  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="cursor-pointer bg-white shadow-md hover:shadow-xl transition rounded-xl p-4 flex flex-col items-center"
            >
              <div className="text-3xl mb-2">{cat.icono}</div>
              <p className="text-sm font-semibold text-gray-700">
                {cat.nombre}
              </p>
            </div>
          ))}
        </div> */}

        <div className="flex gap-3 whitespace-nowrap py-3">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition 
          ${
            Filter === cat.id
              ? "bg-green-500 text-white border-green-500 shadow-md"
              : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
          }`}
            >
              <span className="text-xl">{cat.icono}</span>
              <span>{cat.nombre}</span>
            </button>
          ))}
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
