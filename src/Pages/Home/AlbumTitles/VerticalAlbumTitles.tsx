import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Unstable_Grid2";
import { Album } from "../../../data/models/Album";
import { SlicedList } from "./SlicedList";

type IVerticalAlbumTitles = {
  albums: Array<Album>,
  sliceSize?: number;
  borderRoundness: boolean;
  backgroundColor: string;
  textColor?: string;
};

const VerticalAlbumTitles = observer(({
  albums,
  sliceSize = 20,
  borderRoundness,
  backgroundColor,
  textColor = '#fff'
}: IVerticalAlbumTitles): JSX.Element => {
  // const albumTitleClass = borderRoundness ? "titleList" + " border-rounded-lower" : "titleList";
  const columns = Math.ceil(albums.length / sliceSize);
  const listInColumns = Array(columns).fill(0).map((val, idx) => <SlicedList key={idx} albums={albums} idx={idx} size={sliceSize} />);

  return (
    <Grid container sx={{
      backgroundColor: backgroundColor,
      color: textColor
    }}>
      {listInColumns}
    </Grid>
  );
});

export default VerticalAlbumTitles;