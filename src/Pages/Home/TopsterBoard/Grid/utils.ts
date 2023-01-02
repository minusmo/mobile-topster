import { Album } from "../../../../data/models/Album";

export function convertToGrid(albums: Album[], rows: number, cols: number) {
    const sliced = albums.slice(0, rows * cols);
    const grid: Array<Array<Album>> = Array(rows)
        .fill(0)
        .map((row, idx) => {
            const startIdx: number = idx * cols;
            const endIdx: number = startIdx + cols;
            return sliced.slice(startIdx, endIdx);
        });
    return grid;
}