import styled from "styled-components";

export const Container = styled.div`
    padding: ${props => props.theme.padding}%;
    width: calc(${props => 100 - props.theme.padding * 2}%);
    height: fit-content;
`;
