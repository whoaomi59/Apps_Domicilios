export const Columns = [
  { key: "id_producto", label: "id" },
  { key: "img", label: "img" },
  { key: "nombre_producto", label: "Nombre" },
  { key: "Negocio", label: "Negocio" },
  { key: "descripcion_productos", label: "Descripcion" },
  { key: "precio_producto", label: "Precio" },
  { key: "stock_producto", label: "Stock" },
  { key: "fecha_producto", label: "Fecha" },
];
export const fields = [
  {
    name: "negocio_id",
    label: "Negocio",
    type: "select",
    options: [
      { value: "1", label: "Restaurante Don Pepe" },
      { value: "2", label: "Supermercado La Oferta" },
      { value: "3", label: "Babaria" },
      { value: "4", label: "Restaurante Carlos" },
      { value: "8", label: "Andres Carnes de pez" },
    ],
  },  {
    name: "tipo_id",
    label: "Tipo",
    type: "select",
    options: [
      { value: "1", label: "Comidas" },
      { value: "2", label: "Bebidas" },
      { value: "3", label: "Adicionales" },
      { value: "5", label: "Aseo" },
    ],
  },
  { name: "nombre", label: "nombre", type: "text" },
  { name: "descripcion", label: "descripcion", type: "text" },
  { name: "precio", label: "precio", type: "number" },
  { name: "stock", label: "stock", type: "number" },
  { name: "img", label: "img", type: "file" },
];

