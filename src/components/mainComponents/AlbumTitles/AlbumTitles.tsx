import * as _ from "lodash";
import { Album } from "../../../models/Album";
import AlbumTitle from "../../subComponents/AlbumTitle/AlbumTitle";
import "./mainComponentStyles/titleListStyle.css";

type TitleListProps = {
  albums: Array<Album>,
  isRoundedBorder: boolean;
};

const AlbumTitles = ({
  albums,
  isRoundedBorder,
}: TitleListProps): JSX.Element => {
  const albumTitleClass = isRoundedBorder ? "titleList" + " border-rounded-lower" : "titleList";
  return (
    <div id="albumtitles" className={albumTitleClass}>
      <ul
        id="title-Unorderedlist"
        className="uk-column-1-2 uk-list uk-list-collapse"
      >
        {albums.map(album => <AlbumTitle album={album}/>)}
      </ul>
    </div>
  );
};

export default AlbumTitles;
