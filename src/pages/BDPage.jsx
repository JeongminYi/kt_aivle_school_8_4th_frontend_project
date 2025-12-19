import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/BDPage.css";
import axios from "axios";

export default function BDPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [item, setItem] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 날짜 포맷 변환 함수
    const formatDate = (dateString) => {
        if (!dateString) return "정보 없음";
        // "2025-12-05T17:03:53.750913" → "2025-12-05 17:03:53"
        return dateString.split('.')[0].replace('T', ' ');
    };

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`$BACKEND_APP_URL/books/${id}`);
                setItem(response.data);
            } catch (err) {
                console.error(err);
                setError(err);
                setItem(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [id]);

    // 로딩 상태
    if (loading) return <div>로딩중...</div>;

    // 에러 또는 데이터 없음
    if (error || item === null) {
        return (
            <div className="detail-wrapper">
                <div className="detail-header">상세 페이지</div>

                <div className="detail-box">
                    <div className="detail-left">
                        작품이미지
                    </div>

                    <div className="detail-right">
                        <h3>제목</h3>
                        <div className="detail-title-line"></div>

                        <h3 style={{marginTop: "20px"}}>내용</h3>
                        <div className="detail-content-box">
                            도서 설명이 들어가는 영역입니다.
                        </div>
                    </div>
                </div>

                <div className="detail-info-footer">
                    <div>등록일: 정보 없음</div>
                    <div>수정일: 정보 없음</div>
                </div>

                <div className="detail-btn-area">
                    <button className="detail-btn edit" disabled>수정</button>
                    <button className="detail-btn delete" disabled>삭제</button>
                    <button className="detail-btn delete" onClick={() => navigate("/")}>취소</button>
                </div>
            </div>
        );
    }

    // 정상 데이터 표시
    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/books/${id}`);
            alert("삭제되었습니다.");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="detail-wrapper">
            <div className="detail-header">상세 페이지</div>

            <div className="detail-box">
                <div className="detail-left">
                    {item.coverImageUrl ? (
                        <img src={item.coverImageUrl} alt="작품 이미지" className="detail-img"/>
                    ) : (
                        "작품이미지"
                    )}
                </div>

                <div className="detail-right">
                    <h3>제목</h3>
                    <div className="detail-title-line">{item.title}</div>

                    <h3 style={{marginTop: "20px"}}>내용</h3>
                    <div className="detail-content-box">
                        {item.description || item.content}
                    </div>
                </div>
            </div>

            {/* 등록일 / 수정일 */}
            <div className="detail-info-footer">
                <div>등록일: {formatDate(item.createdAt)}</div>
                <div>수정일: {formatDate(item.updatedAt)}</div>
            </div>

            {/* 버튼 영역 */}
            <div className="detail-btn-area">
                <button
                    className="detail-btn edit"
                    onClick={() => navigate(`/edit/${item.id || item.bookId}`)}
                >
                    수정
                </button>

                <button className="detail-btn delete" onClick={handleDelete}>
                    삭제
                </button>

                <button className="detail-btn" onClick={() => navigate("/")}>
                    목록
                </button>
            </div>

        </div>
    );
}