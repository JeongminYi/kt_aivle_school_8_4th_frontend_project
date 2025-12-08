// src/pages/SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username.trim() || !password.trim()) {
            alert("아이디와 비밀번호를 모두 입력하세요.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/auth/signup", {
                username,
                password,
            });

            alert("회원가입 완료! 로그인 해 주세요.");
            console.log("signup response:", res.data);
            navigate("/login");
        } catch (e) {
            console.error(e);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="auth-container">
            <h2>회원가입</h2>
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
            <button onClick={handleSignup}>회원가입</button>
            <button onClick={() => navigate("/login")}>로그인 페이지로</button>
        </div>
    );
}
