export type AlbumArtist = {
  name: string;
};

export type AlbumImg = {
  url: string;
};

export type SpotifyAlbumData = {
  artists: Array<AlbumArtist>;
  name: string;
  images: Array<AlbumImg>;
  id: string;
};

export type AuthResponse = {
  access_token: string;
};

export type QueryResponseData = {
  albums: SpotifyAlbumData[];
};