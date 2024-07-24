import { Outlet } from "react-router-dom";
import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default App;
