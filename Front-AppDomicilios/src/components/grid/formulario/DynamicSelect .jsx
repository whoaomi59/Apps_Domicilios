import { useEffect, useState } from "react";
import axios from "axios";

const DynamicSelect = ({
  url,
  name,
  value,
  onChange,
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
    <select
      name={name}
      value={value ?? ""}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Seleccione...</option>
      {options.map((option) => (
        <option key={option[valueKey]} value={String(option[valueKey])}>
          {option[labelKey]}
        </option>
      ))}
    </select>
  );
};

export default DynamicSelect;
