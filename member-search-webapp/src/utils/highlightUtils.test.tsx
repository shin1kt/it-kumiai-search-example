import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { highlightText, containsKeyword, findMatchingFields } from './highlightUtils';

describe('highlightUtils', () => {
  describe('highlightText', () => {
    it('空のクエリの場合、元のテキストを返す', () => {
      const result = highlightText('テストテキスト', '');
      expect(result).toBe('テストテキスト');
    });

    it('マッチしないクエリの場合、元のテキストを返す', () => {
      const result = highlightText('テストテキスト', 'マッチしない');
      expect(result).toBe('テストテキスト');
    });

    it('単一キーワードのハイライトが正しく動作する', () => {
      const TestComponent = () => <div>{highlightText('田中太郎', '田中')}</div>;
      render(<TestComponent />);
      
      const highlightedElement = screen.getByText('田中');
      expect(highlightedElement.tagName).toBe('MARK');
      expect(highlightedElement).toHaveClass('highlight');
    });

    it('複数キーワードのハイライトが正しく動作する', () => {
      const TestComponent = () => <div>{highlightText('田中太郎のWebアプリ開発', '田中 Web')}</div>;
      render(<TestComponent />);
      
      const tanaka = screen.getByText('田中');
      const web = screen.getByText('Web');
      
      expect(tanaka.tagName).toBe('MARK');
      expect(web.tagName).toBe('MARK');
      expect(tanaka).toHaveClass('highlight');
      expect(web).toHaveClass('highlight');
    });

    it('大文字小文字を区別しないハイライトが動作する', () => {
      const TestComponent = () => <div>{highlightText('JavaScript開発', 'javascript')}</div>;
      render(<TestComponent />);
      
      const highlighted = screen.getByText('JavaScript');
      expect(highlighted.tagName).toBe('MARK');
      expect(highlighted).toHaveClass('highlight');
    });

    it('特殊文字を含むキーワードが正しくエスケープされる', () => {
      const TestComponent = () => <div>{highlightText('C++プログラミング', 'C++')}</div>;
      render(<TestComponent />);
      
      const highlighted = screen.getByText('C++');
      expect(highlighted.tagName).toBe('MARK');
      expect(highlighted).toHaveClass('highlight');
    });
  });

  describe('containsKeyword', () => {
    it('キーワードが含まれている場合trueを返す', () => {
      expect(containsKeyword('田中太郎', '田中')).toBe(true);
      expect(containsKeyword('JavaScript開発', 'script')).toBe(true);
    });

    it('キーワードが含まれていない場合falseを返す', () => {
      expect(containsKeyword('田中太郎', '佐藤')).toBe(false);
      expect(containsKeyword('JavaScript開発', 'Python')).toBe(false);
    });

    it('空のクエリの場合falseを返す', () => {
      expect(containsKeyword('田中太郎', '')).toBe(false);
      expect(containsKeyword('田中太郎', '   ')).toBe(false);
    });

    it('大文字小文字を区別しない', () => {
      expect(containsKeyword('JavaScript', 'javascript')).toBe(true);
      expect(containsKeyword('javascript', 'JavaScript')).toBe(true);
    });
  });

  describe('findMatchingFields', () => {
    const testFields = {
      name: '田中太郎',
      email: 'tanaka@example.com',
      skills: ['JavaScript', 'React', 'Node.js'],
      description: 'フルスタック開発者'
    };

    it('文字列フィールドでマッチを見つける', () => {
      const result = findMatchingFields(testFields, '田中');
      expect(result).toContain('name');
    });

    it('配列フィールドでマッチを見つける', () => {
      const result = findMatchingFields(testFields, 'React');
      expect(result).toContain('skills');
    });

    it('複数フィールドでマッチを見つける', () => {
      const result = findMatchingFields(testFields, 'JavaScript');
      expect(result).toContain('skills');
    });

    it('マッチしない場合空配列を返す', () => {
      const result = findMatchingFields(testFields, 'Python');
      expect(result).toEqual([]);
    });

    it('空のクエリの場合空配列を返す', () => {
      const result = findMatchingFields(testFields, '');
      expect(result).toEqual([]);
    });
  });
});