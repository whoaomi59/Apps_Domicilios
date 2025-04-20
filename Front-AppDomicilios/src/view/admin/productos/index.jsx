import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { useParams } from "react-router-dom";
import { Alertas } from "../../../components/content/alert/Sweealert";

const Productos = ({ Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);
  const { id } = useParams();

  const abrirModal = () => {};
  const Verdetalle = () => {};

  const handleFormSubmit = async (formData) => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    try {
      if (formData.id) {
        let response = await axios.post(
          "/api/productos/controller.php?action=update",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Indicamos que estamos enviando archivos
            },
          }
        );
        console.log(response.data);
      } else {
        let response = await axios.post("/api/productos/controller.php", form, {
          headers: {
            "Content-Type": "multipart/form-data", // Indicamos que estamos enviando archivos
          },
        });
        console.log(response.data);
      }
      setrefresh((prev) => !prev);
      return Alertas({
        icon: "success",
        message: "Registrado!!",
      });
    } catch (error) {
      return Alertas({
        icon: "error",
        message: "Error sl Registrar!!",
      });
    }
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/productos/controller.php");

        if (Roles.includes("admin")) {
          setUsuarios(response.data);
        } else {
          // Filtrar las rutas basadas en los roles del usuario
          const rutasPermitidas = response.data.filter((item) =>
            item.id_negocio.includes(id)
          );
          console.log(rutasPermitidas);
          setUsuarios(rutasPermitidas);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [Roles, refresh]);

  const Formater = usuarios.map((item) => ({
    id: item.id_producto,
    img: <img src={item.img} className="w-10" />,
    nombre: item.nombre_producto,
    Tipo: item.Tipo,
    negocio_id: item.Negocio,
    descripcion: item.descripcion_productos,
    precio: item.precio_producto,
    stock: item.stock_producto,
    fecha_producto: item.fecha_producto,
  }));

  return (
    <div className="p-4">
      <Grid
        module={"Productos"}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "TrashIcon",
            className: "bg-red-500 text-white",
            onClick: (record) => Verdetalle(record), // Llama a la función abrirModal con el registro
          },
        ]}
      />
    </div>
  );
};

export default Productos;
