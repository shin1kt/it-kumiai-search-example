import { useState, useEffect, useMemo, useCallback } from "react";
import type { Member, SearchFilters, SearchState } from "../types";
import { SearchService } from "../services";
import { useDebounce } from "./useDebounce";

export const useSearch = (members: Member[]) => {
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    error: null,
    filters: {
      query: "",
      expertiseFilter: "",
    },
    results: null,
  });

  // リアルタイム検索用の内部状態
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
    query: "",
    expertiseFilter: "",
  });

  // デバウンスされた検索フィルター（300ms遅延）
  const debouncedFilters = useDebounce(currentFilters, 300);

  // SearchService のインスタンスをメモ化
  const searchService = useMemo(() => {
    return new SearchService(members);
  }, [members]);

  // 検索を実行する内部関数
  const executeSearch = useCallback(
    (filters: SearchFilters) => {
      setSearchState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        filters,
      }));

      try {
        const results = searchService.search(
          filters.query,
          filters.expertiseFilter
        );

        setSearchState((prev) => ({
          ...prev,
          isLoading: false,
          results,
        }));
      } catch (error) {
        setSearchState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "検索中にエラーが発生しました",
        }));
      }
    },
    [searchService]
  );

  // 即座に検索を実行する関数（デバウンスなし）
  const performSearch = useCallback(
    (filters: SearchFilters) => {
      setCurrentFilters(filters);
      executeSearch(filters);
    },
    [executeSearch]
  );

  // リアルタイム検索用の関数（デバウンスあり）
  const performRealtimeSearch = useCallback(
    (filters: SearchFilters) => {
      setCurrentFilters(filters);
      // ローディング状態を即座に更新（UX向上のため）
      if (
        filters.query !== searchState.filters.query ||
        filters.expertiseFilter !== searchState.filters.expertiseFilter
      ) {
        setSearchState((prev) => ({
          ...prev,
          isLoading: true,
          filters,
        }));
      }
    },
    [searchState.filters]
  );

  // デバウンスされたフィルターが変更されたら検索を実行
  useEffect(() => {
    if (members.length > 0) {
      executeSearch(debouncedFilters);
    }
  }, [debouncedFilters, members.length, executeSearch]);

  // 初期表示時に全ての組合員を表示
  useEffect(() => {
    if (members.length > 0 && !searchState.results) {
      const initialResults = searchService.getAllMembers();
      setSearchState((prev) => ({
        ...prev,
        results: initialResults,
      }));
    }
  }, [members, searchService, searchState.results]);

  // 得意分野の一覧を取得
  const expertiseAreas = useMemo(() => {
    return searchService.getAllExpertiseAreas();
  }, [searchService]);

  // ハイライト付き検索結果を取得
  const getHighlightedResults = (query: string) => {
    return searchService.searchWithHighlights(query);
  };

  return {
    searchState,
    performSearch,
    performRealtimeSearch,
    expertiseAreas,
    getHighlightedResults,
    // 便利なヘルパー関数
    isSearching: searchState.isLoading,
    hasError: !!searchState.error,
    hasResults: !!searchState.results && searchState.results.members.length > 0,
    isEmpty: !!searchState.results && searchState.results.members.length === 0,
  };
};
