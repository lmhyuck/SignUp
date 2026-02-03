// src/views/Join.js
import React from "react";
import { useUserController } from "../controllers/useUserController";
import { useNavigate } from "react-router-dom"; // 1. useNavigate 가져오기

function Join() {
  const { handleChange, handleSignup } = useUserController();
  const navigate = useNavigate(); // 2. navigate 함수 생성

  const submitSignup = async () => {
    const result = await handleSignup(); // 컨트롤러에서 가입 처리
    if (result) {
      navigate("/login"); // 3. 성공 시 로그인 페이지로 이동!
    }
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
      <input name="userId" placeholder="아이디" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <input name="userName" placeholder="이름" onChange={handleChange} />
      <button onClick={submitSignup}>가입하기</button>
    </div>
  );
}

export default Join;
