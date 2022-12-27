import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { SwipeableDrawer } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { action } from "mobx";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { TopsterStore } from "../../../data/datastores/TopsterStore";
import { Album } from "../../../data/models/Album";
import { queryAlbumsToSpotify } from "./queryAlbumsToSpotify";
import SearchForm from "./SearchForm";
import { ImgList } from "./ImgList";
import { Topster } from "../../../data/models/Topster";
import { observer } from "mobx-react-lite";
import { Puller } from "./Puller";

const SearchPanel = observer((): JSX.Element => {
  const topsterStore: TopsterStore = useContext(TopsterStoreContext);
  const topster: Topster = topsterStore.topster;
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("us");
  const [searchResult, setSearchResult] = useState<Array<Album>>([]);
  const {isError, isLoading, isSuccess, refetch} = useQuery({
    queryKey: ['album', query, country],
    queryFn: () => {queryAlbumsToSpotify(query, country)},
    enabled: false,
  });
  
  return (
    <SwipeableDrawer
      anchor={'left'}
      open={topsterStore.selectedIdx === -1 ? false : true}
      onClose={action(() => topsterStore.selectedIdx = -1)}
      onOpen={() => {}}
    >
      <Puller />
      <SearchForm
        setCountry={setCountry}
        setQuery={setQuery}
        onSubmission={() => {refetch()}}
      />
      {isLoading ?
        <Skeleton
          variant={'rectangular'}
        />
        :
        <ImgList 
          albums={searchResult}
          addAlbum={addAlbum}
        />
      }
    </SwipeableDrawer>
  );

  function addAlbum(newAlbum: Album): void {
      topster.replaceAlbumAt(
        topsterStore.selectedIdx,
        newAlbum
      );
  }
});

export default SearchPanel;



