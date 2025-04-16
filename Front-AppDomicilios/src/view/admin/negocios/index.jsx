import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";

const Negocios = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const abrirModal = () => {};
  const Verdetalle = () => {};

  const VerProductos = (record) => {
    console.log(record.idnegocio);
    window.location.href = `/productos/${record.idnegocio}`;
  };

  const handleFormSubmit = async (formData) => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }
    try {
      let response = await axios.post("/api/negocios/controller.php", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setrefresh((prev) => !prev);
      alert("Registrado!");
    } catch (error) {
      alert("Error al registrar");
      console.error(error);
    }
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/negocios/controller.php");

        // Si el usuario es admin, mostrar todas las rutas
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
    idnegocio: item.idnegocio,
    logo_negocio: <img src={item.logo_negocio} className="w-15" />,
    Negocio: item.Negocio,
    Categoria: item.Categoria,
    usuario: item.usuario,
    direccion: item.direccion,
    telefono: item.telefono,
    email: item.email,
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
            icon: "CalendarDaysIcon",
            className: "bg-blue-400 text-white",
            onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
          },
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

export default Negocios;
