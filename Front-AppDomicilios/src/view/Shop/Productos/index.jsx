import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";
import {
  ArrowLeftCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Loader from "../../../components/content/loader";
import FilterProduct from "./filter";
import { formatearCOP } from "../../../components/content/formatoMoneda";

export default function ProductosShop() {
  const { id, name } = useParams();
  const [loader, setloader] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (Array.isArray(savedCart)) {
      setCart(savedCart);
    } else {
      setCart([]); // Si no es un array válido, iniciar con un array vacío
    }
  }, []);

  // Obtener productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setloader(true);
        let response = await axios.get(
          `/Shop/productos/controller.php?negocio_id=${id}`
        );
        setData(response.data);
        return setloader(false);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("Error al obtener productos");
        return setloader(false);
      }
    };
    fetchProducts();
  }, [id]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Clonar el carrito actual para no modificar el estado directamente
      let updatedCart = [...prevCart];

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = updatedCart.findIndex(
        (product) => product.Producto === item.Producto
      );

      if (existingProductIndex !== -1) {
        // Si ya está en el carrito, aumentar la cantidad
        updatedCart[existingProductIndex].cantidad += 1;
      } else {
        // Agregar el nuevo producto con cantidad 1
        updatedCart.push({ ...item, cantidad: 1 });
      }

      // Guardar en localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      Alertas({ icon: "success", message: "Producto En El Carrito!!" });
      return updatedCart;
    });
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <FilterProduct name={name}>
      <section class="antialiased">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
            {data.map((item) => (
              <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div class="h-56 w-full">
                  <img
                    class="mx-auto h-full"
                    src={item.img}
                    alt={item.Producto}
                  />
                </div>
                <div class="pt-6">
                  <p class="text-lg font-semibold leading-tight text-gray-900 hover:underline">
                    {item.Producto}
                  </p>

                  <div class="mt-2 flex items-center gap-2">
                    <div class="flex items-center">
                      <svg
                        class="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>

                      <svg
                        class="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>

                      <svg
                        class="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>

                      <svg
                        class="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>

                      <svg
                        class="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                      </svg>
                    </div>

                    <p class="text-sm font-medium text-gray-900 .:text-white">
                      5.0
                    </p>
                    <p class="text-sm font-medium text-gray-500 .:text-gray-400">
                      (455)
                    </p>
                  </div>

                  <ul class="mt-2 flex items-center gap-4">
                    <li class="flex items-center gap-2">
                      <svg
                        class="h-4 w-4 text-gray-500 .:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                        />
                      </svg>
                      <p class="text-sm font-medium text-gray-500 .:text-gray-400">
                        {item.Tipo}
                      </p>
                    </li>

                    <li class="flex items-center gap-2">
                      <svg
                        class="h-4 w-4 text-gray-500 .:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        />
                      </svg>
                      <p class="text-sm font-medium text-gray-500 .:text-gray-400">
                        Best Price
                      </p>
                    </li>
                  </ul>
                  <p class="text-2xl font-extrabold leading-tight text-gray-900">
                    {formatearCOP(item.precio)}
                  </p>
                  <div class="mt-2 flex items-center justify-between gap-4">
                    <div className="mt-auto flex items-center gap-2">
                      <button
                        type="button"
                        className="flex items-center justify-center w-5 h-5 bg-green-400 outline-none rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 124 124"
                        >
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                        </svg>
                      </button>
                      <span className="font-semibold text-sm">9</span>
                      <button
                        type="button"
                        className="flex items-center justify-center w-5 h-5 bg-green-800 outline-none rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 42 42"
                        >
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                        </svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      class="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 "
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCartIcon className="-ms-2 me-2 h-5 w-5" />
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="w-full text-center">
            <button
              type="button"
              class="rounded-lg border border-green-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:text-green-700"
            >
              Show more
            </button>
          </div>
        </div>
      </section>
    </FilterProduct>
  );
}
