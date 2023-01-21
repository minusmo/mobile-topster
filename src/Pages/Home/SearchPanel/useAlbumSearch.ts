import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Album } from "../../../data/models/Album";
import { queryAlbumsToSpotify } from "./queryAlbumsToSpotify";

export function useAlbumSearch() { 
    const [query, setQuery] = useState("");
    const [country, setCountry] = useState("us");
    const [searchResult, setSearchResult] = useState<Array<Album>>([]);
    const queryState = useQuery({
        queryKey: ['album', query, country],
        queryFn: () => queryAlbumsToSpotify(query, country),
        enabled: false,
    });

    async function updateSearchResult() {
        const {isError, isSuccess, data} = await queryState.refetch();
        if (isError) {
            setSearchResult((prevSearchResult) => {
                return prevSearchResult;
            });
        }
        else if (isSuccess) {
            setSearchResult(data);
        }
    }

    function updateSearchQuery(newQuery = query, newCountry = country) {
        setQuery((prevQuery) => {
            if (prevQuery === newQuery) return prevQuery;
            else return newQuery;
        });
        setCountry((prevCountry) => {
            if (prevCountry === newCountry) return prevCountry;
            else return newCountry;
        })
    }

    return {
        query,
        country,
        searchResult,
        queryState,
        updateSearchQuery,
        updateSearchResult,
    };
};