import { action } from "mobx";
import { useRef } from "react";
import { TopsterStore } from "../../../../data/datastores/TopsterStore";

export function useClick(topsterStore: TopsterStore, rowItemsPassed: number, colItemsPassed: number) {
    const abortController = useRef(new AbortController());

    const selectACell = action(
        'setSelectedIdx',
        () => {topsterStore.selectedIdx = rowItemsPassed + colItemsPassed;}
    );

    const clearACell = action(
        'removeAlbum',
        () => {
            const selectedIdx = rowItemsPassed + colItemsPassed;
            topsterStore.topster.removeAlbumAt(selectedIdx);
        }
    );

    return function handleClick(e: React.MouseEvent) {
        const clicks: number = e.detail;
        if (clicks === 1) {
            cancellableReservedCall(
                selectACell,
                abortController.current.signal
            )
        }
        else if (clicks === 2) {
            clearACell();
            abortController.current.abort();
        }
    }
}

function cancellableReservedCall(
    reservedCall: Function,
    signal: AbortSignal, 
    delay: number = 200, 
    abortMessage: string = 'reservedCall is aborted'
    ): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (signal.aborted) {
                reject(abortMessage);
            }
            else {
                resolve(reservedCall());
            }
        }, delay);
    });
}