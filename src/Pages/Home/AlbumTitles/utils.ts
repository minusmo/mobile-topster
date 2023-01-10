export function columns(albumLength: number): number {
    if (albumLength <= 10) {
        return 1;
    }
    else if (albumLength <= 20) {
        return 2;
    }
    else if (albumLength <= 30) {
        return 3;
    }
    else if (albumLength <= 40) {
        return 4;
    }
    else {
        return 5;
    }
}
