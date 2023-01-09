import React, { useContext } from "react";
import { action } from "mobx";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Album } from "../../../../data/models/Album";
import { TopsterStoreContext } from "../../../../contexts/TopsterStoreContext";
import { Topster } from "../../../../data/models/Topster";
import { useClick } from "./useClick";


type ICell = {
    rowItemsPassed: number;
    colItemsPassed: number;
    item: Album;
}

export const Cell = observer(({
    rowItemsPassed,
    colItemsPassed,
    item,
}: ICell): JSX.Element => {
    const topsterStore = useContext(TopsterStoreContext);
    const topster: Topster = topsterStore.topster;
    const handleClick = useClick(topsterStore, rowItemsPassed, colItemsPassed);

    const ImgContainer = styled.div`
        width: 100%;
        aspect-ratio: 1/1;
        padding: 0 ${topster.gridGap}px;
    `
    
    const Img = styled.img`
        width: 100%;
        :hover {
            cursor: pointer;
        }
    `;
    
    return (
        <ImgContainer>
            <Img 
                src={item.art} 
                alt={`${item.title}-${item.artist}`} 
                onClick={handleClick}
            />
        </ImgContainer>
    );
})