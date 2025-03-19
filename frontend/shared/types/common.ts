export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  [key: string]: any;
}

export interface SearchOptions {
  query: string;
  fields: string[];
}

export interface MetaData {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
} 