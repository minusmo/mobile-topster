import { Fab, FabProps } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import styled from "styled-components";

export const PreferencesFAB = (props: FabProps) => {
  const { onClick } = props;
  return (
    <Fab
      sx={{
        position: 'fixed',
        right: '10px',
        bottom: '20vh',
      }}
      onClick={onClick} 
      size={"large"}
    >
      <TuneIcon />
    </Fab>
  );
};
