interface Pivot {
  post_id: number;
  tag_id: number;
}

interface Tag {
  created_at: string;
  id: number;
  pivot: Pivot;
  tag_name: string;
  updated_at: string;
}

export interface Post {
  article: string;
  id: number;
  title: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  user_id: string;
  view: number; 
}

export interface PaginationData {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url?: string | null;
  to: number;
  total: number;
}