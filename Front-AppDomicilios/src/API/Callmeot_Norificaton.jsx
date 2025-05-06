import axios from "axios";

export const EnviarWhatsApp_Admin = async ({ mensaje }) => {
  const numero = "573184141985";
  const ApiKey = "9181021";
  /*  const numero = "573144160224";
  const ApiKey = "7774438"; */
  const texto = construirMensaje(mensaje);

  //URL Negocios
  const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(
    texto
  )}&apikey=${ApiKey}`;

  try {
    await axios.get(url);
    console.log("Mensaje enviado con CallMeBot");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

const construirMensaje = ({ numero_Factura, negocio_id }) => {
  return `✅ *Pedido Listo para Entregar*\n\n🧾 Factura ID: ${numero_Factura}\n🏪 Negocio: ${negocio_id}`;
};
