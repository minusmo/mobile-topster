import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { IconButton } from '../../../components/IconButton';
import { Fab, FabProps } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import styled from "styled-components";

type IPreferencesFAB = {
  togglePreferences: () => void;
}

export const PreferencesFAB = styled((props: FabProps) => {
  const { onClick } = props;
  return (
    <Fab onClick={onClick} size={"medium"}>
      <TuneIcon />
    </Fab>
  );
})`
  position: fixed;
  bottom: 20vh;
  right: 10px;
`;
