import React, { useState, useEffect } from 'react';
import { SearchContainer, MemberCard } from './components';
import { SearchFilters, Member } from './types';
import { useSearch } from './hooks';
import { loadMembers } from './data';
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
        const memberData = await loadMembers();
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
          <div className="results-section">
            {isLoading && (
              <p className="placeholder-text">データを読み込み中...</p>
            )}
            
            {hasError && (
              <p className="placeholder-text">
                エラーが発生しました: {searchState.error}
              </p>
            )}
            
            {!isLoading && !hasError && isEmpty && (
              <p className="placeholder-text">
                検索条件に一致する組合員が見つかりませんでした
              </p>
            )}
            
            {!isLoading && !hasError && hasResults && (
              <>
                <div className="search-stats">
                  <p>
                    {searchState.results?.totalCount}件の組合員が見つかりました
                    （検索時間: {searchState.results?.searchTime}ms）
                  </p>
                </div>
                <div className="member-cards-container">
                  {searchState.results?.members.map(member => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </>
            )}
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
