import * as _ from "lodash";
import { Album } from "../../../data/models/Album";
import AlbumTitle from "./AlbumTitle/AlbumTitle";

type ITitleList = {
  albums: Array<Album>,
  borderRoundness: boolean;
};

const AlbumTitles = ({
  albums,
  borderRoundness,
}: ITitleList): JSX.Element => {
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
