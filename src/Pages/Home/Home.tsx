import { useEffect }  from "react";
import { GoogleAnalytics } from "../../configs/credentials";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import TopsterMaker from "./TopsterMaker";
import Header from "../../layouts/Header";
import Main from "../../layouts/Main";
import Footer from "../../layouts/Footer";
import { TopsterStoreContext, topsterStore } from "../../contexts/TopsterStoreContext";

const Home = () => {
    useEffect(() => {
        ReactGA.initialize(GoogleAnalytics.GAID);
        ReactGA.pageview(window.location.pathname);
    }, []);
    return (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content="TopsterMaker for mobile first" />
            <title>The Topsters</title>
            {/* <!-- Google tag (gtag.js) --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90376709-3"></script>
            <script>
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-90376709-3');
              `}
            </script>
          </Helmet>
          <Header />
          <TopsterStoreContext.Provider value={topsterStore}>
              <Main>
                <TopsterMaker/>
              </Main>
          </TopsterStoreContext.Provider>
          <Footer />
        </>
    )
}

export default Home;