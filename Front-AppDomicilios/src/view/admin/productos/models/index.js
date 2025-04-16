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
  { name: "nombre", label: "nombre", type: "text" },
  { 
    name: "negocio_id", 
    label: "Negocio Asignar",
    type: "dinamiselect",
    url:'/api/negocios/controller.php',
    value:'idnegocio', 
    text:'Negocio', 
  },
  { 
    name: "tipo_id", 
    label: "Tipo Producto",
    type: "dinamiselect",
    url:'/api/tipos_productos/controller.php',
    value:'id', 
    text:'nombre', 
  },
  { name: "descripcion", label: "descripcion", type: "text" },
  { name: "precio", label: "precio", type: "number" },
  { name: "stock", label: "stock", type: "number" },
  { name: "img", label: "img", type: "file" },
];

