import React, { useState } from "react";
import Qs from "querystring";
import axios from "axios";
import { username, password } from "../credentials";
import SearchForm from "./SearchForm";
import cancel from "../images/cancel.png";
import paper from "../images/paper.jpeg";

const SPOTIFY_API = "https://accounts.spotify.com/api/token";
const CONTENT_TYPE = "application/x-www-form-urlencoded";

const getApi1 = (query, country) =>
  `https://api.spotify.com/v1/search/?q=album:${query}%20OR%20artist:${query}&type=album&market=${country}&limit=50`;
const getApi2 = (query, country) =>
  `https://api.spotify.com/v1/search/?q=${query}&type=album&market=${country}&limit=50`;

function SearchWindow({ onClickCancel, showSearch, handleClickAlbum }) {
  const [searchInput, setSearchInput] = useState("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = (e, searchInput, country) => {
    e.preventDefault();

    const trimmedSearchInput = searchInput.trim();
    // 직접 앨범을 추가하는 경우
    if (trimmedSearchInput.slice(0, 4) === "http") {
      const artists = window.prompt("아티스트명을 입력해주세요.");
      const albumName = window.prompt("앨범명을 입력해주세요.");

      setSearchResult([
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
      ]);
      return;
    }

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
        const api1 = getApi1(query, country);
        const api2 = getApi2(query, country);

        const { access_token } = res.data;

        const queryConfig = {
          method: "get",
          url: api2,
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
      <img src={cancel} alt="cancel" onClick={onClickCancel} />
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
