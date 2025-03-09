// src/pages/MyPage.js
import React, { useState } from 'react';
import ProfileTab from './ProfileTab';
import SkillPRTab from './SkillPRTab';
import Header from '../components/Header';

function MyPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    borderBottom: '2px solid transparent'
  };

  const activeTabStyle = {
    ...tabStyle,
    color: 'blue',
    borderBottom: '2px solid blue'
  };

  return (
    <div>
        <Header/>
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh'}}>
      <div style={{maxWidth: '800px', margin: '0 auto' }}>
        {/* タブナビゲーション */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={activeTab === 'profile' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('profile')}>
            プロフィール
          </div>
          <div style={activeTab === 'skills' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('skills')}>
            スキルPR
          </div>
        </div>
        {/* タブの見出し（現在のタブの名称を大きく表示、下線付き） */}
        <h2 style={{ textAlign: 'left', borderBottom: '2px solid blue', marginBottom: '30px' }}>
          {activeTab === 'profile' ? 'プロフィール' : 'スキルPR'}
        </h2>
        {/* コンテンツ */}
        {activeTab === 'profile' ? <ProfileTab /> : <SkillPRTab />}
      </div>
    </div>
    </div>
  );
}

export default MyPage;
