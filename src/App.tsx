import Home from "./Pages/Home/Home";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./theme";

const queryClient = new QueryClient();

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
