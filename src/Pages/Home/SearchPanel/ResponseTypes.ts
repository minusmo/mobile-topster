export type AlbumArtist = {
  name: string;
};

export type AlbumImg = {
  url: string;
};

export type SpotifyAlbumData = {
  name: string;
  id: string;
  artists: AlbumArtist[];
  images: AlbumImg[];
};

export type AuthResponse = {
  access_token: string;
};

export type QueryResponseData = {
  albums: {
    items: SpotifyAlbumData[];
  };
};