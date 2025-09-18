import type { Member, SearchFilters } from "./index";

/**
 * MemberCard コンポーネントのプロパティ
 */
export interface MemberCardProps {
  member: Member;
  searchQuery?: string;
}

/**
 * SearchInput コンポーネントのプロパティ
 */
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * ExpertiseFilter コンポーネントのプロパティ
 */
export interface ExpertiseFilterProps {
  selectedExpertise: string;
  availableExpertise: string[];
  onChange: (expertise: string) => void;
  disabled?: boolean;
}

/**
 * ResultsContainer コンポーネントのプロパティ
 */
export interface ResultsContainerProps {
  members: Member[];
  isLoading: boolean;
  searchQuery: string;
  totalCount: number;
  searchTime: number;
}

/**
 * SearchContainer コンポーネントのプロパティ
 */
export interface SearchContainerProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableExpertise: string[];
  isLoading: boolean;
}
