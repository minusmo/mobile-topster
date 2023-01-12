import { observer } from "mobx-react-lite";
import { Album } from "../../../data/models/Album";
import HorizontalAlbumTitles from "./HorizontalAlbumTitles";
import VerticalAlbumTitles from "./VerticalAlbumTitles";

interface IAlbumTitles {
    albums: Album[];
    shouldBeHorizontal: boolean;
    borderRoundness: boolean;
    backgroundColor: string;
    textColor?: string;
}

const AlbumTitles = observer(({
    albums,
    shouldBeHorizontal,
    borderRoundness,
    backgroundColor,
    textColor = '#fff'
}: IAlbumTitles):JSX.Element => {
    return (
        shouldBeHorizontal
        ?
        <HorizontalAlbumTitles albums={albums} borderRoundness={borderRoundness} backgroundColor={backgroundColor} textColor={textColor}/>
        :
        <VerticalAlbumTitles albums={albums} borderRoundness={borderRoundness} backgroundColor={backgroundColor} textColor={textColor}/>
    )
});

export default AlbumTitles;