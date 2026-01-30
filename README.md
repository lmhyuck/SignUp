# 🔐 SignUpProject: Full-Stack User Management
> **회원가입, 로그인, 마이페이지(수정/탈퇴) 기능을 제공하는 풀스택 프로젝트입니다.**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

---

## 📌 주요 기능 (Features)
본 프로젝트는 사용자 정보에 대한 **CRUD(Create, Read, Update, Delete)** 기능을 완벽하게 구현했습니다.

* **회원가입 (Create)**: 사용자 정보를 입력받아 SQLite DB에 안전하게 저장합니다.
* **로그인 (Read)**: DB의 유저 정보를 조회하여 인증을 수행하며, 로그인 시 홈 화면에 사용자 이름을 표시합니다.
* **정보 수정 (Update)**: 마이페이지에서 비밀번호 확인 후 이름과 비밀번호를 변경합니다.
* **회원 탈퇴 (Delete)**: DB에서 사용자 데이터를 완전히 삭제하고 초기 화면으로 리다이렉트합니다.

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 | 상세 내용 |
| :--- | :--- | :--- |
| **Frontend** | React | Functional Components, Hooks, React-Router-Dom |
| **Backend** | Node.js | Express framework, RESTful API |
| **Database** | SQLite3 | 가볍고 빠른 파일 기반 관계형 데이터베이스 |
| **Communication** | Axios / Fetch | **Port 8000**을 통한 클라이언트-서버 통신 |

---

## 📂 프로젝트 구조 (Architecture)


```text
SignUpProject/
├── client/ (React)
│   ├── src/
│   │   ├── controllers/  # 비즈니스 로직 (Hooks)
│   │   ├── views/        # UI 컴포넌트
│   │   └── api/          # 서버 통신 (Fetch/Axios)
└── server/ (Node.js)
    ├── controllers/      # API 요청 처리
    ├── models/           # DB 쿼리 실행
    └── database.db       # SQLite 데이터 파일
