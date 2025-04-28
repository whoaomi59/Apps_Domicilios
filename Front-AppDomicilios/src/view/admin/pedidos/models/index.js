export const Columns = [
  { key: "id", label: "id" },
  { key: "logo_pedido", label: "logo" },
  { key: "nombre_negocio", label: "negocio" },
  { key: "usuario_pedido", label: "usuario" },
  { key: "estado", label: "estado" },
  { key: "estadoPedido", label: "estadoPedido" },
  { key: "total", label: "total" }
];
export const fields = [
  { name: "estado", label: "Cambiar Estado", type: "select",options:
  [
    {value:'pendiente',label:'pendiente'},
    {value:'procesando',label:'procesando'},
    {value:'enviado',label:'enviado'},
    {value:'entregado',label:'entregado'},
    {value:'cancelado',label:'cancelado'},
  ] 
},
{ name: "id", label: "ID", type: "number" ,disable:true},

];
