import { FormControlLabel, FormControlLabelProps, Switch } from "@mui/material";
import styled from "styled-components";

const PreferenceToggle = styled.div`
  width: 100%;
  height: 20px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Toggle = (props: FormControlLabelProps): JSX.Element => {
  return (
    <PreferenceToggle>
      <FormControlLabel
        labelPlacement={"start"}
        {...props}
      />
    </PreferenceToggle>
  );
};
