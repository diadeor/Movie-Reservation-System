import type { ReactNode } from "react";

const InputLabel = ({
  type,
  name,
  placeholder,
  label,
  req,
  children,
}: {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  req?: boolean;
  children?: ReactNode;
}) => (
  <div className="flex flex-col gap-1 font-poppins text-orange-200">
    <label htmlFor={name} className="font-bold">
      {label}
    </label>
    <div className="relative items-center">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={req ? req : false}
        className="h-12 w-full bg-orange-900 border border-orange-800 rounded-md outline-0 pl-4"
      />
      {children}
    </div>
  </div>
);

export default InputLabel;
