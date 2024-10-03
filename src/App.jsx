// import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage.jsx";
import Hobbyform from "./pages/Hobbyform.jsx";
import Matchresult from "./pages/Matchresult.jsx";
import Checkresult from "./pages/Checkresult.jsx";
import Loading from "./pages/Loading.jsx";
import Guide from "./pages/Guide.jsx";
import CodeReader from "./pages/CodeReader.jsx";
import QRGenerator from "./pages/QRGenerator.jsx";
import Redirection from "./pages/RedirectionPage.jsx";
import OpenExternalBrowser from "./OpenExternalBrowser.jsx";
import Userinfo from "./pages/User_info_page.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Describe from "./pages/Describe.jsx";
import "./App.css";
import "./axiosConfig.jsx";
import Matching from "./pages/Matching.jsx";
import Adminpageunlogin from "./pages/Adminpage_unlogin.jsx";
import Heart from "./pages/Heart.jsx";
import AdminRequestList from "./components/AdminRequestList.jsx";
import Charge from "./pages/Charge.jsx";
export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/hobby" element={<Hobbyform />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/match-result" element={<Matchresult />} />
            <Route path="/check-result" element={<Checkresult />} />

            <Route path="/adminpage" element={<Adminpageunlogin />} />
            <Route
              path="/adminpage/charge-requests"
              element={<AdminRequestList />}
            />

            <Route path="/loading" element={<Loading />} />
            <Route path="/code-reader" element={<CodeReader />} />
            <Route path="/QR-generator" element={<QRGenerator />} />
            {/* <Route path="/profile-builder" element={<ProfileBuilder />} /> */}
            <Route path="/redirection" element={<Redirection />} />
            <Route path="/userinfo" element={<Userinfo />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/describe" element={<Describe />} />
            <Route path="/charge" element={<Charge />} />
            <Route path="/heart" element={<Heart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
