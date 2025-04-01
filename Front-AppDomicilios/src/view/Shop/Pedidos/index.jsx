import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function PedidosShop({ IdUser }) {
  const [usuarios, setUsuarios] = useState([]);
  let id = localStorage.getItem("id");

  useEffect(() => {
    const GET = async () => {
      try {
        let response = await axios.get(
          `/Shop/pedidos/controller.php?cliente_id=${id}`
        );
        setUsuarios(response.data);
      } catch (error) {
        alert(error);
      }
    };
    GET();
  }, []);

  const Detalle = (item) => {
    window.location.href = `/shop/pedidos/detalle/${item.id_pedido}/${item.usuario_pedido}`;
  };

  return (
    <div className="p-4">
      <section class="container  mx-auto">
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">
            Pedidos
          </h2>

          <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            Pedidos Activos
          </span>
        </div>

        <div class="flex flex-col mt-6">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-green-200 dark:border-green-700 md:rounded-lg">
                <table class="min-w-full divide-y divide-green-200 dark:divide-green-700">
                  <thead class="bg-green-50 ">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                          />
                          <span>Negocio</span>
                        </div>
                      </th>{" "}
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center gap-x-3">
                          <span>Estado</span>
                        </div>
                      </th>{" "}
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center gap-x-3">
                          <span>Usuario</span>
                        </div>
                      </th>{" "}
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center gap-x-3">
                          <span>Total</span>
                        </div>
                      </th>
                      <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Detalle</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {usuarios.map((item) => (
                      <tr>
                        <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div class="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />

                            <div class="flex items-center gap-x-2">
                              <img
                                class="object-cover w-10 h-10 rounded-full"
                                src={item.logo_pedido}
                                alt=""
                              />
                              <div>
                                <h2 class="font-medium text-gray-800 dark:text-white ">
                                  {item.nombre_negocio}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                            <h2 class="text-sm font-normal text-emerald-500">
                              {item.estado}
                            </h2>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {item.usuario_pedido}
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          ${item.total}
                        </td>

                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <button
                            onClick={() => Detalle(item)}
                            className={`p-2 rounded bg-green-500   hover:bg-gray-400 m-0.5`}
                          >
                            <ArrowRightCircleIcon className="w-5 text-white" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
