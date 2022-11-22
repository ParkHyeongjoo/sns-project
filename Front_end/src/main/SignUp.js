import axios from "axios";
import React, { useRef, useState } from "react";

import "./SignUp.scss";

const SignUp = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const nickRef = useRef();
  const emailRef = useRef();

  const [mb_pw, setMb_pw] = useState("");
  const [auth, setAuth] = useState(false);
  const [checkAuth, setCheckAuth] = useState("");
  const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [ckId, setCkId] = useState(false);
  const [ckNick, setCkNick] = useState(false);
  const [authError, setAuthError] = useState(false);

  const onChangeId = (e) => {
    const userIdRegex = /^[A-Za-z0-9+]{4,12}$/;
    if (!e.target.value || userIdRegex.test(e.target.value))
      setUserIdError(false);
    else setUserIdError(true);
  };
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);
    setMb_pw(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    if (mb_pw === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
  };

  const onChangeNick = (e) => {
    const userNameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,12}$/;
    if (!e.target.value || userNameRegex.test(e.target.value))
      setUserNameError(false);
    else setUserNameError(true);
  };

  const onChangeAuth = (e) => {
    if (checkAuth === e.target.value) {
      setAuthError(false);
      setAuth(true);
    } else {
      setAuthError(true);
    }
  };

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

  const checkId = (e) => {
    e.preventDefault();

    axios
      .post("/idcheck", {
        mb_id: idRef.current.value,
      })
      .then(function (res) {
        alert(res.data);
        if (res.data === "생성가능한 아이디 입니다.") {
          setCkId(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkNick = (e) => {
    e.preventDefault();

    axios
      .post("/nickcheck", {
        mb_nick: nickRef.current.value,
      })
      .then(function (res) {
        alert(res.data);
        if (res.data === "생성가능한 닉네임 입니다.") {
          setCkNick(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !userIdError &&
      !passwordError &&
      !confirmPasswordError &&
      !userNameError &&
      auth &&
      ckId &&
      ckNick
    ) {
      axios
        .post("/signup", {
          mb_id: idRef.current.value,
          mb_pw: pwRef.current.value,
          mb_nick: nickRef.current.value,
          mb_email: emailRef.current.value,
        })
        .then(function (res) {
          if (res.data === "회원가입이 완료되었습니다.") {
            alert(res.data);
            window.location.reload();
          } else {
            alert(res.data);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    } else if (!ckId) {
      alert("아이디 중복 확인 해주세요");
    } else if (!ckNick) {
      alert("닉네임 중복 환인 해주세요");
    } else {
    }
  };

  return (
    <div className="signUpContainer">
      <div className="signUp">
        <form className="form">
          <h1>IT TIME</h1>
          <h4>It's free and only takes a minute</h4>
          <label>아이디</label>
          <input
            maxLength={12}
            className="shortInput"
            ref={idRef}
            onChange={onChangeId}
            type="text"
            placeholder="아이디를 입력해주세요"
          />
          <button onClick={checkId}>중복확인</button>
          {userIdError && (
            <div className="invalidInput">
              <p className="error">아이디는 4~12자입니다.</p>
            </div>
          )}
          <label>비밀번호</label>
          <input
            maxLength={20}
            type="password"
            ref={pwRef}
            onChange={onChangePassword}
            placeholder="비밀번호"
          />
          {passwordError && (
            <div className="invalidInput">
              <p className="error">
                숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!
              </p>
            </div>
          )}
          <label>비밀번호 재확인</label>
          <input
            maxLength={16}
            type="password"
            onChange={onChangePasswordConfirm}
            placeholder="비밀번호확인"
          />
          {confirmPasswordError && (
            <div className="invalid-input">
              <p className="error">비밀번호가 일치하지 않습니다.</p>
            </div>
          )}
          <label>닉네임</label>
          <input
            maxLength={12}
            className="shortInput"
            ref={nickRef}
            onChange={onChangeNick}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <button onClick={checkNick}>중복확인</button>
          {userNameError && (
            <div className="invalid-input">
              <p className="error">2자 ~ 12자 입력해주세요</p>
            </div>
          )}
          <label>본인확인 이메일</label>
          <input
            required
            type="email"
            ref={emailRef}
            placeholder="이메일을 입력해주세요"
          />
          <input
            maxLength={8}
            className="checkInput shortInput"
            onChange={onChangeAuth}
            type="text"
            placeholder="인증번호를 입력해주세요"
          />
          <button onClick={sendEmail}>인증번호받기</button>
          {authError && (
            <div className="invalid-input">
              <p className="error">인증번호가 같지않습니다</p>
            </div>
          )}
          <input onClick={onSubmit} type="submit" value="가입하기" />
        </form>
      </div>
      <p>
        이미 아이디가 있으신가요? <a href="">Login Here</a>
      </p>
    </div>
  );
};

export default SignUp;
