import "./mainComponentStyles/headerStyle.css";

const Navbar = (): JSX.Element => {
  return (
    <nav className="container">
      <ul>
        <li>
          <strong>Mobile Topster</strong>
        </li>
      </ul>
    </nav>
  );
};

const Header = (): JSX.Element => {
  return (
    <header className="uk-position-top" data-uk-navbar>
      <p id="header-text">Mobile Topster</p>
    </header>
  );
};

export default Header;
