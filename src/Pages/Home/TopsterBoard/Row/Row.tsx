import * as _ from "lodash";
import { Cell } from "../Cell/Cell";
import styled from "styled-components";

const SRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

type RowProps = {
    row: number;
    items: Array<any>;
}

export const Row = ({
    row,
    items,
}: RowProps): JSX.Element => {
    return (
    <SRow>
        {items.map((item, idx) => <Cell key={_.uniqueId()} rows={row * items.length} col={idx} item={item}/>)}
    </SRow>
    )
}