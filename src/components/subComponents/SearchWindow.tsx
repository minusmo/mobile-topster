import React, { useState } from "react";
import Qs from "querystring";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import SearchForm from "./SearchForm";
import cancel from "../../assets/images/cancel.png";
import paper from "../../assets/images/paper.jpeg";
import { username, password } from "../../constants/credentials";
import { SPOTIFY_API, CONTENT_TYPE } from "../../constants/httpConstants";
import { getAlbumsByAlbumName } from "../../utils/httpUtils";
import { JsxEmit } from "typescript";

type searchWindowProps = {
  onClickCancel: () => void;
  showSearch: boolean;
  handleClickAlbum: React.MouseEventHandler;
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

const SearchWindow = ({
  onClickCancel,
  showSearch,
  handleClickAlbum,
}: searchWindowProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState<Array<AlbumSearchResult>>(
    []
  );

  const userIsAddingAlbumManually = (trimmedSearchInput: String): boolean => {
    return trimmedSearchInput.slice(0, 4) === "http" ? true : false;
  };

  const returnUsersAlbum = (trimmedSearchInput: String): void => {
    const artists: promptReturn = window.prompt("아티스트명을 입력해주세요.");
    const albumName: promptReturn = window.prompt("앨범명을 입력해주세요.");

    const usersAlbum: Array<AlbumSearchResult> = [
      {
        artists: [{ name: "" }],
        name: "",
        images: [{ url: paper }],
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

  const createAuthConfig = (): AxiosRequestConfig => {
    return {
      method: "post",
      url: SPOTIFY_API,
      headers: {
        "Content-Type": CONTENT_TYPE,
      },
      data: Qs.stringify({ grant_type: "client_credentials" }),
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

  const queryAlbums = async (
    e: React.FormEvent,
    searchInput: String,
    country: string
  ): Promise<void> => {
    e.preventDefault();

    const trimmedSearchInput: String = searchInput.trim();
    const query = trimmedSearchInput.replace(" ", "+");
    let searchResult: Array<AlbumSearchResult> = [
      {
        artists: [{ name: "" }],
        name: "",
        images: [{ url: paper }],
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

      setSearchResult(searchResult.concat(items));
    } catch (error) {
      console.warn(error);
      setSearchResult(searchResult);
      alert("현재 앨범 조회가 불가능합니다.");
    }
  };
  type cancelButtonProps = {
    imgUri: string;
  }

  const CancelButton = ({ imgUri }: cancelButtonProps):JSX.Element => {
    return <img
      id="cancelButton"
      src={imgUri}
      alt="cancel"
      onClick={onClickCancel}
      />;
  }
  type returnedAlbumImgProps = {
    id: string;
    imgUrl: string;
    altText: string;
  }
  const ReturnedAlbumImg = ({ id, imgUrl, altText }: returnedAlbumImgProps):JSX.Element => {
    return <img
      key={id}
      width={60}
      height={60}
      src={imgUrl}
      alt={altText}
      onClick={handleClickAlbum}
    />;
  }

  return (
    <div
      id={showSearch ? "searchBoxContainer-show" : "searchBoxContainer-hidden"}
    >
      <CancelButton imgUri={cancel} />
        <SearchForm
          onSubmit={(e) => queryAlbums(e, searchInput, country)}
          onChangeInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          onChangeCountry={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCountry(e.target.value)
          }
        />
      {searchResult.length !== 0 ? (
        searchResult.map((collection) => {
          const imgUrl: string = collection.images[0].url;
          const altText: string = collection.name + " - " + collection.artists[0].name;
          return <ReturnedAlbumImg id={collection.id} imgUrl={imgUrl} altText={altText} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchWindow;
