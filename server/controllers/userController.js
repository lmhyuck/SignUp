const userModel = require("../models/userModel");

const userController = {
  // 1. 회원가입 (Create)
  signUp: async (req, res) => {
    try {
      const { userId, password, userName } = req.body;
      await userModel.create({ userId, password, userName });
      res.status(201).json({ message: "회원가입이 완료되었습니다!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "가입 중 오류 발생", error: error.message });
    }
  },

  // 2. 로그인 (Read)
  login: async (req, res) => {
    try {
      const { userId, password } = req.body;
      const user = await userModel.findByUserId(userId);

      if (user && user.password === password) {
        // 기존에 password를 제외하던 구조({ password, ...userInfo })를 삭제하고
        // user 객체 전체(userId, password, userName 포함)를 보냅니다.
        res.status(200).json({
          message: `${user.userName}님, 반갑습니다!`,
          user: user, // 여기서 비밀번호가 포함되어 리액트로 전달됩니다.
        });
      } else {
        res.status(401).json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
      }
    } catch (error) {
      res.status(500).json({ message: "로그인 중 오류 발생" });
    }
  },

  // 3. 회원정보 수정 (Update)
  updateUser: async (req, res) => {
    try {
      const { userId, password, userName } = req.body;
      console.log("수정 요청 ID:", userId); // 서버 터미널에 ID가 찍히는지 확인!

      const user = await userModel.findByUserId(userId);
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      await userModel.update(userId, { password, userName });
      res.status(200).json({ message: "정보가 성공적으로 수정되었습니다." });
    } catch (error) {
      res.status(500).json({ message: "정보 수정 중 오류 발생" });
    }
  },
  // 4. 회원 탈퇴 (Delete)
  deleteUser: async (req, res) => {
    try {
      const { userId, password } = req.body;
      console.log("탈퇴 요청 ID:", userId); // 서버 터미널에서 ID가 잘 찍히는지 확인!

      const user = await userModel.findByUserId(userId);
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      // 비밀번호가 일치하는지 최종 확인
      if (user.password !== password) {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      // DB에서 해당 유저 삭제 실행
      await userModel.delete(userId);
      res.status(200).json({ message: "회원 탈퇴 완료" });
    } catch (error) {
      res.status(500).json({ message: "탈퇴 처리 중 오류 발생" });
    }
  },
};

module.exports = userController;
