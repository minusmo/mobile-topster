import * as _ from "lodash";
import { Cell } from "../Cell/Cell";
import styled from "styled-components";

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

type IRow = {
    row: number;
    items: Array<any>;
}

export const Row = ({
    row,
    items,
}: IRow): JSX.Element => {
    return (
    <StyledRow>
        {items.map((item, idx) => <Cell key={_.uniqueId()} rowItemsPassed={row * items.length} colItemsPassed={idx} item={item}/>)}
    </StyledRow>
    )
}