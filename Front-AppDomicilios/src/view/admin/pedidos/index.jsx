import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import { useParams } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Pedidos = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const { id, name } = useParams();

  const VerProductos = (record) => {
    const { id_pedido, usuario_pedido } = record;
    window.location.href = `/shop/pedidos/detalle/${id_pedido}/${usuario_pedido}`;
  };

  const handleFormSubmit = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/pedidos/controller.php");
        const rutasPermitidas = response.data.filter((item) =>
          item.nombre_negocio.includes(name)
        );
        setUsuarios(rutasPermitidas);
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [id]);
  const Formater = usuarios.map((item) => ({
    id_pedido: item.id_pedido,
    logo_pedido: <img src={item.logo_pedido} className="w-10" />,
    nombre_negocio: item.nombre_negocio,
    usuario_pedido: item.usuario_pedido,
    estado: (
      <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-100/60">
        <span class="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
        <h2 class="text-sm font-normal text-gray-500">{item.estado}</h2>
      </div>
    ),
    total: formatearCOP(item.total),
  }));

  return (
    <div className="p-4">
      <Grid
        module={"Pedidos" + " " + name}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
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
