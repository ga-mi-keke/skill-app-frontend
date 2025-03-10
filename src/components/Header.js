// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // 表示したいリンクを配列で定義
  const navLinks = [
    { to: '/profile', label: 'マイページ' },
    { to: '/learning', label: 'プログラミング学習' },
    { to: '/jobs', label: '技術バイト' },
    { to: '/community', label: 'コミュニティ' },
    { to: '/about', label: 'このサイトについて' }
  ];

  // 共通スタイル：visited 色を打ち消し、下線を消すために CSS を使用
  const styleTag = `
    .nav-link {
      color: black;
      text-decoration: none;
      padding: 10px;
    }
    .nav-link:visited {
      color: black;
    }
    .nav-link:hover {
      text-decoration: none;
    }
  `;

  // リンクの基本スタイル（上下の境界線なし、縦線で仕切る）
  // border: none にしておき、個別に borderLeft/borderRight を指定する
  const baseLinkStyle = {
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer',
    // boxShadowなどでボタン風にしたければ追加
    // boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc'
    }}>
      {/* 疑似クラス (:visited) を上書きするための style タグ */}
      <style>{styleTag}</style>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* ロゴ部分 */}
        <Link
          to="/home"
          style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            marginRight: '10px'
          }}
        >
          <img src="/logo.png" alt="SKILL APP" style={{ width: '40px', marginRight: '5px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>SKILL APP</span>
        </Link>

        {/* リンク群 */}
        <div style={{ display: 'flex' }}>
          {navLinks.map((item, index) => {
            // 最初と最後のリンクにも縦線を入れたい場合、
            // 全てのリンクに borderLeft を入れ、
            // さらに最後のリンクに borderRight を追加するなどの方針をとる
            const isFirst = index === 0;
            const isLast = index === navLinks.length - 1;

            const linkStyle = { ...baseLinkStyle };
            // 全てのリンクの左側に縦線
            linkStyle.borderLeft = '1px solid #ccc';
            // 最初のリンクにも縦線を入れるかどうかで挙動が変わる
            // 「最初にも入れて」との要望なのでそのまま

            // 最後のリンクにも右側の縦線を入れる
            if (isLast) {
              linkStyle.borderRight = '1px solid #ccc';
            }

            return (
              <Link
                key={index}
                to={item.to}
                className="nav-link"
                style={linkStyle}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 右側：バイト募集リンクにも縦線を入れる例 */}
      <div>
        <Link
          to="/job-posting"
          className="nav-link"
          style={{
            ...baseLinkStyle,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc'
          }}
        >
          バイトの募集はこちらから
        </Link>
      </div>
    </header>
  );
}

export default Header;
