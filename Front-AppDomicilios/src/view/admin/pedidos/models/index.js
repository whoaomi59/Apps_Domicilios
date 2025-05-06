export const Columns = [
  { key: "id", label: "id" },  
  { key: "button", label: "Estado" },
  { key: "pedido", label: "Notificar" },
  { key: "logo_pedido", label: "logo" },
  { key: "nombre_negocio", label: "negocio" },
  { key: "usuario_pedido", label: "usuario" },
  { key: "estado", label: "estado" },
  { key: "total", label: "total" },
  { key: "dire_negocio", label: "dire_negocio" },
  { key: "ubica_domici", label: "ubica_domici" },
  { key: "tipoUbicacion", label: "tipoUbicacion" },
  { key: "tel_user_pedi", label: "tel_user_pedi" },
  { key: "direc_negocio", label: "direc_negocio" },
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
