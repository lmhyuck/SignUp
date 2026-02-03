const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// DB 연결 설정
let db;
async function getDbConnection() {
  if (!db) {
    db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
    // 테이블이 없으면 생성
    await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId TEXT UNIQUE,
                password TEXT,
                userName TEXT
            )
        `);
  }
  return db;
}

const userModel = {
  // 1. 회원가입 (Create)
  create: async (userData) => {
    const { userId, password, userName } = userData;
    const database = await getDbConnection();
    return await database.run(
      "INSERT INTO users (userId, password, userName) VALUES (?, ?, ?)",
      [userId, password, userName]
    );
  },

  // 2. 사용자 찾기 (Read - 로그인/수정/삭제 시 필요)
  findByUserId: async (userId) => {
    const database = await getDbConnection();
    return await database.get("SELECT * FROM users WHERE userId = ?", [userId]);
  },

  // 3. 회원정보 수정 (Update)
  update: async (userId, updatedData) => {
    const { password, userName } = updatedData;
    const database = await getDbConnection();
    return await database.run(
      "UPDATE users SET password = ?, userName = ? WHERE userId = ?",
      [password, userName, userId]
    );
  },

  // 4. 회원 탈퇴 (Delete)
  delete: async (userId) => {
    const database = await getDbConnection();
    return await database.run("DELETE FROM users WHERE userId = ?", [userId]);
  },
};

module.exports = userModel;
