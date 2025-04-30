import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";
import { EnviarWhatsApp_Negocio } from "../../../API/CallmeBot_Negocio";
import Loader from "../../../components/content/loader";

const Pedidos = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [loader, setloader] = useState(false);
  const { id, name } = useParams();

  const VerProductos = (record) => {
    const { id, usuario_pedido } = record;
    window.location.href = `/shop/pedidos/detalle/${id}/${usuario_pedido}`;
  };

  const handleFormSubmit = async (data) => {
    try {
      let response = await axios.put("/api/pedidos/controller.php", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.estado == "procesando") {
        EnviarWhatsApp_Negocio({
          numeroNegocio: response.data.pedido_info.telefono, //OK
          keyNegocios: response.data.pedido_info.KeyNegocio, //OK
          mensaje: {
            numero_Factura: data.id, //OK
            negocio_id: "RunWay", //OK
            productos: response.data.pedido_info.productos,
          },
        });
      }
      setrefresh((prev) => !prev);
      return Alertas({
        icon: "success",
        message: "Registrado!!",
      });
    } catch (error) {
      alert(error);
      return Alertas({
        icon: "error",
        message: error,
      });
    }
  };

  useEffect(() => {
    const Get = async () => {
      try {
        setloader(true);
        let response = await axios.get("/api/pedidos/controller.php");
        const rutasPermitidas = response.data.filter((item) =>
          item.nombre_negocio.includes(name)
        );
        setUsuarios(rutasPermitidas);
        return setloader(false);
      } catch (error) {
        console.log(error);
        return setloader(false);
      }
    };
    Get();
  }, [id, refresh]);

  const Formater = usuarios.map((item) => ({
    id: item.id_pedido,
    logo_pedido: <img src={item.logo_pedido} className="w-10" />,
    nombre_negocio: item.nombre_negocio,
    usuario_pedido: item.usuario_pedido,
    estado: item.estado,
    estadoPedido: (
      <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-100/60">
        <span class="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
        <h2 class="text-sm font-normal text-gray-500">{item.estado}</h2>
      </div>
    ),
    total: formatearCOP(item.total),
  }));

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="p-4">
      <Grid
        module={"Pedidos" + " " + name}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        button={true}
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
