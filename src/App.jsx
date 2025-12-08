// src/App.jsx
import { Route, Routes, Navigate } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import RegisterPage from "./pages/NewBookPage.jsx";
import BDPage from "./pages/BDPage.jsx";
import NewBookCoverPage from "./pages/NewBookCoverPage.jsx";
import RevisePage from "./pages/RevisePage.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

/**
 * 🔒 로그인 여부 체크용 컴포넌트
 *  - localStorage 에 userId 가 있으면 통과
 *  - 없으면 /login 으로 리다이렉트
 */
function PrivateRoute({ children }) {
    const userId = localStorage.getItem("userId");
    return userId ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <Routes>
            {/** ⭐ 첫 진입은 무조건 로그인 페이지로 */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/** 🔵 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />

            {/** 🟣 회원가입 페이지 */}
            <Route path="/signup" element={<SignupPage />} />

            {/** 🔐 아래부터는 로그인해야만 접근 가능 */}

            {/** 메인 페이지 (원래 "/"였던 거 → 이제 /main 으로 이동) */}
            <Route
                path="/main"
                element={
                    <PrivateRoute>
                        <MainPage />
                    </PrivateRoute>
                }
            />

            {/** 등록 페이지 */}
            <Route
                path="/register"
                element={
                    <PrivateRoute>
                        <RegisterPage />
                    </PrivateRoute>
                }
            />

            {/** 상세 페이지 */}
            <Route
                path="/detail/:id"
                element={
                    <PrivateRoute>
                        <BDPage />
                    </PrivateRoute>
                }
            />

            {/** 표지 수정 페이지 */}
            <Route
                path="/detail/:id/updateCover"
                element={
                    <PrivateRoute>
                        <NewBookCoverPage />
                    </PrivateRoute>
                }
            />

            {/** 도서 정보 수정 페이지 */}
            <Route
                path="/edit/:id"
                element={
                    <PrivateRoute>
                        <RevisePage />
                    </PrivateRoute>
                }
            />

            {/** 정의 안 된 경로는 전부 로그인으로 보냄 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;
