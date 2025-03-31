import React, { useState } from "react";

const Form = ({ isOpen, onClose, fields, onSubmit, title }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-120">
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
                  required
                >
                  <option value="">Seleccione...</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
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
