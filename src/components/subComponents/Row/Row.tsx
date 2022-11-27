import { repeat } from "lodash";
import {Cell} from "../Cell/Cell";

type RowProps = {
    items: Array<any>;
}
export const Row = ({
    items,
}: RowProps): JSX.Element => {
    const rowStyle = {
        width: "100%",
        gridTemplateRows: `repeat(${items.length},1fr)`,
    };
    return (
    <div className="row" style={rowStyle}>
        {items.map(item => <Cell item={item}/>)}
    </div>
    )
}