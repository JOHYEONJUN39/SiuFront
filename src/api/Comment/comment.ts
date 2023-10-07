import api from "..";
import {
  DeleteComment,
  EditWriteComment,
  WriteComment,
} from "../../types/Write.interface";

export const postComment = async (comment: WriteComment) => {
  return await api.post("/api/comment/createComment", comment);
};

export const getComment = async (id: number) => {
  return await api.get(`/api/comment/${id}`);
};

export const editComment = async (editComment: EditWriteComment) => {
  return await api.patch(`/api/comment/update`, editComment);
};

export const deleteComment = async (deleteComment: DeleteComment) => {
  return await api.delete(`/api/comment/delete`, { data: deleteComment });
};
