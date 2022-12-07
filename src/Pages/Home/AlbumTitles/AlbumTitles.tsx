import * as _ from "lodash";
import { Album } from "../../../models/Album";
import AlbumTitle from "./AlbumTitle/AlbumTitle";

type PTitleList = {
  albums: Array<Album>,
  borderRoundness: boolean;
};

const AlbumTitles = ({
  albums,
  borderRoundness,
}: PTitleList): JSX.Element => {
  const albumTitleClass = borderRoundness ? "titleList" + " border-rounded-lower" : "titleList";
  return (
    <div id="albumtitles" className={albumTitleClass}>
      <ul
        id="title-Unorderedlist"
        className=""
      >
        {albums.map(album => <AlbumTitle album={album}/>)}
      </ul>
    </div>
  );
};

export default AlbumTitles;
