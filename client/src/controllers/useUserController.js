import { useState } from "react";
import { userApi } from "../api/userApi";

export const useUserController = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    userName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 실행
  const handleSignup = async () => {
    const result = await userApi.signup(formData);
    alert(result.message);
    return result;
  };

  const handleLogin = async () => {
    const result = await userApi.login({
      userId: formData.userId,
      password: formData.password,
    });
    alert(result.message);
    return result; // 로그인 성공 여부와 유저 정보를 포함한 결과 리턴
  };

  // 수정 실행
  const handleUpdate = async (data) => {
    // data 인자를 받도록 수정
    const result = await userApi.update(data); // 인자를 api에 전달
    if (result.message) alert(result.message);
    return result;
  };

  // 삭제 실행
  const handleDelete = async (data) => {
    const result = await userApi.delete(data); // api에 데이터 전달
    return result;
  };

  return {
    formData,
    handleChange,
    handleSignup,
    handleLogin,
    handleUpdate,
    handleDelete,
  };
};
