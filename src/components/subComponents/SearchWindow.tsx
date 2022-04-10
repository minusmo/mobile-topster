import React, { useState } from "react";
import Qs from "querystring";
import axios from "axios";
import SearchForm from "./SearchForm";
import cancel from "../../assets/images/cancel.png";
import paper from "../../assets/images/paper.jpeg";
import { username, password } from "../../constants/credentials";
import { SPOTIFY_API, CONTENT_TYPE } from "../../constants/httpConstants";
import { getAlbumsByAlbumName } from "../../utils/httpUtils";

type searchWindowProps = {
  onClickCancel: () => void;
  showSearch: boolean;
  handleClickAlbum: React.MouseEventHandler;
}
type AlbumArtist = {
  name: string;
}

type AlbumImg = {
  url: string;
}

type AlbumSearchResult = {
  artists: Array<AlbumArtist>;
  name: string;
  images: Array<AlbumImg>;
  id: string;
}

const SearchWindow = ({ onClickCancel, showSearch, handleClickAlbum }: searchWindowProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState([]);

  const userIsAddingAlbumManually = (trimmedSearchInput: String): boolean => {
    return trimmedSearchInput.slice(0, 4) === "http" ? true : false;
  }

  const returnUsersAlbum = (trimmedSearchInput: String): void => {
    const artists: string = window.prompt("아티스트명을 입력해주세요.");
    const albumName: string = window.prompt("앨범명을 입력해주세요.");

    const usersAlbum: Array<AlbumSearchResult> = [
      {
        artists: [{ name: "" }],
        name: "",
        images: [{ url: paper }],
        id: "00000",
      },
      {
        artists: [{ name: artists }],
        name: albumName,
        images: [{ url: trimmedSearchInput }],
        id: "99999",
      },
    ];
    setSearchResult(usersAlbum);
    return;
  }

  const handleSubmit = (e: React.FormEvent, searchInput: String, country: string) => {
    e.preventDefault();

    const trimmedSearchInput: String = searchInput.trim();

    const query = trimmedSearchInput.replace(" ", "+");

    // query spotify api
    const authConfig = {
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

    axios(authConfig)
      .then((res) => {
        const getAlbums = getAlbumsByAlbumName(query, country);

        const { access_token } = res.data;

        const queryConfig = {
          method: "get",
          url: getAlbums,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        axios(queryConfig).then((res) => {
          const {
            albums: { items },
          } = res.data;

          setSearchResult([
            {
              artists: [{ name: "" }],
              name: "",
              images: [{ url: paper }],
              id: "00000",
            },
            ...items,
          ]);
        });
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div
      id={showSearch ? "searchBoxContainer-show" : "searchBoxContainer-hidden"}
    >
      <img
        id="cancelButton"
        src={cancel}
        alt="cancel"
        onClick={onClickCancel}
      />
      <div id="formContainer">
        <SearchForm
          onSubmit={(e) => handleSubmit(e, searchInput, country)}
          onChangeInput={(e) => setSearchInput(e.target.value)}
          onChangeCountry={(e) => setCountry(e.target.value)}
        />
      </div>
      {searchResult.length !== 0 ? (
        searchResult.map((collection) => (
          <img
            key={collection.id}
            width={60}
            height={60}
            src={collection.images[0].url}
            alt={collection.name + " - " + collection.artists[0].name}
            onClick={handleClickAlbum}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchWindow;
