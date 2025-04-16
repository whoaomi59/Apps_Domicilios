import React, { useState } from "react";
import DynamicSelect from "./DynamicSelect ";

const Form = ({ isOpen, onClose, fields, onSubmit, title }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Si el campo es un archivo, agregamos el archivo a formData
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] }); // Solo tomamos el primer archivo
    } else {
      setFormData({ ...formData, [name]: value }); // Si no es un archivo, manejamos como texto
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Enviar el formData con el archivo incluido
    setFormData(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-50 z-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl z-50 overflow-y-auto max-h-[90vh] mt-20">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Seleccione...</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              ) : field.type === "dinamiselect" ? (
                <DynamicSelect
                  url={field.url}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  valueKey={field.value}
                  labelKey={field.text}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded-lg text-white hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
