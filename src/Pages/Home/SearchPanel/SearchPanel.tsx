import { useContext } from "react";
import { action, when } from "mobx";
import { observer } from "mobx-react-lite";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TopsterStoreContext } from "../../../contexts/TopsterStoreContext";
import { TopsterStore } from "../../../data/datastores/TopsterStore";
import { Album } from "../../../data/models/Album";
import SearchForm from "./SearchForm/SearchForm";
import { ImgList } from "./ImgList/ImgList";
import { Topster } from "../../../data/models/Topster";
import { useAlbumSearch } from './useAlbumSearch';

const SearchPanel = observer((): JSX.Element => {
  const topsterStore: TopsterStore = useContext(TopsterStoreContext);
  const topster: Topster = topsterStore.topster;
  const {
    searchResult,
    queryState: {
      isError,
      isSuccess,
      isLoading,
    },
    updateSearchQuery,
    updateSearchResult,
  } = useAlbumSearch();

  const theme = useTheme();
  const largerThanMd = theme.breakpoints.up('md');
  const whenLargerThanMd = useMediaQuery(largerThanMd);

  return (
    <SwipeableDrawer
      anchor={whenLargerThanMd ? 'right' : 'bottom'}
      open={topsterStore.selectedIdx === -1 ? false : true}
      onClose={action('resetSelectedIdx', () => topsterStore.selectedIdx = -1)}
      onOpen={() => {}}
      PaperProps={{
        sx: {
          width: whenLargerThanMd ? '60%' : '100%',
          height: whenLargerThanMd ? '100%' : '90%',
        }
      }}
    >
      <Box
        sx={{
          padding: '20px',
        }}
      >
        <SearchForm
          onFormDataChange={updateSearchQuery}
          onSubmission={() => {updateSearchResult()}}
        />
        {isLoading ?
          <Skeleton
            variant={'rounded'}
            width={'100%'}
            height={'100%'}
            animation={'wave'}
            sx={{
              marginTop: '5px',
            }}
          />
          :
          <ImgList 
            albums={searchResult}
            addAlbum={addAlbum}
          />
        }
      </Box>
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



