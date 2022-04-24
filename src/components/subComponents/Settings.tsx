import "./subComponentStyles/settingsStyles.css";
import * as _ from "lodash";

type settingsProps = {
  showOptions: boolean;
  showAlbumTitle: boolean;
  setShowAlbumTitle: (showAlbumTitle: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  rows: number;
  setRows: (rows: number) => void;
  columns: number;
  setColumns: (cols: number) => void;
  updateTopster: (row: number, col: number, type: string) => void;
};

type toggleTitlesProps = {
  showAlbumTitle: boolean;
  ontoggle: (showAlbumTitle: boolean) => void;
};
const ToggleTitles = ({
  showAlbumTitle,
  ontoggle,
}: toggleTitlesProps): JSX.Element => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="toggle-titles">
        Toggle Titles
      </label>
      <div className="uk-form-controls">
        <input
          className="uk-checkbox"
          id="toggle-titles"
          type="checkbox"
          onChange={() => ontoggle(!showAlbumTitle)}
          checked={showAlbumTitle}
        ></input>
      </div>
    </div>
  );
};

type backgroundInput = {
  backgroundColor: string;
  onchange: (backgroundColor: string) => void;
};
const BackgroundInput = ({
  backgroundColor,
  onchange,
}: backgroundInput): JSX.Element => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="input-backgroundColor">
        BackgroundColor
      </label>
      <div className="uk-form-controls">
        <input
          className="uk-input"
          id="input-backgroundColor"
          type="text"
          placeholder="#HEX color"
          value={backgroundColor}
          onChange={(e) => onchange(e.target.value)}
        />
      </div>
    </div>
  );
};

type selectProps = {
  onSelection: (rows: number) => void;
};
const RowSelect = ({ onSelection }: selectProps): JSX.Element => {
  const rows = Array(10)
    .fill(0)
    .map((value, index) => index + 1);
  console.log(rows);
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="select-rows">
        Rows
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="select-rows"
          onChange={(e) => onSelection(Number.parseInt(e.target.value))}
        >
          {rows.map((row) => (
            <option key={_.uniqueId()} value={row}>{row}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ColumnSelect = ({ onSelection }: selectProps): JSX.Element => {
  const columns = Array(10)
    .fill(0)
    .map((value, index) => index + 1);
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="select-columns">
        Columns
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="select-columns"
          onChange={(e) => onSelection(Number.parseInt(e.target.value))}
        >
          {columns.map((column) => (
            <option id={_.uniqueId()} value={column}>{column}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

type gridSettingButtonProps = {
  row: number;
  col: number;
  type: string;
  onclick: (row: number, col: number, type: string) => void;
};
const GridSettingButton = ({
  row,
  col,
  type,
  onclick,
}: gridSettingButtonProps): JSX.Element => {
  return (
    <div data-uk-form-custom>
      <button type="button" onClick={() => onclick(row, col, type)}>
        SetGrid
      </button>
    </div>
  );
};

type top42SettingButtonProps = {
  setRows: (rows: number) => void;
  setColumns: (cols: number) => void;
  updateTopster: (row: number, col: number, type: string) => void;
};
const Top42SettingButton = ({
  setRows,
  setColumns,
  updateTopster,
}: top42SettingButtonProps): JSX.Element => {
  return (
    <div data-uk-form-custom>
      <button
        type="button"
        onClick={() => {
          setRows(6);
          setColumns(7);
          updateTopster(6, 7, "top42");
        }}
      >
        Top42
      </button>
    </div>
  );
};

const Settings = ({
  showOptions,
  showAlbumTitle,
  setShowAlbumTitle,
  backgroundColor,
  setBackgroundColor,
  rows,
  setRows,
  columns,
  setColumns,
  updateTopster,
}: settingsProps): JSX.Element => {
  return (
    <form id="settings" className="uk-form-horizontal">
      <ToggleTitles
        showAlbumTitle={showAlbumTitle}
        ontoggle={setShowAlbumTitle}
      />
      <BackgroundInput
        backgroundColor={backgroundColor}
        onchange={setBackgroundColor}
      />
      <RowSelect onSelection={setRows} />
      <ColumnSelect onSelection={setColumns} />
      <GridSettingButton
        row={rows}
        col={columns}
        type={"grid"}
        onclick={updateTopster}
      />
      <Top42SettingButton
        setRows={setRows}
        setColumns={setColumns}
        updateTopster={updateTopster}
      />
    </form>
  );
};

export default Settings;
