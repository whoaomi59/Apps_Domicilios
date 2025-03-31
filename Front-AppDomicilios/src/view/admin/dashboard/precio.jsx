export default function Precio() {
  return (
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 class="text-2xl font-bold md:text-4xl md:leading-tight       :text-white">
          Precio
        </h2>
        <p class="mt-1 text-gray-600       :text-neutral-400">
          Sea cual sea su estatus, nuestras ofertas evolucionan según sus
          necesidades.
        </p>
      </div>

      <div class="flex justify-center items-center gap-x-3">
        <label
          for="pricing-switch"
          class="text-sm text-gray-800       :text-neutral-200"
        >
          Monthly
        </label>
        <label
          for="pricing-switch"
          class="relative inline-block w-11 h-6 cursor-pointer"
        >
          <input
            type="checkbox"
            id="pricing-switch"
            class="peer sr-only"
            checked
          />
          <span class="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-green-500       :bg-neutral-700       :peer-checked:bg-green-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
          <span class="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full       :bg-neutral-400       :peer-checked:bg-white"></span>
        </label>
        <label
          for="pricing-switch"
          class="relative text-sm text-gray-800       :text-neutral-200"
        >
          Annually
          <span class="absolute -top-10 start-auto -end-28">
            <span class="flex items-center">
              <svg
                class="w-14 h-8 -me-6"
                width="45"
                height="25"
                viewBox="0 0 45 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                  fill="currentColor"
                  class="fill-gray-300       :fill-neutral-700"
                />
              </svg>
              <span class="mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold uppercase bg-green-500 text-white rounded-full py-1 px-2.5">
                Save up to 10%
              </span>
            </span>
          </span>
        </label>
      </div>

      <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
        <div class="flex flex-col border border-gray-200 text-center rounded-xl p-8       :border-neutral-800">
          <h4 class="font-medium text-lg text-gray-800       :text-neutral-200">
            Free
          </h4>
          <span class="mt-7 font-bold text-5xl text-gray-800       :text-neutral-200">
            Free
          </span>
          <p class="mt-2 text-sm text-gray-500       :text-neutral-500">
            Forever free
          </p>

          <ul class="mt-7 space-y-2.5 text-sm">
            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">1 user</span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Plan features
              </span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Product support
              </span>
            </li>
          </ul>

          <a
            class="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50       :bg-transparent       :border-neutral-700       :text-neutral-300       :hover:bg-neutral-800       :focus:bg-neutral-800"
            href="#"
          >
            Sign up
          </a>
        </div>

        <div class="flex flex-col border-2 border-green-500 text-center shadow-xl rounded-xl p-8       :border-green-700">
          <p class="mb-3">
            <span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-green-100 text-green-800       :bg-green-500       :text-white">
              Most popular
            </span>
          </p>
          <h4 class="font-medium text-lg text-gray-800       :text-neutral-200">
            Startup
          </h4>
          <span class="mt-5 font-bold text-5xl text-gray-800       :text-neutral-200">
            <span class="font-bold text-2xl -me-2">$</span>
            39
          </span>
          <p class="mt-2 text-sm text-gray-500       :text-neutral-500">
            All the basics for starting a new business
          </p>

          <ul class="mt-7 space-y-2.5 text-sm">
            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">2 users</span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Plan features
              </span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Product support
              </span>
            </li>
          </ul>

          <a
            class="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
          >
            Sign up
          </a>
        </div>

        <div class="flex flex-col border border-gray-200 text-center rounded-xl p-8       :border-neutral-800">
          <h4 class="font-medium text-lg text-gray-800       :text-neutral-200">
            Team
          </h4>
          <span class="mt-5 font-bold text-5xl text-gray-800       :text-neutral-200">
            <span class="font-bold text-2xl -me-2">$</span>
            89
          </span>
          <p class="mt-2 text-sm text-gray-500       :text-neutral-500">
            Everything you need for a growing business
          </p>

          <ul class="mt-7 space-y-2.5 text-sm">
            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">5 users</span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Plan features
              </span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Product support
              </span>
            </li>
          </ul>

          <a
            class="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50       :bg-transparent       :border-neutral-700       :text-neutral-300       :hover:bg-neutral-800       :focus:bg-neutral-800"
            href="#"
          >
            Sign up
          </a>
        </div>

        <div class="flex flex-col border border-gray-200 text-center rounded-xl p-8       :border-neutral-800">
          <h4 class="font-medium text-lg text-gray-800       :text-neutral-200">
            Enterprise
          </h4>
          <span class="mt-5 font-bold text-5xl text-gray-800       :text-neutral-200">
            <span class="font-bold text-2xl -me-2">$</span>
            149
          </span>
          <p class="mt-2 text-sm text-gray-500       :text-neutral-500">
            Advanced features for scaling your business
          </p>

          <ul class="mt-7 space-y-2.5 text-sm">
            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                10 users
              </span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Plan features
              </span>
            </li>

            <li class="flex gap-x-2">
              <svg
                class="shrink-0 mt-0.5 size-4 text-green-500       :text-green-500"
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="text-gray-800       :text-neutral-400">
                Product support
              </span>
            </li>
          </ul>

          <a
            class="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50       :bg-transparent       :border-neutral-700       :text-neutral-300       :hover:bg-neutral-800       :focus:bg-neutral-800"
            href="#"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
