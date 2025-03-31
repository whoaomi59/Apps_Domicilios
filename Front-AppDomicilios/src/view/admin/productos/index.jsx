import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "../../../components/grid/grid";
import { Columns, fields } from "./models";
import { useParams } from "react-router-dom";

const Productos = ({ Roles }) => {
  const [usuarios, setUsuarios] = useState([]);
  const { id } = useParams();
  console.log(id);

  const abrirModal = () => {};
  const Verdetalle = () => {};
  const VerProductos = (record) => {};
  const handleFormSubmit = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  useEffect(() => {
    const Get = async () => {
      try {
        let response = await axios.get("/api/productos/controller.php");

        // Si el usuario es admin, mostrar todas las rutas
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
  }, [Roles]); // Dependencias para actualizar si cambia el rol

  const Formater = usuarios.map((item) => ({
    id_producto: item.id_producto,
    img: <img src={item.img} className="w-15" />,
    nombre_producto: item.nombre_producto,
    Negocio: item.Negocio,
    descripcion_productos: item.descripcion_productos,
    precio_producto: item.precio_producto,
    stock_producto: item.stock_producto,
    fecha_producto: item.fecha_producto,
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

export default Productos;
