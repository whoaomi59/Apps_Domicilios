import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export default function ProductosShop() {
  const { id, name } = useParams();
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
        let response = await axios.get(
          `/Shop/productos/controller.php?negocio_id=${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("Error al obtener productos");
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

  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <div className="flex">
        <a href="/shop/negocios" className="mr-3">
          <ArrowLeftCircleIcon className="w-10 text-green-500 hover:text-green-700" />
        </a>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-12">
          Productos, {name}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((item) => (
          <div
            className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all"
            key={item.id}
          >
            <div className="w-full">
              <img
                src={item.img}
                alt={item.Producto}
                className="w-full object-cover object-top aspect-[230/307]"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1">
                <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                  {item.Producto}
                </h5>
                <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                  {item.Tipo}
                </h5>
                <div className="mt-2 flex items-center flex-wrap gap-2">
                  <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                    ${item.precio}
                  </h6>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-3">
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
                className="text-sm px-2 py-2 font-medium w-full mt-4 bg-green-500 hover:bg-green-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                onClick={() => addToCart(item)}
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
