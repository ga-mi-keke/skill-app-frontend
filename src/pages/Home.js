// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ fontSize: '48px' }}>welcome to skill app !!</h1>
        <p style={{ fontSize: '20px', margin: '20px 0' }}>
          学生の技術力を向上させるためのサイトです。さまざまなリソースやコミュニティ、バイト情報を通じて、プログラミング学習をサポートします。
        </p>
        <button 
          onClick={() => navigate('/learning')}
          style={{ padding: '15px 30px', fontSize: '18px' }}
        >
          →まずはプログラミングをやってみよう!
        </button>
      </main>
    </div>
  );
}

export default Home;
