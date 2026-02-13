import React, { useState } from "react";
import { useUserController } from "../controllers/useUserController";
import { useNavigate } from "react-router-dom";

function Join() {
  const { handleChange, handleSignup } = useUserController();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const navigate = useNavigate();

  const submitSignup = async () => {
    // 1. 중복 클릭 방지 (가드 코드)
    if (isLoading) return;

    setIsLoading(true);
    try {
      // 2. 컨트롤러를 통한 가입 로직 수행
      const result = await handleSignup();

      // 3. 가입 성공 시 처리
      if (result) {
        // 이미 Controller/API 단에서 alert("가입 완료")를 띄웠다면 바로 이동
        navigate("/login");
      }
    } catch (error) {
      // 4. View 단에서 별도로 처리할 에러 로직 (예: 특정 필드 초기화)
      console.error("회원가입 페이지 에러:", error);
    } finally {
      // 5. 성공하든 실패하든 로딩 해제
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
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
      <input
        name="userName"
        placeholder="이름"
        onChange={handleChange}
        disabled={isLoading}
      />
      <button onClick={submitSignup} disabled={isLoading}>
        {isLoading ? "가입 처리 중..." : "가입하기"}
      </button>
    </div>
  );
}

export default Join;
