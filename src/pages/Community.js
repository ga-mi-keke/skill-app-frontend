import React from 'react';
import Header from '../components/Header';

function Community() {
  return (
    <div>
    <Header/>
    {/* ヘッダー部分 */}
    <div style={{ textAlign: 'center', backgroundColor: ' #F7D300', color: 'white', padding: '20px 0' }}>
        <h1 style={{ margin: 0, fontSize: '36px' }}>コミュニティ</h1>
      </div>
      {/* 背景画像 */}
      <div style={{ textAlign: 'center' }}>
        <img src="/community.webp" alt="Jobs Background" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
      </div>
    </div>
  );
}

export default Community;
