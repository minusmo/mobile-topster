import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Album } from "../../../../data/models/Album";
import { TopsterStoreContext } from "../../../../contexts/TopsterStoreContext";
import { Topster } from "../../../../data/models/Topster";
import { useClick } from "./useClick";
import { ImgContainer, Img } from "./ImgContainer";

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
    
    return (
        <ImgContainer style={{
            padding: `0 ${topster.gridGap}px`,
        }}>
            <Img
                src={item.art} 
                alt={`${item.title}-${item.artist}`} 
                onClick={handleClick}
            />
        </ImgContainer>
    );
})