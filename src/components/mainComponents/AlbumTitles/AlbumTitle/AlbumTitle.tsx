import { Album } from "../../../../models/Album";

type PAlbumTitle = {
    album: Album;
}

const AlbumTitle = ({
    album,
}: PAlbumTitle): JSX.Element => {
    const description = album.title + " - " + album.artist;
    return <li>{description}</li>;
}

export default AlbumTitle;