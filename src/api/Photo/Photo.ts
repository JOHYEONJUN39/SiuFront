import api from "..";
import { DeletePhoto, GetPath, GetPhoto } from "../../types/Photo.interface";

export const GetImage = async (formData: GetPhoto) => {
  const newImg = await api.post('/api/preview', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return newImg;
  
}


  // 업로드되어있는 이미지 aws s3에서 삭제 요청
  export const DeleteImg = async (formData: DeletePhoto) => {
    return await api.post('/api/preview', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  }
  
  export const GetImagePath = async (photo: GetPath) => {
    return await api.post("/api/posts/storeImage", photo, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };