import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//アプリの初期地点てきな。(index.htmlのdiv要素rootに対応してる)
const root = ReactDOM.createRoot(document.getElementById('root'));
//実際にrootにreactの要素をあててる。

root.render(
  //→App.jsを実際にrootにぶちこんでるみたいな感じ
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

