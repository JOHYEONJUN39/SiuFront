import axios from "axios";

function replace(url: string) {     
  url= encodeURIComponent(url);    
  return url;
}

export const GetBySearch = async (searchQuery: string) => {
  axios.get(`/api/search?searchQuery=${searchQuery}`)
  .then((res) => {
    console.log(res);
  })
}

export const GetByTag = async (tag: string) => {
  const searchValue = replace(tag);
  try {
    const response = await axios.get(`/api/postTags?tag=${searchValue}`);
    return response.data.posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetTagList = async (value: string) => {
  const searchValue = replace(value);
  try {
    const response = await axios.get(`/api/posts/search/tag/${searchValue}`);
    return response.data[0].posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}