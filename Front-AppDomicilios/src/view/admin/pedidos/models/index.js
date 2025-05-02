export const Columns = [
  { key: "id", label: "id" },
  { key: "logo_pedido", label: "logo" },
  { key: "nombre_negocio", label: "negocio" },
  { key: "usuario_pedido", label: "usuario" },
  { key: "estado", label: "estado" },
  { key: "total", label: "total" },
  { key: "button", label: "Estado" },
];
export const fields = [
  { name: "estado", label: "Cambiar Estado", type: "select",options:
  [
    {value:'pendiente',label:'pendiente'},
    {value:'procesando',label:'Solicitado'},
  ] 
},
{ name: "id", label: "ID", type: "number" ,disable:true},

];
