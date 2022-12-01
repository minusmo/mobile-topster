import {Album} from "../../../models/Album";
import {Row} from "../Row/Row";

type GridProps = {
    rows: number;
    albums: Array<Album>;
}
export const Grid = ({
    rows,
    albums
}: GridProps): JSX.Element => {
    const grid: Array<Array<Album>> = Array(rows).map((row, idx) => [...albums.slice(idx+rows)]);
    return (
        <div id="grid">
            {grid.map(row => <Row items={row}/>)}
        </div>
    )
}