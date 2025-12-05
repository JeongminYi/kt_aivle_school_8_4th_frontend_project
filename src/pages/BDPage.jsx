import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/BDPage.css";

export default function BDPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState(undefined);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("items")) || [];
        const found = saved.find((i) => i.id === Number(id));
//      실전투입
//      if (!found) {
//          alert("해당 작품을 찾을 수 없습니다.");
//          navigate("/");
//          return;
//         }
//      테스트
        if (!found) {
            setItem(null);
            return;
        }

        setItem(found);
    }, [id]);

    // 로딩 상태
    if (item === undefined) return <div>로딩중...</div>;

    // 테스트 모드 (item 없음)
    if (item === null) {
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

                        <h3 style={{ marginTop: "20px" }}>내용</h3>
                        <div className="detail-content-box">
                            도서 설명이 들어가는 영역입니다.
                        </div>
                    </div>
                </div>
                {/* 등록일 / 수정일 표시 영역 */}
                {/*<div className="detail-info-footer">*/}
                {/*    <div>등록일: {item.createdAt || "정보 없음"}</div>*/}
                {/*    <div>수정일: {item.updatedAt || "정보 없음"}</div>*/}
                {/*</div>*/}
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
    const handleDelete = () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        const saved = JSON.parse(localStorage.getItem("items")) || [];
        const updated = saved.filter((i) => i.id !== Number(id));
        localStorage.setItem("items", JSON.stringify(updated));

        alert("삭제되었습니다.");
        navigate("/");
    };

    return (
        <div className="detail-wrapper">
            <div className="detail-header">상세 페이지</div>

            <div className="detail-box">
                <div className="detail-left">
                    {item.img ? (
                        <img src={item.img} alt="작품 이미지" />
                    ) : (
                        "작품이미지"
                    )}
                </div>

                <div className="detail-right">
                    <h3>제목</h3>
                    <div className="detail-title-line">{item.title}</div>

                    <h3 style={{ marginTop: "20px" }}>내용</h3>
                    <div className="detail-content-box">{item.content}</div>
                </div>
            </div>

            <div className="detail-btn-area">
                <button className="detail-btn edit" onClick={() => navigate(`/edit/${item.id}`)}>
                    수정
                </button>
                <button className="detail-btn delete" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
}
