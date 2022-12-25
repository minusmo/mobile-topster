import { useState } from "react";
import { HelpFAB } from "./HelpFAB";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const HelpMessages = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <HelpFAB onClick={() => setOpened(true)}/>
      <Dialog open={opened} onClose={() => setOpened(false)}>
        <DialogTitle>Some Helps</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            이미지를 클릭하면 새로운 앨범을 검색하고 추가할 수 있습니다.
          </Typography>
          <Typography variant="subtitle1">
            Chrome 브라우저에서 정상 작동합니다.
          </Typography>
          <Typography variant="subtitle1">
            문의/버그신고: bldolphin96@gmail.com
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"outlined"}
            onClick={() => {setOpened(false)}}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <HelpFAB onClick={() => {setOpened(true)}}/>
    </>
  );
}

export default HelpMessages;
