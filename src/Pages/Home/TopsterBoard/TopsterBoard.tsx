import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TopsterType } from "../../../models/Topster";
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

  let gridContainerStyle: gridContainerStyle;
  let gridContainerClass: string;

  // gridContainerStyle = setGridContainerStyle(
  //   topster.type,
  //   topster.backgroundColor,
  //   topster.rows,
  //   topster.cols,
  // );

  // gridContainerClass = setGridContainerClass(topster.type);
  // gridContainerClass = gridContainerClass + " border-rounded";

  return (
    <div id="screenshot-area">
      <div
      id="grid-container"
      className={""}
      // style={gridContainerStyle}
      >
      { 
        topster.type === TopsterType.Grid ?
        <Grid rows={topster.rows} albums={albums} /> 
        :
        <Top42 albums={albums}/>  
      }
      </div>
      {showAlbumTitles
       ? 
       <AlbumTitles albums={albums} borderRoundness={topster.borderRoundness}/> 
       : 
       null}
    </div>
  );
});

export default TopsterBoard;
