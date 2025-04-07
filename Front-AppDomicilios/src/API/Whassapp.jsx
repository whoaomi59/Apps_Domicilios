export const handleWhatsappClick = ({ texto }) => {
  const phoneNumber = "573001234567"; // tu número con código de país
  const message = texto || "";

  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);
  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";

  const whatsappURL = `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank"); // abre en nueva pestaña
};
