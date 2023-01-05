import Grid from "@mui/material/Unstable_Grid2";
import { Album } from "../../../data/models/Album";
import { AlbumList } from "./AlbumList";

export function SlicedList(albums: Album[], idx: number, size: number) {
  const start = idx * size;
  const end = (idx * size) + size;
  return (
    <Grid xs>
      <AlbumList albums={albums} start={start} end={end} />
    </Grid>
  );
}
