import { Album } from "../../../models/Album";

type CellProps = {
    item: Album;
}

export const Cell = ({
item,
}: CellProps): JSX.Element => {
    const cellStyle = {
        aspectRatio: "1 / 1",
    }
    return (<img src={item.art} alt={`${item.title}-${item.artist}`} style={cellStyle}></img>);
}