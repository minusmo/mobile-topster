import styled from "styled-components";

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    height: calc(100% - 110px);
`

type IMain = {
    children: JSX.Element[] | JSX.Element;
}

const Main = ({
    children
}: IMain): JSX.Element => {
    return (
        <StyledMain>
            {children}    
        </StyledMain>
    );
}

export default Main;