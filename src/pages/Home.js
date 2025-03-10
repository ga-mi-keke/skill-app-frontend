// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//headerをインポート
import Header from '../components/Header';

const BackgroundText = () => {
  // 背景文字「SKILL APP」のスタイル
  const backgroundTextStyle = {
    position: 'absolute',
    top: '-5%',
    left: '-1%',
    //transform: 'translate(-50%, -50%)',
    fontSize: '20rem', // 背景文字サイズ
    fontWeight: 'bold',
    //background: '#d0d0d0', // 背景文字の背景色
    color: ' #ffffff',
    textAlign: 'center',
    zIndex: 1, // 背景に配置
    lineHeight: '1', // 行間
  };

  // メインコンテンツ「スキルを価値に」のスタイル
  const contentStyle = {
    left: '-10%',
    position: 'relative',
    zIndex: 1, // メインコンテンツを前面に
    textAlign: 'center',
    color: '#333', // メインコンテンツの文字色
    fontSize: '12rem', // メインコンテンツの文字サイズ
  };

  // 背景のコンテナのスタイル
  const containerStyle = {
    position: 'relative',
    height: '100vh', // 背景文字が画面全体に表示されるように
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(-90deg, #ffffff, #f0f0f0)',
  };

  const containerBox = {
    position: 'absolute',
    top: '5%', // 上からの距離
    right: '4%', // 右からの距離
    display: 'flex',
    flexDirection: 'column', // 縦並びにする
    gap: '3vh', // ボックス間の間隔
  };
  
  const boxStyle = {
    width: '20vw',
    height: '25vh',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    border: '2px solid #bfbfbf',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    lineHeight: '1',
  };

  return (
    <div style={containerStyle}>
      {/* 背景文字「SKILL APP」をdivで分けて表示 */}
      <div style={backgroundTextStyle}>
        <div>SKILL</div>
        <div>APP</div>
      </div>
      <div style={contentStyle}>
        <div><strong>スキル</strong>を</div>
        <div><strong>価値</strong>に。</div>
      </div>
      <div style={containerBox}>
      <div style={boxStyle}>
        <h3><strong><u>1.プログラミング学習</u></strong></h3>
        <p>初心者から上級者まで、実践的に学べる教材が豊富です。</p>
        <Link to="/learning" style={{ textDecoration: 'none', color: 'black' }}>
          <button style={{ backgroundColor: '#4ec8ff', color: 'white', borderRadius: '6px', border: 'none' }}>詳しく見る</button>
        </Link>
      </div>
      <div style={boxStyle}>
        <h3><strong><u>2.技術バイトの紹介</u></strong></h3>
        <p>技術バイトで経験を積み、スキルアップを目指しましょう。</p>
        <Link to="/jobs" style={{ textDecoration: 'none', color: 'black' }}>
          <button style={{ backgroundColor: '#4ec8ff', color: 'white', borderRadius: '6px', border: 'none' }}>詳しく見る</button>
        </Link>
      </div>
      <div style={boxStyle}>
        <h3><strong><u>3.技術者コミュニティ</u></strong></h3>
        <p>技術者同士で情報交換し、知識やネットワークを広げましょう。</p>
        <Link to="/community" style={{ textDecoration: 'none', color: 'black' }}>
          <button style={{ backgroundColor: '#4ec8ff', color: 'white', borderRadius: '6px', border: 'none', }}>詳しく見る</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

function Home() {
  //画面遷移のやつ
  const navigate = useNavigate();
  
  return (
    <div>
      {/* headerコンポーネントを挿入 → components/Header.jsへ */}
      <Header />
      {/* BackgroundTextコンポーネントを表示 */}
      <BackgroundText />
      </div>
  );
}

export default Home;
