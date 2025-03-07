// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* 各リンク先のダミーページ */}
        <Route path="/profile" element={<div style={{ padding: '20px' }}>マイページ (Profile Page)</div>} />
        <Route path="/learning" element={<div style={{ padding: '20px' }}>プログラミング学習 (Learning Page)</div>} />
        <Route path="/jobs" element={<div style={{ padding: '20px' }}>技術バイト (Jobs Page)</div>} />
        <Route path="/community" element={<div style={{ padding: '20px' }}>コミュニティ (Community Page)</div>} />
        <Route path="/about" element={<div style={{ padding: '20px' }}>このサイトについて (About Page)</div>} />
        <Route path="/job-posting" element={<div style={{ padding: '20px' }}>バイトの募集 (Job Posting Page)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
