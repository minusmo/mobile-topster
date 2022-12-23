import { useContext, useRef } from "react";
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
import { TopsterType } from "../../../data/models/Topster";
import { Button, ButtonProps, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type IPreferences = {
  showAlbumTitles: boolean;
  setShowAlbumTitle: (showAlbumTitles: boolean) => void;
};

const CancelButton = (props: ButtonProps) => (
  <Button {...props}></Button>
)

const Preferences = observer(({
  showAlbumTitles,
  setShowAlbumTitle,
}: IPreferences): JSX.Element => {
  const topster = useContext(TopsterContext);
  const PDialog = useRef(null);
  
  return (
    <>
      <PreferencesFAB onClick={() => {togglePreferences(PDialog.current)}}/>
      <Dialog open={opened} onClose={hideDialog}>
        <DialogTitle>Preferences</DialogTitle>
        <DialogContent>
          <Toggle label={"Titles"} value={showAlbumTitles} onChange={setShowAlbumTitle} />
          <Input label={"Background"} value={topster.backgroundColor} onchange={action((val: string) => {topster.backgroundColor = val;})}/>
          <Selection valueLabel={"Row"} value={topster.rows} onSelection={action((val: number) => {topster.rows = val;})} />
          <Selection valueLabel={"Col"} value={topster.cols} onSelection={action((val: number) => {topster.cols = val;})} />
          <TextButton label={"SetGrid"} onClick={action(() => {topster.type = TopsterType.Grid})}/>
          <TextButton label={"SetTop42"} onClick={action(() => {topster.type = TopsterType.Top42})} />
          <TextButton label={"ClearCache"} onClick={() => {window.localStorage.clear()}} />
          <Toggle label={"Border"} value={topster.borderRoundness} ontoggle={action(() => {topster.borderRoundness = !topster.borderRoundness;})}/>
        </DialogContent>
        <DialogActions>
          <SubmitButton>{"Confirm"}</SubmitButton>
          <CancelButton>{"Cancel"}</CancelButton>
        </DialogActions>
      </Dialog>
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

