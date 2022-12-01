import { Album } from "../models/Album";

abstract class Finder<T> {
    abstract find(query: string): Promise<Array<T>>;
}

class AlbumFinder extends Finder<Album> {
    async find(query: string): Promise<Array<Album>> {
        return new Promise((resolve, reject) => resolve([new Album()]));
    };
}

export { AlbumFinder }