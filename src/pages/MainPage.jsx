import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/MainPage.css";
import axios from "axios";

export default function MainPage() {

  const navigate = useNavigate();

    const getItems = async(idx,limit) =>{
        const items = await axios.get('/api/books',{params:{limit:limit,pageIdx:idx}})
        console.log(items);
        return items;
    }
    const items = getItems();
  //한페이지에 보여줄수 있는 아이템 개수
  const itemsPerPage = 3;

  //현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);

  //전체 페이지 수 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);

  //현재 페이지에 맞게 아이템 자르기
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = items.slice(indexFirst, indexLast);

  return (
      <div className="container">
        {/* 페이지 배너 */}
        <div className="banner">
          <h2>페이지 배너</h2>
          <button
              className="register-btn"
              onClick={() => navigate("/register")}
          >
            등록
          </button>
        </div>

        {/* 카드 리스트 */}
        <div className="card-row">
          {currentItems.map(item => (
              <div className="card" key={item.id}>
                <img src={item.img} alt="작품이미지" className="card-img"/>
                <div className="title">{item.title}</div>
              </div>
          ))}
        </div>
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
      </div>
  );
}
