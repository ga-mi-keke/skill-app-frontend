// src/components/Header.js
//Home画面の構成要素のひとつ
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    //レイアウト
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/*各ページへのリンクをヘッダーにおいてる*/}
        {/*ロゴ画像は適当に今はreactのデフォを挿入（なんかいいのあったら差し替えといて）→public/logo.png */}
        <Link to="/home" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="SKILL APP" style={{ width: '40px', marginRight: '5px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>SKILL APP</span>
        </Link>
        <Link to="/profile">マイページ</Link>
        <Link to="/learning">プログラミング学習</Link>
        <Link to="/jobs">技術バイト</Link>
        <Link to="/community">コミュニティ</Link>
        <Link to="/about">このサイトについて</Link>
      </div>
      <div>
        <Link to="/job-posting">バイトの募集はこちらから</Link>
      </div>
    </header>
  );
}

export default Header;
