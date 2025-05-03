import axios from "axios";
import { formatearCOP } from "../components/content/formatoMoneda";

export const enviarWhatsApp = async ({
  mensaje,
  numeroNegocio,
  keyNegocios,
}) => {
  console.log("numero del api" + numeroNegocio);
  const numero = "573184141985"; //Numero Admin
  /*   const numero = "573144160224"; */
  const texto = construirMensaje(mensaje);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(
    texto
  )}&apikey=9181021`;
  /* 9181021 */
  /* 7774438 */

  try {
    axios.get(url);
    /*    axios.get(url2); */
    console.log("Mensaje enviado con CallMeBot");
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
};

const construirMensaje = (pedido) => {
  const {
    cliente_id,
    negocio_id,
    numero_Factura,
    total,
    estado,
    productos,
    ubicacion,
    tipoUbicacion,
    telefono,
    costoEnvio,
    telefono_negocio,
    direccion,
  } = pedido;

  // Convertir a número para evitar concatenación de strings
  const subtotal = parseFloat(total) || 0;
  const envio = parseFloat(costoEnvio) || 0;
  const Total = subtotal + envio;

  let mensaje = `🛍️ *Nueva Compra Realizada*\n\n`;
  mensaje += `Numero de factura: ${numero_Factura}\n`;
  mensaje += `\nEstado: ${estado}\n\n`;
  mensaje += `🧑*Cliente consumidor:*\n\n`;
  mensaje += `Nombre: ${cliente_id}\n`;
  mensaje += `Telefono: ${telefono}\n`;
  mensaje += `Direccion: ${tipoUbicacion}\n`;
  mensaje += `Ubicacion: ${ubicacion}\n\n`;
  mensaje += `🏪*Restaurante:*\n\n`;
  mensaje += `Nombre: ${negocio_id}\n`;
  mensaje += `Telefono: ${telefono_negocio}\n`;
  mensaje += `Direccion: ${direccion}\n\n`;
  mensaje += `🛒 *Datos del pedido:*\n\n`;

  productos.forEach((prod, index) => {
    const nombre = prod.Producto || "Sin nombre";
    const cantidad = prod.cantidad || 0;
    const precio = parseFloat(prod.precio) || 0;
    mensaje += `${
      index + 1
    }. ${nombre} - Cantidad: ${cantidad} - Precio: $${precio.toFixed(2)}`;
  });

  mensaje += `\n\n💵 SubTotal: ${formatearCOP(subtotal)}\n`;
  mensaje += `📦 Domicilio: ${formatearCOP(envio)}\n\n`;
  mensaje += `💵 Total: ${formatearCOP(Total)}\n`;

  return mensaje;
};
