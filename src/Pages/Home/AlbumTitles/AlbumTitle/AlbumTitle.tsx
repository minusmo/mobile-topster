import { ListItem, ListItemText, Skeleton } from "@mui/material";
import { Album } from "../../../../data/models/Album";

type IAlbumTitle = {
    album: Album;
}

const AlbumTitle = ({
    album,
}: IAlbumTitle): JSX.Element => (
    <ListItem disablePadding sx={{
        margin: '3px auto',
        padding: '0 0 0 2%'
    }}>
        <ListItemText disableTypography={true} sx={{
            padding: 0,
            margin: '0 auto',
        }}>
            {album.getInfo()}
        </ListItemText>
    </ListItem>
);

export default AlbumTitle;