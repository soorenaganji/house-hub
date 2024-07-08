import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  onChange,
  onFocus,
  name,
  placeholder,
  className,
  error,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        onChange={onChange}
        onFocus={onFocus}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`${className} pr-10`} // Adjust padding to accommodate the eye icon
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 ${
          touched && error && "top-1/3"
        }`}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {touched && error && <p className="text-sm mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordInput;
