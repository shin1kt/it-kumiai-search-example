/**
 * アプリケーション定数
 */

// 検索設定
export const SEARCH_CONFIG = {
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_DELAY: 300,
  MAX_SEARCH_TIME: 2000, // 2秒以内の要件
} as const;

// Fuse.js 検索設定
export const FUSE_CONFIG = {
  keys: [
    { name: "name", weight: 0.6 },
    { name: "expertiseAreas", weight: 0.4 },
  ],
  threshold: 0.3,
  distance: 100,
  includeScore: true,
  includeMatches: true,
} as const;

// UI設定
export const UI_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  RESULTS_PER_PAGE: 20,
} as const;

// メッセージ
export const MESSAGES = {
  NO_RESULTS: "検索結果がありません",
  LOADING: "検索中...",
  ERROR_LOADING_DATA: "データの読み込みに失敗しました",
  ERROR_SEARCH: "検索でエラーが発生しました",
} as const;
