import {Album} from "../../../models/Album";

type AlbumTitleProps = {
    album: Album;
}

const AlbumTitle = ({
    album,
}: AlbumTitleProps): JSX.Element => {
    return <li>{album.title + " - " + album.artist}</li>;
}

export default AlbumTitle;