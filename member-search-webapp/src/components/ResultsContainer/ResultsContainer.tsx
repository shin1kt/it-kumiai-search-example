import React from 'react';
import type { SearchResult, Member } from '../../types';
import MemberCard from '../MemberCard/MemberCard';
import './ResultsContainer.css';

interface ResultsContainerProps {
  searchResult: SearchResult | null;
  isLoading: boolean;
  error: string | null;
  query: string;
}

export const ResultsContainer: React.FC<ResultsContainerProps> = ({
  searchResult,
  isLoading,
  error,
  query
}) => {
  // ローディング状態
  if (isLoading) {
    return (
      <div className="results-container">
        <div className="loading-message">
          <p>検索中...</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="results-container">
        <div className="error-message">
          <p>エラーが発生しました: {error}</p>
        </div>
      </div>
    );
  }

  // 検索結果がない場合
  if (!searchResult || searchResult.members.length === 0) {
    return (
      <div className="results-container">
        <div className="no-results-message">
          {query ? (
            <p>「{query}」に一致する組合員が見つかりませんでした</p>
          ) : (
            <p>検索条件に一致する組合員が見つかりませんでした</p>
          )}
        </div>
      </div>
    );
  }

  // 検索結果がある場合
  return (
    <div className="results-container">
      {/* 検索結果統計 */}
      <div className="search-stats">
        <p className="results-count">
          {searchResult.totalCount}件の組合員が見つかりました
        </p>
        <p className="search-time">
          検索時間: {searchResult.searchTime}ms
        </p>
      </div>

      {/* 検索結果一覧 */}
      <div className="member-cards-grid">
        {searchResult.members.map((member: Member) => (
          <MemberCard 
            key={member.id} 
            member={member}
            searchQuery={query}
          />
        ))}
      </div>
    </div>
  );
};