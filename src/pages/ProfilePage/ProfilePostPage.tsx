import styled from "styled-components";



const ProfilePostPage = () => {

  return (
    <Container>
      <ProfileChangeCon>
        <PostCon>
          <PostImg src="https://i.ytimg.com/vi/ac6d5rCJj5w/maxresdefault.jpg" />
          <Post>엄준식</Post>
          <TagCon>
            <Tag>엄</Tag>
            <Tag>준식</Tag>
          </TagCon>
          <Date>2023.11.02</Date>
        </PostCon>

        <PostCon>
          <PostImg src="https://vocalmagazine.jp/wp-content/uploads/2023/04/%E3%83%A9%E3%82%A4%E3%83%96%E3%82%B9%E3%83%81%E3%83%BC%E3%83%AB_2.jpg" />
          <Post>요아소비 콘서트 다녀옴</Post>
          <TagCon>
            <Tag>요아소비</Tag>
            <Tag>콘서트</Tag>
          </TagCon>
          <Date>2023.11.02</Date>
        </PostCon>

        <PostCon>
          <PostImg src="https://velog.velcdn.com/images/kisuk623/post/0d6faccb-9cba-480a-ba71-9c9369b6915e/image.png" />
          <Post>네스트 배웁니다.</Post>
          <TagCon>
            <Tag>Nest</Tag>
            <Tag>구글</Tag>
          </TagCon>
          <Date>2023.11.02</Date>
        </PostCon>
      </ProfileChangeCon>
    </Container>
  )
}

export default ProfilePostPage;

const Container = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
`

const ProfileChangeCon = styled.div`
  width: 70%;
  height: 600px;
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

const Post = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
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

const Date = styled(Post)`
  
`