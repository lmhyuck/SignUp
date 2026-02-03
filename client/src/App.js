import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Join from "./views/Join";
import Mypage from "./views/Mypage";
import Login from "./views/Login";
import "./App.css";

// 1. 실제 앱의 로직과 화면을 담은 컴포넌트
function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // 이제 Router 안에서 호출되므로 에러가 나지 않습니다!

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setCurrentUser(null);
      alert("로그아웃 되었습니다.");
      navigate("/"); // 홈으로 이동
    }
  };

  return (
    <div className="App">
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

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-box">
                {currentUser ? (
                  <h2>{currentUser.userName}님, 환영합니다! 😊</h2>
                ) : (
                  <h2>로그인이 필요합니다. 🔒</h2>
                )}
              </div>
            }
          />
          <Route path="/signup" element={<Join />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={setCurrentUser} />}
          />
          <Route
            path="/mypage"
            element={
              <Mypage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// 2. 최상위 App 컴포넌트 (Router로 감싸주는 역할만 수행)
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
