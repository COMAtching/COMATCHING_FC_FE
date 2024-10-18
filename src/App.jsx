import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage.jsx";
import CodeSelect from "./pages/CodeSelect.jsx";
import QRReader from "./pages/QRReader.jsx";
import CodeTyping from "./pages/CodeTyping.jsx";
import Register from "./pages/Register.jsx";
import Form from "./pages/Form.jsx";
import UserResult from "./pages/UserResult.jsx";

import Loading from "./pages/Loading.jsx";
import OpenExternalBrowser from "./OpenExternalBrowser.jsx";
import Match from "./pages/Match.jsx";
import MatchResult from "./pages/MatchResult.jsx";
import EditInfo from "./pages/EditInfo.jsx";
import Guide from "./pages/Guide.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Faq from "./pages/Faq.jsx";
import "./App.css";
import "./axiosConfig.jsx";

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/codeselect" element={<CodeSelect />} />
            <Route path="/qr-reader" element={<QRReader />} />
            <Route path="/codetyping" element={<CodeTyping />} />
            <Route path="/register" element={<Register />} />
            <Route path="/form" element={<Form />} />
            <Route path="/userresult" element={<UserResult />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/match" element={<Match />} />
            <Route path="/matchresult" element={<MatchResult />} />
            <Route path="/editinfo" element={<EditInfo />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
