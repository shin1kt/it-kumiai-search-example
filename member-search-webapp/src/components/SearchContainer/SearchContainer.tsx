import React, { useState, useEffect } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import type { SearchFilters } from '../../types';
import './SearchContainer.css';

interface SearchContainerProps {
  onSearch?: (filters: SearchFilters) => void;
  onRealtimeSearch?: (filters: SearchFilters) => void;
  isLoading?: boolean;
  currentQuery?: string;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  onSearch,
  onRealtimeSearch,
  isLoading = false,
  currentQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(currentQuery);

  // currentQueryが外部から変更された場合に同期
  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = (value: string) => {
    // 検索フィルターを作成
    const filters: SearchFilters = {
      query: value,
      expertiseFilter: '' // 後で得意分野フィルターを実装する際に使用
    };

    // リアルタイム検索を実行（デバウンスあり）
    if (onRealtimeSearch) {
      onRealtimeSearch(filters);
    } else if (onSearch) {
      // フォールバック: 通常の検索
      onSearch(filters);
    }
  };

  return (
    <div className="search-container">
      <div className="search-container-inner">
        <h2 className="search-title">組合員を検索</h2>
        <p className="search-description">
          名前または得意分野で組合員を検索できます
        </p>
        
        <div className="search-input-section">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            disabled={isLoading}
            isLoading={isLoading}
            placeholder="組合員名または得意分野で検索..."
          />
        </div>
        
        {isLoading && (
          <div className="search-loading">
            <span className="loading-text">検索中...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;