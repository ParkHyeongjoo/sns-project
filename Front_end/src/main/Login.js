import React, { useRef } from "react";
import "./Login.scss";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

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
      //   login();
    }
  };
  const findId = () => {};
  const findPw = () => {};
  const signUp = () => {};
  return (
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
  );
};

export default Login;
