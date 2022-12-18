import styled from "styled-components";

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
    <SHeader>
      <Title id="header-title">Mobile Topster</Title>
    </SHeader>
  );
};

export default Header;
