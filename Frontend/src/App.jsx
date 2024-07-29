import { Outlet, useLocation } from "react-router-dom";
import "./index.scss";
import Header from "./components/Header/Header";

const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== "/" && <Header />}
      <Outlet />
    </div>
  );
};

export default App;
