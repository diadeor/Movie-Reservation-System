import type { ReactNode } from "react";

const InputLabel = ({
  type,
  name,
  placeholder,
  label,
  req = false,
  bg = "bg-orange-900",
  border = "border-orange-800",
  defaultValue,
  children,
  onChange,
}: {
  type: string;
  name: string;
  placeholder?: string;
  label: string;
  req?: boolean;
  bg?: string;
  border?: string;
  defaultValue?: any;
  children?: ReactNode;
  onChange?: Function;
}) => (
  <div className="flex flex-col gap-1 font-poppins text-orange-200">
    <label htmlFor={name} className="font-bold pl-1">
      {label}
    </label>
    <div className="relative items-center">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={req}
        defaultValue={defaultValue}
        onChange={(e) => onChange && onChange(e)}
        className={`h-12 w-full ${bg} border ${border} rounded-md outline-0 pl-4`}
      />
      {children}
    </div>
  </div>
);

export default InputLabel;
