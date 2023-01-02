import { useContext } from "react";
import { Album } from "../../../../data/models/Album";
import styled from "styled-components";
import { TopsterStoreContext } from "../../../../contexts/TopsterStoreContext";
import { action } from "mobx";
import { observer } from "mobx-react-lite";


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
    const topster = topsterStore.topster!;

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
    `
    return (
        <ImgContainer>
            <Img 
                src={item.art} 
                alt={`${item.title}-${item.artist}`} 
                onClick={action(
                    'setSelectedIdx',
                    () => {
                    topsterStore.selectedIdx = rowItemsPassed + colItemsPassed;
                })}
            />
        </ImgContainer>
    );
})