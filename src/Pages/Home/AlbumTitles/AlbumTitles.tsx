import { Album } from "../../../data/models/Album";
import HorizontalAlbumTitles from "./HorizontalAlbumTitles";
import VerticalAlbumTitles from "./VerticalAlbumTitles";

interface IAlbumTitles {
    albums: Album[];
    shouldBeHorizontal: boolean;
    borderRoundness: boolean;
}

export default function AlbumTitles({
    albums,
    shouldBeHorizontal,
    borderRoundness
}: IAlbumTitles):JSX.Element {
    return (
        shouldBeHorizontal
        ?
        <HorizontalAlbumTitles albums={albums} borderRoundness={borderRoundness}/>
        :
        <VerticalAlbumTitles albums={albums} borderRoundness={borderRoundness}/>
    )
}