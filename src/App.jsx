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
import MainpageLogin from "./pages/MainpageLogin.jsx";
import Match from "./pages/Match.jsx";
import MatchResult from "./pages/MatchResult.jsx";
import EditInfo from "./pages/EditInfo.jsx";

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
            <Route path="/CodeSelect" element={<CodeSelect />} />
            <Route path="/qr-reader" element={<QRReader />} />
            <Route path="/CodeTyping" element={<CodeTyping />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/UserResult" element={<UserResult />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/Mainpage" element={<MainpageLogin />} />
            <Route path="/Match" element={<Match />} />
            <Route path="/MatchResult" element={<MatchResult />} />
            <Route path="/EditInfo" element={<EditInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
