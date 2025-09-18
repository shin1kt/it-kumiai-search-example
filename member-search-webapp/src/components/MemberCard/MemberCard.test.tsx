import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MemberCard from './MemberCard';
import { Member } from '../../types';

// テスト用のサンプルデータ
const mockMember: Member = {
  id: 'test_001',
  name: '田中太郎',
  contactUrl: 'https://example.com/tanaka',
  expertiseAreas: ['Webアプリ開発', 'データベース設計', 'クラウド構築']
};

const mockMemberWithoutContact: Member = {
  id: 'test_002',
  name: '佐藤花子',
  expertiseAreas: ['UI/UXデザイン', 'フロントエンド開発']
};

describe('MemberCard', () => {
  it('組合員の基本情報が正しく表示される', () => {
    render(<MemberCard member={mockMember} />);
    
    // 名前が表示されることを確認
    expect(screen.getByText('田中太郎')).toBeInTheDocument();
    
    // 連絡先リンクが表示されることを確認
    const contactLink = screen.getByRole('link', { name: /田中太郎の連絡先を開く/ });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', 'https://example.com/tanaka');
    expect(contactLink).toHaveAttribute('target', '_blank');
    expect(contactLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // 得意分野が表示されることを確認
    expect(screen.getByText('得意分野')).toBeInTheDocument();
    expect(screen.getByText('Webアプリ開発')).toBeInTheDocument();
    expect(screen.getByText('データベース設計')).toBeInTheDocument();
    expect(screen.getByText('クラウド構築')).toBeInTheDocument();
  });

  it('連絡先URLがない場合は連絡先リンクが表示されない', () => {
    render(<MemberCard member={mockMemberWithoutContact} />);
    
    // 名前が表示されることを確認
    expect(screen.getByText('佐藤花子')).toBeInTheDocument();
    
    // 連絡先リンクが表示されないことを確認
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    
    // 得意分野は表示されることを確認
    expect(screen.getByText('UI/UXデザイン')).toBeInTheDocument();
    expect(screen.getByText('フロントエンド開発')).toBeInTheDocument();
  });

  it('検索クエリによるハイライト機能が動作する', () => {
    render(<MemberCard member={mockMember} searchQuery="開発" />);
    
    // ハイライトされたテキストが存在することを確認
    const highlightedElements = screen.getAllByText('開発');
    expect(highlightedElements.length).toBeGreaterThan(0);
    
    // mark要素が作成されていることを確認
    const markElements = document.querySelectorAll('mark.highlight');
    expect(markElements.length).toBeGreaterThan(0);
  });

  it('空の検索クエリの場合はハイライトされない', () => {
    render(<MemberCard member={mockMember} searchQuery="" />);
    
    // mark要素が作成されていないことを確認
    const markElements = document.querySelectorAll('mark.highlight');
    expect(markElements.length).toBe(0);
  });

  it('得意分野が複数ある場合に全て表示される', () => {
    render(<MemberCard member={mockMember} />);
    
    // 全ての得意分野が表示されることを確認
    mockMember.expertiseAreas.forEach(area => {
      expect(screen.getByText(area)).toBeInTheDocument();
    });
  });
});