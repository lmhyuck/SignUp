import React, { useState } from "react";
import { useUserController } from "../controllers/useUserController";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const { handleChange, handleLogin } = useUserController();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const submitLogin = async () => {
    setIsLoading(true);
    try {
      const result = await handleLogin(); // 여기서 result는 { success: true, user: { ... } } 형태일 것임

      if (result && result.user) {
        onLoginSuccess(result.user); // App.js의 setCurrentUser 실행
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>로그인</h2>
      <input
        name="userId"
        placeholder="아이디"
        onChange={handleChange}
        disabled={isLoading} // 로딩 중 입력 방지
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
        disabled={isLoading}
      />
      <button
        onClick={submitLogin}
        disabled={isLoading}
        className={isLoading ? "loading-btn" : ""}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </div>
  );
}

export default Login;
