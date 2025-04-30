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

  //URL Negocios
  /*   const url2 = `https://api.callmebot.com/whatsapp.php?phone=57${numero2}&text=${encodeURIComponent(
    texto
  )}&apikey=${KeyNegocios}`; */

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
  mensaje += `🧑 Factura ID: ${numero_Factura}\n`;
  mensaje += `🧑 Cliente: ${cliente_id}\n`;
  mensaje += `🏪 Telefono Cliente: ${telefono}\n`;
  mensaje += `🏪 Negocio: ${negocio_id}\n`;
  mensaje += `🏪 Telefono Negocio: ${telefono_negocio}\n`;
  mensaje += `🏪 Ubicacion: ${ubicacion}\n`;
  mensaje += `🏪 Tipo Ubicacion: ${tipoUbicacion}\n`;
  mensaje += `💵 Total: $${total}\n`;
  mensaje += `📦 Estado: ${estado}\n\n`;
  mensaje += `📦 Costo Envio: ${costoEnvio}\n\n`;
  mensaje += `🛒 *Productos comprados:*\n`;

  productos.forEach((prod, index) => {
    mensaje += `\n${index + 1}. ${prod.Producto || "Sin nombre"} - Cantidad: ${
      prod.cantidad || 0
    } - Precio: $${prod.precio || 0}`;
  });

  return mensaje;
};
