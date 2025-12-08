import React, { useState } from "react";
import "../styles/NewBookPage.css";

export default function RevisePage() {

    const [title, setTitle] = useState("기존 제목이 여기에 표시됩니다");
    const [content, setContent] = useState("기존 내용이 여기에 표시됩니다");

    return (
        <div className="register-container">

            {/* 상단 배너 */}
            <div className="register-banner">
                <h2>도서 정보 수정</h2>
                <p>내용을 변경하고 저장하세요</p>
            </div>

            {/* 본문 박스 */}
            <div className="register-box">

                {/* 이미지 영역 */}
                <div className="image-area">
                    이미지 영역 (추후 업로드 기능 추가)
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

                    <label className="label" style={{ marginTop: "20px" }}>
                        도서 설명
                    </label>
                    <textarea
                        className="input-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

            </div>

            {/* 버튼 영역 */}
            <div className="btn-area">
                <button className="cancel-btn">취소</button>
                <button className="submit-btn">수정 완료</button>
            </div>

        </div>
    );
}
