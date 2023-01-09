import { FabProps, useTheme } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import ResponsiveFab from "../../../components/ResponsiveFab";

export const PreferencesFAB = (props: FabProps) => {
  const theme = useTheme();
  const { onClick } = props;
  return (
    <ResponsiveFab
      sx={{
        right: theme.spacing(0),
      }}
      onClick={onClick} 
    >
      <TuneIcon />
    </ResponsiveFab>
  );
};
