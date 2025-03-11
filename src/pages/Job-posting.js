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
      <Header />
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 見出し部分：黒文字、下線付き */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '36px',
            color: 'black',
            borderBottom: '2px solid black',
            display: 'inline-block',
            paddingBottom: '5px'
          }}
        >
          企業様へ、バイト掲載のお問合せ
        </h1>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>Eメールアドレス:</label>
          <input
            type="email"
            placeholder="例: example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>企業名:</label>
          <input
            type="text"
            placeholder="例: 株式会社サンプル"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <label style={{ width: '120px', marginTop: '10px' }}>詳細説明:</label>
          <textarea
            placeholder="例: ここに詳細な説明を入力してください。(勤務地, 業務内容, 雇用期間など)"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            required
            style={{ flex: 1, padding: '10px', fontSize: '16px', minHeight: '150px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>使用技術1:</label>
          <input
            type="text"
            placeholder="例: React"
            value={technology1}
            onChange={(e) => setTechnology1(e.target.value)}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>使用技術2:</label>
          <input
            type="text"
            placeholder="例: Node.js"
            value={technology2}
            onChange={(e) => setTechnology2(e.target.value)}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>使用技術3:</label>
          <input
            type="text"
            placeholder="例: MySQL"
            value={technology3}
            onChange={(e) => setTechnology3(e.target.value)}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>使用技術4:</label>
          <input
            type="text"
            placeholder="例: AWS"
            value={technology4}
            onChange={(e) => setTechnology4(e.target.value)}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '120px' }}>使用技術5:</label>
          <input
            type="text"
            placeholder="例: Docker"
            value={technology5}
            onChange={(e) => setTechnology5(e.target.value)}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', fontSize: '16px', marginTop: '10px' }}>
          送信
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', textAlign: 'center' }}>{message}</p>}
    </div>
    </div>
  );
}

export default JobPosting;
