const TextareaField = ({ label, name, value, onChange }) => (
    <div>
      <label className="block mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded focus:border-primary focus:shadow-md focus:outline-none transition-all duration-150"
      ></textarea>
    </div>
  );
  
  export default TextareaField;
  