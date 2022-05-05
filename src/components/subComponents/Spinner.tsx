import "./subComponentStyles/spinnerStyle.css";
type spinnerProps = {
  classname: string;
};

const Spinner = ({ classname }: spinnerProps): JSX.Element => {
  return (
    <div id="spinner-container" className={classname}>
      <div
        className="uk-width-1-1 uk-height-1-1"
        data-uk-spinner="ratio: 3"
      ></div>
    </div>
  );
};

export default Spinner;
