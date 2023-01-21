import { observer } from "mobx-react-lite";
import { Stack } from "@mui/system";
import { Album } from "../../../../data/models/Album";
import { Row } from "../Row/Row";
import { Container } from "../../../../components/Container";
import { convertToGrid } from "./utils";

interface IGrid {
    rows: number;
    cols: number;
    albums: Array<Album>;
}

export const Grid = observer(({
    rows,
    cols,
    albums
}: IGrid): JSX.Element => {
    const grid = convertToGrid(albums, rows, cols);

    return (
        <Container>
          <Stack spacing={0}>
            {grid.map((row, idx) => <Row key={idx} row={idx} items={row}/>)}
          </Stack>
        </Container>
    )
})
