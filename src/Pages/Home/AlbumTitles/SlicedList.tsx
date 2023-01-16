import Grid from "@mui/material/Unstable_Grid2";
import { Album } from "../../../data/models/Album";
import { AlbumList } from "./AlbumList";

interface ISlicedList {
  albums: Album[];
}

export function SlicedList({
  albums,
}: ISlicedList): JSX.Element {
  return (
    <Grid xs>
      <AlbumList albums={albums} />
    </Grid>
  );
}
