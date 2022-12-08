import styled from "styled-components";

const SFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;

  width: 30%;
  
  position: fixed;
  bottom: 0px;
  right: 0px;

  background-color: lightgrey;
`

const SSupportInfo = styled.span`
  font-weight: bold;
  padding: 1rem;
`
const Footer = () => {
  return (
    <SFooter>
      <SSupportInfo>
        Powered by Spotify.
      </SSupportInfo>
    </SFooter>
  );
};

export default Footer;
