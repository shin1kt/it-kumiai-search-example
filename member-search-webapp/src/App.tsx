import './App.css'

function App() {
  return (
    <div className="app">
      {/* ヘッダー */}
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <h1 className="app-title">長岡アイティ事業協同組合</h1>
            <p className="app-subtitle">会員検索システム</p>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="app-main">
        <div className="container">
          {/* 検索コンテナ（後で実装） */}
          <div className="search-section">
            <p className="placeholder-text">検索機能は後で実装されます</p>
          </div>

          {/* 結果コンテナ（後で実装） */}
          <div className="results-section">
            <p className="placeholder-text">検索結果は後で実装されます</p>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © 2024 長岡アイティ事業協同組合. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
