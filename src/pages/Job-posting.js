// src/pages/Job-Posting.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function JobPosting() {
  // フォーム入力用の状態管理
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [technology1, setTechnology1] = useState('');
  const [technology2, setTechnology2] = useState('');
  const [technology3, setTechnology3] = useState('');
  const [technology4, setTechnology4] = useState('');
  const [technology5, setTechnology5] = useState('');
  const [message, setMessage] = useState('');

  // 求人投稿フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 必須項目チェック
    if (!email || !companyName || !companyDescription) {
      setMessage("Eメールアドレス、企業名、企業内容説明は必須です");
      return;
    }
    //サーバーに投稿
    try {
      const res = await fetch('http://localhost:3000/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company_name: companyName,
          company_description: companyDescription,
          technology1: technology1 || null,
          technology2: technology2 || null,
          technology3: technology3 || null,
          technology4: technology4 || null,
          technology5: technology5 || null,
        }),
      });
      if (!res.ok) {
        setMessage("問い合わせの送信に失敗しました");
        return;
      }
      setMessage("問い合わせが送信されました");
      // フォーム内容をクリア
      setEmail('');
      setCompanyName('');
      setCompanyDescription('');
      setTechnology1('');
      setTechnology2('');
      setTechnology3('');
      setTechnology4('');
      setTechnology5('');
    } catch (error) {
      console.error(error);
      setMessage("問い合わせ送信中にエラーが発生しました");
    }
  };
  //画面作成
  return (
    <div>
    {/*headerコンポーネントを挿入→components/Header.jsへ*/}
      <Header />
      <div style={{ textAlign: 'center', backgroundColor: '#9acd32', color: 'white', padding: '20px 0' }}>
          <h1 style={{ margin: 0, fontSize: '36px' }}>企業様へ、バイトのお問合せ</h1>
        </div>
      {/*登録フォームのレイアウト onSubmit(フォームの送信を検知してhandleSubmitを実行)で上投稿処理の関数につながる*/}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input 
          type="email" 
          placeholder="Eメールアドレス" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="text" 
          placeholder="企業名" 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea 
          placeholder="企業内容説明" 
          value={companyDescription} 
          onChange={(e) => setCompanyDescription(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '16px', minHeight: '100px' }}
        />
        <input 
          type="text" 
          placeholder="使用技術1 (任意)" 
          value={technology1} 
          onChange={(e) => setTechnology1(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="text" 
          placeholder="使用技術2 (任意)" 
          value={technology2} 
          onChange={(e) => setTechnology2(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="text" 
          placeholder="使用技術3 (任意)" 
          value={technology3} 
          onChange={(e) => setTechnology3(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="text" 
          placeholder="使用技術4 (任意)" 
          value={technology4} 
          onChange={(e) => setTechnology4(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="text" 
          placeholder="使用技術5 (任意)" 
          value={technology5} 
          onChange={(e) => setTechnology5(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', marginTop: '10px' }}>送信</button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default JobPosting;
