type PIconButton = {
    onClick: () => void;
    children: JSX.Element;
};
  
export const IconButton = ({
  onClick,
  children
}: PIconButton): JSX.Element => {
  return (
    <button
      className=""
      type="button"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
  