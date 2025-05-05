import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../auth/AuthContext";
import {
  BuildingOffice2Icon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";

const Dashboard = ({ Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [negocios, setnegocios] = useState([]);
  const [pedidos, setpedidos] = useState([]);

  useEffect(() => {
    const GetUsuarios = async () => {
      try {
        let response = await axios.get(
          "/api/dashboar/Cont_user.php?action=usuarios"
        );
        setUsuarios(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    const GetNegocio = async () => {
      try {
        let response = await axios.get(
          "/api/dashboar/Cont_user.php?action=negocios"
        );
        setnegocios(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    const GetPedidos = async () => {
      try {
        let response = await axios.get(
          "/api/dashboar/Cont_user.php?action=pedidos"
        );
        setpedidos(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    GetPedidos();
    GetNegocio();
    GetUsuarios();
  }, []);

  return (
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TARJETAS */}
        <div class="group flex flex-col h-full  border border-gray-200 shadow-2xs rounded-xl">
          <div class="h-52 flex flex-col justify-center items-center bg-green-500 rounded-t-xl">
            <BuildingOffice2Icon className="text-white w-30" />
          </div>
          <div class="p-4 md:p-6">
            <span class="block mb-1 text-xs font-semibold uppercase text-green-600 .:text-blue-500">
              Negocios: {negocios.total}
            </span>
            <h3 class="text-xl font-semibold text-gray-800 .:text-neutral-300 .:hover:text-white">
              Negocios
            </h3>
            <p class="mt-3 text-gray-500 .:text-neutral-500">
              Negocios asociados a nuestra empresa.
            </p>
          </div>
          <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 .:border-neutral-700 .:divide-neutral-700">
            <a
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none .:bg-neutral-900 .:border-neutral-700 .:text-white .:hover:bg-neutral-800 .:focus:bg-neutral-800"
              href="/negocios"
            >
              Ver Tablas
            </a>
            <a
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none .:bg-neutral-900 .:border-neutral-700 .:text-white .:hover:bg-neutral-800 .:focus:bg-neutral-800"
              href="#"
            >
              Consumir API
            </a>
          </div>
        </div>

        <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl .:bg-neutral-900 .:border-neutral-700 .:shadow-neutral-700/70">
          <div class="h-52 flex flex-col justify-center items-center bg-gray-500 rounded-t-xl">
            <UsersIcon className="text-white w-30" />
          </div>
          <div class="p-4 md:p-6">
            <div className="flex">
              <span class="block mb-1 text-xs font-semibold uppercase text-gray-600 .:text-rose-500">
                Usuarios: {usuarios.total}
              </span>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 .:text-neutral-300 .:hover:text-white">
              Usuarios
            </h3>
            <p class="mt-3 text-gray-500 .:text-neutral-500">
              Usuarios asociados a nuestra empresa.
            </p>
          </div>
          <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 .:border-neutral-700 .:divide-neutral-700">
            <a
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none .:bg-neutral-900 .:border-neutral-700 .:text-white .:hover:bg-neutral-800 .:focus:bg-neutral-800"
              href="/usuarios"
            >
              Ver Tablas
            </a>
            <a
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none .:bg-neutral-900 .:border-neutral-700 .:text-white .:hover:bg-neutral-800 .:focus:bg-neutral-800"
              href="#"
            >
              Consumir API
            </a>
          </div>
        </div>
        {Roles === "admin" && (
          <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl .:bg-neutral-900 .:border-neutral-700 .:shadow-neutral-700/70">
            <div class="h-52 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl">
              <TruckIcon className="text-white w-30" />
            </div>
            <div class="p-4 md:p-6">
              <span class="block mb-1 text-xs font-semibold uppercase text-amber-500">
                Pedidos: {pedidos.total}
              </span>
              <h3 class="text-xl font-semibold text-gray-800 .:text-neutral-300 .:hover:text-white">
                Pedidos
              </h3>
              <p class="mt-3 text-gray-500 .:text-neutral-500">
                Domicilios realizados por nuestra empresa.
              </p>
            </div>
            <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 .:border-neutral-700 .:divide-neutral-700">
              <a
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none .:bg-neutral-900 .:border-neutral-700 .:text-white .:hover:bg-neutral-800 .:focus:bg-neutral-800"
                href="/pedidos"
              >
                Ver Tablas
              </a>
              <a
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none .:bg-neutral-900 .:border-neutral-700 .:text-white .:hover:bg-neutral-800 .:focus:bg-neutral-800"
                href="#"
              >
                Consumir API
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
