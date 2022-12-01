import { Helmet } from "react-helmet";
import Main from "./components/mainComponents/Main";
import Header from "./components/mainComponents/Header";
import Footer from "./components/mainComponents/Footer";
import { Topster } from "./models/Topster";
import { createContext } from "react";
import { LocalPersistencyManager } from "./services/PersistencyManager";

const topster: Topster = new Topster();
const cachedTopster = JSON.parse(LocalPersistencyManager.retrieve("cachedTopster"));
topster.copyFrom(cachedTopster);

export const TopsterContext = createContext<Topster>(topster);

const App = (): JSX.Element => {
  // existing topsteer will be fetched and provided by value for Provider on useEffect function

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="mobile topster" />
        <title>Mobile-Topster</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/css/uikit.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/js/uikit-icons.min.js"></script>
      </Helmet>
      <TopsterContext.Provider value={new Topster()}>
        <Header />
        <Main />
      </TopsterContext.Provider>
      <Footer />
    </>
  );
};

export default App;
