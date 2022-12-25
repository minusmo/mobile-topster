import { Switch, SwitchProps } from "@mui/material";

export const ToggleSwitch = (props: SwitchProps): JSX.Element => (
    <Switch color={"primary"} {...props} />
)