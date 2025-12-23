import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/MainPage.css";
import axios from "axios";

export default function MainPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        // 1) 백엔드 데이터
        const response = await axios.get("api/books");
        const serverItems = response.data;

        // 2) localStorage 데이터

        setItems(serverItems);

      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }
  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  // 한 페이지당 3개
  const itemsPerPage = 3;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = items.slice(indexFirst, indexLast);

  return (
      <div className="container">
        {/* 페이지 배너 */}
        <div className="banner">
          <h2>페이지 배너</h2>
          <button className="register-btn"
                  onClick={() => navigate("/register")}>
            등록
          </button>
        </div>

        {/* 카드 리스트 */}
        <div className="card-row">
          {currentItems.length < 1 ? (
              <div className="card">
                <div>등록된 작품이 없습니다.</div>
                <button
                    className="register-btn"
                    onClick={() => navigate("/register")}
                >
                  작품 등록하기
                </button>
              </div>
          ) : (
              currentItems.map(item => (
                  <div
                      className="card"
                      key={item.id || item.bookId}
                      onClick={() => navigate(
                          `/detail/${item.id || item.bookId}`)}
                      style={{cursor: "pointer"}}
                  >
                    <img
                        src={item.img || item.coverImageUrl}
                        alt="이미지"
                        className="card-img"
                    />
                    <div className="title">{item.title}</div>
                  </div>
              ))
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          {Array.from({length: totalPages}, (_, i) => (
              <span
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active-page" : ""}
              >
                        {i + 1}
                    </span>
          ))}
        </div>
          <div>version0.0.1</div>
      </div>
  );
}
