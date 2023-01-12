import { ListItem, ListItemText, Skeleton } from "@mui/material";
import { Album } from "../../../../data/models/Album";

type IAlbumTitle = {
    album: Album;
}

const AlbumTitle = ({
    album,
}: IAlbumTitle): JSX.Element => (
    <ListItem>
        {
        album.isEmpty()
        ?
        <Skeleton animation={false} width={50} height={20}/>
        :
        (
        <ListItemText>
            {album.getInfo()}
        </ListItemText>
        )
        }
    </ListItem>
);

export default AlbumTitle;