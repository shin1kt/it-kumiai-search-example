import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ResultsContainer } from './ResultsContainer';
import type { SearchResult, Member } from '../../types';

// テスト用のサンプルデータ
const mockMembers: Member[] = [
  {
    id: '1',
    name: '田中太郎',
    contactUrl: 'https://example.com/tanaka',
    expertiseAreas: ['Webアプリ開発', 'データベース設計']
  },
  {
    id: '2',
    name: '佐藤花子',
    contactUrl: 'https://example.com/sato',
    expertiseAreas: ['UI/UXデザイン', 'フロントエンド開発']
  }
];

const mockSearchResult: SearchResult = {
  members: mockMembers,
  totalCount: 2,
  searchTime: 150
};

describe('ResultsContainer', () => {
  it('ローディング状態を正しく表示する', () => {
    render(
      <ResultsContainer
        searchResult={null}
        isLoading={true}
        error={null}
        query=""
      />
    );

    expect(screen.getByText('検索中...')).toBeInTheDocument();
  });

  it('エラー状態を正しく表示する', () => {
    const errorMessage = 'データの読み込みに失敗しました';
    render(
      <ResultsContainer
        searchResult={null}
        isLoading={false}
        error={errorMessage}
        query=""
      />
    );

    expect(screen.getByText(`エラーが発生しました: ${errorMessage}`)).toBeInTheDocument();
  });

  it('検索結果がない場合のメッセージを表示する', () => {
    const emptyResult: SearchResult = {
      members: [],
      totalCount: 0,
      searchTime: 50
    };

    render(
      <ResultsContainer
        searchResult={emptyResult}
        isLoading={false}
        error={null}
        query="存在しない検索語"
      />
    );

    expect(screen.getByText('「存在しない検索語」に一致する組合員が見つかりませんでした')).toBeInTheDocument();
  });

  it('検索結果がない場合（クエリなし）のメッセージを表示する', () => {
    const emptyResult: SearchResult = {
      members: [],
      totalCount: 0,
      searchTime: 50
    };

    render(
      <ResultsContainer
        searchResult={emptyResult}
        isLoading={false}
        error={null}
        query=""
      />
    );

    expect(screen.getByText('検索条件に一致する組合員が見つかりませんでした')).toBeInTheDocument();
  });

  it('検索結果を正しく表示する', () => {
    render(
      <ResultsContainer
        searchResult={mockSearchResult}
        isLoading={false}
        error={null}
        query="田中"
      />
    );

    // 検索統計の表示確認
    expect(screen.getByText('2件の組合員が見つかりました')).toBeInTheDocument();
    expect(screen.getByText('検索時間: 150ms')).toBeInTheDocument();

    // 組合員カードの表示確認
    expect(screen.getByText('田中太郎')).toBeInTheDocument();
    expect(screen.getByText('佐藤花子')).toBeInTheDocument();
  });

  it('検索結果数が正しく表示される', () => {
    const singleResult: SearchResult = {
      members: [mockMembers[0]],
      totalCount: 1,
      searchTime: 75
    };

    render(
      <ResultsContainer
        searchResult={singleResult}
        isLoading={false}
        error={null}
        query="田中"
      />
    );

    expect(screen.getByText('1件の組合員が見つかりました')).toBeInTheDocument();
    expect(screen.getByText('検索時間: 75ms')).toBeInTheDocument();
  });

  it('nullの検索結果を適切に処理する', () => {
    render(
      <ResultsContainer
        searchResult={null}
        isLoading={false}
        error={null}
        query=""
      />
    );

    expect(screen.getByText('検索条件に一致する組合員が見つかりませんでした')).toBeInTheDocument();
  });
});