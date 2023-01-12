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
            The Topsters
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
