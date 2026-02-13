import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. Views (페이지 컴포넌트) 임포트
import Home from "./views/Home";
import Join from "./views/Join";
import Login from "./views/Login";
import Mypage from "./views/Mypage";

// 2. Components (공통 UI 컴포넌트) 임포트
import Navbar from "./components/Navbar";

// 3. CSS 임포트
import "./App.css";

/**
 * App 컴포넌트
 * - 전역 유저 상태(currentUser)를 관리합니다.
 * - 전체 레이아웃 구조를 정의합니다.
 * - 경로(Path)에 따른 컴포넌트 렌더링(Routing)을 담당합니다.
 */
function App() {
  // 전역 유저 상태: 로그인한 유저 정보를 담습니다.
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* 공통 네비게이션 바: 유저 상태와 상태 변경 함수를 전달합니다. */}
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <div className="content">
          <Routes>
            {/* 홈 화면: currentUser 정보에 따라 다른 메시지를 보여줍니다. */}
            <Route path="/" element={<Home currentUser={currentUser} />} />

            {/* 회원가입 화면 */}
            <Route path="/signup" element={<Join />} />

            {/* 로그인 화면: 성공 시 유저 상태를 업데이트하는 함수를 전달합니다. */}
            <Route
              path="/login"
              element={<Login onLoginSuccess={setCurrentUser} />}
            />

            {/* 마이페이지: 유저 정보 조회, 수정, 탈퇴 기능을 제공합니다. */}
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
    </Router>
  );
}

export default App;
