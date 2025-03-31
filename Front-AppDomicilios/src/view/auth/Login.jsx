import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Login = () => {
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

        setTimeout(() => {
          window.location.href = rutas[decoded.rol] || rutas.default;
        }, 1000);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Error en el login");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md mt-20">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-3"
          required
        />
        <button
          type="submit"
          className="w-full mt-3 bg-green-500 text-white p-2 rounded"
        >
          Iniciar Sesión
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
      <p className="mt-3 text-center">
        <a href="/request-reset" className="text-green-500">
          ¿Olvidaste tu contraseña?
        </a>
      </p>
    </div>
  );
};

export default Login;
