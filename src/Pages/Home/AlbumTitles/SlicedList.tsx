import Grid from "@mui/material/Unstable_Grid2";
import { Album } from "../../../data/models/Album";
import { AlbumList } from "./AlbumList";

interface ISlicedList {
  albums: Album[];
  idx: number;
  size: number;
}

export function SlicedList({
  albums,
  idx,
  size 
}: ISlicedList): JSX.Element {
  const start = idx * size;
  const end = (idx * size) + size;
  return (
    <Grid xs>
      <AlbumList albums={albums} start={start} end={end} />
    </Grid>
  );
}
