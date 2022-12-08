import styled from "styled-components";

const SHeader = styled.header`
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const STitle = styled.span`
  padding: 1rem;
`
const Header = (): JSX.Element => {
  return (
    <SHeader>
      <STitle id="header-title">Mobile Topster</STitle>
    </SHeader>
  );
};

export default Header;
