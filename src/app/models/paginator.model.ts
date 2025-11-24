export interface Paginator<T> {
  current_page: number;
  current_page_url: string;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
