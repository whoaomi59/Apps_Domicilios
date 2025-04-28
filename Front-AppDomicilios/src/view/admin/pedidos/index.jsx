import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import { useParams } from "react-router-dom";
import { enviarWhatsApp } from "../../../API/CallmeBot";
import { Alertas } from "../../../components/content/alert/Sweealert";
import { TruckIcon } from "@heroicons/react/24/outline";
import { handleWhatsappClick } from "../../../API/Whassapp";

const Pedidos = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState(false);
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
        enviarWhatsApp({
          numeroNegocio: response.data.pedido_info.numeroNegocio, //OK
          keyNegocios: response.data.pedido_info.keyNegocios, //OK
          mensaje: {
            numero_Factura: data.id, //OK
            cliente_id: response.data.pedido_info.cliente_id, //OK
            negocio_id: response.data.pedido_info.negocio_id, //OK
            total: response.data.pedido_info.total, //OK
            estado: data.estado, //OK
            productos: [{}],
            ubicacion: response.data.pedido_info.ubicacion,
            tipoUbicacion: response.data.pedido_info.tipoUbicacion,
            telefono: response.data.pedido_info.telefono,
            costoEnvio: response.data.pedido_info.costoEnvio,
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

  const SendtDomiciliario = async (data) => {
    const texto = {
      mesaje: `Hola, Sr. Administrador. Podría ayudarme con un domiciliario, para el pedido ${data.id_pedido}`,
      negocio: data.nombre_negocio,
    };
    handleWhatsappClick(texto);
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
    Domiciliario: Roles === "negocio" && item.estado === "procesando" && (
      <button
        onClick={() => SendtDomiciliario(item)}
        className="p-1 rounded bg-green-500 text-white hover:bg-gray-400"
      >
        Domiciliario
      </button>
    ),
  }));

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
