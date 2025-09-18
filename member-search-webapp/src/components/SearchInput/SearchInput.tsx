import React, { useState } from 'react';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "組合員名または得意分野で検索...",
  disabled = false,
  isLoading = false
}) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // 常に値を更新（表示用）
    onChange(newValue);
    
    // 変換中でない場合のみ検索を実行
    if (!isComposing && onSearch) {
      onSearch(newValue);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // 変換終了時に検索を実行
    const finalValue = event.currentTarget.value;
    if (onSearch) {
      onSearch(finalValue);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-input-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={100}
        />
        {isLoading && (
          <div className="search-loading-indicator" aria-label="検索中">
            <div className="loading-spinner"></div>
          </div>
        )}
        {value && !isLoading && (
          <button
            type="button"
            className="search-clear-button"
            onClick={handleClear}
            disabled={disabled}
            aria-label="検索をクリア"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;