type spotifyAlbumImgProps = {
  id: string;
  imgUrl: string;
  altText: string;
  handleClickAlbum: React.MouseEventHandler;
};

const SpotifyAlbumImg = ({
  id,
  imgUrl,
  altText,
  handleClickAlbum,
}: spotifyAlbumImgProps): JSX.Element => {
  return (
    <img
      key={id}
      width={60}
      height={60}
      src={imgUrl}
      alt={altText}
      onClick={handleClickAlbum}
    />
  );
};

export default SpotifyAlbumImg;
