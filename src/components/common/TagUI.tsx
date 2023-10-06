import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  tag_name: string;
}

const TagUI = ({ tag_name }: Props) => {
  const navigate = useNavigate();

  function replace(url: string) {
    url = encodeURIComponent(url);
    return url;
  }

  const handleTagSearch = (tag: string) => {
    const encodedTag = replace(tag);
    navigate(`/search?query=${encodedTag}`);
  };

  return (
    <Tag
      onClick={() => {
        handleTagSearch(tag_name);
      }}
    >
      {tag_name}
    </Tag>
  );
};

export default TagUI;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 50px;
  padding: 0px 12px;
  border-radius: 15px;
  background-color: #eee;
  color: #a9a9f5;
  font-weight: 600;
  margin-right: 0.5rem;
  cursor: pointer;
  z-index: 10;
`;
