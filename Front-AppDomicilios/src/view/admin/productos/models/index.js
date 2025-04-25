export const Columns = [
  { key: "id", label: "id" },
  { key: "img", label: "img" },
  { key: "nombre", label: "Nombre" },
  { key: "Tipo", label: "Tipo Producto" },
  { key: "tipo_id", label: "tipo_id" },
  { key: "Negocio", label: "Negocio" },
  { key: "negocio_id", label: "idNegocio" },
  { key: "descripcion", label: "Descripcion" },
  { key: "estado", label: "estado" },
  { key: "precio", label: "Precio" },
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
  { name: "img", label: "img", type: "file" },
];

export const FielsEstado =[
  { name: "id", label: "ID", type: "number",disable:true },
  { name: "estado", label: "estado", type: "select",options:[
    {
      value:0,
      label:'Activo'
    },
    {
      value:1,
      label:'Inactivo'
    }
  ] },
]