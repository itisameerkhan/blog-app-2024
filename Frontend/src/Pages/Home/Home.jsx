import "./Home.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("blog-app-jwtToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="home">
      <h1>HOME</h1>
    </div>
  );
};

export default Home;
