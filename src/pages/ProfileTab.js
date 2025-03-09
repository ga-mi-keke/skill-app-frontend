// src/pages/ProfileTab.jsx
import React, { useState, useEffect } from 'react';

function ProfileTab() {
  const [profile, setProfile] = useState({
    name: '',
    birth_date: '',
    affiliation: '',
    phone: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('プロフィール情報の取得に失敗しました');
        return res.json();
      })
      .then(data => {
        // birth_date を "yyyy-MM-dd" に変換
        const formattedBirthDate = data.birth_date 
          ? new Date(data.birth_date).toISOString().split('T')[0] 
          : '';
        setProfile({
          ...data,
          birth_date: formattedBirthDate
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      credentials: 'include',
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(data => setMessage('プロフィールの保存が完了しました'))
      .catch(err => console.error(err));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label>名前: </label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>生年月日: </label>
          <input type="date" name="birth_date" value={profile.birth_date} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>所属: </label>
          <input type="text" name="affiliation" value={profile.affiliation} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>電話番号: </label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>メールアドレス: </label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <button type="submit" style={{
          padding: '12px 20px',
          fontSize: '18px',
          backgroundColor: '#9acd32',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>保存</button>
        {message && <p style={{ textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default ProfileTab;
