const InputField = ({ label, name, type, value, onChange, readOnly }) => (
  <div>
    <label className="block mb-2">{label}</label>
    {readOnly ? (
      <input
        readOnly
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded bg-slate-400 text-slate-800 cursor-not-allowed mb-4 focus:shadow-md focus:outline-none transition-all duration-150"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded focus:border-primary mb-4 focus:shadow-md focus:outline-none transition-all duration-150"
      />
    )}
  </div>
);

export default InputField;
