import api from "..";

type PostData = {
  user_id: string;
  title: string;
  article: string;
  tags: string[];
}

export const Post = async (data: PostData) => {
  return await api.post('/api/createPost', data)
}

export const GetBoard = async (id: number) => {
  const res = await api.get(`/api/posts/${id}`)
  return res.data
}

