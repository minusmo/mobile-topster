import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { Toggle } from "../../../components/Toggle";
import { SelectSlider } from "../../../components/SelectSlider";
import { PreferencesFAB } from "./PreferencesFAB";
import { action } from "mobx";
import { TopsterType } from "../../../data/models/Topster";
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ToggleSwitch } from "../../../components/ToggleSwitch";
import { LocalPersistency } from "../../../services/Persistency";
import { Box } from "@mui/system";
import { ColorPicker } from "./ColorPicker";
import Stack from "@mui/material/Stack";

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
  const topster = topsterStore.topster;
  const [opened, setOpened] = useState(false);
  
  return (
    <>
      <PreferencesFAB onClick={() => {setOpened(true)}}/>
      <Dialog open={opened} onClose={() => {setOpened(false)}}>
        <DialogTitle>Preferences</DialogTitle>
        <DialogContent>
        <Stack>
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
                control={
                  <ToggleSwitch 
                    onChange={action('toggleBorderRoundness', () => {topster.borderRoundness = !topster.borderRoundness;})}
                  />
                } 
                />
            </Box>
            <ColorPicker
              onPick={action('setBackgroundColor', (color: string) => {topster.backgroundColor = color;})}
              />
            <SelectSlider 
              label={"Row"} 
              topsterType={topster.type} 
              onSelection={action('setRows', (val: number) => {topster.rows = val;})} 
              sliderProps={{value: topster.rows}} 
              />
            <SelectSlider 
              label={"Col"} 
              topsterType={topster.type} 
              onSelection={action('setCols', (val: number) => {topster.cols = val;})} 
              sliderProps={{value: topster.cols}} 
              />
            <Button 
              variant={"outlined"} 
              onClick={action('change type to Grid', () => {topster.type = TopsterType.Grid})}
              >
              GridType
            </Button>
            <Button 
              variant={"outlined"} 
              onClick={action('change type to Top42', () => {topster.type = TopsterType.Top42})}
              >
              Top42Type
            </Button>
            <Button 
              variant={"outlined"}
              onClick={() => {LocalPersistency.clearData()}} 
              >
              ClearCache
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            color={"success"}
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