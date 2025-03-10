// src/pages/Learning.js
import React from 'react';
import Header from '../components/Header';

function Learning() {
  return (
    <div>
        <Header />
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      {/* 見出し */}
      <h2
        style={{
          fontSize: '32px',
          borderBottom: '2px solid blue',
          display: 'inline-block',
          paddingBottom: '10px',
          marginBottom: '40px'
        }}
      >
        プログラミング学習
      </h2>

      {/* カード（ボタン）を配置するコンテナ */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '30px'
        }}
      >
        {/* 1つ目のカード：web開発 */}
        <div
          style={{
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'left',
            backgroundColor: 'white'
          }}
          onClick={() => alert('Web開発コースへ進みます')}
        >
          <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: 'blue' }}>
            web開発にチャレンジしてみよう！
          </h3>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#333' }}>
            Webアプリケーションの基礎から学びます。
          </p>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
            HTML / CSS / JavaScript
          </p>
        </div>

        {/* 2つ目のカード：python */}
        <div
          style={{
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'left',
            backgroundColor: 'white'
          }}
          onClick={() => alert('Pythonコースへ進みます')}
        >
          <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: 'blue' }}>
            pythonにチャレンジしてみよう
          </h3>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#333' }}>
            データ分析やAI開発にも活かせる人気言語です。
          </p>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
            Python
          </p>
        </div>

        {/* 3つ目のカード：競技プログラミング */}
        <div
          style={{
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'left',
            backgroundColor: 'white'
          }}
          onClick={() => alert('競技プログラミングコースへ進みます')}
        >
          <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: 'blue' }}>
            競技プログラミングにチャレンジしてみよう
          </h3>
          <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#333' }}>
            アルゴリズムとデータ構造を駆使して問題を解決します。
          </p>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
            C++ / Python / Java
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Learning;
