import { Paper, useTheme } from "@mui/material";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 50px;

  position: fixed;
  bottom: 0;
`;

const SupportInfo = styled.span`
  font-weight: bold;
  padding: 1rem;
`;

const Footer = () => {
  const theme = useTheme();
  return (
    <Paper elevation={5}>
      <StyledFooter style={{
        backgroundColor: `${theme.palette.primary.light}`
      }}>
        <SupportInfo>
          Powered by Spotify
        </SupportInfo>
      </StyledFooter>
    </Paper>
  );
};

export default Footer;
