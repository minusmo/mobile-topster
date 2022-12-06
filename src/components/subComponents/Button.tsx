type PButton = {
  label: string;
  onClick: () => void;
};

export const Button = ({
  label,
  onClick,
}: PButton): JSX.Element => {
  return (
    <button
      className=""
      type="button"
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};
