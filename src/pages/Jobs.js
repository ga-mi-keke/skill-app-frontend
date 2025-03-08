// src/pages/Jobs.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function Jobs() {
    const [availableTechnologies, setAvailableTechnologies] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    // 使用技術一覧を取得（company_inquiries テーブルの technology1～5 から）
    useEffect(() => {
      fetch('http://localhost:3000/inquiries/technologies')
        .then(res => res.json())
        .then(data => setAvailableTechnologies(data))
        .catch(err => console.error(err));
    }, []);
  
    // 求人一覧取得関数（選択された使用技術でフィルター）
    const fetchJobPostings = () => {
      setLoading(true);
      let url = 'http://localhost:3000/inquiries';
      const params = new URLSearchParams();
      if (selectedTechnologies.length > 0) {
        params.append('technologies', selectedTechnologies.join(','));
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
  
    const handleFilterSubmit = (e) => {
      e.preventDefault();
      fetchJobPostings();
    };
  
    const handleTechChange = (e) => {
      const tech = e.target.value;
      let newSelected = [...selectedTechnologies];
      if (e.target.checked) {
        if (newSelected.length < 5 && !newSelected.includes(tech)) {
          newSelected.push(tech);
        }
      } else {
        newSelected = newSelected.filter(item => item !== tech);
      }
      setSelectedTechnologies(newSelected);
    };
  
    return (
      <div>
        {/*headerコンポーネントを挿入→components/Header.jsへ*/}
        <Header />
        <h2>求人一覧</h2>
        <form onSubmit={handleFilterSubmit} style={{ marginBottom: '20px' }}>
          <div>
            <h4>使用技術で絞り込み (最大5つまで選択)</h4>
            {availableTechnologies.map((tech, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="checkbox"
                    value={tech}
                    onChange={handleTechChange}
                    checked={selectedTechnologies.includes(tech)}
                    disabled={!selectedTechnologies.includes(tech) && selectedTechnologies.length >= 5}
                  />
                  {tech}
                </label>
              </div>
            ))}
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>絞り込み</button>
        </form>
        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : jobPostings.length > 0 ? (
          <ul>
            {jobPostings.map(job => (
              <li key={job.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                <h3>{job.company_name}</h3>
                <p>{job.company_description}</p>
                <p>
                  <strong>使用技術:</strong> {
                    [job.technology1, job.technology2, job.technology3, job.technology4, job.technology5]
                      .filter(t => t && t.trim() !== '')
                      .join(', ')
                  }
                </p>
                <p><small>投稿日時: {new Date(job.created_at).toLocaleString()}</small></p>
                <p><small>Eメール: {job.email}</small></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する求人情報はありません</p>
        )}
      </div>
    );
  }
export default Jobs;
