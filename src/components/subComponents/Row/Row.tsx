import { Cell } from "../Cell/Cell";

type RowProps = {
    key: number;
    items: Array<any>;
}
export const Row = ({
    key,
    items,
}: RowProps): JSX.Element => {
    const rowStyle = {
        width: "100%",
        gridTemplateRows: `repeat(${items.length},1fr)`,
    };
    return (
    <div className="row" style={rowStyle}>
        {items.map((item, idx) => <Cell rows={key * items.length} col={idx} item={item}/>)}
    </div>
    )
}