import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { formatearCOP } from "../../../components/content/formatoMoneda";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";
import { EnviarWhatsApp_Negocio } from "../../../API/CallmeBot_Negocio";
import Loader from "../../../components/content/loader";
import { EnviarWhatsApp_Admin } from "../../../API/Callmeot_Norificaton";

const Pedidos = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [loader, setloader] = useState(false);
  const { id, name } = useParams();

  const Notificar = async (item) => {
    console.table(item);
    try {
      let response = await axios.put(
        "/api/pedidos/controller.php",
        {
          id: item.id_pedido,
          estado: "enviado",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      EnviarWhatsApp_Admin({
        mensaje: {
          numero_Factura: item.id_pedido, //OK
          cliente_id: item.usuario_pedido, //OK
          negocio_id: item.nombre_negocio, //OK
          telefono_negocio: response.data.pedido_info.telefono, //OK
          total: item.total, //OK
          estado: "Recoger", //OK
          productos: response.data.pedido_info.productos, //OK
          direccion: item.direc_negocio, //OK
          telefono: item.tel_user_pedi, //OK
          ubicacion: item.ubica_domici, //OK
          tipoUbicacion: item.tipoUbicacion, //OK
          costoEnvio: item.tipoUbicacion === "Rural" ? 10000 : 5000,
        },
      });
      setrefresh((prev) => !prev);
      return Alertas({
        icon: "success",
        message: "Registrado!!",
      });
    } catch (error) {
      alert(error);
    }
  };

  const VerProductos = (record) => {
    const { id, usuario_pedido } = record;

    if (Roles.includes("admin")) {
      window.location.href = `/shop/pedidos/detalle/${id}/${usuario_pedido}`;
    } else {
      window.location.href = `/shop/pedidos/detalle/${id}/RunWay`;
    }
    return;
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

  const ChangueStatus = async (data, status) => {
    try {
      let response = await axios.put(
        "/api/pedidos/controller.php",
        {
          id: data.id_pedido,
          estado: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status == "procesando") {
        EnviarWhatsApp_Negocio({
          numeroNegocio: response.data.pedido_info.telefono, //OK
          keyNegocios: response.data.pedido_info.KeyNegocio, //OK
          mensaje: {
            numero_Factura: data.id_pedido, //OK
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
    dire_negocio: item.dire_negocio,
    direc_negocio: item.direc_negocio,
    ubica_domici: item.ubica_domici,
    tipoUbicacion: item.tipoUbicacion,
    tel_user_pedi: item.tel_user_pedi,
    logo_pedido: <img src={item.logo_pedido} className="w-10" />,
    nombre_negocio: item.nombre_negocio,
    usuario_pedido: item.usuario_pedido,
    estado: item.estado,
    total: formatearCOP(item.total),
    button:
      Roles === "admin" ? (
        item.estado === "procesando" ? (
          <button className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-500/70">
            <span class="h-1.5 w-1.5 rounded-full bg-green-900"></span>
            Solicitado
          </button>
        ) : (
          <button
            onClick={() => ChangueStatus(item, "procesando")}
            className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-500/70 hover:bg-red-500"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-red-900"></span>
            Pendiente
          </button>
        )
      ) : item.estado === "procesando" ? (
        <label className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-400/70 ">
          <span class="h-1.5 w-1.5 rounded-full bg-green-900"></span>
          Solicitado
        </label>
      ) : item.estado === "enviado" ? (
        <label className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-orange-400/70">
          <span class="h-1.5 w-1.5 rounded-full bg-orange-900"></span>
          Notificado
        </label>
      ) : (
        <label className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-500/70">
          <span class="h-1.5 w-1.5 rounded-full bg-red-900"></span>
          Pendiente
        </label>
      ),
    pedido:
      Roles === "admin"
        ? null
        : item.estado === "procesando" && (
            <button
              onClick={() => Notificar(item)}
              className="bg-green-200 p-1.5 rounded-full hover:bg-green-300"
            >
              <img src="/iconos/entrega.png" />
            </button>
          ),
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
        buttonedit={true}
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
