type ISaveImgButton = {
  save: (imgType: string) => void;
};

const SaveButton = ({ save }: ISaveImgButton) => {
  return (
    <div className="">
      <button
        className=""
        onClick={() => alert("준비중입니다.")}
      >
        Save Png
      </button>
      <button
        className=""
        onClick={() => alert("준비중입니다.")}
      >
        Save Jpeg
      </button>
    </div>
  );
};

export default SaveButton;
