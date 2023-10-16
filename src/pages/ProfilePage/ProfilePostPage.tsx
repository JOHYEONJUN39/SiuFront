
import { useEffect, useState } from "react";
import styled from "styled-components";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { GetPostUserId } from "../../api/Board/Post";
import { articleToThumbnail } from "../../hooks/articleToThumbnail";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Profile/Pagination";
import { PaginationData, Post } from "../../types/PostData.interface";



const ProfilePostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState<PaginationData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userData = useSelector((state: RootState) => state.user);
  useEffect(() => {
    GetPostUserId(`${userData.id}?page=${currentPage}`)
    .then(response => {
      console.log(response);
      setPosts(response.data.data.reverse());
      setPages(response.data);
    })
    }
    , [currentPage])

  const handlePageChange = (newPage : number) =>{
    setCurrentPage(newPage); 
    window.scrollTo(0, 0);
  }

  const navigatePost = (id : number) => {
    navigate(`/posts/${id}`);
  }

  function replace(url: string) {
    url = encodeURIComponent(url);
    return url;
  }

  const handleTagSearch = (tag: string) => {
    const encodedTag = replace(tag);
    navigate(`/search?query=${encodedTag}`);
  };
  
  return (
    <Container>
      <ProfileChangeCon>

        {posts.map((post) => (
          <PostCon key={post.id}>
            <img src={articleToThumbnail(post.article)} alt="" style={{ width: 'auto', height: '500px' }} onClick={() => navigatePost(post.id)}/>
            <PostTitle>{post.title}</PostTitle>
            <Post>{post.article.replace(/<img[^>]*>/g, '').replace(/<\/?p>/g, '')}</Post>
            {
              post.tags && post.tags.length > 0
              ?
              <TagCon>
                {post.tags.map((tag, index) => (
                  <Tag key={index} onClick={() => handleTagSearch(tag.tag_name)} >{tag.tag_name}</Tag>
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
    
      {pages && <Pagination currentPage={currentPage} totalPages={pages.last_page} onPageChange={handlePageChange}/>}
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
  div {
    img {
      width: 100%;
      height: 550px;
    }
  }
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
