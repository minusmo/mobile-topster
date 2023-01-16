import { List } from "@mui/material";
import { Album } from "../../../data/models/Album";
import AlbumTitle from "./AlbumTitle/AlbumTitle";

interface IAlbumList {
  albums: Album[];
}

export function AlbumList({
  albums,
}: IAlbumList): JSX.Element {
  return (
    <List sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    }}>
      {albums
      .map((album, idx) => (album.isEmpty() ? null : <AlbumTitle key={idx} album={album} />))
      }
    </List>
  );
}
