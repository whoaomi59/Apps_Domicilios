import axios from "axios";

export const enviarWhatsApp = async (mensaje) => {
  const numero = "573144160224";
  const texto = construirMensaje(mensaje);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(
    texto
  )}&apikey=7774438`;

  try {
    await axios.get(url);
    console.log("Mensaje enviado con CallMeBot");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

const construirMensaje = (pedido) => {
  const { cliente_id, negocio_id, total, estado, productos } = pedido.mensaje;

  let mensaje = `🛍️ *Nueva Compra Realizada*\n\n`;
  mensaje += `🧑 Cliente ID: ${cliente_id}\n`;
  mensaje += `🏪 Negocio ID: ${negocio_id}\n`;
  mensaje += `💵 Total: $${total}\n`;
  mensaje += `📦 Estado: ${estado}\n\n`;
  mensaje += `🛒 *Productos comprados:*\n`;

  productos.forEach((prod, index) => {
    mensaje += `\n${index + 1}. ${prod.Producto || "Sin nombre"} - Cantidad: ${
      prod.cantidad || 0
    } - Precio: $${prod.precio || 0}`;
  });

  return mensaje;
};
