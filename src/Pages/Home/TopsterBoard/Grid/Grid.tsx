import { Album } from "../../../../models/Album";
import { Row } from "./Row/Row";
import * as _ from "lodash";

type PGrid = {
    rows: number;
    albums: Array<Album>;
}

export const Grid = ({
    rows,
    albums
}: PGrid): JSX.Element => {
    const grid: Array<Array<Album>> = Array(rows).map((row, idx) => [...albums.slice(idx+rows)]);
    return (
        <div id="grid">
            {grid.map((row, idx) => <Row key={idx} row={idx} items={row}/>)}
        </div>
    )
}