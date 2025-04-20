import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Login = ({ logo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "/Auth/login.php",
        { email, password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const token = await response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setMessage("Login exitoso. Redirigiendo...");

        const decoded = jwtDecode(token);

        const rutas = {
          admin: "/dashboard",
          negocio: "/dashboard",
          default: "/shop/negocios",
        };
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/"; //REDIRIJE ALCARRITO SI LA POCISION DEL USUARIO LO REQUIERE
        if (redirectPath === "/shop/car_shop") {
          localStorage.removeItem("redirectAfterLogin");
          window.location.href = redirectPath;
          return;
        } else {
          setTimeout(() => {
            window.location.href = rutas[decoded.rol] || rutas.default;
          }, 1000);
        }
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.log(error);
      setMessage("Error en el login");
    }
  };

  return (
    <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-20">
      <div class="px-6 py-4">
        <div class="flex justify-center mx-auto">
          <img class="w-auto h-30" src={logo} alt="" />
        </div>

        <h3 class="mt-3 text-xl font-medium text-center text-green-600">
          Bienvenido de nuevo
        </h3>

        <p class="mt-1 text-center text-gray-500   :text-gray-400">
          Iniciar sesión o crear una cuenta
        </p>

        <form onSubmit={handleLogin}>
          <div class="w-full mt-4">
            <input
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   :bg-gray-800   :border-gray-600   :placeholder-gray-400 focus:border-green-400   :focus:border-green-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-green-300"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div class="w-full mt-4">
            <input
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg   :bg-gray-800   :border-gray-600   :placeholder-gray-400 focus:border-green-400   :focus:border-green-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-green-300"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="mt-3 text-center">{message}</p>}
          <div class="flex items-center justify-between mt-4">
            <a
              href="/request-reset"
              class="text-sm text-gray-600   :text-gray-200 hover:text-gray-500"
            >
              ¿Olvidó su contraseña?
            </a>

            <button
              type="submit"
              class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>

      <div class="flex items-center justify-center py-4 text-center bg-gray-50   :bg-gray-700">
        <span class="text-sm text-gray-600   :text-gray-200">
          ¿No tienes una cuenta?
        </span>

        <a
          href="/registro"
          class="mx-2 text-sm font-bold text-green-500   :text-green-400 hover:underline"
        >
          Registro
        </a>
      </div>
    </div>
  );
};

export default Login;
