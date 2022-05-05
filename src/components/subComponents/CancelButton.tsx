type cancelButtonProps = {
  onClickCancel: () => void;
};

const CancelButton = ({ onClickCancel }: cancelButtonProps): JSX.Element => {
  return (
    <button
      id="cancelButton"
      className="uk-modal-close-default"
      type="button"
      onClick={() => onClickCancel()}
      data-uk-close
    ></button>
  );
};

export default CancelButton;
