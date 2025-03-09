// src/pages/Apply.js
import React, { useState } from 'react';
import Header from '../components/Header';

function Apply() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 送信処理（ここでは実装しない）
    console.log('送信データ:', formData);
    // フォーム内容をクリア
    setFormData({
      name: '',
      age: '',
      phone: '',
      email: '',
    });
    // 送信完了メッセージを表示
    setMessage('送信が完了しました');
    // 3秒後にメッセージを消す
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
        <Header />
       <h1 style={{ marginBottom: '20px' }}>バイト応募</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="name"
          placeholder="氏名"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="年齢"
          value={formData.age}
          onChange={handleChange}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="電話番号"
          value={formData.phone}
          onChange={handleChange}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '10px', fontSize: '16px' }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#9acd32',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          送信
        </button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default Apply;
