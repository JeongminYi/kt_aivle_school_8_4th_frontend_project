import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/NewBookPage.css";
import axios from "axios"; // 🔹 axios import 추가

export default function NewBookPage() {

    const navigate = useNavigate(); // 취소 시 메인으로 이동

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 🔹 등록 버튼 클릭 시 수행할 함수
    const submitbook = async () => {
        // 1. 제목 유효성 검사
        if (title.trim() === "") {
            alert("제목 입력");
            return;
        }

        // 2. 백엔드로 보낼 데이터 (DTO 느낌)
        //    👉 백엔드에서 사용하는 필드명에 맞춰야 함!
        const requestBody = {
            title: title,
            content: content,
            // 예시: 백엔드에서 coverImageUrl 같은 필드를 쓴다면
            // coverImageUrl: null
        };

        try {
            // 3. axios.post로 서버에 전송
            const response = await axios.post(
                "http://localhost:8080/api/books", // 🔹 백엔드 엔드포인트
                JSON.stringify(requestBody),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);
            alert("등록 완료!");

            // 4. 메인 페이지로 이동
            navigate("/");

        } catch (error) {
            console.error("등록 중 오류:", error);
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="register-container">
            {/* 상단 배너 */}
            <div className="register-banner">
                <h2>신규 도서 등록</h2>
                <p>새로운 도서 정보 입력</p>
            </div>

            {/* 본문 */}
            <div className="register-box">
                {/* 이미지 업로드 영역 (나중에 파일 업로드 붙일 자리) */}
                <div className="image-area">
                    작품이미지
                </div>

                {/* 입력 영역 */}
                <div className="input-area">
                    <label className="label">도서 제목</label>
                    <input
                        type="text"
                        className="input-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="label">도서 설명</label>
                    <textarea
                        className="input-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="btn-area">
                <button
                    className="cancel-btn"
                    onClick={() => navigate("/")}
                >
                    취소
                </button>

                <button
                    className="submit-btn"
                    onClick={submitbook} // 🔹 axios.post 호출하는 함수 연결
                >
                    등록
                </button>
            </div>
        </div>
    );
}
