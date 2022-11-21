import React, { useEffect, useState } from "react";
import qs from "qs";
import * as _ from "lodash";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import SearchForm from "../subComponents/SearchForm";
import { username, password } from "../../constants/credentials";
import { SPOTIFY_API, CONTENT_TYPE } from "../../constants/httpConstants";
import { getAlbumsByAlbumName } from "../../utils/httpUtils";
import CancelButton from "../subComponents/CancelButton";
import SpotifyAlbumImg from "../subComponents/SpotifyAlbumImg";
import "./mainComponentStyles/searchWindowStyle.css";

type searchWindowProps = {
  onClickCancel: () => void;
  showSearch: boolean;
  handleClickAlbum: React.MouseEventHandler<HTMLImageElement>;
};

type AlbumArtist = {
  name: string;
};

type AlbumImg = {
  url: string;
};

type AlbumSearchResult = {
  artists: Array<AlbumArtist>;
  name: string;
  images: Array<AlbumImg>;
  id: string;
};

type promptReturn = string | null;

type authResponseData = {
  access_token: string;
};

type albumItems = {
  items: Array<AlbumSearchResult>;
};

type queryResponseData = {
  albums: albumItems;
};

const userIsAddingAlbumManually = (trimmedSearchInput: String): boolean => {
  return trimmedSearchInput.slice(0, 4) === "http" ? true : false;
};

const createAuthConfig = (): AxiosRequestConfig => {
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

const createQueryConfig = (
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

const SearchWindow = ({
  onClickCancel,
  showSearch,
  handleClickAlbum,
}: searchWindowProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<String>("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState<Array<AlbumSearchResult>>(
    []
  );

  const returnUsersAlbum = (trimmedSearchInput: String): void => {
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
    setSearchResult(usersAlbum);
    return;
  };

  const queryAlbums = async (): Promise<void> => {
    const trimmedSearchInput: String = searchInput.trim();
    const query = trimmedSearchInput.replace(" ", "+");
    let newSearchResult: Array<AlbumSearchResult> = [
      {
        artists: [{ name: "" }],
        name: "",
        images: [{ url: "" }],
        id: "00000",
      },
    ];

    try {
      // query spotify album get api
      const authConfig: AxiosRequestConfig = createAuthConfig();
      const authResponse: AxiosResponse = await axios(authConfig);
      const getAlbumsFrom = getAlbumsByAlbumName(query, country);
      const { access_token }: authResponseData = authResponse.data;
      const queryConfig: AxiosRequestConfig = createQueryConfig(
        getAlbumsFrom,
        access_token
      );
      const queryResponse: AxiosResponse = await axios(queryConfig);

      const {
        albums: { items },
      }: queryResponseData = queryResponse.data;

      setSearchResult(newSearchResult.concat(items));
    } catch (error) {
      console.warn(error);
      setSearchResult(newSearchResult);
      alert("현재 앨범 조회가 불가능합니다.");
    }
  };

  let classname = "uk-modal-container searchBoxContainer";
  if (showSearch) {
    classname = classname + " show";
  }

  return (
    <div className={classname}>
      <div className="uk-margin-auto-vertical">
        <CancelButton onClickCancel={onClickCancel} />
        <div className="uk-container uk-padding">
          <SearchForm
            setCountry={setCountry}
            setSearchInput={setSearchInput}
            onSubmission={queryAlbums}
          />
        </div>
        <div className="uk-container">
          {searchResult.length !== 0 ? (
            searchResult.map((collection) => {
              const imgUrl: string = collection.images[0].url;
              const altText: string =
                collection.name + " - " + collection.artists[0].name;
              return (
                <SpotifyAlbumImg
                  key={_.uniqueId()}
                  id={collection.id}
                  imgUrl={imgUrl}
                  altText={altText}
                  handleClickAlbum={handleClickAlbum}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchWindow;
