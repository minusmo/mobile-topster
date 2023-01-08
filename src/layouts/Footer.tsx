import styled from "styled-components";

// need to be refactored to base component "Row"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  
  position: fixed;
  bottom: 0px;
  right: 0px;

  background-color: lightgrey;
`

const SupportInfo = styled.span`
  font-weight: bold;
  padding: 1rem;
`
const Footer = () => {
  return (
    <StyledFooter>
      <SupportInfo>
        Powered by Spotify
      </SupportInfo>
    </StyledFooter>
  );
};

export default Footer;
