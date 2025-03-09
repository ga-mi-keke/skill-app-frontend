// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
