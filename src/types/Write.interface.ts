export interface WritePost {
  title: string;
  article: string;
  user_id: string;
  tags: string[];
}

export interface EditWritePost {
  title: string;
  article: string;
  tags: string[];
}

export interface WriteComment {
  comment: string;
  post_id: number;
  user_id: string;
}

export interface EditWriteComment {
  comment_id: number;
  comment: string;
}

export interface DeleteComment {
  comment_id: number;
}
