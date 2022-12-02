import { useContext } from "react";
import { Album } from "../../../models/Album";
import { SelectionContext } from "../../../App";

type CellProps = {
    rows: number;
    col: number;
    item: Album;
}

export const Cell = ({
    rows,
    col,
    item,
}: CellProps): JSX.Element => {
    const userSelection = useContext(SelectionContext);
    const cellStyle = {
        aspectRatio: "1 / 1",
    }
    return (
    <img 
        src={item.art} 
        alt={`${item.title}-${item.artist}`} 
        style={cellStyle}
        onClick={() => { userSelection.selection = rows + col; }}
    >
    </img>);
}