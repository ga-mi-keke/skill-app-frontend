// src/pages/SkillPRTab.jsx
import React, { useState, useEffect } from 'react';

function SkillPRTab() {
  const [skills, setSkills] = useState({
    programmingLanguages: '',
    frameworks: '',
    databases: '',
    cloudPlatforms: '',
    devTools: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('スキル情報取得エラー');
        return res.json();
      })
      .then(data => {
        setSkills({
          programmingLanguages: data.programming_languages || '',
          frameworks: data.frameworks || '',
          databases: data.dbs || '',
          cloudPlatforms: data.cloud_platforms || '',
          devTools: data.dev_tools || ''
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkills(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      programming_languages: skills.programmingLanguages,
      frameworks: skills.frameworks,
      dbs: skills.databases,
      cloud_platforms: skills.cloudPlatforms,
      dev_tools: skills.devTools
    };
    fetch('http://localhost:3000/skills', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => setMessage('スキル情報の保存が完了しました'))
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
          <label>プログラミング言語: </label>
          <input type="text" name="programmingLanguages" value={skills.programmingLanguages} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>フレームワーク: </label>
          <input type="text" name="frameworks" value={skills.frameworks} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>データベース: </label>
          <input type="text" name="databases" value={skills.databases} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>クラウドプラットフォーム: </label>
          <input type="text" name="cloudPlatforms" value={skills.cloudPlatforms} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
        </div>
        <div>
          <label>その他開発支援ツール: </label>
          <input type="text" name="devTools" value={skills.devTools} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}/>
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

export default SkillPRTab;
