type ITextButton = {
  label: string;
  onClick: () => void;
};

export const TextButton = ({
  label,
  onClick,
}: ITextButton): JSX.Element => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};
