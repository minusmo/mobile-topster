import React, { useState, useContext } from "react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import * as _ from "lodash";
import SearchForm from "./SearchForm";
import { getAlbumsByAlbumName } from "../../../utils/httpUtils";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { Album } from "../../../data/models/Album";
import { ISearchPanel, queryResponseData, AlbumSearchResult, authResponseData } from "./types";
import { createAuthConfig, createQueryConfig } from "./utils";
import { IconButton } from "../../../components/IconButton";
import TopsterStore from "../../../data/datastores/TopsterStore";
import { Topster } from "../../../data/models/Topster";

const SearchPanel = ({
  onClickCancel,
  showUp,
}: ISearchPanel): JSX.Element => {
  const topsterStore = useContext(TopsterStoreContext);
  const topster = topsterStore.topster;
  const [searchInput, setSearchInput] = useState<String>("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState<Array<Album>>([]);

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

  return (
    <div>
      <div>
        <IconButton onClick={onClickCancel}>
        </IconButton>
        <div>
          <SearchForm
            setCountry={setCountry}
            setSearchInput={setSearchInput}
            onSubmission={queryAlbums}
          />
        </div>
        <div>
          {searchResult.length !== 0 ? (
            searchResult.map((collection) => {
              const imgUrl: string = collection.images[0].url;
              const albumTitle = collection.name;
              const artist: string = collection.artists[0].name;
              const altText: string = albumTitle + " - " + artist;
              
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
function addAlbum(topster: Topster, topsterStore: TopsterStore, albumTitle: string, artist: string, imgUrl: string): React.MouseEventHandler<HTMLImageElement> {
  return () => {
    topster.replaceAlbumAt(
      topsterStore.getSelectedIdx(),
      new Album(albumTitle, artist, imgUrl));
  };
}

