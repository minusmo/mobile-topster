import qs from "qs";
import { AxiosRequestConfig } from "axios";
import { API, UserInfo } from "../../../configs/credentials";


abstract class SpotifyQueryConfig {
  static CONTENT_TYPE: string = "application/x-www-form-urlencoded";
  static GRANT_TYPE: string = "client_credentials";
}

export const createAuthConfig = (): AxiosRequestConfig => {
  return {
    method: "POST",
    url: API.SPOTIFY_API,
    headers: {
      "Content-Type": SpotifyQueryConfig.CONTENT_TYPE,
    },
    data: qs.stringify({ grant_type: SpotifyQueryConfig.GRANT_TYPE}),
    auth: {
      username: UserInfo.username,
      password: UserInfo.password,
    },
    withCredentials: true,
  };
};

export const createQueryConfig = (
  albumQueryAPI: string,
  access_token: string
): AxiosRequestConfig => {
  return {
    method: "GET",
    url: albumQueryAPI,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};