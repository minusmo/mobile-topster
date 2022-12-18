import { Album } from "../../../../models/Album";

type IAlbumTitle = {
    album: Album;
}

const AlbumTitle = ({
    album,
}: IAlbumTitle): JSX.Element => {
    const description = album.title + " - " + album.artist;
    return <li>{description}</li>;
}

export default AlbumTitle;