// src/pages/Jobs.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

import { useNavigate } from 'react-router-dom';

function Jobs() {
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  // プルダウン5個分の選択状態（初期は空文字）
  const [dropdownFilters, setDropdownFilters] = useState(['', '', '', '', '']);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // サーバーから使用技術一覧を取得（company_inquiriesテーブルのtechnology1～5から）
  useEffect(() => {
    fetch('http://localhost:3000/inquiries/technologies')
      .then(res => res.json())
      .then(data => setAvailableTechnologies(data))
      .catch(err => console.error(err));
  }, []);

  // 求人一覧取得関数
  const fetchJobPostings = () => {
    setLoading(true);
    let url = 'http://localhost:3000/inquiries';
    const params = new URLSearchParams();
    // 選択された各プルダウンの値（空でないもの）をまとめてクエリパラメータに追加
    const selected = dropdownFilters.filter(val => val !== '');
    if (selected.length > 0) {
      params.append('technologies', selected.join(','));
    }
    if (params.toString()) {
      url += '?' + params.toString();
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setJobPostings(data);
        setLoading(false);
      })
      .catch(err => {
        setError('求人情報の取得に失敗しました');
        setLoading(false);
      });
  };

  // 初回は全求人表示
  useEffect(() => {
    fetchJobPostings();
  }, []);

  // プルダウンの変更処理
  const handleDropdownChange = (index, value) => {
    const newFilters = [...dropdownFilters];
    newFilters[index] = value;
    setDropdownFilters(newFilters);
  };

  // フィルター送信処理
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobPostings();
  };

  // 応募ボタン押下時
  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  return (
    <div>
        <Header />
      {/* ヘッダー部分 */}
      <div style={{ textAlign: 'center', backgroundColor: '#9acd32', color: 'white', padding: '20px 0' }}>
        <h1 style={{ margin: 0, fontSize: '36px' }}>求人一覧</h1>
      </div>
      {/* 背景画像 */}
      <div style={{ textAlign: 'center' }}>
        <img src="/jobs-background.jpg" alt="Jobs Background" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
      </div>

      {/* 絞り込みフォーム */}
      <div style={{ padding: '20px' }}>
  <form
    onSubmit={handleFilterSubmit}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}
  >
    <div
      style={{
        border: '1px solid #ccc',
        padding: '15px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        textAlign: 'center'
      }}
    >
      <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>
        絞り込む技術を選択
      </h4>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {dropdownFilters.map((value, idx) => (
          <select
            key={idx}
            value={value}
            onChange={(e) => handleDropdownChange(idx, e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          >
            <option value="">選択してください</option>
            {availableTechnologies.map((tech, index) => (
              <option key={index} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
    <button
      type="submit"
      style={{
        padding: '8px 16px',
        fontSize: '16px'
      }}
    >
      絞り込み
    </button>
  </form>
</div>

      {/* 求人一覧表示 */}
<div style={{ padding: '20px' }}>
  {loading ? (
    <p>読み込み中...</p>
  ) : error ? (
    <p style={{ color: 'red' }}>{error}</p>
  ) : (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        justifyItems: 'center'
      }}
    >
      {jobPostings.map(job => (
        <div
          key={job.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '380px',
            maxHeight: '1000px',
            overflow: 'auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{job.company_name}</h3>
          <p style={{ fontSize: '14px', marginBottom: '10px' }}>
            {job.company_description}
          </p>
          {/* 下部に使用技術と応募ボタンを配置 */}
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              <strong>使用技術:</strong>{' '}
              {[job.technology1, job.technology2, job.technology3, job.technology4, job.technology5]
                .filter(t => t && t.trim() !== '')
                .join(', ')}
            </p>
            <div>
              <button
                onClick={() => handleApply(job.id)}
                style={{
                  padding: '8px 16px',
                  fontSize: '16px',
                  backgroundColor: '#9acd32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                応募する
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
export default Jobs;
