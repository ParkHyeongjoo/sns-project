import axios from "axios";
import React, { useRef, useState } from "react";

import "./FindPw.scss";

const FindPw = ({ moveId }) => {
  const idRef = useRef();
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
        .post("/findpw", {
          mb_id: idRef.current.value,
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

  const findId = (e) => {
    e.preventDefault();
    moveId();
  };

  return (
    <div className="card">
      <div className="left">
        <div>
          <h1>Find PW</h1>
        </div>
        <div>
          <form>
            <input
              maxLength={16}
              ref={idRef}
              type="text"
              placeholder="아이디를 입력해주세요"
            />
            <input
              required
              type="email"
              ref={emailRef}
              placeholder="Email을 입력해주세요"
            />
            <input
              maxLength={8}
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
              <button onClick={sendEmail}>인증번호 받기</button>
              <button onClick={submit} type="submit">
                비밀번호 찾기
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <div className="back">
          <a href="">✖</a>
        </div>
        <div className="body">
          <div>
            <h1>IT time</h1>
          </div>
          <div>
            <p>
              IT time에 오신것을 환영합니다. 예비 개발자 분들을 위한 IT time에서
              실력을 키워보세요
            </p>
          </div>
          <div>
            <span>Did you forget your ID?</span>
          </div>
          <div>
            <button onClick={findId} type="button">
              Find ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPw;
