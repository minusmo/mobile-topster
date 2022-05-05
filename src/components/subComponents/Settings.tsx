import * as _ from "lodash";
import { useEffect, useState } from "react";

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
  isRoundedBorder: boolean;
  toggleBorder: () => void;
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
    <div className="uk-margin uk-flex uk-flex-left">
      <label className="uk-form-label uk-margin-right" htmlFor="toggle-titles">
        Show Titles
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
    <div className="uk-margin uk-flex uk-flex-left uk-flex-middle">
      <label
        className="uk-form-label uk-margin-right"
        htmlFor="input-backgroundColor"
      >
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

const options = Array(10)
  .fill(0)
  .map((value, index) => index + 1);

type selectProps = {
  onSelection: (rows: number) => void;
  value: number;
};

const RowSelect = ({ onSelection, value }: selectProps): JSX.Element => {
  return (
    <div className="uk-margin uk-flex uk-flex-left uk-flex-middle">
      <label className="uk-form-label uk-margin-right" htmlFor="select-rows">
        Rows
      </label>
      <div className="uk-form-controls">
        <select
          value={value}
          className="uk-select"
          id="select-rows"
          onChange={(e) => onSelection(Number.parseInt(e.target.value))}
        >
          {options.map((row, index) => (
            <option key={_.uniqueId()} value={row}>
              {row}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ColumnSelect = ({ onSelection, value }: selectProps): JSX.Element => {
  return (
    <div className="uk-margin uk-flex uk-flex-left uk-flex-middle">
      <label className="uk-form-label uk-margin-right" htmlFor="select-columns">
        Columns
      </label>
      <div className="uk-form-controls">
        <select
          value={value}
          className="uk-select"
          id="select-columns"
          onChange={(e) => onSelection(Number.parseInt(e.target.value))}
        >
          {options.map((column, index) => (
            <option key={_.uniqueId()} value={column}>
              {column}
            </option>
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
  updateTopster: (row: number, col: number, type: string) => void;
};
const GridSettingButton = ({
  row,
  col,
  type,
  updateTopster,
}: gridSettingButtonProps): JSX.Element => {
  return (
    <button
      className="uk-button uk-button-default uk-button-small"
      type="button"
      onClick={() => updateTopster(row, col, type)}
    >
      SetGrid
    </button>
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
    <button
      className="uk-button uk-button-default uk-button-small"
      type="button"
      onClick={() => {
        updateTopster(6, 7, "top42");
      }}
    >
      Top42
    </button>
  );
};

const ClearCacheButton = (): JSX.Element => {
  return (
    <button
      className="uk-button uk-button-default uk-button-small"
      type="button"
      onClick={() => {
        localStorage.clear();
      }}
    >
      Clear Cache
    </button>
  );
};

type borderToggleButtonProps = {
  isRoundedBorder: boolean;
  toggleBorder: () => void;
};
const BorderToggleButton = ({
  isRoundedBorder,
  toggleBorder,
}: borderToggleButtonProps): JSX.Element => {
  return (
    <button
      className="uk-button uk-button-default uk-button-small"
      type="button"
      onClick={toggleBorder}
    >
      {isRoundedBorder ? "각진 모서리" : "둥근 모서리"}
    </button>
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
  isRoundedBorder,
  toggleBorder,
}: settingsProps): JSX.Element => {
  const [curRows, setCurRows] = useState(rows);
  const [curCols, setCurCols] = useState(columns);

  useEffect(() => {
    let savedRows = localStorage.getItem("rows");
    if (savedRows) {
      setCurRows(Number.parseInt(localStorage.getItem("rows")!));
      setCurCols(Number.parseInt(localStorage.getItem("columns")!));
    }
  }, []);

  useEffect(() => {
    setCurRows(rows);
    setCurCols(columns);
  }, [rows, columns]);

  return (
    <div id="settings" className="uk-form-horizontal">
      <ToggleTitles
        showAlbumTitle={showAlbumTitle}
        ontoggle={setShowAlbumTitle}
      />
      <BackgroundInput
        backgroundColor={backgroundColor}
        onchange={setBackgroundColor}
      />
      <RowSelect value={curRows} onSelection={setCurRows} />
      <ColumnSelect value={curCols} onSelection={setCurCols} />
      <div className="uk-buttom-group uk-flex uk-flex-center">
        <GridSettingButton
          row={curRows}
          col={curCols}
          type={"grid"}
          updateTopster={updateTopster}
        />
        <Top42SettingButton
          setRows={setRows}
          setColumns={setColumns}
          updateTopster={updateTopster}
        />
        <ClearCacheButton />
        <BorderToggleButton
          isRoundedBorder={isRoundedBorder}
          toggleBorder={toggleBorder}
        />
      </div>
    </div>
  );
};

export default Settings;
