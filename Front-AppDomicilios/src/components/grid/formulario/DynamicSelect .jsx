import { useEffect, useState } from "react";
import axios from "axios";

const DynamicSelect = ({
  url,
  name,
  value,
  onChange,
  label,
  valueKey,
  labelKey,
  required = true,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(url);
        setOptions(response.data);
      } catch (error) {
        console.error("Error al cargar opciones:", error);
      }
    };

    fetchOptions();
  }, [url]);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-600 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        required={required}
      >
        <option value="">Seleccione...</option>
        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DynamicSelect;
