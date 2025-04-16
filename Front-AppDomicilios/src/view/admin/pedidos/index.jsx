import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";

const Pedidos = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);

  const abrirModal = () => {};
  const Verdetalle = () => {};

  const VerProductos = (record) => {
    const { id_pedido, usuario_pedido } = record;
    //console.log(record);
    window.location.href = `/shop/pedidos/detalle/${id_pedido}/${usuario_pedido}`;
  };

  const handleFormSubmit = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/pedidos/controller.php");
        if (Roles.includes("admin")) {
          setUsuarios(response.data);
        } else {
          const rutasPermitidas = response.data.filter((item) =>
            item.usuario_id.includes(IdUser)
          );
          setUsuarios(rutasPermitidas);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [IdUser, Roles]); // Dependencias para actualizar si cambia el rol

  const Formater = usuarios.map((item) => ({
    id_pedido: item.id_pedido,
    logo_pedido: <img src={item.logo_pedido} className="w-15" />,
    nombre_negocio: item.nombre_negocio,
    usuario_pedido: item.usuario_pedido,
    estado: (
      <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-100/60">
        <span class="h-1.5 w-1.5 rounded-full bg-gray-500"></span>

        <h2 class="text-sm font-normal text-gray-500">{item.estado}</h2>
      </div>
    ),
    total: item.total,
  }));

  return (
    <div className="p-4">
      <Grid
        module={"Pedidos"}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "PencilSquareIcon",
            className: "bg-green-500 text-white",
            onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
          },
          {
            icon: "TrashIcon",
            className: "bg-red-500 text-white",
            onClick: (record) => Verdetalle(record), // Llama a la función abrirModal con el registro
          },
          {
            icon: "ArrowRightCircleIcon",
            className: "bg-blue-500 text-white",
            onClick: (record) => VerProductos(record), // Llama a la función abrirModal con el registro
          },
        ]}
      />
    </div>
  );
};

export default Pedidos;
