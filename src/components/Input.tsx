type IInput = {
  label: string;
  value: string;
  onchange: (value: string) => void;
};

export const Input = ({
  label,
  value, 
  onchange,
}: IInput): JSX.Element => {
  return (
    <div className="">
      <label
        className=""
        htmlFor="input-value"
      >
        {label}
      </label>
      <div className="">
        <input
          className=""
          id="input-value"
          type="text"
          placeholder="#HEX color"
          value={value}
          onChange={(e) => onchange(e.target.value)} />
      </div>
    </div>
  );
};
