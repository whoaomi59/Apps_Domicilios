import axios from "axios";

export const enviarWhatsApp = async ({
  mensaje,
  numeroNegocio,
  keyNegocios,
}) => {
  console.log("numero del api" + numeroNegocio);
  const numero = "573184141985"; //Numero Admin
  /* const numero = "573144160224"; */
  const numero2 = numeroNegocio; //Numeros de los negocios
  const KeyNegocios = keyNegocios;
  const texto = construirMensaje(mensaje);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(
    texto
  )}&apikey=9181021`;

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
  } = pedido;

  let mensaje = `🛍️ *Nueva Compra Realizada*\n\n`;
  mensaje += `Numero de factura: ${numero_Factura}\n\n`;
  mensaje += `🧑*Cliente cosumidor:*\n\n`;
  mensaje += `Nombre: ${cliente_id}\n`;
  mensaje += `Telefono: ${telefono}\n`;
  mensaje += `Direccion: ${tipoUbicacion}\n`;
  mensaje += `Ubicacion: ${ubicacion}\n`;
  mensaje += `🏪*Restaurante:*\n`;
  mensaje += `Nombre: ${negocio_id}\n`;
  mensaje += `Telefono: ${telefono_negocio}\n`;
  mensaje += `🛒 *Datos del pedido:*\n`;
  productos.forEach((prod, index) => {
    mensaje += `\n${index + 1}. ${prod.Producto || "Sin nombre"} - Cantidad: ${
      prod.cantidad || 0
    } - Precio: $${prod.precio || 0}`;
  });
  mensaje += `📦 Estado: ${estado}\n\n`;
  mensaje += `💵 SubTotal: ${total}\n`;
  mensaje += `📦 Domicilio: ${costoEnvio}\n\n`;
  mensaje += `💵 Total: ${total + costoEnvio}\n`;

  return mensaje;
};
