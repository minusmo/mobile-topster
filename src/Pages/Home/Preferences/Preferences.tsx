import { useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { TopsterContext } from "../../../contexts/TopsterContext";
import { Input } from "../../../components/Input";
import { Toggle } from "../../../components/Toggle";
import { TextButton } from "../../../components/TextButton";
import { SubmitButton } from "../../../components/SubmitButton";
import { Selection } from "../../../components/Selection";
import { PreferencesFAB } from "./PreferencesFAB";
import { action } from "mobx";
import { TopsterType } from "../../../models/Topster";

type IPreferences = {
  showAlbumTitles: boolean;
  setShowAlbumTitle: (showAlbumTitles: boolean) => void;
};

const PreferenceDialog = styled.dialog`
  padding: 1rem;
  border-radius: 5%;
`;

const PreferenceForm = styled.form`

`;

const Preferences = observer(({
  showAlbumTitles,
  setShowAlbumTitle,
}: IPreferences): JSX.Element => {
  const topster = useContext(TopsterContext);
  const PDialog = useRef(null);
  
  return (
    <>
      <PreferencesFAB togglePreferences={() => {togglePreferences(PDialog.current)}}/>
      <PreferenceDialog ref={PDialog} id={"preferences"}>
        <PreferenceForm method="dialog">
          <Toggle label={"Titles"} value={showAlbumTitles} ontoggle={setShowAlbumTitle} />
          <Input label={"Background"} value={topster.backgroundColor} onchange={action((val: string) => {topster.backgroundColor = val;})}/>
          <Selection valueLabel={"Row"} value={topster.rows} onSelection={action((val: number) => {topster.rows = val;})} />
          <Selection valueLabel={"Col"} value={topster.cols} onSelection={action((val: number) => {topster.cols = val;})} />
          <TextButton label={"SetGrid"} onClick={action(() => {topster.type = TopsterType.Grid})}/>
          <TextButton label={"SetTop42"} onClick={action(() => {topster.type = TopsterType.Top42})} />
          <TextButton label={"ClearCache"} onClick={() => {window.localStorage.clear()}} />
          <Toggle label={"Border"} value={topster.borderRoundness} ontoggle={action(() => {topster.borderRoundness = !topster.borderRoundness;})}/>
          <SubmitButton>{"Confirm"}</SubmitButton>
        </PreferenceForm>
      </PreferenceDialog>
    </>
  );
});

export default Preferences;
function togglePreferences(PDialog: HTMLDialogElement | null): void {
    if (PDialog && !PDialog.open) {
      PDialog.showModal();
    }
    else if (PDialog && PDialog.open) {
      PDialog.close();
    }
}

