import { Album } from "../../../models/Album"
import { Row } from "../Row/Row"

type Top42Props = {
    albums: Array<Album>
}

export const Top42 = ({
    albums
}: Top42Props): JSX.Element => {
    return (
        <div id="top42">
            <Row items={albums.slice(0,5)}/>
            <Row items={albums.slice(5,10)}/>
            <Row items={albums.slice(10,16)}/>
            <Row items={albums.slice(16,22)}/>
            <Row items={albums.slice(22,33)}/>
            <Row items={albums.slice(33,43)}/>
        </div>
    )
}