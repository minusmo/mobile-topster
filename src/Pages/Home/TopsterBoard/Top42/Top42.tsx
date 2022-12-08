import * as _ from "lodash";
import { Album } from "../../../../models/Album"
import { Row } from "../Row/Row"
import { Container } from "../../../../components/Container";

type Top42Props = {
    albums: Array<Album>
}

export const Top42 = ({
    albums
}: Top42Props): JSX.Element => {
    return (
        <Container>
            <Row key={_.uniqueId()} row={0} items={albums.slice(0,5)}/>
            <Row key={_.uniqueId()} row={1} items={albums.slice(5,10)}/>
            <Row key={_.uniqueId()} row={2} items={albums.slice(10,16)}/>
            <Row key={_.uniqueId()} row={3} items={albums.slice(16,22)}/>
            <Row key={_.uniqueId()} row={4} items={albums.slice(22,32)}/>
            <Row key={_.uniqueId()} row={5} items={albums.slice(32,42)}/>
        </Container>
    )
}