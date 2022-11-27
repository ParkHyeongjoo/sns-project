import "./App.scss";

import Login from "./main/Login";
import LeftBar from "./components/LeftBar";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState("");

  const getAuth = (data) => {
    sessionStorage.setItem("id", data.mb_id);
    sessionStorage.setItem("nick", data.mb_nick);
    setAuth("로그인성공");
  };

  useEffect(() => {
    sessionStorage.getItem("id") !== null && setUser(true);
    sessionStorage.setItem("mode", "lightMode");
  }, [auth]);

  const [mode, setMode] = useState(sessionStorage.getItem("mode"));
  const getMode = (data) => {
    setMode(data);
    sessionStorage.setItem("mode", data);
  };

  const [headerName, setHeaderName] = useState("Home");
  const getHeaderName = (data) => {
    setHeaderName(data);
  };
  return (
    <div className="AppBody">
      {!user ? (
        <Login getAuth={getAuth} />
      ) : (
        <div className={`HomeBody ${mode}`}>
          <div className="leftBar">
            <div className="fixed">
              <LeftBar
                mode={mode}
                getMode={getMode}
                getHeaderName={getHeaderName}
              />
            </div>
          </div>
          <div className="body">
            <div className="headerBar">
              <div className="fixed">
                {/* <Header headerName={headerName} /> */}
              </div>
            </div>
            <div className="view">{/* <AnimateRoutes /> */}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
