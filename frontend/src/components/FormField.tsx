interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: "text" | "number" | "textarea" | "select" | "date" | "time";
  options?: string[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  required?: boolean;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  type = "text",
  options = [],
  onChange,
  required = false,
  rows = 4,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="font-semibold mb-1">
        {label} :{" "}
      </label>
      {type === "select" ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className="text-black border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">請選擇</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          rows={rows}
          value={value as string}
          onChange={onChange}
          required={required}
          className="text-black border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className="text-black border border-gray-300 rounded-md p-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      )}
    </div>
  );
};
