import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AlbumSharp } from "@mui/icons-material";
import { Album } from "../../../../data/models/Album";

type IAlbumTitle = {
    album: Album;
}

const AlbumTitle = ({
    album,
}: IAlbumTitle): JSX.Element => (
    <ListItem>
        <ListItemText inset>
            {album.getInfo()}
        </ListItemText>
    </ListItem>
);

export default AlbumTitle;