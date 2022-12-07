import Home from "./Pages/Home/Home";

const App = (): JSX.Element => {
  // existing topster will be fetched 
  // and provided by value for Provider on useEffect
  return (
      <Home />
  );
};

export default App;
