type IInput = {
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  onchange: (value: string) => void;
};

export const Input = ({
  type,
  label,
  value, 
  onchange,
  placeholder,
}: IInput): JSX.Element => {
  return (
    <div>
      <label
        htmlFor="input-value"
      >
        {label}
      </label>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onchange(e.target.value)} />
      </div>
    </div>
  );
};
