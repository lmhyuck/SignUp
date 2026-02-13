const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 8000;

// 1. CORS 보안 설정 (특정 주소만 허용)
const corsOptions = {
  origin: "http://localhost:3000", // 리액트 앱 주소만 허용
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// 2. 요청 로깅 (디버깅용 - 선택사항)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. API 라우트 연결
app.use("/api/users", userRoutes);

// 4. 404 Not Found 처리 (잘못된 경로 대응)
app.use((req, res) => {
  res.status(404).json({ message: "존재하지 않는 API 경로입니다." });
});

// 5. 전역 에러 핸들러 (1번 피드백 반영: 서버 예외 처리)
app.use((err, req, res, next) => {
  console.error("서버 내부 오류 발생:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "서버 내부에서 오류가 발생했습니다.",
  });
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 보안 서버가 가동 중입니다. 🚀`);
});
