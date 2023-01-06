import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getAlbumsByAlbumName } from "../../../utils/httpUtils";
import { Album } from "../../../data/models/Album";
import { queryResponseData, SpotifyAlbumData, AuthResponse } from "./types";
import { createAuthConfig, createQueryConfig } from "./utils";
import WhiteSqure from '../../../assets/images/white_square.jpg';

const DEFAULT_RESULT = {
  artists: [{ name: "" }],
  name: "",
  images: [{ url: WhiteSqure }],
  id: "00000",
};

export const queryAlbumsToSpotify = async (query: string, country: string): Promise<Array<Album>> => {
  const queryString = query.trim().replace(" ", "+");
  const searchResult: Array<SpotifyAlbumData> = [DEFAULT_RESULT];

  try {
    // query spotify album get api
    const authConfig: AxiosRequestConfig = createAuthConfig();
    const authResponse: AxiosResponse = await axios(authConfig);
    const getAlbumsFrom = getAlbumsByAlbumName(queryString, country);
    const { access_token }: AuthResponse = authResponse.data;
    const queryConfig: AxiosRequestConfig = createQueryConfig(getAlbumsFrom,access_token);
    const queryResponse: AxiosResponse = await axios(queryConfig);

    const { albums: { items } }: queryResponseData = queryResponse.data;

    return searchResult.concat(items).map(
      (spotifyAlbumData) => new Album(
        spotifyAlbumData.name, 
        spotifyAlbumData.artists[0].name,
        spotifyAlbumData.images[0].url
      )
    );
  } catch (error) {
    return searchResult.map(
      (spotifyAlbumData) => new Album(
        spotifyAlbumData.name, 
        spotifyAlbumData.artists[0].name,
        spotifyAlbumData.images[0].url
      )
    );
  }
};
