import * as _ from "lodash";
import { Grid } from "../../models/modelTypes";
import "./mainComponentStyles/titleListStyle.css";
type TitleListElementProps = {
  title: String;
};

type TitleListElementType = JSX.Element | null;

const TitleListElement = ({
  title,
}: TitleListElementProps): TitleListElementType => {
  return title.length !== 0 ? <li>{title}</li> : null;
};

type TitleListProps = {
  rows: number;
  cols: number;
  showAlbumTitle: boolean;
  topsterRows: Grid;
  backgroundColor: string;
  isRoundedBorder: boolean;
};

const TitleList = ({
  rows,
  cols,
  showAlbumTitle,
  topsterRows,
  backgroundColor,
  isRoundedBorder,
}: TitleListProps): JSX.Element => {
  let classname = "titleList";
  if (showAlbumTitle) {
    classname = classname + " show";
  }
  if (isRoundedBorder) {
    classname = classname + " border-rounded-lower";
  }
  return (
    <div className={classname} style={{ backgroundColor: backgroundColor }}>
      <ul
        id="title-Unorderedlist"
        className="uk-column-1-2 uk-list uk-list-collapse"
      >
        {topsterRows.slice(0, rows).map((row, index) => {
          return row
            .slice(0, cols)
            .map((cell, index) => (
              <TitleListElement title={cell.alt} key={_.uniqueId()} />
            ));
        })}
      </ul>
    </div>
  );
};

export default TitleList;
