import styled from "styled-components";

const SMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 1%;
`

type PMain = {
    children: JSX.Element[] | JSX.Element;
}

const Main = ({
    children
}: PMain): JSX.Element => {
    return (
        <SMain>
            {children}    
        </SMain>
    );
}

export default Main;