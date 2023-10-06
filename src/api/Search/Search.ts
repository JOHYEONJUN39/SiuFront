import axios from "axios";

function replace(url: string) {
  url = encodeURIComponent(url);
  return url;
}

export const GetBySearch = async (searchQuery: string) => {
  const res = await axios.get(`/api/posts/search/${searchQuery}`);
  return res.data;
};

export const GetByTag = async (tag: string) => {
  const searchValue = replace(tag);
  const res = await axios.get(`/api/postTags?tag=${searchValue}`);
  return res.data;
};

export const GetTagList = async (value: string) => {
  const searchValue = replace(value);
  try {
    const response = await axios.get(`/api/posts/search/tag/${searchValue}`);
    return response.data.tags;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
