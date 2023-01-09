import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Unstable_Grid2";
import { Album } from "../../../data/models/Album";
import { SlicedList } from "./SlicedList";

type IHorizontalAlbumTitles = {
  albums: Album[],
  sliceSize?: number;
  borderRoundness: boolean;
  backgroundColor: string;
};

const HorizontalAlbumTitles = observer(({
  albums,
  sliceSize = 5,
  borderRoundness,
  backgroundColor
}: IHorizontalAlbumTitles): JSX.Element => {
  const columns = Math.ceil(albums.length / sliceSize);
  const listInColumns = Array(columns).fill(0).map((val, idx) => <SlicedList key={idx} albums={albums} idx={idx} size={sliceSize} />);

  return (
    <Grid container sx={{
      backgroundColor: backgroundColor
    }}>
      {listInColumns}
    </Grid>
  );
});

export default HorizontalAlbumTitles;