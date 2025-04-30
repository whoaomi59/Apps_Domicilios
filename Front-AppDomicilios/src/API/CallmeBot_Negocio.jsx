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
  console.log(productos);

  let mensaje = `🛍️ *Nueva Compra Realizada*\n\n`;
  mensaje += `🧑 Factura ID: ${numero_Factura}\n`;
  mensaje += `🧑 Cliente: ${negocio_id}\n`;
  mensaje += `🛒 *Productos comprados:*\n`;

  productos.forEach((prod, index) => {
    mensaje += `\n${index + 1}. ${prod.nombre || "Sin nombre"} - Cantidad: ${
      prod.cantidad || 0
    } - Precio: $${prod.precio || 0}`;
  });

  return mensaje;
};
