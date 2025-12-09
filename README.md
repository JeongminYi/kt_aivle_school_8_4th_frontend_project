# 📌 KT AIVLE School 8기 4차 미니프로젝트 – Backend

React + Vite 기반의 프론트엔드 프로젝트입니다.  
백엔드(Spring Boot)와 연동되며 REST API 요청 및 UI를 제공합니다.  
백엔드 README   
'https://github.com/nsg716/kt_aivle_school_8_4th_backend_project/blob/master/README.md' 
---

## 👥 Team Structure

**PM**  
- 조유송

**Backend**  
- 나도요  
- 나성곤  
- 정성호  

**Frontend**  
- 이정민  
- 이동규  
- 조유송  

---

## 🛠 Skills

- React  
- Vite  
- Fetch API  
- Axios  
- CSS  
- MUI(Material UI)

---

## 📁 Project Structure
  
    src
    ├─ components
    │ └─ book
    │     ├─ BookCard # 메인 카드 목록 (현재 사용 X)
    │ └─ ui
    │     └─ Test # 서버 연결 상태 테스트용
    │
    ├─ pages
    │ ├─ BDPage # 상세 페이지 (axios, CSS UI)
    │ ├─ MainPage # 메인 페이지 (axios, CSS UI)
    │ ├─ NewBookCoverPage # AI 이미지 생성 (fetch, MUI UI)
    │ ├─ NewBookPage # 새 책 등록 (fetch, MUI UI)
    │ └─ RevisePage # 기존 책 수정 (axios, MUI UI)
    │
    └─ App.jsx # 라우팅 설정


---

## 🚀 Start Guide

1. **백엔드 서버 실행**  
   - Backend Repository:  
     https://github.com/nsg716/kt_aivle_school_8_4th_backend_project  
   - bootWar 빌드 후 실행  
     ```
     java -jar yourServer.war
     ```

2. **프론트엔드 파일 복사**  
   `public`, `src`, `eslint.config.js`, `index.html`,  
   `package.json`, `package-lock.json`, `vite.config.js`  
   → 새 폴더에 복사

3. **의존성 설치 & 빌드**
   
      npm install ->
      npm run build ->
      `npm run preview`



---

## 📌 Project Requirements

### 📍 라우팅(App.jsx)
    ```jsx
    import {Route, Routes} from "react-router-dom";
    import MainPage from "./pages/MainPage";
    ...
    <Routes>
    <Route path="/" element={<MainPage />} />
    ...
    </Routes>


📍 MUI 사용 페이지

NewBookCoverPage.jsx

NewBookPage.jsx

RevisePage.jsx

📍 fetch 사용 페이지

NewBookCoverPage.jsx

NewBookPage.jsx


## 🌐 페이지별 주소

기본 주소: **http://localhost:5173**

| 주소 | 페이지 |
|------|---------|
| `/` | MainPage.jsx |
| `/detail/{bookID}` | BDPage.jsx |
| `/edit/{bookID}` | RevisePage.jsx |
| `/register` | NewBookPage.jsx |
| `/detail/{bookID}/updateCover` | NewBookCoverPage.jsx |


🔧 차후 계획

Backend

  UserDTO 추가

  Login / SignUp API 구현

Frontend
  
  로그인, 회원가입 페이지 생성
  
  메인 화면에 “내 작품 보기” 버튼 추가
  
  본인 작품일 경우에만 수정 버튼 표시
