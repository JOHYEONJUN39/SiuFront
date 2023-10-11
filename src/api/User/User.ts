import api from "..";
import { Delete, Update } from "../../types/UpdateUser.interface";

export const UpdateProfile = async (formData: Update) => {
  return await api.post('/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
}

export const DeleteUser = async (formData: Delete) => {
  return await api.post('/api/user', formData);
}