import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      alert("Producto En El Carrito!!");

      return updatedCart;
    });
  };

  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-12">
        Productos, {name}
      </h2>

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
