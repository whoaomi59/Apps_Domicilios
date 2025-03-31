import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";

const Productos = () => {
  const [usuarios, setUsuarios] = useState([]);

  const abrirModal = () => {};
  const Verdetalle = () => {};
  const handleFormSubmit = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  useEffect(() => {
    axios
      .get("/api/productos/controller.php")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Error al obtener usuarios", error));
  }, []);

  return (
    <div className="p-4">
      <Grid
        module={"Negocios"}
        columns={Columns}
        data={usuarios}
        fields={fields}
        handleFormSubmit={handleFormSubmit}
        actions={[
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

export default Productos;
