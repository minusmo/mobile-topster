import { Album } from "../data/models/Album";

abstract class Search<T> {
    abstract search(query: string): Promise<Array<T>>;
}

class AlbumSearch extends Search<Album> {
    async search(query: string): Promise<Array<Album>> {
        return new Promise((resolve, reject) => resolve([new Album()]));
    };
}

export { AlbumSearch }