import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from "@mui/material";
import { Album } from "../../../data/models/Album";
import AddIcon from '@mui/icons-material/Add';

interface IImgList {
    albums: Album[];
    addAlbum: (album: Album) => void;
}

export const ImgList = ({
    albums,
    addAlbum
}: IImgList): JSX.Element => {
    return (
        <ImageList>
            <ImageListItem key={'Subheader'}>
                <ListSubheader component={'div'}>All matches found</ListSubheader>
            </ImageListItem>
            {albums.map((album: Album) => (
                <ImageListItem key={album.art}>
                    <img
                        src={album.art}
                        alt={album.info()}
                        loading={'lazy'}
                    />
                    <ImageListItemBar
                        title={album.title}
                        subtitle={album.artist}
                        actionIcon={
                            <IconButton onClick={() => {addAlbum(album)}}>
                                <AddIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}