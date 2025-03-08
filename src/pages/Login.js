// src/pages/Login.js
//ログイン画面が開かれた(Login/にアクセスした)ときの処理
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login() {
  //ログイン成功したときにhomeに遷移するためのやつ
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
  //画面の部分
  return (
    //画面のレイアウト
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/*ログインフォームのレイアウト onSubmit(フォームの送信を検知してhandleLoginを実行)で上のログイン処理の関数につながる*/}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2>Login</h2>
        {/*入力欄*/}
        {/*入力イベントeを検知するとsetUsernameが実行され最初に定義した状態変数に都度格納*/}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
        {/*上とほぼおなじ*/}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/*formの送信ボタン*/}
        <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Login</button>
        {/*ユーザー登録画面への遷移のリンク →Register.js*/}
        <p style={{ marginTop: '10px' }}>
        アカウントをお持ちでない方は <Link to="/register">こちらから登録</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
