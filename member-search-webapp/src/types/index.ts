/**
 * 組合員データの型定義
 */
export interface Member {
  id: string;
  name: string;
  contactUrl?: string;
  expertiseAreas: string[];
}

/**
 * 検索フィルターの型定義
 */
export interface SearchFilters {
  query: string;
  expertiseFilter: string;
}

/**
 * 検索結果の型定義
 */
export interface SearchResult {
  members: Member[];
  totalCount: number;
  searchTime: number;
}

/**
 * 検索状態の型定義
 */
export interface SearchState {
  isLoading: boolean;
  error: string | null;
  filters: SearchFilters;
  results: SearchResult | null;
}
