type spotifyAlbumImgProps = {
  id: string;
  imgUrl: string;
  altText: string;
  handleClickAlbum: React.MouseEventHandler<HTMLImageElement>;
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
const SpotifyAlbumImg = ({
  id,
  imgUrl,
  altText,
  handleClickAlbum,
}: spotifyAlbumImgProps): JSX.Element => {
  const albumImgStyle = setAlbumImgStyle(imgUrl);
  return (
    <img
      key={id}
      width={60}
      height={60}
      src={imgUrl ? imgUrl : undefined}
      style={albumImgStyle}
      alt={altText}
      onClick={handleClickAlbum}
    />
  );
};

export default SpotifyAlbumImg;
