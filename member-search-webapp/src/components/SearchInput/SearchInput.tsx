import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "組合員名または得意分野で検索...",
  disabled = false,
  isLoading = false
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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