import "./mainComponentStyles/manualStyle.css";
type manualProps = {
  classname: string;
}

const Manual = ({ classname }: manualProps): JSX.Element => {
  return (
    <div id="manual" className={classname}>
      <h5>
        이미지를 클릭하면 새로운 앨범을 <br></br>검색하고 추가할 수 있습니다.
      </h5>
      <h5>Chrome 브라우저에서 정상 작동합니다.</h5>
      <h5>문의: bldolphin96@gmail.com</h5>
    </div>
  );
};

export default Manual;
