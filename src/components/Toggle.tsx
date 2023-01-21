import { FormControlLabel, FormControlLabelProps } from "@mui/material";

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
