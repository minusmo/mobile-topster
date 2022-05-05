type searchFormProps = {
  onSubmission: () => Promise<void>;
  setCountry: (country: string) => void;
  setSearchInput: (searchInput: String) => void;
};

type countrySelectionProps = {
  setCountry: (country: string) => void;
};

const CountrySelection = ({
  setCountry,
}: countrySelectionProps): JSX.Element => {
  return (
    <div className="uk-margin uk-flex uk-flex-left uk-flex-middle">
      <label
        className="uk-form-label uk-text-muted uk-margin-small-right"
        htmlFor="select-country"
      >
        Country
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          name="country"
          id="select-country"
          onChange={(e) => setCountry(e.currentTarget.value)}
        >
          <option value="us">United States of America</option>
          <option value="gb">United Kingdom</option>
          <option value="al">Albania</option>
          <option value="dz">Algeria</option>
          <option value="ao">Angola</option>
          <option value="ai">Anguilla</option>
          <option value="ag">Antigua and Barbuda</option>
          <option value="ar">Argentina</option>
          <option value="am">Armenia</option>
          <option value="au">Australia</option>
          <option value="at">Austria</option>
          <option value="az">Azerbaijan</option>
          <option value="bs">Bahamas</option>
          <option value="bh">Bahrain</option>
          <option value="bb">Barbados</option>
          <option value="by">Belarus</option>
          <option value="be">Belgium</option>
          <option value="bz">Belize</option>
          <option value="bj">Benin</option>
          <option value="bm">Bermuda</option>
          <option value="bt">Bhutan</option>
          <option value="bo">Bolivia</option>
          <option value="bw">Botswana</option>
          <option value="br">Brazil</option>
          <option value="vg">British Virgin Islands</option>
          <option value="bn">Brunei Darussalam</option>
          <option value="bg">Bulgaria</option>
          <option value="bf">Burkina-Faso</option>
          <option value="kh">Cambodia</option>
          <option value="ca">Canada</option>
          <option value="cv">Cape Verde</option>
          <option value="ky">Cayman Islands</option>
          <option value="td">Chad</option>
          <option value="cl">Chile</option>
          <option value="cn">China</option>
          <option value="co">Colombia</option>
          <option value="cr">Costa Rica</option>
          <option value="hr">Croatia</option>
          <option value="cy">Cyprus</option>
          <option value="cz">Czech Republic</option>
          <option value="cg">Democratic Republic of the Congo</option>
          <option value="dk">Denmark</option>
          <option value="dm">Dominica</option>
          <option value="do">Dominican Republic</option>
          <option value="ec">Ecuador</option>
          <option value="eg">Egypt</option>
          <option value="sv">El Salvador</option>
          <option value="ee">Estonia</option>
          <option value="fm">Federated States of Micronesia</option>
          <option value="fj">Fiji</option>
          <option value="fi">Finland</option>
          <option value="fr">France</option>
          <option value="gm">Gambia</option>
          <option value="de">Germany</option>
          <option value="gh">Ghana</option>
          <option value="gr">Greece</option>
          <option value="gd">Grenada</option>
          <option value="gt">Guatemala</option>
          <option value="gw">Guinea Bissau</option>
          <option value="gy">Guyana</option>
          <option value="hn">Honduras</option>
          <option value="hk">Hong Kong</option>
          <option value="hu">Hungary</option>
          <option value="is">Iceland</option>
          <option value="in">India</option>
          <option value="id">Indonesia</option>
          <option value="ie">Ireland</option>
          <option value="il">Israel</option>
          <option value="it">Italy</option>
          <option value="jm">Jamaica</option>
          <option value="jp">Japan</option>
          <option value="jo">Jordan</option>
          <option value="kz">Kazakhstan</option>
          <option value="ke">Kenya</option>
          <option value="kg">Krygyzstan</option>
          <option value="kw">Kuwait</option>
          <option value="la">Laos</option>
          <option value="lv">Latvia</option>
          <option value="lb">Lebanon</option>
          <option value="lr">Liberia</option>
          <option value="lt">Lithuania</option>
          <option value="lu">Luxembourg</option>
          <option value="mo">Macau</option>
          <option value="mk">Macedonia</option>
          <option value="mg">Madagascar</option>
          <option value="mw">Malawi</option>
          <option value="my">Malaysia</option>
          <option value="ml">Mali</option>
          <option value="mt">Malta</option>
          <option value="mr">Mauritania</option>
          <option value="mu">Mauritius</option>
          <option value="mx">Mexico</option>
          <option value="md">Moldova</option>
          <option value="mn">Mongolia</option>
          <option value="ms">Montserrat</option>
          <option value="mz">Mozambique</option>
          <option value="na">Namibia</option>
          <option value="np">Nepal</option>
          <option value="nl">Netherlands</option>
          <option value="nz">New Zealand</option>
          <option value="ni">Nicaragua</option>
          <option value="ne">Niger</option>
          <option value="ng">Nigeria</option>
          <option value="no">Norway</option>
          <option value="om">Oman</option>
          <option value="pk">Pakistan</option>
          <option value="pw">Palau</option>
          <option value="pa">Panama</option>
          <option value="pg">Papua New Guinea</option>
          <option value="py">Paraguay</option>
          <option value="pe">Peru</option>
          <option value="ph">Philippines</option>
          <option value="pl">Poland</option>
          <option value="pt">Portugal</option>
          <option value="qa">Qatar</option>
          <option value="tt">Republic of Trinidad and Tobago</option>
          <option value="ro">Romania</option>
          <option value="ru">Russia</option>
          <option value="kn">Saint Kitts and Nevis</option>
          <option value="lc">Saint Lucia</option>
          <option value="vc">Saint Vincent and the Grenadines</option>
          <option value="st">Sao Tome e Principe</option>
          <option value="sa">Saudi Arabia</option>
          <option value="sn">Senegal</option>
          <option value="sc">Seychelles</option>
          <option value="sl">Sierra Leone</option>
          <option value="sg">Singapore</option>
          <option value="sk">Slovakia</option>
          <option value="si">Slovenia</option>
          <option value="sb">Soloman Islands</option>
          <option value="za">South Africa</option>
          <option value="kr">South Korea</option>
          <option value="es">Spain</option>
          <option value="lk">Sri Lanka</option>
          <option value="sr">Suriname</option>
          <option value="sz">Swaziland</option>
          <option value="se">Sweden</option>
          <option value="ch">Switzerland</option>
          <option value="tw">Taiwan</option>
          <option value="tj">Tajikistan</option>
          <option value="tz">Tanzania</option>
          <option value="th">Thailand</option>
          <option value="tn">Tunisia</option>
          <option value="tr">Turkey</option>
          <option value="tm">Turkmenistan</option>
          <option value="tc">Turks and Caicos Islands</option>
          <option value="ug">Uganda</option>
          <option value="ua">Ukraine</option>
          <option value="ae">United Arab Emirates</option>
          <option value="gb">United Kingdom</option>
          <option value="us">United States of America</option>
          <option value="uy">Uruguay</option>
          <option value="uz">Uzbekistan</option>
          <option value="ve">Venezuela</option>
          <option value="vn">Vietnam</option>
          <option value="ye">Yemen</option>
          <option value="zw">Zimbabwe</option>
        </select>
      </div>
    </div>
  );
};

type searchInputProps = {
  setSearchInput: (searchInput: String) => void;
};

const SearchInput = ({ setSearchInput }: searchInputProps): JSX.Element => {
  return (
    <div className="uk-flex uk-flex-left uk-flex-middle">
      <label
        className="uk-form-label uk-text-muted uk-margin-small-right"
        htmlFor="search-album"
      >
        Artist/AlbumTitle
      </label>
      <div className="uk-form-controls">
        <input
          id="search-album"
          className="uk-input"
          type="text"
          placeholder="type artist or album title"
          onChange={(e) => setSearchInput(String(e.currentTarget.value))}
        />
      </div>
    </div>
  );
};

type submitButtonProps = {
  onSubmission: () => Promise<void>;
};
const SubmitButton = ({ onSubmission }: submitButtonProps): JSX.Element => {
  return (
    <button
      onClick={(e) => onSubmission()}
      className="uk-button uk-button-default uk-margin-small uk-width-expand uk-text-muted"
    >
      Search
    </button>
  );
};

const SearchForm = ({
  onSubmission,
  setCountry,
  setSearchInput,
}: searchFormProps): JSX.Element => {
  return (
    <div id="spotifySearchForm" className="uk-form-horizontal">
      <CountrySelection setCountry={setCountry} />
      <div className="uk-flex uk-flex-start">
        <SearchInput setSearchInput={setSearchInput} />
      </div>
      <SubmitButton onSubmission={onSubmission} />
    </div>
  );
};

export default SearchForm;
