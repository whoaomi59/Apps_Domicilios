import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";

const Negocios = ({ IdUser, Roles }) => {
  const [usuarios, setUsuarios] = useState([]);

  const abrirModal = () => {};
  const Verdetalle = () => {};
  const VerProductos = () => {
    window.location.href = "/productos";
  };
  const handleFormSubmit = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
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
  }, [IdUser, Roles]); // Dependencias para actualizar si cambia el rol

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
