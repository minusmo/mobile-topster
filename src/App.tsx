import { Helmet } from "react-helmet";
import Main from "./components/mainComponents/Main";
import Header from "./components/mainComponents/Header";
import Footer from "./components/mainComponents/Footer";
import "./uikit/css/uikit.min.css";

const App = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="mobile topster" />
        <title>Mobile-Topster</title>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/js/uikit-icons.min.js"></script>
      </Helmet>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
