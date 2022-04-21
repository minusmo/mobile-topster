import "./subComponentStyles/cancelButtonStyle.css";

type cancelButtonProps = {
  imgUri: string;
  onClickCancel: () => void;
};

const CancelButton = ({
  imgUri,
  onClickCancel,
}: cancelButtonProps): JSX.Element => {
  return (
    <img id="cancelButton" src={imgUri} alt="cancel" onClick={onClickCancel} />
  );
};

export default CancelButton;
