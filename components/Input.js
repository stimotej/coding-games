import { useState } from "react";

const Input = ({
  label,
  labelClassName,
  className,
  inputClassName,
  value,
  onChange,
  type,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`flex flex-col dark:text-gray-500 ${className}`}>
      {label ? (
        <label className={`mb-2 ${labelClassName}`}>{label}</label>
      ) : (
        <></>
      )}
      <input
        type={type || "text"}
        className={`bg-gray-100 dark:bg-secondary-light rounded-lg p-3 outline-none dark:text-white ${
          focused ? "ring-1 ring-gray-500" : ""
        } ${inputClassName}`}
        value={value || ""}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        onChange={(e) => onChange(e.target.value, e)}
        {...props}
      />
    </div>
  );
};

export default Input;
