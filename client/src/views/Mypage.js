import React, { useState } from "react";
import { useUserController } from "../controllers/useUserController";
import { useNavigate } from "react-router-dom";

function Mypage({ currentUser, setCurrentUser }) {
  const { formData, handleChange, handleUpdate, handleDelete } =
    useUserController();
  const navigate = useNavigate();

  // 상태 관리: 'menu' (기본), 'edit_auth' (수정 전 비번확인), 'edit_form' (수정창), 'delete_auth' (탈퇴 전 비번확인)
  const [viewMode, setViewMode] = useState("menu");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 1. 비밀번호 확인 로직 (정보수정/회원탈퇴 진입 전)
  const handleVerifyPassword = (targetMode) => {
    // [디버깅용] 값이 어떻게 들어오는지 콘솔에서 확인해보세요!
    console.log("입력한 비번:", confirmPassword);
    console.log("실제 유저 비번:", currentUser?.password);
    if (confirmPassword === currentUser.password) {
      setViewMode(targetMode);
      setConfirmPassword(""); // 확인 후 비번 필드 초기화
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // 2. 정보 수정 완료 처리
  const onUpdateSubmit = async () => {
    // 1. 서버로 보낼 데이터 뭉치 만들기
    const updateData = {
      userId: currentUser.userId, // 누구인지(ID)를 반드시 포함!
      password: formData.password || currentUser.password, // 새 비번 혹은 기존 비번
      userName: formData.userName || currentUser.userName, // 새 이름 혹은 기존 이름
    };

    // 2. 서버에 업데이트 요청
    const result = await handleUpdate(updateData);

    if (result) {
      // 3. 서버 저장 성공 시에만 리액트 상태 업데이트
      setCurrentUser({
        ...currentUser,
        userName: updateData.userName,
        password: updateData.password,
      });
      navigate("/");
    }
  };

  // 3. 회원 탈퇴 완료 처리
  const onDeleteSubmit = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까? 데이터가 모두 삭제됩니다.")) {
      // 1. 서버에 전달할 데이터 구성 (누구를 삭제할지 명시)
      const deleteData = {
        userId: currentUser.userId,
        password: currentUser.password, // 이미 위에서 확인했지만, 보안을 위해 서버로 한 번 더 보냄
      };

      // 2. 컨트롤러를 통해 서버에 삭제 요청 (인자 전달 필수!)
      const result = await handleDelete(deleteData);

      if (result) {
        // 3. 서버 DB 삭제 성공 시 리액트 상태 초기화 및 홈 이동
        setCurrentUser(null);
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      }
    } else {
      setViewMode("menu");
    }
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>

      {/* --- 단계 1: 초기 메뉴 --- */}
      {viewMode === "menu" && (
        <div className="btn-group">
          <button onClick={() => setViewMode("edit_auth")}>정보 수정</button>
          <button onClick={() => setViewMode("delete_auth")}>회원 탈퇴</button>
        </div>
      )}

      {/* --- 단계 2: 본인 확인 (수정/탈퇴 공통) --- */}
      {(viewMode === "edit_auth" || viewMode === "delete_auth") && (
        <div className="auth-box">
          <p>보안을 위해 비밀번호를 입력해주세요.</p>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

      {/* --- 단계 3-1: 정보 수정 양식 --- */}
      {viewMode === "edit_form" && (
        <div className="edit-form">
          <h3>정보 수정</h3>
          <label>새 이름: </label>
          <input
            name="userName"
            placeholder={currentUser.userName}
            onChange={handleChange}
          />
          <br />
          <label>새 비밀번호: </label>
          <input name="password" type="password" onChange={handleChange} />
          <br />
          <button onClick={onUpdateSubmit}>수정 완료</button>
          <button onClick={() => setViewMode("menu")}>취소</button>
        </div>
      )}

      {/* --- 단계 3-2: 탈퇴 최종 확인 --- */}
      {viewMode === "delete_confirm" && (
        <div className="delete-confirm">
          <p className="warn">정말로 계정을 삭제하시겠습니까?</p>
          <button onClick={onDeleteSubmit} className="danger-btn">
            예, 탈퇴합니다
          </button>
          <button onClick={() => setViewMode("menu")}>
            아니오, 취소합니다
          </button>
        </div>
      )}
    </div>
  );
}

export default Mypage;
