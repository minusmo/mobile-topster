type IIconButton = {
    onClick: () => void;
    children: JSX.Element;
};
  
export const IconButton = ({
  onClick,
  children
}: IIconButton): JSX.Element => {
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
  