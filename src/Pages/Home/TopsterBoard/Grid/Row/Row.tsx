import * as _ from "lodash";
import { Cell } from "../Cell/Cell";

type RowProps = {
    row: number;
    items: Array<any>;
}
export const Row = ({
    row,
    items,
}: RowProps): JSX.Element => {
    const rowStyle = {
        width: "100%",
        gridTemplateRows: `repeat(${items.length},1fr)`,
    };
    return (
    <div className="row" style={rowStyle}>
        {items.map((item, idx) => <Cell key={_.uniqueId()} rows={row * items.length} col={idx} item={item}/>)}
    </div>
    )
}