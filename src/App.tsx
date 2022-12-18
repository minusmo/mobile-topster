import Home from "./Pages/Home/Home";
import { ThemeProvider } from "styled-components";

const theme = {
  padding: "1"
}

const App = (): JSX.Element => {
  // existing topster will be fetched 
  // and provided by value for Provider on useEffect
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
