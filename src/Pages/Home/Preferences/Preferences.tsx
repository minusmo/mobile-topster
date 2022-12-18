import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TopsterContext } from "../../../contexts/TopsterContext";
import { Input } from "../../../components/Input";
import { Toggle } from "../../../components/Toggle";
import { Button } from "../../../components/Button";
import { Selection } from "../../../components/Selection";
import { PreferencesFAB } from "./PreferencesFAB";
import { action } from "mobx";
import { TopsterType } from "../../../models/Topster";

type IPreferences = {
  showPreferences: boolean;
  setShowPreferences: (showPrefrences: boolean) => void;
  showAlbumTitles: boolean;
  setShowAlbumTitle: (showAlbumTitles: boolean) => void;
};

const Preferences = observer(({
  showPreferences,
  setShowPreferences,
  showAlbumTitles,
  setShowAlbumTitle,
}: IPreferences): JSX.Element => {
  const topster = useContext(TopsterContext);
  return (
    <div>
      <PreferencesFAB setShowPreferences={setShowPreferences}/>
      <ul id={"preference-list"} className="">
        <Toggle label={"Titles"} value={showAlbumTitles} ontoggle={setShowAlbumTitle} />
        <Input label={"Background"} value={topster.backgroundColor} onchange={action((val: string) => {topster.backgroundColor = val;})}/>
        <Selection valueLabel={"Row"} value={topster.rows} onSelection={action((val: number) => {topster.rows = val;})} />
        <Selection valueLabel={"Col"} value={topster.cols} onSelection={action((val: number) => {topster.cols = val;})} />
        <Button label={"SetGrid"} onClick={action(() => {topster.type = TopsterType.Grid})}/>
        <Button label={"SetTop42"} onClick={action(() => {topster.type = TopsterType.Top42})} />
        <Button label={"ClearCache"} onClick={() => {window.localStorage.clear()}} />
        <Toggle label={"Border"} value={topster.borderRoundness} ontoggle={action(() => {topster.borderRoundness = !topster.borderRoundness;})}/>
      </ul>
    </div>
  );
});

export default Preferences;
