import { SaveAlt } from "@mui/icons-material";
import { Fab } from "@mui/material";

type ISaveImgButton = {
  imgSaveHandler: (imgType?: string) => void;
};

const SaveButton = ({ imgSaveHandler }: ISaveImgButton) => {
  return (
      <Fab sx={{
        position: 'fixed',
        right: '10px',
        bottom: 'calc(20vh - 128px)',
      }}
      size={'large'}
      onClick={() => imgSaveHandler()}
      >
        <SaveAlt />
      </Fab>
  );
};

export default SaveButton;
