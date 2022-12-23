import React, { useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { TopsterType } from "../../../data/models/Topster";
import { gridContainerStyle, setGridContainerClass } from "./utils";
import { TopsterContext } from "../../../contexts/TopsterContext";
import { Grid } from "./Grid/Grid";
import { Top42 } from "./Top42/Top42";
import AlbumTitles from "../AlbumTitles/AlbumTitles";

type PTopsterBoard = {
  showAlbumTitles: boolean;
};

const TopsterBoard = observer(({
  showAlbumTitles,
}: PTopsterBoard): JSX.Element => {
  const topster = useContext(TopsterContext);
  const albums = topster.albums;


  const BoardArea = styled.div`
    @media (max-width: 1000px) {
      width: 100%;
      height: fit-content;
      background-color: ${topster.backgroundColor};
    }
  `

  return (
    <div id="screenshot-area">
      <BoardArea>
      { 
        topster.type === TopsterType.Grid ?
        <Grid rows={topster.rows} cols={topster.cols} albums={albums} /> 
        :
        <Top42 albums={albums}/>  
      }
      </BoardArea>
      {showAlbumTitles
       ? 
       <AlbumTitles albums={albums} borderRoundness={topster.borderRoundness}/> 
       : 
       null}
    </div>
  );
});

export default TopsterBoard;
