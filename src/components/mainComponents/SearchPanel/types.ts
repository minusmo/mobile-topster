export type SearchPanelProps = {
    onClickCancel: () => void;
    showUp: boolean;
};

export type AlbumArtist = {
  name: string;
};

export type AlbumImg = {
  url: string;
};

export type AlbumSearchResult = {
  artists: Array<AlbumArtist>;
  name: string;
  images: Array<AlbumImg>;
  id: string;
};

export type promptReturn = string | null;

export type authResponseData = {
  access_token: string;
};

export type albumItems = {
  items: Array<AlbumSearchResult>;
};

export type queryResponseData = {
  albums: albumItems;
};