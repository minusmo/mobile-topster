import Manual from "./Manual";

const HelpButton = () => {
  return (
    <details>
      <summary role="button">Help</summary>
      <Manual />
    </details>
  );
};

export default HelpButton;
