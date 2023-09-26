import { useNavigate } from "react-router-dom";
import styled from "styled-components"

interface Props {
  data: {
    title: string;
    article: string;
    created_at: string;
    tag_names?: string[];
  }
}

const Search = ({data}: Props) => {

  const date = data.created_at.split("T")[0]

  const navigate = useNavigate();

  function replace(url: string) {     
    url= encodeURIComponent(url);    
    return url;
  }

  const handleTagSearch = (tag: string) => {
    const encodedTag = replace(tag)
    navigate(`/search?query=${encodedTag}`)
  }
  
  return (
    <Container>
      <ImageBox>
        <Image src="https://avatars.githubusercontent.com/u/62136086?v=4" alt="profile" />
      </ImageBox>

      <Info>
        <Title>{data.title}</Title>
        <Description>{data.article}</Description>
        <TagBox>
          {
            data.tag_names?.map((tag, index) => (
              <Tag 
                key={index}
                onClick={() => {
                  handleTagSearch(tag)
                }}
              >
                {tag}
              </Tag>
            ))
          }
        </TagBox>
        <Date>{date}</Date>
      </Info>
    </Container>
  )
}

export default Search

const Container = styled.div`
  width: 1200px;
  height: 220px;
  display: flex;
  border: 1px solid #eee;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  align-items: center;
  position: relative;
  margin-bottom: 3rem;
`

const ImageBox = styled.div`
  width: 170px;
  height: 170px;
  margin: 20px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 5rem;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

const Description = styled.div`
  font-size: 1rem;
  font-weight: 300;
  margin-top: 1.5rem;
`

const TagBox = styled.div`
  display: flex;
  margin-top: 1rem;
  position: absolute;
  bottom: 1.5rem;
`

const Tag = styled.div`
  background-color: #eee;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  font-weight: 300;
  cursor: pointer;
`

const Date = styled.div`
  font-size: 0.8rem;
  color: #A4A4A4;
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
`



