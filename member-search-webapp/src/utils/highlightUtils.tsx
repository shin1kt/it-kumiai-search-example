import React from 'react';

/**
 * テキスト内の検索キーワードをハイライト表示する関数
 * 複数キーワードに対応し、特殊文字も適切にエスケープする
 */
export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) {
    return text;
  }

  // 複数のキーワードをスペースで分割
  const keywords = query.trim().split(/\s+/).filter(keyword => keyword.length > 0);
  
  if (keywords.length === 0) {
    return text;
  }

  // 各キーワードの特殊文字をエスケープ
  const escapedKeywords = keywords.map(keyword => 
    keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  // 全てのキーワードを OR で結合した正規表現を作成
  const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // いずれかのキーワードにマッチするかチェック
    const matchedKeywordIndex = keywords.findIndex(keyword => 
      part.toLowerCase() === keyword.toLowerCase()
    );

    if (matchedKeywordIndex !== -1) {
      // 複数キーワードの場合、異なるスタイルを適用
      const highlightClass = getHighlightClass(matchedKeywordIndex);
      
      return (
        <mark key={index} className={highlightClass}>
          {part}
        </mark>
      );
    }
    return part;
  });
};

/**
 * キーワードのインデックスに基づいてハイライトクラスを決定
 */
const getHighlightClass = (keywordIndex: number): string => {
  const classes = ['highlight', 'highlight secondary', 'highlight tertiary'];
  return classes[keywordIndex % classes.length];
};

/**
 * 検索キーワードが含まれているかチェックする関数
 */
export const containsKeyword = (text: string, query: string): boolean => {
  if (!query.trim()) {
    return false;
  }

  const keywords = query.trim().split(/\s+/).filter(keyword => keyword.length > 0);
  return keywords.some(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
};

/**
 * 複数のテキストフィールドから検索キーワードにマッチするものを見つける
 */
export const findMatchingFields = (
  fields: { [key: string]: string | string[] },
  query: string
): string[] => {
  if (!query.trim()) {
    return [];
  }

  const matchingFields: string[] = [];

  Object.entries(fields).forEach(([fieldName, fieldValue]) => {
    if (Array.isArray(fieldValue)) {
      // 配列の場合、いずれかの要素がマッチするかチェック
      const hasMatch = fieldValue.some(value => containsKeyword(value, query));
      if (hasMatch) {
        matchingFields.push(fieldName);
      }
    } else {
      // 文字列の場合、直接チェック
      if (containsKeyword(fieldValue, query)) {
        matchingFields.push(fieldName);
      }
    }
  });

  return matchingFields;
};