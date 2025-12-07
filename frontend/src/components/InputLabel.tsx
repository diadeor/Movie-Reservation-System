const InputLabel = ({
  type,
  name,
  placeholder,
  label,
  req,
}: {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  req?: boolean;
}) => (
  <div className="flex flex-col gap-2 font-poppins">
    <label htmlFor={name} className="font-bold">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={req ? req : false}
      className="h-12 w-full bg-white/20 border-2 rounded-md outline-0 pl-4"
    />
  </div>
);

export default InputLabel;
