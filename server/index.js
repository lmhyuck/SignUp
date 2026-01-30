const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes"); // Route 불러오기

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// /api/users로 시작하는 모든 요청은 userRoutes에서 처리함
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`${PORT}번 서버 실행중`);
});
