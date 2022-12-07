type PHelp = {
  classname: string;
};

const Help = ({ classname }: PHelp): JSX.Element => {
  return (
    <div id="manual" className={classname}>
      <p>이미지를 클릭하면 새로운 앨범을 검색하고 추가할 수 있습니다.</p>
      <p>Chrome 브라우저에서 정상 작동합니다.</p>
      <p>문의/버그신고: bldolphin96@gmail.com</p>
    </div>
  );
};

export default Help;
