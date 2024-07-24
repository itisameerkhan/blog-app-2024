import { useEffect, useState } from "react";
import "./Login.scss";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginState === "signup") {
        const response = await fetch("http://localhost:8080/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
          setSnackStatus({
            open: true,
            message: json.message,
          });
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
        console.log(json);
        console.log("login function");
        if (!json.success) {
          setSnackStatus({
            open: true,
            message: json.message,
          });
          return;
        }
        localStorage.setItem("blog-app-jwtToken", json.jwtToken);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
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
            <button>SUBMIT</button>
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
