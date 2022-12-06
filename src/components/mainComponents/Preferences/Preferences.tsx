import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TopsterContext } from "../../../App";
import { Input } from "../../subComponents/Input";
import { Toggle } from "../../subComponents/Toggle";
import { Button } from "../../subComponents/Button";
import { Selection } from "../../subComponents/Selection";
import { PreferencesFAB } from "../../subComponents/PreferencesFAB";

type PPreferences = {
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
}: PPreferences): JSX.Element => {
  const topster = useContext(TopsterContext);
  return (
    <div>
      <PreferencesFAB setShowPreferences={setShowPreferences}/>
      <ul id={"preference-list"} className="">
        <Toggle label={"Titles"} value={showAlbumTitles} ontoggle={setShowAlbumTitle} />
        <Input label={"Background"} value={topster.backgroundColor} onchange={(val: string) => {topster.backgroundColor = val;}}/>
        <Selection valueLabel={"Row"} value={topster.rows} onSelection={(val: number) => {topster.rows = val;}} />
        <Selection valueLabel={"Col"} value={topster.cols} onSelection={(val: number) => {topster.cols = val;}} />
        <Button label={"SetGrid"} onClick={() => {topster.type = "Grid"}}/>
        <Button label={"SetTop42"} onClick={() => {topster.type = "Top42"}} />
        <Button label={"ClearCache"} onClick={() => {window.localStorage.clear()}} />
        <Toggle label={"Border"} value={topster.borderRoundness} ontoggle={() => {topster.borderRoundness = !topster.borderRoundness;}}/>
      </ul>
    </div>
  );
});

export default Preferences;
