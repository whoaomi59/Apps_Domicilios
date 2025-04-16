import React, { useState } from "react";
import * as Icons from "@heroicons/react/24/outline";
import Form from "./formulario";

const Grid = ({ columns, data, actions, module, fields, handleFormSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage] = useState(6); // Número de elementos por página
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calcular el índice de los elementos que deben ser mostrados en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-extrabold text-gray-600">{module}</h1>
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 flex"
        >
          <Icons.DocumentPlusIcon className="w-5 mr-1" />
          Agregar
        </button>
        <Form
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fields={fields}
          onSubmit={handleFormSubmit}
          title={module}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-green-500 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-4 text-left text-sm font-medium hidden sm:table-cell"
              >
                {col.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="p-4 text-left text-sm font-medium hidden sm:table-cell">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr className="even:bg-blue-50 cursor-pointer sm:table-row">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-4 text-sm text-black hidden sm:table-cell"
                  >
                    {row[col.key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="p-4 space-x-2 hidden sm:table-cell">
                    {actions.map((action, actionIndex) => {
                      const IconComponent = Icons[action.icon];
                      return (
                        <button
                          key={actionIndex}
                          className={`p-2 rounded ${action.className} hover:bg-gray-400 m-0.5`}
                          title={action.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (typeof action.onClick === "function") {
                              action.onClick(row);
                            }
                          }}
                        >
                          {IconComponent && <IconComponent className="w-4" />}
                        </button>
                      );
                    })}
                  </td>
                )}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Grid;
