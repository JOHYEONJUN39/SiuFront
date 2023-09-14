import api from "..";

type PostData = {
  user_id: string;
  title: string;
  article: string;
  tags: string[];
}

function replace(url: string) {     
  url= encodeURIComponent(url);    
  return url;
}

export const Post = async (data: PostData) => {
  api.post('/api/createPost', data)
  .then((res) => {
    console.log(res);
  })
}

export const GetBySearch = async (searchQuery: string) => {
  api.get(`/api/search?searchQuery=${searchQuery}`)
  .then((res) => {
    console.log(res);
  })
}

export const GetByTag = async (tag: string) => {
  const searchValue = replace(tag);
  try {
    const response = await api.get(`/api/postTags?tag=${searchValue}`);
    return response.data.posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

