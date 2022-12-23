import { useContext } from "react";
import { Album } from "../../../../models/Album";
import { SelectionContext } from "../../../../contexts/SelectionContext";
import styled from "styled-components";
import { TopsterContext } from "../../../../contexts/TopsterContext";


type ICell = {
    rows: number;
    col: number;
    item: Album;
}

export const Cell = ({
    rows,
    col,
    item,
}: ICell): JSX.Element => {
    const userSelection = useContext(SelectionContext);
    const topster = useContext(TopsterContext);

    const ImgContainer = styled.div`
        width: 100%;
        aspect-ratio: 1/1;
        padding: ${topster.gridGap}px;
    `
    
    const Img = styled.img`
        width: 100%;
        :hover {
            cursor: pointer;
        }
    `
    return (
        <ImgContainer>
            <Img 
                src={item.art} 
                alt={`${item.title}-${item.artist}`} 
                onClick={() => { userSelection.selection = rows + col; }}
            />
        </ImgContainer>
    );
}