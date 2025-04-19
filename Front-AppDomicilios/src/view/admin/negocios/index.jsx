import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { Alertas } from "../../../components/content/alert/Sweealert";

const Negocios = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const VerProductos = (record) => {
    window.location.href = `/productos/${record.id}`;
  };

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
          "/api/negocios/update_negocios.php",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } else {
        let response = await axios.post("/api/negocios/controller.php", form, {
          headers: {
            "Content-Type": "multipart/form-data",
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
        message: "Error al registrar!!",
      });
    }
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/negocios/controller.php");
        if (Roles.includes("admin")) {
          setUsuarios(response.data);
        } else {
          // Filtrar las rutas basadas en los roles del usuario
          const rutasPermitidas = response.data.filter((item) =>
            item.iduser.includes(IdUser)
          );
          setUsuarios(rutasPermitidas);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, [IdUser, Roles, refresh]); // Dependencias para actualizar si cambia el rol

  const Formater = usuarios.map((item) => ({
    id: item.idnegocio,
    logo_negocio: <img src={item.logo_negocio} className="w-15" />,
    nombre: item.Negocio,
    categoria_id: item.Categoria,
    usuario_id: item.usuario,
    direccion: item.direccion,
    telefono: item.telefono,
    email: item.email,
    Horario_inicial: item.Horario_inicial,
    Horario_final: item.Horario_final,
    created_at: item.created_at,
  }));

  return (
    <div className="p-4">
      <Grid
        module={"Negocios"}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "ArrowRightCircleIcon",
            className: "bg-blue-500 text-white",
            onClick: (record) => VerProductos(record),
          },
        ]}
      />
    </div>
  );
};

export default Negocios;
