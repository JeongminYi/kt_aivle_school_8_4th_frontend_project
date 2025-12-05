import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/NewBookPage.css";

export default function NewBookPage() {

  const navigate = useNavigate(); //취소시 메인페이지

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitbook = () => {
    // 제목 확인
    if (title.trim() === "") {
      alert("제목 입력");
      return;
    }
    //책 정보 입력
    const newbook_load = {
      id: Date.now(),
      title: title,
      content: content,
      img: null
    };
    // 작품 목록 가져오기
    const saved = JSON.parse(localStorage.getItem("items")) || [];

    //데이터 저장
    localStorage.setItem("items", JSON.stringify([...saved, newbook_load]));

    alert("등록 완료!");

    // 메인페이지로 이동
    navigate("/");

  }

  return (
      <div className="register-container">
        {/* 상단 배너 */}
        <div className="register-banner">
          <h2>신규 도서 등록</h2>
          <p>새로운 도서 정보 입력</p>
        </div>

        {/* 본문 */}
        <div className="register-box">
          {/* 이미지 업로드 영역 */}
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
          <button className="cancel-btn"
                  onClick={() => navigate("/")}>
            취소
          </button>


          <button className="submit-btn"
                  onClick={submitbook}>
            등록
          </button>
        </div>
      </div>
  );
}
