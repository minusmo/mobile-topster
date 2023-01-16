import { useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/material/styles";
import { Stack, useMediaQuery } from "@mui/material";
import { TopsterType } from "../../../data/models/Topster";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { Grid } from "./Grid/Grid";
import { Top42 } from "./Top42/Top42";
import AlbumTitles from "../AlbumTitles/AlbumTitles";

interface ITopsterBoard {
  showAlbumTitles: boolean;
  capturedAreaRef: React.ForwardedRef<HTMLElement | null>;
};

const styleForSmallerView = `
    width: 100%;
    height: fit-content;
`;

const styleForLargerView = `
    width: calc(99vh - 114px);
    height: 100%;
`;

const TopsterBoard = observer(({
  showAlbumTitles,
  capturedAreaRef
}: ITopsterBoard): JSX.Element => {
  const topsterStore = useContext(TopsterStoreContext);
  const topster = topsterStore.topster;
  const theme = useTheme();
  const smallerThanLg = theme.breakpoints.down('lg')
  const whenSmallerThanLg = useMediaQuery(smallerThanLg);
  
  const BoardArea = styled.div`
    ${!whenSmallerThanLg ? styleForLargerView : styleForSmallerView}
    background-color: ${topster.backgroundColor};
  `;

  return (
      <Stack ref={capturedAreaRef} id="captured-area" direction={!whenSmallerThanLg ? 'row' : 'column'} spacing={0}>
        <BoardArea>
        {
          topster.type === TopsterType.Grid 
          ?
          <Grid rows={topster.rows} cols={topster.cols} albums={topster.albums} /> 
          :
          <Top42 albums={topster.albums}/>  
        }
        </BoardArea>
        {showAlbumTitles
         ? 
         <AlbumTitles
            albums={topster.getAlbumsBetween(0,topster.rows * topster.cols)} 
            shouldBeHorizontal={whenSmallerThanLg}
            borderRoundness={topster.borderRoundness}
            backgroundColor={topster.backgroundColor}
            textColor={topster.fontStyle.textColor}
          /> 
         : 
         null}
      </Stack>
  );
});

export default TopsterBoard;
