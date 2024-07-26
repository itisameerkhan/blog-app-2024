import "./Header.scss";

const Header = () => {
  return (
    <div className="header-main">
      <div className="header">
        <div className="header-left">
          <h1>BLOG APP</h1>
        </div>
        <div className="header-right">
          <span className="material-symbols-outlined">person</span>
        </div>
      </div>
      <div className="header-temp"></div>
    </div>
  );
};

export default Header;
