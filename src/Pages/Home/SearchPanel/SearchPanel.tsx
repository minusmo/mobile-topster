import React, { useState, useContext } from "react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import * as _ from "lodash";
import SearchForm from "./SearchForm";
import { getAlbumsByAlbumName } from "../../../utils/httpUtils";
import AlbumImgFound from "./ResultImg";
import { SelectionContext } from "../../../contexts/SelectionContext";
import { TopsterContext } from "../../../contexts/TopsterContext";
import { Album } from "../../../models/Album";
import { SearchPanelProps, queryResponseData, AlbumSearchResult, authResponseData } from "./types";
import { createAuthConfig, createQueryConfig } from "./utils";
import { IconButton } from "../../../components/subComponents/IconButton";
import { XCircleIcon } from "@heroicons/react/24/outline";

const SearchPanel = ({
  onClickCancel,
  showUp,
}: SearchPanelProps): JSX.Element => {
  const topster = useContext(TopsterContext);
  const userSelection = useContext(SelectionContext);
  const [searchInput, setSearchInput] = useState<String>("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState<Array<AlbumSearchResult>>([]);

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

  let classname = "searchBoxContainer";

  return (
    <div className={classname}>
      <div className="">
        <IconButton onClick={onClickCancel}>
          <XCircleIcon />
        </IconButton>
        <div className="">
          <SearchForm
            setCountry={setCountry}
            setSearchInput={setSearchInput}
            onSubmission={queryAlbums}
          />
        </div>
        <div className="">
          {searchResult.length !== 0 ? (
            searchResult.map((collection) => {
              const imgUrl: string = collection.images[0].url;
              const albumTitle = collection.name;
              const artist: string = collection.artists[0].name;
              const altText: string = albumTitle + " - " + artist;
              return (
                <AlbumImgFound
                  key={_.uniqueId()}
                  id={collection.id}
                  imgUrl={imgUrl}
                  altText={altText}
                  clickHandler={() => { topster.replaceAlbumAt(userSelection.selection, new Album(albumTitle, artist, imgUrl)) }}
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

export default SearchPanel;
