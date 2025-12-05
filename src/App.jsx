import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import RegisterPage from "./pages/NewBookPage.jsx";
import BDPage from "./pages/BDPage.jsx";

function App() {
  return (
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage/>}/>
        {/* 등록 페이지 */}
        <Route path="/register" element={<RegisterPage/>}/>
        {/* 상세 페이지 */}
        <Route path="/detail/:id" element={<BDPage/>}/>
      </Routes>
  );
}

export default App;
