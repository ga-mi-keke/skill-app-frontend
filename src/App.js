// src/App.js
//reactを統括してる大元
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//各種ページをインポート
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import JobPosting from './pages/Job-posting';
import Jobs from './pages/Jobs';
import Apply from './pages/Apply';
import About from './pages/About';
import MyPage from './pages/MyPage';
import Learning from './pages/Learning';
import Community from './pages/Community';
//ページ遷移の処理を書いてる関数
function App() {
  return (
    <Router>
      <Routes>
        {/*遷移先が作られている場合はインポートしたやつを使ってる*/}
        <Route path="/" element={<Login />} />{/*　/　→　Login/　つまり最初はLoginを開くよってこと */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-posting" element={<JobPosting />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<MyPage />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;
