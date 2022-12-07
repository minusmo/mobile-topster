type PResultImg = {
  id: string;
  imgUrl: string;
  altText: string;
  clickHandler: React.MouseEventHandler<HTMLImageElement>;
};

type albumImgStyle = {
  backgroundColor?: string;
}

const setAlbumImgStyle = (imgUrl: string): albumImgStyle => {
  let albumImgStyle: albumImgStyle = {};
  if (!imgUrl) {
    albumImgStyle["backgroundColor"] = "white";
  }
  return albumImgStyle;
};

const ResultImg = ({
  id,
  imgUrl,
  altText,
  clickHandler,
}: PResultImg): JSX.Element => {
  const albumImgStyle = setAlbumImgStyle(imgUrl);
  return (
    <img
      key={id}
      width={60}
      height={60}
      src={imgUrl ? imgUrl : undefined}
      style={albumImgStyle}
      alt={altText}
      onClick={clickHandler}
    />
  );
};

export default ResultImg;
