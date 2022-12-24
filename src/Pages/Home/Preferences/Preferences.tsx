import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { Input } from "../../../components/Input";
import { Toggle } from "../../../components/Toggle";
import { TextButton } from "../../../components/TextButton";
import { SelectSlider } from "../../../components/SelectSlider";
import { PreferencesFAB } from "./PreferencesFAB";
import { action } from "mobx";
import { TopsterType } from "../../../data/models/Topster";
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ToggleSwitch } from "../../../components/ToggleSwitch";
import { LocalPersistency } from "../../../services/Persistency";
import { Box } from "@mui/system";

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
  const topsterStore = useContext(TopsterStoreContext);
  const topster = topsterStore.topster!;
  const [opened, setOpened] = useState(false);
  
  return (
    <>
      <PreferencesFAB onClick={() => {setOpened(true)}}/>
      <Dialog open={opened} onClose={() => {setOpened(false)}}>
        <DialogTitle>Preferences</DialogTitle>
        <DialogContent>
          <Box sx={{
            display: "flex",
          }}>
            <Toggle 
              label={"Titles"}
              value={showAlbumTitles}
              control={<ToggleSwitch onChange={toggleTitles}/>}
            />
            <Toggle
              label={"Border"} 
              value={topster.borderRoundness}
              control={<ToggleSwitch onChange={action(() => {topster.borderRoundness = !topster.borderRoundness;})}/>} 
            />
          </Box>
          <Input 
            type={"color"} 
            label={"Background"} 
            value={topster.backgroundColor} 
            onchange={action((val: string) => {topster.backgroundColor = val;})} 
          />
          <SelectSlider 
            label={"Row"} 
            topsterType={topster.type} 
            onSelection={action((val: number) => {topster.rows = val;})} 
            sliderProps={{value: topster.rows}} 
          />
          <SelectSlider 
            label={"Col"} 
            topsterType={topster.type} 
            onSelection={action((val: number) => {topster.cols = val;})} 
            sliderProps={{value: topster.cols}} 
          />
          <Button 
            variant={"contained"} 
            onClick={action(() => {topster.type = TopsterType.Grid})}
          >
            GridType
          </Button>
          <Button 
            variant={"contained"} 
            onClick={action(() => {topster.type = TopsterType.Top42})}
          >
            Top42Type
          </Button>
          <Button 
            variant={"contained"}
            onClick={() => {LocalPersistency.clearData()}} 
          >
            ClearCache
          </Button>
        </DialogContent>
        <DialogActions>
          <Button 
            variant={"contained"} 
            onClick={() => {setOpened(false)}}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  function toggleTitles(event: React.SyntheticEvent, checked: boolean) {
    setShowAlbumTitle(checked);
  }
});

export default Preferences;