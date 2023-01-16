export function top42RowItemsPassed(row: number) {
    if (row <= 1) {
        return row * 5;
    }
    else if (row <= 3) {
        return 10 + (row - 2) * 6;
    }
    else {
        return 22 + (row - 4) * 10;
    }
}
