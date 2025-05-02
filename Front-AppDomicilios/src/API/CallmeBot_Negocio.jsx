import axios from "axios";

export const EnviarWhatsApp_Negocio = async ({
  mensaje,
  numeroNegocio,
  keyNegocios,
}) => {
  const numero2 = numeroNegocio;
  const KeyNegocios = keyNegocios;
  const texto = construirMensaje(mensaje);

  //URL Negocios
  const url = `https://api.callmebot.com/whatsapp.php?phone=57${numero2}&text=${encodeURIComponent(
    texto
  )}&apikey=${KeyNegocios}`;

  try {
    axios.get(url);
    console.log("Mensaje enviado con CallMeBot");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

const construirMensaje = (pedido) => {
  const { negocio_id, numero_Factura, productos } = pedido;

  let mensaje = `🛍️ *Nueva Compra Realizada*\n\n`;
  mensaje += `🧑 Factura ID: ${numero_Factura}\n`;
  mensaje += `🧑 Cliente: ${negocio_id}\n`;
  mensaje += `🛒 *Productos comprados:*\n`;

  productos.forEach((prod, index) => {
    mensaje += `\n${prod.cantidad || 0}. ${
      prod.nombre || "Sin nombre"
    } - Precio: $${prod.precio || 0}`;
  });

  return mensaje;
};
