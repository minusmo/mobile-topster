import { Fab, FabProps, useMediaQuery, useTheme } from "@mui/material";

export default function AdaptiveFab(fabProps: FabProps): JSX.Element {
    const theme = useTheme();
    const largerThanMd = theme.breakpoints.up('md');
    const whenLargerThanMd = useMediaQuery(largerThanMd);
    const { sx, ...restProps } = fabProps;
    return (
        <Fab
        {...restProps}
        color={'secondary'}
        size={whenLargerThanMd ? 'large' : 'medium'} 
        sx={{
            position: 'fixed',
            bottom: '55px',
            ...sx
        }}
        />
    )
}