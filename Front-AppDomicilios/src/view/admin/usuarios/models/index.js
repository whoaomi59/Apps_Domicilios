export const ModelsUsuarios = [
  { key: "id", label: "id" },
  { key: "nombre", label: "Nombre" },
  { key: "email", label: "Correo Electronico" },
  { key: "rol", label: "Rol" },
  { key: "telefono", label: "Telefono" },
  { key: "created_at", label: "Fecha" },
];

export const fields = [
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "email", label: "Correo", type: "email" },
  { name: "telefono", label: "Telefono", type: "number" },
  {
    name: "rol",
    label: "Rol",
    type: "select",
    options: [
      { value: "admin", label: "admin" },
      { value: "negocio", label: "negocio" },
      { value: "cliente", label: "cliente" },
      { value: "domiciliario", label: "domiciliario" },
    ],
  },
  { name: "password", label: "Password", type: "text" },
];