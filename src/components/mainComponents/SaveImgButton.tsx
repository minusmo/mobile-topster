type saveImgButtonProps = {
  save: (imgType: string) => void;
};
const SaveImgButton = ({ save }: saveImgButtonProps) => {
  return (
    <div className="uk-button-group">
      <button className="uk-button uk-button-default" onClick={() => save("png")}>
        Save Png
      </button>
      <button className="uk-button uk-button-default" onClick={() => save("jpeg")}>
        Save Jpeg
      </button>
    </div>
  );
};

export default SaveImgButton;
