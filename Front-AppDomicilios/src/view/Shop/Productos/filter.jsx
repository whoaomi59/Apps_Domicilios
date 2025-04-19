import { ArrowLeftCircleIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DynamicSelect from "../../../components/grid/formulario/DynamicSelect ";

export default function FilterProduct({
  children,
  name,
  setidNegocio,
  setidproductos,
}) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const FilterButton = (e) => {
    e.preventDefault();
    try {
      setidNegocio(formData.Negocio);
      setidproductos(formData.productos);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <section class="relative">
      <div class="w-full max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full">
          <div className="flex">
            <a href="/shop/negocios" className="mr-3">
              <ArrowLeftCircleIcon className="w-10 text-green-500 hover:text-green-700" />
            </a>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Productos, {name}
            </h2>
          </div>
          <div class="relative w-full max-w-sm">
            <DynamicSelect
              url="/api/productos/categorias_productos.php"
              name="productos"
              value={formData["productos"]}
              onChange={handleChange}
              valueKey="id"
              labelKey="nombre"
              placeholder="Filtrar categorias"
              style="text-gray-500"
            />
            <FunnelIcon className="absolute top-1/2 -translate-y-1/2 right-4 z-50 w-5 text-gray-600" />
          </div>
        </div>

        <svg
          class="my-7 w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="1216"
          height="2"
          viewBox="0 0 1216 2"
          fill="none"
        >
          <path d="M0 1H1216" stroke="#E5E7EB" />
        </svg>
        <div class="grid grid-cols-12">
          <div class="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
            <div class="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <h6 class="font-medium text-base leading-7 text-black mb-5">
                Precios
              </h6>
              <div class="flex items-center mb-5 gap-1">
                <div class="relative w-full">
                  <select
                    id="FROM"
                    class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                  >
                    <option selected>Min</option>
                    <option value="option 1">1.000</option>
                    <option value="option 2">2.000</option>
                    <option value="option 3">3.000</option>
                    <option value="option 4">4.000</option>
                  </select>
                  <svg
                    class="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                      stroke="#111827"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p class="px-1 font-normal text-sm leading-6 text-gray-600">
                  to
                </p>
                <div class="relative w-full">
                  <select
                    id="FROM"
                    class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
                  >
                    <option selected>Max</option>
                    <option value="option 1">10.000</option>
                    <option value="option 2">20.000</option>
                    <option value="option 3">30.000</option>
                    <option value="option 4">60.000</option>
                    <option value="option 4">70.000</option>
                    <option value="option 4">80.000</option>
                    <option value="option 4">300.000</option>
                    <option value="option 4">600.000</option>
                    <option value="option 4">1000.000</option>
                  </select>
                  <svg
                    class="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                      stroke="#111827"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-600 w-full"
              >
                Negocios
              </label>
              <div class="relative w-full mb-8">
                <DynamicSelect
                  url="Shop/negocios/controller.php"
                  name="Negocio"
                  value={formData["Negocio"]}
                  onChange={handleChange}
                  valueKey="id"
                  labelKey="nombre"
                  placeholder="Filtrar negocios"
                  style="text-gray-500"
                />
              </div>
              <button
                onClick={FilterButton}
                class="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-green-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-700 hover:shadow-green-200  "
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
                    stroke="white"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Buscar
              </button>
            </div>
          </div>
          <div class="col-span-12 md:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
