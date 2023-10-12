
import { useEffect, useState } from "react";
import styled from "styled-components";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { GetPostUserId } from "../../api/Board/Post";

type Post = {
  article: string;
  id: number;
  title: string;
  tag_name: [key: string];
  created_at: string;
  updated_at: string;
  user_id: string;
  view: number;
};


const ProfilePostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const userData = useSelector((state: RootState) => state.user);

    useEffect(() => {
      GetPostUserId(userData.id)
      .then(response => {
        console.log(response);
        setPosts(response.data.data.reverse());
      })
    }
    , [])
    
  return (
    <Container>
      <ProfileChangeCon>

        {posts.map((post) => (
          <PostCon key={post.id}>
            <PostImg src="https://i.ytimg.com/vi/ac6d5rCJj5w/maxresdefault.jpg" />
            <PostTitle>{post.title}</PostTitle>
            <Post>{post.article.replace(/<\/?p>/g, '')}</Post>
            {
              post.tag_name
              ?
              <TagCon>
              {post.tag_name.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
              </TagCon>
              : null
            }
            

            <PostFoot>
              <Date>{post.created_at.slice(0,10)}</Date>
              <View>조회수 : {post.view}</View>
            </PostFoot>
          </PostCon>
        ))}
      </ProfileChangeCon>
    </Container>
  )
}

export default ProfilePostPage;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`

const ProfileChangeCon = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const PostCon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  margin-bottom: 4rem;
  background-color: #F8F9FA;
  padding : 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const PostImg = styled.img`
  width: 100%;
  height: 75%;
`

const PostTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
`

const Post = styled(PostTitle)`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 7px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;


`

const TagCon = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
`

const Tag = styled.button`
  width: 100px;
  height: 30px;
  background-color: #96F2D6;
  border: none;
  border-radius: 4px;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #63E6BE;
  }
`

const Date = styled.p`
  font-size: 1.2rem;
`

const View = styled(Date)`

`

const PostFoot = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
`