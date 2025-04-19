export const Columns = [
  { key: "id", label: "id" },
  { key: "img", label: "img" },
  { key: "nombre", label: "Nombre" },
  { key: "Tipo", label: "Tipo Producto" },
  { key: "negocio_id", label: "Negocio" },
  { key: "descripcion", label: "Descripcion" },
  { key: "precio", label: "Precio" },
  { key: "stock", label: "Stock" },
  { key: "fecha_producto", label: "Fecha" },
];


export const fields = [
  { name: "id", label: "ID", type: "number",disable:true },
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

