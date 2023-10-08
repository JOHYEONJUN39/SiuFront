import styled from "styled-components";
import TagUI from "../common/TagUI";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import { Post } from "../../types/Board.interface";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

interface Props {
  data: Post;
}

const Search = ({ data }: Props) => {
  const navigate = useNavigate();
  const timeAgo = useTimeStamp(data.created_at);

  const onClick = () => {
    navigate(`/posts/${data.id}`);
  };

  return (
    <Container>
      <ImageBox>
        <Image
          src="https://avatars.githubusercontent.com/u/62136086?v=4"
          alt="profile"
        />
      </ImageBox>

      <Info>
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          <Title>{data.title}</Title>
          <Description
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.article || ""),
            }}
          ></Description>
        </div>
        <TagBox>
          {data.tags.map((tag) => {
            return <TagUI key={tag?.id} tag_name={tag.tag_name} />;
          })}
        </TagBox>
        <Date>{timeAgo}</Date>
      </Info>
    </Container>
  );
};

export default Search;

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
`;

const ImageBox = styled.div`
  width: 170px;
  height: 170px;
  margin: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 5rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 1rem;
  font-weight: 300;
  margin-top: 1.5rem;
`;

const TagBox = styled.div`
  display: flex;
  margin-top: 1rem;
  position: absolute;
  bottom: 1.5rem;
`;

const Date = styled.div`
  font-size: 0.8rem;
  color: #a4a4a4;
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
`;
