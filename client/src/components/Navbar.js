import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setCurrentUser(null);
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <h1>My Project</h1>
      <div className="nav-links">
        <Link to="/">홈</Link>
        {currentUser ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">회원가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
