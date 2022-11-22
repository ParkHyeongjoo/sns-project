import axios from "axios";
import React, { useRef, useState } from "react";
import "./Login.scss";

import SignUp from "./SignUp";
import FindId from "./FindId";
import FindPw from "./FindPw";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  function login() {
    axios
      .post("/login", {
        mb_id: idRef.current.value,
        mb_pw: pwRef.current.value,
      })
      .then(function (res) {
        if (res.data !== "") {
          // getAuth(res.data);
        } else {
          alert("아이디와 비밀번호를 확인해주세요");
        }
      })
      .catch(function (error) {
        alert("Login 실패!");
      });
  }

  const btnLogin = (e) => {
    e.preventDefault();
    if (idRef.current.value === "") {
      idRef.current.nextSibling.classList.add("warning");
      setTimeout(function () {
        idRef.current.nextSibling.classList.remove("warning");
      }, 1500);
    } else if (pwRef.current.value === "") {
      pwRef.current.nextSibling.classList.add("warning");
      setTimeout(function () {
        pwRef.current.nextSibling.classList.remove("warning");
      }, 1500);
    } else {
      login();
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const [isActiveSignUp, setIsActiveSignUp] = useState(false);
  const [isActiveFindId, setIsActiveFindId] = useState(false);
  const [isActiveFindPw, setIsActiveFindPw] = useState(false);
  const signUp = (e) => {
    e.preventDefault();
    if (!isActiveSignUp) {
      setIsActiveSignUp(true);
    } else {
      setIsActiveSignUp(false);
    }
  };
  const findId = (e) => {
    e.preventDefault();
    if (!isActiveFindId) {
      setIsActiveFindId(true);
    } else {
      setIsActiveFindId(false);
    }
  };
  const findPw = (e) => {
    e.preventDefault();
    if (!isActiveFindPw) {
      setIsActiveFindPw(true);
    } else {
      setIsActiveFindPw(false);
    }
  };
  return (
    <div>
      <div className="loginContainer">
        <div className="left">
          <img src="/img/logoWhite-removebg.png"></img>
        </div>
        <div className="right">
          <img src="/img/logo.png"></img>
          <div className="intArea">
            <input
              maxLength={16}
              type="text"
              name="id"
              ref={idRef}
              autoComplete="off"
              required
            ></input>
            <label htmlFor="id">USER ID</label>
          </div>
          <div className="intArea">
            <input
              maxLength={16}
              type="password"
              name="pw"
              ref={pwRef}
              autoComplete="off"
              required
              onKeyDown={onKeyPress}
            ></input>
            <label htmlFor="pw">PASSWORD</label>
          </div>
          <div className="btnArea">
            <button onClick={btnLogin}>LOGIN</button>
          </div>
          <div className="mainCaption">
            <span className="caption">
              <button onClick={findId}>Forgot ID?</button>
            </span>
            <span className="caption">
              <button onClick={findPw}>Forgot Password?</button>
            </span>
          </div>
          <div className="intArea">
            <hr></hr>
            <p>또는</p>
            <button>Login With Kakao</button>
          </div>
          <div className="signUp">
            Not a Member ?<button onClick={signUp}>Sign Up</button>
          </div>
        </div>
      </div>
      <div className={!isActiveSignUp ? "scrollShow" : "scrollHidden"}>
        <div className={!isActiveSignUp ? "modalHidden" : "modalShow"}>
          <SignUp />
        </div>
      </div>
      {/* <div className={!isActiveFindId ? "scrollShow" : "scrollHidden"}>
        <div className={!isActiveFindId ? "idModalHidden" : "idModalShow"}>
          <FindId />
        </div>
      </div> */}
      {/* <div className={!isActiveFindPw ? "scrollShow" : "scrollHidden"}>
        <div className={!isActiveFindPw ? "pwModalHidden" : "pwModalShow"}>
          <FindPw />
        </div>
      </div> */}
    </div>
  );
};

export default Login;
