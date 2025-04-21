export const Columns = [
  { key: "id_pedido", label: "id" },
  { key: "logo_pedido", label: "logo" },
  { key: "nombre_negocio", label: "negocio" },
  { key: "usuario_pedido", label: "usuario" },
  { key: "estado", label: "estado" },
  { key: "total", label: "total" }
];
export const fields = [
  { name: "id_pedido", label: "ID", type: "number" ,disable:true},
  { name: "estado", label: "Cambiar Estado", type: "select",options:[{value:0,label:'Activo'},{value:1,label:'Inactivo'}] },
];
