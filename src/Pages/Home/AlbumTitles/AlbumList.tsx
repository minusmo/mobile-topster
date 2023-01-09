import { List, Skeleton } from "@mui/material";
import { Album } from "../../../data/models/Album";
import AlbumTitle from "./AlbumTitle/AlbumTitle";

interface IAlbumList {
  albums: Album[];
  start: number;
  end: number;
}

export function AlbumList({
  albums, 
  start = 0, 
  end = albums.length
}: IAlbumList): JSX.Element {
  return (
    <List>
      {albums
      .slice(start, end)
      .map((album, idx) => <AlbumTitle key={idx} album={album} />)
      }
    </List>
  );
}
