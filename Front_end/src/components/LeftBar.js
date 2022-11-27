import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSignsPost,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faComments,
  faPenToSquare,
  faSun,
  faMoon,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

import "./LeftBar.scss";

const LeftBar = ({ mode, getMode, getHeaderName }) => {
  const [theme, setTheme] = useState(mode);
  const [switchMode, setSwitchMode] = useState("Dark Mode");
  const navigate = useNavigate();
  const nick = sessionStorage.getItem("nick");

  const modeSwitch = () => {
    if (mode === "darkMode") {
      setTheme("lightMode");
      setSwitchMode("Dark Mode");
    } else {
      setTheme("darkMode");
      setSwitchMode("Light Mode");
    }
  };
  useEffect(() => {
    getMode(theme);
  }, [theme]);

  const movePage = (e) => {
    e.preventDefault();
    const page = e.target.innerText;
    getHeaderName(page);
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "Profile":
        navigate(`/profile${nick}`);
        break;
      case "Message":
        navigate("/message");
        break;
      case "Write":
        navigate("/write");
        break;
      case "Post":
        navigate("/post");
        break;
    }
  };

  function logout() {
    sessionStorage.clear();
    navigate("/");
  }
  const moveHome = () => {
    navigate("/");
    getHeaderName("Home");
  };

  return (
    <div className="leftSidebar">
      <header>
        <div className="imgText">
          <span onClick={moveHome} className="img">
            <img src="/img/logo.png"></img>
          </span>
          <div onClick={moveHome} className="text headerText">
            <span className="name">IT TIME</span>
          </div>
        </div>
      </header>

      <div className="menuBar">
        <div className="menu">
          <ul className="menuLinks">
            <li onClick={movePage} className="navLink">
              <a href="">
                <FontAwesomeIcon icon={faHouse} className="icon" />
                <span className="text navText">Home</span>
              </a>
            </li>
            <li onClick={movePage} className="navLink">
              <a href="">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="text navText">Profile</span>
              </a>
            </li>
            <li onClick={movePage} className="navLink">
              <a href="">
                <FontAwesomeIcon icon={faComments} className="icon" />
                <span className="text navText">Message</span>
              </a>
            </li>
            <li onClick={movePage} className="navLink">
              <a href="">
                <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                <span className="text navText">Write</span>
              </a>
            </li>
            <li onClick={movePage} className="navLink">
              <a href="">
                <FontAwesomeIcon icon={faSignsPost} className="icon" />
                <span className="text navText">Post</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <li onClick={logout}>
            <a href="">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="icon"
              />
              <span className="text navText">Logout</span>
            </a>
          </li>
          <li className={`mode ${mode}`}>
            <div className="moonSun">
              <FontAwesomeIcon icon={faMoon} className="icon iMoon" />
              <FontAwesomeIcon icon={faSun} className="icon iSun" />
            </div>
            <span className="text modeText">{switchMode}</span>
            <div onClick={modeSwitch} className="toggleSwitch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
