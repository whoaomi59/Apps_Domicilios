import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { fields, ModelsUsuarios } from "./models";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const abrirModal = () => {};

  const handleFormSubmit = async (newData) => {
    console.log(newData);
    try {
      if (newData.nombre) {
        let response = await axios.put(
          "/api/usuarios/controller.php",
          {
            id: newData.id,
            nombre: newData.nombre,
            telefono: newData.telefono,
            rol: newData.rol,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } else {
        let response = await axios.post(`/api/usuarios/controller.php`, {
          email: newData.email,

          empresa_id: 1,

          nombre: newData.nombre,

          password: newData.password,

          rol: newData.rol,

          telefono: newData.telefono,
        });
        console.log(response);
      }
      setrefresh((prev) => !prev);
      return alert("Registrado!");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    axios
      .get("/api/usuarios/controller.php")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Error al obtener usuarios", error));
  }, [refresh]);

  return (
    <div className="p-4">
      <Grid
        module={"Usuarios"}
        columns={ModelsUsuarios}
        data={usuarios}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
          {
            icon: "KeyIcon",
            className: "bg-gray-500 text-white",
            onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
          },
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

export default Usuarios;
