import { Helmet } from "react-helmet";
import Main from "./components/mainComponents/Main";
import Header from "./components/mainComponents/Header";
import Footer from "./components/mainComponents/Footer/Footer";
import { Topster } from "./models/Topster";
import { createContext } from "react";
import { LocalPersistencyManager } from "./services/PersistencyManager";

const topster: Topster = new Topster();
const cachedTopster = JSON.parse(LocalPersistencyManager.retrieve("cachedTopster"));
topster.copyFrom(cachedTopster);
const userSelection = {"selection": -1};
export const TopsterContext = createContext<Topster>(topster);
export const SelectionContext = createContext(userSelection);

const App = (): JSX.Element => {
  // existing topster will be fetched and provided by value for Provider on useEffect function

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="mobile topster" />
        <title>Mobile-Topster</title>
      </Helmet>
      <TopsterContext.Provider value={topster}>
        <Header />
        <SelectionContext.Provider value={userSelection}>
          <Main />
        </SelectionContext.Provider>
      </TopsterContext.Provider>
      <Footer />
    </>
  );
};

export default App;
