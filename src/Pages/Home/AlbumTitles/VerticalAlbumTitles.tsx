import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Unstable_Grid2";
import { Album } from "../../../data/models/Album";
import { SlicedList } from "./SlicedList";

interface IVerticalAlbumTitles {
  albums: Array<Album>,
  sliceSize?: number;
  borderRoundness: boolean;
  backgroundColor: string;
  textColor?: string;
}

const VerticalAlbumTitles = observer(({
  albums,
  sliceSize = 50,
  borderRoundness,
  backgroundColor,
  textColor = '#fff'
}: IVerticalAlbumTitles): JSX.Element => {
  // const albumTitleClass = borderRoundness ? "titleList" + " border-rounded-lower" : "titleList";
  const columns = Math.ceil(albums.length / sliceSize);
  const listInColumns = Array(columns)
  .fill(0)
  .map((val, idx) => <SlicedList key={idx} albums={albums.slice(idx*sliceSize,(idx+1)*sliceSize)} />);
  const fontSize = `calc(100%/${sliceSize})`;
  return (
    <Grid container sx={{
      backgroundColor: backgroundColor,
      color: textColor,
      fontSize: fontSize,
    }}>
      {listInColumns}
    </Grid>
  );
});

export default VerticalAlbumTitles;