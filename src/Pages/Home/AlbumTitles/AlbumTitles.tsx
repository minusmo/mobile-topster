import { observer } from "mobx-react-lite";
import { Album } from "../../../data/models/Album";
import HorizontalAlbumTitles from "./HorizontalAlbumTitles";
import VerticalAlbumTitles from "./VerticalAlbumTitles";

interface IAlbumTitles {
    albums: Album[];
    shouldBeHorizontal: boolean;
    borderRoundness: boolean;
    backgroundColor: string;
}

const AlbumTitles = observer(({
    albums,
    shouldBeHorizontal,
    borderRoundness,
    backgroundColor,
}: IAlbumTitles):JSX.Element => {
    return (
        shouldBeHorizontal
        ?
        <HorizontalAlbumTitles albums={albums} borderRoundness={borderRoundness} backgroundColor={backgroundColor}/>
        :
        <VerticalAlbumTitles albums={albums} borderRoundness={borderRoundness} backgroundColor={backgroundColor}/>
    )
});

export default AlbumTitles;