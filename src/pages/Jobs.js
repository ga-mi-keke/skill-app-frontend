// src/pages/Jobs.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Jobs() {
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  // ドロップダウンのフィルター（5個）
  const [dropdownFilters, setDropdownFilters] = useState(['', '', '', '', '']);
  const [jobPostings, setJobPostings] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendedError, setRecommendedError] = useState('');
  const navigate = useNavigate();

  // サーバーから使用技術一覧を取得（company_inquiriesテーブルのtechnology1～5から）
  useEffect(() => {
    fetch('http://localhost:3000/inquiries/technologies')
      .then(res => res.json())
      .then(data => setAvailableTechnologies(data))
      .catch(err => console.error(err));
  }, []);

  // 推奨求人取得：ユーザーのスキル情報からフィルター用のスキルリストを作成
  useEffect(() => {
    setRecommendedLoading(true);
    // まず、GET /skills でログインユーザーのスキル情報を取得
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
        // 取得した各項目（snake_case）をカンマ区切りの文字列としてまとめ、さらに分割してフラットなリストにする
        const fields = [
          data.programming_languages,
          data.frameworks,
          data.dbs,
          data.cloud_platforms,
          data.dev_tools
        ].filter(item => item);
        const skillsList = fields
          .flatMap(item => item.split(','))
          .map(s => s.trim())
          .filter(s => s.length > 0);
        const uniqueSkills = [...new Set(skillsList)];
        if (uniqueSkills.length > 0) {
          const query = uniqueSkills.join(',');
          fetch('http://localhost:3000/inquiries?technologies=' + encodeURIComponent(query))
            .then(res => res.json())
            .then(data => {
              setRecommendedJobs(data);
              setRecommendedLoading(false);
            })
            .catch(err => {
              console.error(err);
              setRecommendedError('おすすめ求人の取得に失敗しました');
              setRecommendedLoading(false);
            });
        } else {
          setRecommendedJobs([]);
          setRecommendedLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setRecommendedError('スキル情報の取得に失敗しました');
        setRecommendedLoading(false);
      });
  }, []);

  // 求人一覧取得関数（フィルター適用）
  const fetchJobPostings = () => {
    setLoading(true);
    let url = 'http://localhost:3000/inquiries';
    const params = new URLSearchParams();
    // ドロップダウンのフィルターで選択された技術（空でないもの）をまとめる
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

  // プルダウン変更処理
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
    navigate('/apply');
  };

  return (
    <div>
      <Header />
      {/* ヘッダー部分 */}
      <div style={{ textAlign: 'center', backgroundColor: '#9acd32', color: 'white', padding: '20px 0' }}>
        <h1 style={{ margin: 0, fontSize: '36px' }}>技術バイト</h1>
      </div>
      {/* 背景画像 */}
      <div style={{ textAlign: 'center' }}>
        <img src="/jobs-background.jpg" alt="Jobs Background" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
      </div>
      {/* あなたへのおすすめ求人 */}
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'left', borderBottom: '2px solid blue', paddingBottom: '10px', marginBottom: '20px' }}>
          あなたへのおすすめ求人
        </h2>
        {recommendedLoading ? (
          <p>おすすめ求人を読み込み中...</p>
        ) : recommendedError ? (
          <p style={{ color: 'red' }}>{recommendedError}</p>
        ) : recommendedJobs.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '50px',
              justifyItems: 'start',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {recommendedJobs.map(job => (
              <div
                key={job.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '380px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '20px',
                  width: '300px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{job.company_name}</h3>
                <p style={{ fontSize: '14px', marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
                  {job.company_description}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <p style={{ fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
                    <strong>使用技術:</strong>{' '}
                    {[job.technology1, job.technology2, job.technology3, job.technology4, job.technology5]
                      .filter(t => t && t.trim() !== '')
                      .join(', ')}
                  </p>
                  <div style={{ textAlign: 'center' }}>
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
        ) : (
          <p>おすすめ求人はありません</p>
        )}
      </div>
      {/* 求人一覧の見出し */}
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'left', borderBottom: '2px solid blue', paddingBottom: '10px', marginBottom: '20px' }}>
          求人一覧
        </h2>
        {/* 絞り込みフォーム */}
        <form onSubmit={handleFilterSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '1000px',
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
              marginTop: '20px',
              padding: '8px 16px',
              fontSize: '16px'
            }}
          >
            絞り込み
          </button>
        </form>
        {/* 求人一覧表示 */}
        
          {loading ? (
            <p style={{ textAlign: 'left' }}>読み込み中...</p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'left' }}>{error}</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '50px',
                justifyItems: 'start',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {jobPostings.map(job => (
                <div
                  key={job.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '380px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    width: '300px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{job.company_name}</h3>
                  <p style={{ fontSize: '14px', marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
                    {job.company_description}
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <p style={{ fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
                      <strong>使用技術:</strong>{' '}
                      {[job.technology1, job.technology2, job.technology3, job.technology4, job.technology5]
                        .filter(t => t && t.trim() !== '')
                        .join(', ')}
                    </p>
                    <div style={{ textAlign: 'center' }}>
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