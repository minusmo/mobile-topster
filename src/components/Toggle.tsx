import { FormControlLabel, FormControlLabelProps, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Toggle = (props: FormControlLabelProps): JSX.Element => {
  return (
      <FormControlLabel
        sx={{
          marginLeft: 0,
          marginRight: '10px',
        }}
        labelPlacement={"start"}
        {...props}
      />
  );
};
