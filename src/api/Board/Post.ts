import api from "..";

type PostData = {
  user_id: string;
  title: string;
  article: string;
  tags: string[];
}

export const Post = async (data: PostData) => {
  api.post('/api/createPost', data)
  .then((res) => {
    console.log(res);
  })
}


