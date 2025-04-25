import {
  BuildingStorefrontIcon,
  CircleStackIcon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NavbarShop({ logo, Roles, nombre }) {
  const [Toggle, setToggle] = useState(false);
  return (
    <header class="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-2">
      <nav class="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
        <div class="lg:col-span-3 flex items-center">
          <a
            class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/shop/negocios"
            aria-label="Preline"
          >
            <img
              class="w-20 h-auto"
              src={logo ? logo : "/SVG PAGINA/undraw_pair-programming_9jyg.svg"}
              alt="Logo"
            />
          </a>
        </div>

        <div class="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
          <div className="flex items-center mr-2">
            {nombre && <>{nombre}</>}
          </div>

          {Roles ? (
            ""
          ) : (
            <a
              href="/login"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-green-500 text-black hover:bg-green-600 text-white"
            >
              Ingresar
            </a>
          )}
          <div class="lg:hidden">
            <button
              onClick={() => setToggle((prev) => !prev)}
              type="button"
              class="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none .:text-white .:border-neutral-700 .:hover:bg-neutral-700 .:focus:bg-neutral-700"
              id="hs-navbar-hcail-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-hcail"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-hcail"
            >
              <svg
                class="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-hcail"
          className={`hs-collapse ${
            Toggle ? "" : "hidden"
          }  overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6`}
          aria-labelledby="hs-navbar-hcail-collapse"
        >
          <div class="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
            <div className="flex items-center">
              <a
                class="relative inline-block text-black focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-green-500 hover:text-green-600"
                href="/"
                aria-current="page"
              >
                Inicio
              </a>
              <HomeIcon className="w-5 ml-2 text-gray-500" />
            </div>
            <div className="flex items-center">
              <a
                className="inline-block text-black hover:text-green-600"
                href="/shop/negocios"
              >
                Negocios
              </a>
              <BuildingStorefrontIcon className="w-5 ml-2 text-gray-500" />
            </div>{" "}
            {Roles && (
              <div className="flex items-center">
                <a
                  className="inline-block text-black hover:text-green-600"
                  href="/shop/pedidos"
                >
                  Mis pedidos
                </a>
                <ShoppingBagIcon className="w-5 ml-2 text-gray-500" />
              </div>
            )}
            <div className="flex items-center">
              <a
                className="inline-block text-black hover:text-green-600"
                href="/shop/car_shop"
              >
                Carrito
              </a>
              <ShoppingCartIcon className="w-5 ml-2 text-gray-500" />
            </div>
            {Roles === "admin" && (
              <div className="flex items-center">
                <a
                  className="inline-block text-black hover:text-green-600"
                  href="/dashboard"
                >
                  Admin
                </a>
                <WrenchScrewdriverIcon className="w-5 ml-2 text-gray-500" />
              </div>
            )}
            {Roles === "negocio" && (
              <div className="flex items-center">
                <a
                  className="inline-block text-black hover:text-green-600"
                  href="/dashboard"
                >
                  Admin
                </a>
                <WrenchScrewdriverIcon className="w-5 ml-2 text-gray-500" />
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="fixed bottom-1 md:hidden left-1/2 transform -translate-x-1/2 w-[95%] max-w-md bg-white rounded-2xl shadow-lg flex justify-around items-center py-2 px-4 z-50 sm:mb-0">
        <a
          href="/"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          Inicio
        </a>
        <a
          href="/shop/negocios"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Negocios
        </a>
        <a
          href="/shop/car_shop"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13a1 1 0 001-1V6H6.6"
            />
          </svg>
          Carrito
        </a>
      </div>
    </header>
  );
}
