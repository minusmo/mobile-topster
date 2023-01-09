import { AppBar, Toolbar, Typography } from "@mui/material";
import { GridViewRounded } from "@mui/icons-material";

const Header = (): JSX.Element => {
  return (
      <AppBar position={'static'}>
        <Toolbar>
          <GridViewRounded />
          <Typography sx={{
            paddingLeft: '5px',
          }}>
            Mobile Topster
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
