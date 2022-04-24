import Manual from "./Manual";

const HelpAccordion = () => {
  return (
    <details data-uk-accordion>
      <summary className="uk-accordion-title">Help</summary>
      <Manual classname={"uk-accordion-content"} />
    </details>
  );
};

export default HelpAccordion;
