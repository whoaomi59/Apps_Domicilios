import { useState } from "react";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensajes anteriores

    try {
      const response = await fetch(
        "http://192.168.120.144/API/Auth/request_reset.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error en la solicitud");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recuperar Contraseña</h2>
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 text-white p-2 rounded"
        >
          Enviar Enlace
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default RequestReset;
