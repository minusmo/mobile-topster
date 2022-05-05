type saveImgButtonProps = {
  save: (imgType: string) => void;
};
const SaveImgButton = ({ save }: saveImgButtonProps) => {
  return (
    <div className="uk-button-group uk-align-center uk-margin-small">
      <button
        className="uk-button uk-button-default"
        onClick={() => alert("현재 지원되지 않습니다.")}
      >
        Save Png
      </button>
      <button
        className="uk-button uk-button-default"
        onClick={() => alert("현재 지원되지 않습니다.")}
      >
        Save Jpeg
      </button>
    </div>
  );
};

export default SaveImgButton;
