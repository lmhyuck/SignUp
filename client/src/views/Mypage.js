import React, { useState } from "react";
import { useUserController } from "../controllers/useUserController";
import { useNavigate } from "react-router-dom";

function Mypage({ currentUser, setCurrentUser }) {
  const { formData, handleChange, handleUpdate, handleDelete } =
    useUserController();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("menu");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 1. 비밀번호 확인 (단순 로직 분리)
  const handleVerifyPassword = (targetMode) => {
    // 입력값과 실제값 모두 공백 제거 및 문자열화
    const inputPw = String(confirmPassword).trim();
    const userPw = String(currentUser?.password).trim();

    if (userPw && inputPw === userPw) {
      setViewMode(targetMode);
      setConfirmPassword("");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      // 디버깅을 위해 타입을 포함해서 출력해보세요
      console.log(`입력: [${inputPw}] (type: ${typeof inputPw})`);
      console.log(`실제: [${userPw}] (type: ${typeof userPw})`);
    }
  };
  // 2. 정보 수정 제출 (피드백 반영: 로딩 및 예외 처리)
  const onUpdateSubmit = async () => {
    if (isLoading) return;

    const updateData = {
      userId: currentUser.userId,
      password: formData.password || currentUser.password,
      userName: formData.userName || currentUser.userName,
    };

    setIsLoading(true);
    try {
      const result = await handleUpdate(updateData);
      if (result) {
        setCurrentUser({ ...currentUser, ...updateData });
        alert("정보가 수정되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 회원 탈퇴 제출
  const onDeleteSubmit = async () => {
    if (isLoading || !window.confirm("정말 탈퇴하시겠습니까?")) return;

    const deleteData = {
      userId: currentUser.userId,
      password: currentUser.password,
    };

    setIsLoading(true);
    try {
      const result = await handleDelete(deleteData);
      if (result) {
        setCurrentUser(null);
        alert("탈퇴 처리가 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>

      {/* --- 단계 1: 메뉴 --- */}
      {viewMode === "menu" && (
        <div className="btn-group">
          <button onClick={() => setViewMode("edit_auth")}>정보 수정</button>
          <button
            onClick={() => setViewMode("delete_auth")}
            className="danger-btn"
          >
            회원 탈퇴
          </button>
        </div>
      )}

      {/* --- 단계 2: 본인 확인 --- */}
      {(viewMode === "edit_auth" || viewMode === "delete_auth") && (
        <div className="auth-box">
          <p>보안을 위해 비밀번호를 입력해주세요.</p>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={() =>
              handleVerifyPassword(
                viewMode === "edit_auth" ? "edit_form" : "delete_confirm"
              )
            }
          >
            확인
          </button>
          <button onClick={() => setViewMode("menu")}>취소</button>
        </div>
      )}

      {/* --- 단계 3-1: 수정 폼 --- */}
      {viewMode === "edit_form" && (
        <div className="edit-form">
          <h3>정보 수정</h3>
          <input
            name="userName"
            placeholder={`현재 이름: ${currentUser.userName}`}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            name="password"
            type="password"
            placeholder="새 비밀번호 입력"
            onChange={handleChange}
            disabled={isLoading}
          />
          <button onClick={onUpdateSubmit} disabled={isLoading}>
            {isLoading ? "수정 중..." : "수정 완료"}
          </button>
          <button onClick={() => setViewMode("menu")} disabled={isLoading}>
            취소
          </button>
        </div>
      )}

      {/* --- 단계 3-2: 탈퇴 확인 --- */}
      {viewMode === "delete_confirm" && (
        <div className="delete-confirm">
          <p className="warn">⚠️ 계정을 삭제하면 복구할 수 없습니다.</p>
          <button
            onClick={onDeleteSubmit}
            className="danger-btn"
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : "예, 탈퇴합니다"}
          </button>
          <button onClick={() => setViewMode("menu")} disabled={isLoading}>
            취소
          </button>
        </div>
      )}
    </div>
  );
}

export default Mypage;
