import { Outlet } from "react-router-dom";
import "./index.scss";
import Header from "./components/Header/Header";
import { useEffect } from "react";

const App = () => {
  

  useEffect(() => {
  }, []);

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
