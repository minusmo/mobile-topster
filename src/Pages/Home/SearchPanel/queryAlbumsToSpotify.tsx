import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getAlbumsByAlbumName } from "../../../utils/httpUtils";
import { Album } from "../../../data/models/Album";
import { QueryResponseData, SpotifyAlbumData, AuthResponse } from "./ResponseTypes";
import SpotifyQueryConfig from "./SpotifyQueryConfig";
import WhiteSquare from '../../../assets/images/white_square.jpg';

const DEFAULT_RESULT: SpotifyAlbumData = {
  artists: [{ name: "" }],
  name: "",
  images: [{ url: WhiteSquare }],
  id: "00000",
};

export const queryAlbumsToSpotify = async (query: string, country: string): Promise<Array<Album>> => {
  const queryString = query.trim().replace(" ", "+");
  const searchResult: Array<SpotifyAlbumData> = [DEFAULT_RESULT];

  try {
    // query spotify album get api
    const authConfig: AxiosRequestConfig = SpotifyQueryConfig.createAuthConfig();
    const authResponse: AxiosResponse = await axios(authConfig);
    const getAlbumsFrom = getAlbumsByAlbumName(queryString, country);
    const { access_token }: AuthResponse = authResponse.data;
    const queryConfig: AxiosRequestConfig = SpotifyQueryConfig.createQueryConfig(getAlbumsFrom,access_token);
    const queryResponse: AxiosResponse = await axios(queryConfig);

    const { albums: { items } }: QueryResponseData = queryResponse.data;

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
