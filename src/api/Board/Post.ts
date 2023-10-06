import api from "..";
import { EditWritePost, WritePost } from "../../types/Write.interface";

export const Post = async (data: WritePost) => {
  return await api.post("/api/createPost", data);
};

export const GetPost = async (id: number) => {
  const res = await api.get(`/api/posts/${id}`);
  return res.data;
};

export const EditPost = async (data: EditWritePost, id: number) => {
  return await api.patch(`/api/posts/update/${id}`, data);
};

export const DeletePost = async (id: number) => {
  return await api.delete(`/api/posts/${id}`);
};
