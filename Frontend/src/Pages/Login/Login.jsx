import { useEffect, useState } from "react";
import "./Login.scss";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginState, setLoginState] = useState("signup");
  const [snackStatus, setSnackStatus] = useState({
    open: false,
    message: "",
  });
  const [pwdStatus, setPwdStatus] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (loginState === "signup") {
        const formData = new FormData();
        formData.append("image", profile);
        const imageUpload = await axios.post(
          "http://localhost:8080/api/user/profile-upload",
          formData,
          {
            "Content-type": "multipart/form-data",
          }
        );
        console.log(imageUpload.data.data.image);
        const response = await fetch("http://localhost:8080/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            imageURL: imageUpload.data.data.image,
          }),
        });
        const json = await response.json();
        if (!json.success) {
          setSnackStatus({
            open: true,
            message: json.message,
          });
          setIsLoading(false);
          return;
        }
        localStorage.setItem("blog-app-jwtToken", json.jwtToken);
        navigate("/home");
      } else if (loginState === "login") {
        const response = await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const json = await response.json();
        if (!json.success) {
          setSnackStatus({
            open: true,
            message: json.message,
          });
          setIsLoading(false);

          return;
        }
        localStorage.setItem("blog-app-jwtToken", json.jwtToken);
        setIsLoading(false);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSnackClose = () => {
    setSnackStatus({
      open: false,
      message: "",
    });
  };

  useEffect(() => {
    if (localStorage.getItem("blog-app-jwtToken")) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login">
      <div className="login-main">
        <p className="login-title">
          {loginState === "signup" ? "Sign up" : "Login"}
        </p>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {loginState === "signup" && (
              <div className="form-inner">
                <label>username</label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-inner">
              <label>email</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-inner">
              <label>password</label>
              <div className="form-inner-pwd">
                <input
                  type={pwdStatus ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => setPwdStatus(!pwdStatus)}
                >
                  {pwdStatus ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>
            {loginState === "signup" && (
              <div className="pfp-upload">
                <label>profile</label>
                <input
                  required
                  type="file"
                  onChange={(e) => setProfile(e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
            )}
            <button className="submit-btn">
              {isLoading ? (
                <div className="loader-main">
                  <div className="loader"></div>
                </div>
              ) : (
                "SUBMIT"
              )}
            </button>
            <div className="already-acc">
              {loginState === "signup" ? (
                <p onClick={() => setLoginState("login")}>
                  Already having an account? login
                </p>
              ) : (
                <p onClick={() => setLoginState("signup")}>
                  Dont have an account? create one.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackStatus.open}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        message={snackStatus.message}
      />
    </div>
  );
};

export default Login;
