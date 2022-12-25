import { Fab, FabProps } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';

export const HelpFAB = (props: FabProps) => {
  const { onClick } = props;
  return (
    <Fab
      sx={{
        position: 'fixed',
        right: '10px',
        bottom: 'calc(20vh - 64px)',
      }}
      onClick={onClick} 
      size={"large"}
    >
      <HelpIcon />
    </Fab>
  );
}
