import React, { useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { TopsterType } from "../../../data/models/Topster";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { Grid } from "./Grid/Grid";
import { Top42 } from "./Top42/Top42";
import HorizontalAlbumTitles from "../AlbumTitles/HorizontalAlbumTitles";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { AlbumTitles } from "../AlbumTitles/AlbumTitles";

interface ITopsterBoard {
  showAlbumTitles: boolean;
};

const styleForSmallerView = `
    width: 100%;
`;

const styleForLargerView = `
    width: calc(900px + (100vw - 900px) * 0.1);
`;

const TopsterBoard = observer(({
  showAlbumTitles,
}: ITopsterBoard): JSX.Element => {
  const topsterStore = useContext(TopsterStoreContext);
  const topster = topsterStore.topster;
  const theme = useTheme();
  const largerThanMd = theme.breakpoints.up('md');
  const whenLargerThanMd = useMediaQuery(largerThanMd);
  
  const BoardArea = styled.div`
    ${whenLargerThanMd ? styleForLargerView : styleForSmallerView}
    height: fit-content;
    background-color: ${topster.backgroundColor};
  `

  return (
    <div id="screenshot-area">
      <BoardArea>
      { 
        topster.type === TopsterType.Grid ?
        <Grid rows={topster.rows} cols={topster.cols} albums={topster.albums} /> 
        :
        <Top42 albums={topster.albums}/>  
      }
      </BoardArea>
      {showAlbumTitles
       ? 
       <AlbumTitles
          albums={topster.getAlbumsBetween(0,topster.rows * topster.cols)} 
          borderRoundness={topster.borderRoundness}
          shouldBeHorizontal={!whenLargerThanMd}
        /> 
       : 
       null}
    </div>
  );
});

export default TopsterBoard;
