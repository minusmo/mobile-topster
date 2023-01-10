import { SaveAlt } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import ResponsiveFab from "../../components/ResponsiveFab";

type ISaveImgButton = {
  imgSaveHandler: (imgType?: string) => void;
};

const SaveButton = ({ imgSaveHandler }: ISaveImgButton) => {
  const theme = useTheme();
  return (
      <ResponsiveFab sx={{
        right: theme.spacing(16),
      }}
      onClick={() => imgSaveHandler()}
      >
        <SaveAlt />
      </ResponsiveFab>
  );
};

export default SaveButton;
