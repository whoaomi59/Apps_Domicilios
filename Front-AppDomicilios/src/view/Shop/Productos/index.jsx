import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductosShop() {
  const [data, setData] = useState([]);
  const { id, name } = useParams();


  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get(
          `/Shop/productos/controller.php?negocio_id=${id}`
        );
        return setData(response.data);
      } catch (error) {
        alert(error);
      }
    };
    Get();
  }, []);

  return (
    <div class="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-12">
        Productos, {name}
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((item, index) => (
          <div
            class="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all"
            key={index}
          >
            <div class="w-full">
              <img
                src={item.img}
                alt="Product 1"
                class="w-full object-cover object-top aspect-[230/307]"
              />
            </div>

            <div class="p-4 flex-1 flex flex-col">
              <div class="flex-1">
                <h5 class="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                  {item.Producto}
                </h5>
                <h5 class="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                  {item.Tipo}
                </h5>
                <div class="mt-2 flex items-center flex-wrap gap-2">
                  <h6 class="text-sm sm:text-base font-semibold text-slate-900">
                    ${item.precio}
                  </h6>
                  <div
                    class="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                    title="Wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      class="fill-slate-800 inline-block"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="text-sm px-2 py-2 font-medium w-full mt-4 bg-green-500 hover:bg-green-700 text-white tracking-wide ml-auto outline-none border-none rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
