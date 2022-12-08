import { useEffect }  from "react";
import { GAID } from "../../configs/credentials";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import TopsterMaker from "./TopsterMaker";
import Header from "../../layouts/Header";
import Main from "../../layouts/Main";
import Footer from "../../layouts/Footer";
import { Topster } from "../../models/Topster";
import { TopsterContext } from "../../contexts/TopsterContext";
import { SelectionContext, userSelection } from "../../contexts/SelectionContext";

export const topster: Topster = new Topster();
const Home = () => {
    useEffect(() => {
        ReactGA.initialize(GAID);
        ReactGA.pageview(window.location.pathname);
    }, [])
    return (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content="TopsterMaker for mobile first" />
            <title>Topsters for Mobile</title>
          </Helmet>
          <TopsterContext.Provider value={topster}>
            <Header />
            <SelectionContext.Provider value={userSelection}>
              <Main>
                <TopsterMaker/>
              </Main>
            </SelectionContext.Provider>
          </TopsterContext.Provider>
          <Footer />
        </>
    )
}

export default Home;