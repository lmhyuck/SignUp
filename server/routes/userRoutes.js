const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 1. 회원가입 (Create)
// 주소: POST /api/users/signup
router.post("/signup", userController.signUp);

// 2. 로그인 (Read/Process)
// 주소: POST /api/users/login
router.post("/login", userController.login);
//READ기능이라서 GET방식을 쓰는게 원칙에 맞지만 로그인만큼은 예외로 POST방식을 사용
//GET은 데이터 길이 제한 있지만, POST는 훨씬 자유롭고 복잡한 형식의 데이터 처리가능
//GET은 데이터 정보가 남지만 POST는 BODY에 숨겨서 보내기에 보안상 더 좋다

// 3. 회원정보 수정 (Update)
// 주소: PUT /api/users/update
router.put("/update", userController.updateUser);

// 4. 회원탈퇴 (Delete)
// 주소: DELETE /api/users/delete
router.delete("/delete", userController.deleteUser);

module.exports = router;
