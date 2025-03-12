import React from 'react';
import Header from '../components/Header';

function About() {
  return (
    <div>
    <Header/>
    {/* ヘッダー部分 */}
    <div style={{ textAlign: 'center', backgroundColor: '#808080', color: 'white', padding: '20px 0' }}>
        <h1 style={{ margin: 0, fontSize: '36px' }}>このサイトについて</h1>
      </div>
      {/* 背景画像 */}
      <div style={{ textAlign: 'center' }}>
        <img src="/About.webp" alt="Jobs Background" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />

        <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2><b><u>SKILL APP - 学生のための技術スキルアップ支援サイト</u></b></h2>
      <p><b>SKILL APP</b> は、<b>技術を活かしたい学生とスキルを求める企業・学校をつなぐ</b>プラットフォームです。</p>
      <p>プログラミングやものづくりの技術を活かし、技術バイト・プロジェクト・ハッカソンなどに参加できます。</p>
      <div style={{ padding: '10px' }} />

      <h3><b>・<u>主な機能</u></b></h3>
      <p><b>技術スキルの学習</b> - プログラミング言語やフレームワークの学習コンテンツを提供</p>
      <p><b>技術バイト・プロジェクト案件の検索</b> - 企業や学校が求めるスキルセットから選択</p>
      <p><b>プロジェクトチームマッチング</b> - 学生同士でチームを組み、企業案件やハッカソンに挑戦</p>
      <p><b>技術者コミュニティ</b> - 先輩エンジニア・他学生と技術や知識を共有し、協力し合いながらスキル向上</p>
      <div style={{ padding: '10px' }} />
      
      <h3><b>・<u>こんな人にオススメ!</u></b></h3>
      <p><b>学生</b> - 技術を活かしてバイトをしたい、スキルアップしたい</p>
      <p><b>企業</b> - 学生に業務を依頼し、一緒にプロジェクトを進めたい</p>
      <p><b>学校</b> - 学生にハッカソンや技術系イベントへ積極的に参加してほしい</p>
      <div style={{ padding: '10px' }} />

      <p><b><u>～スキルを価値に～</u></b></p>
      <p><b>SKILL APP</b>であなたのスキルが価値になる場を提供します!</p>
      <div style={{ padding: '30px' }} />
      </div>
      </div>
    </div>
  );
}

export default About;
