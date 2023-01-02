import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from "@mui/material";
import { Album } from "../../../data/models/Album";
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import { action } from "mobx";

interface IImgList {
    albums: Album[];
    addAlbum: (album: Album) => void;
}

export const ImgList = ({
    albums,
    addAlbum
}: IImgList): JSX.Element => {
    return (
        <Box sx={{
            padding: '10px 0',
        }}>
            <ImageList cols={3}>
                <ImageListItem key={'Subheader'} cols={3}>
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
                                <IconButton onClick={action('addAlbum', () => {addAlbum(album)})}>
                                    <AddIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}