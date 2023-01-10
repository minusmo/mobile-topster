import styled from "styled-components";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { GridViewRounded } from "@mui/icons-material";

const SHeader = styled.header`
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  padding: 1rem;
`
const Header = (): JSX.Element => {
  return (
      <AppBar position={'static'}>
        <Toolbar>
          <GridViewRounded />
          <Typography>Mobile Topster</Typography>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
