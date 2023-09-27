export default interface Board {
  post: {
    id: number;
    title: string;
    article: string;
    user_id: string;
    view: number;
  }
  tags: string[];
  user: {
    id: string;
    nickName: string;
    profile_image: string;
  }
}