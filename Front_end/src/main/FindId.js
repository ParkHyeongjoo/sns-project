import axios from "axios";
import React, { useRef, useState } from "react";

import "./FindId.scss";

const FindId = ({ movePw }) => {
  const emailRef = useRef();

  const [checkAuth, setCheckAuth] = useState("");
  const [auth, setAuth] = useState(false);
  const [authError, setAuthError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    axios
      .post("/mailcheck", {
        checkEmail: emailRef.current.value,
      })
      .then(function (res) {
        alert("Email을 확인해주세요!");
        setCheckAuth(res.data);
      })
      .catch(function (error) {
        alert("Email 전송에 실패했습니다!");
      });
  };

  const onChangeAuth = (e) => {
    if (checkAuth === e.target.value) {
      setAuthError(false);
      setAuth(true);
    } else {
      setAuthError(true);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (auth) {
      axios
        .post("/findid", {
          mb_email: emailRef.current.value,
        })
        .then(function (res) {
          alert(res.data);
          window.location.reload();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const findPw = (e) => {
    e.preventDefault();
    movePw();
  };

  return (
    <div className="card">
      <div className="left">
        <h1>IT time</h1>
        <p>
          IT time에 오신것을 환영합니다. 예비 개발자 분들을 위한 IT time에서
          실력을 키워보세요
        </p>
        <span>Did you forget your password?</span>
        <button onClick={findPw} className="button">
          Find Pw
        </button>
      </div>
      <div className="right">
        <div className="back">
          <a href="">✖</a>
        </div>
        <div>
          <h1 className="top">Find ID</h1>
        </div>
        <div>
          <form className="form">
            <input
              required
              className="input"
              type="email"
              ref={emailRef}
              placeholder="Email을 입력해주세요"
            />
            <input
              maxLength={8}
              className="input"
              onChange={onChangeAuth}
              type="text"
              placeholder="인증번호를 입력해주세요"
            />
            {authError && (
              <div className="invalidInput">
                <p className="error">인증번호가 같지않습니다</p>
              </div>
            )}
            <div className="button">
              <button onClick={sendEmail} className="button">
                인증번호받기
              </button>
              <button className="button" onClick={submit} type="submit">
                아이디 찾기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindId;
