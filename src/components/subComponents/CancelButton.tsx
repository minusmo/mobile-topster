import "./subComponentStyles/cancelButtonStyle.css";

type cancelButtonProps = {
  onClickCancel: () => void;
};

const CancelButton = ({
  onClickCancel,
}: cancelButtonProps): JSX.Element => {
  return (
    <button id="cancelButton" type="button" onClick={onClickCancel} data-uk-close></button>
  );
};

export default CancelButton;
