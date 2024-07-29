import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../context/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("blog-app-jwtToken");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="header-main">
      <div className="header">
        <div className="header-left">
          <h1>BLOG APP</h1>
        </div>
        <div className="header-right">
          {/* <span className="material-symbols-outlined">person</span> */}
          <img src={user.imageURL} alt="pfp" className="header-profile" />
          <span className="material-symbols-outlined" onClick={handleLogout}>
            logout
          </span>
        </div>
      </div>
      <div className="header-temp"></div>
    </div>
  );
};

export default Header;
