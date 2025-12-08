// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            alert("아이디와 비밀번호를 모두 입력하세요.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });

            // 🔹 로그인 성공 시 userId / username 브라우저에 저장
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("username", res.data.username);

            alert("로그인 성공!");
            // LoginPage.jsx 안에서
// 로그인 성공한 뒤
            localStorage.setItem("userId", res.data.id); // 또는 username 등
            navigate("/main");

        } catch (e) {
            console.error(e);
            alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
            localStorage.removeItem("userId");
            navigate("/login");

        }
    };

    return (
        <div className="auth-container">
            <h2>로그인</h2>
            <div>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
    );
}
