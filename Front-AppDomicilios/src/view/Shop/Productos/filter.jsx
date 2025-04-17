import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicSelect from "../../../components/grid/formulario/DynamicSelect ";

export default function FilterProduct({ children, name, setidNegocio }) {
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
            <svg
              class="absolute top-1/2 -translate-y-1/2 left-4 z-50"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                stroke="black"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
            <select
              id="Offer"
              class="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
            >
              <option selected>Orden de productos</option>
              <option value="option 1">DESC</option>
              <option value="option 2">ASD</option>
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
