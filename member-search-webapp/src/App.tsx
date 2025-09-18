import { useState, useEffect } from 'react';
import { SearchContainer, ResultsContainer } from './components';
import type { SearchFilters, Member } from './types';
import { useSearch } from './hooks';
import { loadMemberData } from './data';
import './App.css'

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    searchState,
    performSearch,
    performRealtimeSearch,
    isSearching,
    hasError,
    hasResults,
    isEmpty
  } = useSearch(members);

  // 組合員データを読み込む
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const memberData = await loadMemberData();
        setMembers(memberData);
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    performSearch(filters);
  };

  const handleRealtimeSearch = (filters: SearchFilters) => {
    performRealtimeSearch(filters);
  };

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
        {/* 検索コンテナ */}
        <SearchContainer 
          onSearch={handleSearch}
          onRealtimeSearch={handleRealtimeSearch}
          isLoading={isSearching}
          currentQuery={searchState.filters.query}
        />

        <div className="container">
          {/* 結果コンテナ */}
          <ResultsContainer
            searchResult={searchState.results}
            isLoading={isLoading || isSearching}
            error={searchState.error}
            query={searchState.filters.query}
          />
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
