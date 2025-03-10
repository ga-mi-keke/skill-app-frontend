// src/pages/Login.js
//ログイン画面が開かれた(Login/にアクセスした)ときの処理
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
  //ログイン成功したときにhomeに遷移するためのやつ

  const BackgroundText = () => {
    const navigate = useNavigate();
  //3つの状態変数を定義してる[変数,set関数]
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //ログイン処理の関数
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //serverにログイン情報を送信成功の可否を戻り値としてる。具体的にはデータベースに問い合わせをしている。詳しくはSkill-appのserer.jsを参照
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        setError('ログインに失敗しました');
        return;
      }
      const data = await res.json();
      // JWTトークンをlocalStorageに保存あんまきにしなくていい
      localStorage.setItem('token', data.token);
      //完了したら自動でhomeへ→Home.js
      navigate('/home');
    } catch (err) {
      setError('ログイン中にエラーが発生しました');
    }
  };

    // 背景文字「SKILL APP」のスタイル
    const backgroundTextStyle = {
      position: 'absolute',
      top: '-5%',
      left: '-1%',
      fontSize: '20rem', // 背景文字サイズ
      fontWeight: 'bold',
      color: ' #f0f0f0',
      textAlign: 'center',
      lineHeight: '1', // 行間
      zIndex: -1, // 背景文字を背面に配置
    };
  
    return (
      <div>
        {/* 背景文字「SKILL APP」をdivで分けて表示 */}
        <div style={backgroundTextStyle}>
          <div>SKILL</div>
          <div>APP</div>
        </div>
  
        {/* ログインフォームのレイアウト */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'relative', // フォームを正常に動作させるために必要
            zIndex: 1, // フォームを前面に表示
          }}
        >
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <h2><strong>SKILL APP</strong> Login</h2>
            {/* 入力欄 */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ margin: '10px 0', padding: '8px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: '10px 0', padding: '8px' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Login</button>
            <div style = {{lineHeight: '1', textAlign: 'center'}}>
            <p style={{ marginTop: '10px' }}>
              アカウントをお持ちでない方は 
            </p>
            <p><Link to="/register">こちらから登録</Link></p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  function Login() {
  //画面の部分
  return (
    <BackgroundText />
  );
}

export default Login;
