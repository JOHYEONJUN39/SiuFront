export interface GetPhoto {
  id: string;
  profile_image: File;
}

export interface DeletePhoto {
  id: string;
  _method: string;
  profile_image: string;
}