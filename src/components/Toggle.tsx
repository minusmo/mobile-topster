type IToggle = {
  label: string;
  value: boolean;
  ontoggle: (value: boolean) => void;
};

export const Toggle = ({
  label,
  value, 
  ontoggle,
}: IToggle): JSX.Element => {
  return (
    <div className="">
      <label className="" htmlFor="">
        {label}
      </label>
      <div className="">
        <input
          className=""
          id="toggle-titles"
          type="checkbox"
          onChange={() => ontoggle(!value)}
          checked={value}
        ></input>
      </div>
    </div>
  );
};
