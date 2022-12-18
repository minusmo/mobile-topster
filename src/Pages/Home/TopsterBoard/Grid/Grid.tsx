import { Album } from "../../../../models/Album";
import { Row } from "../Row/Row";
import * as _ from "lodash";
import styled from "styled-components";
import { Container } from "../../../../components/Container";
import { useMemo } from "react";

type IGrid = {
    rows: number;
    cols: number;
    albums: Array<Album>;
}

export const Grid = ({
    rows,
    cols,
    albums
}: IGrid): JSX.Element => {
    const grid = useMemo(() => {
        const sliced = albums.slice(0, rows * cols);
        const grid: Array<Array<Album>> = Array(rows)
        .fill(0)
        .map((row, idx) => {
            const startIdx: number = idx * cols;
            const endIdx: number = startIdx + cols;
            return sliced.slice(startIdx, endIdx);
        });
        return grid;
    }, [rows, cols])

    return (
        <Container>
            {grid.map((row, idx) => <Row key={idx} row={idx} items={row}/>)}
        </Container>
    )
}