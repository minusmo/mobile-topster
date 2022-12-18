type IButton = {
  label: string;
  onClick: () => void;
};

export const Button = ({
  label,
  onClick,
}: IButton): JSX.Element => {
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
