const BASE_URL = "http://localhost:8000/api/users";

// 헬퍼 함수: 서버 응답 확인 및 에러 처리 (코드 중복 방지)
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // 서버에서 넘겨준 에러 메시지가 있으면 사용, 없으면 기본 메시지 설정
    throw new Error(data.message || "서버 통신 중 오류가 발생했습니다.");
  }
  return data;
};

export const userApi = {
  // 회원가입 (Create)
  signup: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
      throw error; // 컨트롤러에서 추가 처리가 필요할 수 있으므로 다시 던짐
    }
  },

  // 로그인 (Read)
  login: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await handleResponse(response);
      return result;
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
      throw error;
    }
  },

  // 수정 (Update)
  update: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      alert(`정보 수정 실패: ${error.message}`);
      throw error;
    }
  },

  // 삭제 (Delete)
  delete: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      alert(`탈퇴 실패: ${error.message}`);
      throw error;
    }
  },
};
