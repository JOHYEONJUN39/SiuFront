export interface Post {
  id: number;
  title: string;
  article: string;
  created_at: Date;
  user_id: string;
  view: number;
  user: User;
  comments: Comment[];
  tags: Tags[];
}

export interface Comment {
  id: number;
  comment: string;
  post_id: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  liked: boolean;
  like_count: number;
}

export interface Tags {
  id: number;
  tag_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  nickname: string;
  profile_image: string;
  created_at: Date;
  updated_at: Date;
}
