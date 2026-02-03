// src/views/Login.js
import React from "react";
import { useUserController } from "../controllers/useUserController";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const { handleChange, handleLogin } = useUserController();
  const navigate = useNavigate();

  const submitLogin = async () => {
    const result = await handleLogin();

    // 서버 응답이 성공(예: success: true)일 때
    if (result && result.user) {
      onLoginSuccess(result.user); // App.js 유저 상태 업데이트
      navigate("/"); // 3. 성공 시 홈 화면으로 이동!
    }
  };

  return (
    <div className="form-container">
      <h2>로그인</h2>
      <input name="userId" placeholder="아이디" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <button onClick={submitLogin}>로그인</button>
    </div>
  );
}

export default Login;
