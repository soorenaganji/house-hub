const TextareaField = ({ label, name, value, onChange }) => (
    <div>
      <label className="block mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="flex-3 flex-shrink-0 w-full border p-2 rounded focus:border-primary focus:shadow-md focus:outline-none transition-all duration-150 "
      ></textarea>
    </div>
  );
  
  export default TextareaField;
  