import Home from "./Pages/Home/Home";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = {
  padding: "1"
}

const App = (): JSX.Element => {
  // existing topster will be fetched 
  // and provided by value for Provider on useEffect
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
