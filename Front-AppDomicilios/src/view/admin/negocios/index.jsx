import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields, FielsEstado } from "./models";
import { Alertas } from "../../../components/content/alert/Sweealert";
import Form from "../../../components/grid/formulario";
import { ClockIcon } from "@heroicons/react/24/outline";

const Negocios = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const VerProductos = (record) => {
    window.location.href = `/productos/${record.id}/${record.nombre}`;
  };

  const handleFormSubmit = async (formData) => {
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }
    console.log(formData);
    try {
      if (formData.update) {
        let response = await axios.put("/api/negocios/controller.php", form, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
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

  const ActiveNegocio = async (formData) => {
    try {
      let response = await axios.put("/api/negocios/controller.php", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    estado:
      item.estadoNegocio === "1" ? (
        <p className="flex">
          <ClockIcon className="w-5 mr-2 text-red-500" />
          Inactivo
        </p>
      ) : (
        <p className="flex">
          <ClockIcon className="w-5 mr-2 text-green-500" />
          Activo
        </p>
      ),
    Horario_inicial: item.Horario_inicial,
    Horario_final: item.Horario_final,
    created_at: item.created_at,
  }));

  return (
    <div className="p-4">
      <Form
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        fields={FielsEstado}
        onSubmit={ActiveNegocio}
        title={"Estado"}
        initialValues={editingItem}
      />
      <Grid
        module={"Negocios"}
        columns={Columns}
        data={Formater}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "NoSymbolIcon",
            className: "bg-orange-500 text-white",
            onClick: (record) => {
              setIsModalOpen(true);
              setEditingItem(record);
            },
          },
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
