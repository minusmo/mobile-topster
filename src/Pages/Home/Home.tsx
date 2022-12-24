import { useEffect }  from "react";
import { GAID } from "../../configs/credentials";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import TopsterMaker from "./TopsterMaker";
import Header from "../../layouts/Header";
import Main from "../../layouts/Main";
import Footer from "../../layouts/Footer";
import { TopsterStoreContext } from "../../contexts/TopsterStoreContext";
import TopsterStore from "../../data/datastores/TopsterStore";

export const topsterStore: TopsterStore = new TopsterStore();

const Home = () => {
    useEffect(() => {
        ReactGA.initialize(GAID);
        ReactGA.pageview(window.location.pathname);
    }, []);
    return (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content="TopsterMaker for mobile first" />
            <title>Topsters for Mobile</title>
          </Helmet>
          <TopsterStoreContext.Provider value={topsterStore}>
            <Header />
              <Main>
                <TopsterMaker/>
              </Main>
          </TopsterStoreContext.Provider>
          <Footer />
        </>
    )
}

export default Home;