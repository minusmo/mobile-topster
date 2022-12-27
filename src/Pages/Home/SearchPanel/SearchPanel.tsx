import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import TopsterStore from "../../../data/datastores/TopsterStore";
import { Topster } from "../../../data/models/Topster";
import { Album } from "../../../data/models/Album";
import { queryAlbumsToSpotify } from "./queryAlbumsToSpotify";
import { SpotifyAlbumData } from "./types";
import SearchForm from "./SearchForm";
import { ImgList } from "./ImgList";

const SearchPanel = (): JSX.Element => {
  const topsterStore = useContext(TopsterStoreContext);
  const topster = topsterStore.topster;
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState<Array<Album>>([]);
  const {isError, isLoading, isSuccess, refetch} = useQuery({
    queryKey: ['album', query, country],
    queryFn: () => {queryAlbumsToSpotify(query, country)},
    enabled: false,
  });

  return (
    <div>
      <SearchForm
        setCountry={setCountry}
        setQuery={setQuery}
        onSubmission={() => {refetch()}}
      />
      <ImgList 
        albums={searchResult}
        addAlbum={addAlbum}
      />
    </div>
  );

  function addAlbum(newAlbum: Album): void {
      topster.replaceAlbumAt(
        topsterStore.getSelectedIdx(),
        newAlbum
      );
  }
};

export default SearchPanel;



