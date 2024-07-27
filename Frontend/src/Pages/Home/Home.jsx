import "./Home.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../context/userSlice.js";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const jwtToken = localStorage.getItem("blog-app-jwtToken");
      const response = await fetch(
        "http://localhost:8080/api/user/get-user-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jwtToken: jwtToken,
          }),
        }
      );

      const json = await response.json();
      dispatch(addUser(json.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("blog-app-jwtToken")) {
      navigate("/");
    }
    getUserInfo();
  }, []);

  return (
    <div className="home">
      <h1>HOME</h1>
    </div>
  );
};

export default Home;
