// src/pages/Register.js
//　→register/のとき登録画面
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  //ログイン成功したときに最初の画面に遷移するためのやつ
  const navigate = useNavigate();
  //状態変数管理[変数,set関数]
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
//登録処理の関数
  const handleRegister = async (e) => {
    e.preventDefault();

    // パスワードの一致確認
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      //サーバーのデータベースに情報を登録
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        setError("ユーザー登録に失敗しました");
        return;
      }

      setSuccess("ユーザー登録に成功しました。ログインしてください。");
      // 数秒後にログイン画面へ遷移
      setTimeout(() => {
        //最初の画面（ログイン画面へ遷移）
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("登録中にエラーが発生しました");
    }
  };
  //画面の部分
  return (
    //レイアウト
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , background: ' #f0f0f0'}}>
      {/*登録フォームのレイアウト onSubmit(フォームの送信を検知してhandleRegisterを実行)で上の登録処理の関数につながる*/}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2>ユーザー登録</h2>
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '8px' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
         {/*formの送信ボタン*/}
        <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
}

export default Register;
