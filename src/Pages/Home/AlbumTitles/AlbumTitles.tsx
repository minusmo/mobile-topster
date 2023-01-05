import { Album } from "../../../data/models/Album";
import { columns } from "./utils";
import HorizontalAlbumTitles from "./HorizontalAlbumTitles";
import VerticalAlbumTitles from "./VerticalAlbumTitles";

interface IAlbumTitles {
    albums: Album[];
    borderRoundness: boolean;
    shouldBeHorizontal: boolean;
}

export function AlbumTitles({ 
    albums, 
    borderRoundness,
    shouldBeHorizontal,
}: IAlbumTitles) {
    const sliceSize = albums.length / columns(albums.length);
    return (
        shouldBeHorizontal 
        ? 
        <HorizontalAlbumTitles albums={albums} borderRoundness={borderRoundness} sliceSize={sliceSize}/> 
        : 
        <VerticalAlbumTitles albums={albums} borderRoundness={borderRoundness} />
    );
}

