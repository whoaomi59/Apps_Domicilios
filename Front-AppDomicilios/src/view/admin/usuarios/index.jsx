import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { fields, ModelsUsuarios } from "./models";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const abrirModal = () => {};
  const Verdetalle = () => {};
  const handleFormSubmit = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  useEffect(() => {
    axios
      .get("http://192.168.120.144/API/api/usuarios/controller.php")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Error al obtener usuarios", error));
  }, []);

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
            icon: "PencilSquareIcon",
            className: "bg-green-500 text-white",
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
