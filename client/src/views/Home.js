function Home({ currentUser }) {
  return (
    <div className="home-box">
      {/* currentUser가 존재하고 userName이 있을 때만 표시 */}
      {currentUser && currentUser.userName ? (
        <h2>{currentUser.userName}님, 환영합니다! 😊</h2>
      ) : (
        <h2>로그인이 필요합니다. 🔒</h2>
      )}
    </div>
  );
}
export default Home;
