import qs from "qs";
import { AxiosRequestConfig } from "axios";
import { SPOTIFY_API, CONTENT_TYPE } from "../../../configs/httpConstants";
import { username, password } from "../../../configs/credentials";
import { promptReturn, AlbumSearchResult } from "./types";

export const userIsAddingAlbumManually = (trimmedSearchInput: String): boolean => {
    return trimmedSearchInput.slice(0, 4) === "http" ? true : false;
};
  
export const createAuthConfig = (): AxiosRequestConfig => {
  return {
    method: "post",
    url: SPOTIFY_API,
    headers: {
      "Content-Type": CONTENT_TYPE,
    },
    data: qs.stringify({ grant_type: "client_credentials" }),
    auth: {
      username: username,
      password: password,
    },
    withCredentials: true,
  };
};

export const createQueryConfig = (
  getAlbums: string,
  access_token: string
): AxiosRequestConfig => {
  return {
    method: "get",
    url: getAlbums,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

export const returnUsersAlbum = (trimmedSearchInput: String): Array<AlbumSearchResult> => {
    const artists: promptReturn = window.prompt("아티스트명을 입력해주세요.");
    const albumName: promptReturn = window.prompt("앨범명을 입력해주세요.");

    const usersAlbum: Array<AlbumSearchResult> = [
      {
        artists: [{ name: "" }],
        name: "",
        images: [{ url: "" }],
        id: "00000",
      },
      {
        artists: [{ name: artists ? artists.toString() : "" }],
        name: albumName ? albumName.toString() : "",
        images: [{ url: trimmedSearchInput.toString() }],
        id: "99999",
      },
    ];
    return usersAlbum;
};