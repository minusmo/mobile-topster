import { FabProps, useTheme } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import ResponsiveFab from "../../../components/ResponsiveFab";

export const HelpFAB = (props: FabProps) => {
  const theme = useTheme();
  const { onClick } = props;
  return (
    <ResponsiveFab
      sx={{
        right: theme.spacing(8),
      }}
      onClick={onClick} 
    >
      <HelpIcon />
    </ResponsiveFab>
  );
}
