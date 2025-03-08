// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
//ホームの構成要素であるheaderをインポート
import Header from '../components/Header';

function Home() {
  //画面遷移のやつ
  const navigate = useNavigate();
  //画面作成
  return (
    <div>
      {/*headerコンポーネントを挿入→components/Header.jsへ*/}
      <Header />
      {/*ページのメイン部分*/}
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ fontSize: '48px' }}>welcome to skill app !!</h1>
        <p style={{ fontSize: '20px', margin: '20px 0' }}>
          学生の技術力を向上させるためのサイトです。さまざまなリソースやコミュニティ、バイト情報を通じて、プログラミング学習をサポートします。
        </p>
        {/*onClick→leraning/へ遷移（まだ未作成）*/}
        <button 
          onClick={() => navigate('/learning')}
          style={{ padding: '15px 30px', fontSize: '18px' }}
        >
          →まずはプログラミングをやってみよう!
        </button>
      </main>
    </div>
  );
}

export default Home;
