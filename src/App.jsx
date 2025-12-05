import { Routes, Route } from "react-router-dom";
import MainPage from "./assets/page/mainpage.jsx";
//import RegisterPage from "./assets/page/RegisterPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            {/*<Route path="/register" element={<RegisterPage />} />*/}
        </Routes>
    );
}

export default App;
