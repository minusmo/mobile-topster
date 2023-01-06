import * as _ from "lodash";
import { Cell } from "../Cell/Cell";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";

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

export const Row = observer(({
    row,
    items,
}: IRow): JSX.Element => {
    const theme = useTheme();
    const columnSpacing = theme.spacing(0);
    const EquallySpacedRow = styled(StyledRow)`
        column-gap: ${columnSpacing};
    `;
    return (
    <StyledRow>
        {items.map((item, idx) => <Cell key={_.uniqueId()} rowItemsPassed={row * items.length} colItemsPassed={idx} item={item}/>)}
    </StyledRow>
    )
})