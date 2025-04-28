export const handleWhatsappClick = (texto) => {
  const phoneNumber = "573122048951"; // tu número con código de país
  const message =
    "Hola, Sr. Administrador. ¿Podría ayudarme con un domiciliario, por favor?";

  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);
  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";

  if (texto.mesaje) {
    const whatsappURL = `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(
      construirMensaje(texto)
    )}`;
    window.open(whatsappURL, "_blank");
  } else {
    const whatsappURL = `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  }
};

const construirMensaje = (pedido) => {
  const { mesaje, negocio } = pedido;

  let mensaje = `🛍️ *Solicitud domiciliario*\n\n`;
  mensaje += `🧑 ${mesaje}\n`;
  mensaje += `🏪 Negocio ID: ${negocio}\n`;

  return mensaje;
};
