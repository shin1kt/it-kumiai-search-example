import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('組合員名または得意分野で検索...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchInput 
        value="" 
        onChange={mockOnChange} 
        placeholder="カスタムプレースホルダー" 
      />
    );
    
    const input = screen.getByPlaceholderText('カスタムプレースホルダー');
    expect(input).toBeInTheDocument();
  });

  it('displays the current value', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="テスト検索" onChange={mockOnChange} />);
    
    const input = screen.getByDisplayValue('テスト検索');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '新しい値' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('新しい値');
  });

  it('shows clear button when value is not empty', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="テスト" onChange={mockOnChange} />);
    
    const clearButton = screen.getByLabelText('検索をクリア');
    expect(clearButton).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const clearButton = screen.queryByLabelText('検索をクリア');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="テスト" onChange={mockOnChange} />);
    
    const clearButton = screen.getByLabelText('検索をクリア');
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} disabled={true} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('has maxLength attribute set to 100', () => {
    const mockOnChange = vi.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '100');
  });
});