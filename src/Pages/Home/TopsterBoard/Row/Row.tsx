import * as _ from "lodash";
import { Cell } from "../Cell/Cell";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { Album } from "../../../../data/models/Album";
import { useContext } from "react";
import { TopsterStoreContext } from "../../../../contexts/TopsterStoreContext";
import { TopsterType } from "../../../../data/models/Topster";
import { top42RowItemsPassed } from "./top42RowItemsPassed";

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

interface IRow {
    row: number;
    items: Album[];
}

export const Row = observer(({
    row,
    items,
}: IRow): JSX.Element => {
    const topsterStore = useContext(TopsterStoreContext);
    const topster = topsterStore.topster;
    const passedItems = topster.type === TopsterType.Grid ? row * items.length : top42RowItemsPassed(row);
    const theme = useTheme();
    const columnSpacing = theme.spacing(0);
    const EquallySpacedRow = styled(StyledRow)`
        column-gap: ${columnSpacing};
    `;
    return (
    <StyledRow>
        {items.map((item, idx) => <Cell key={_.uniqueId()} rowItemsPassed={passedItems} colItemsPassed={idx} item={item}/>)}
    </StyledRow>
    )
})