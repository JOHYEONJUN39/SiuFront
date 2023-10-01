import { useNavigate } from "react-router-dom";
import styled from "styled-components"

interface Props {
  name: string;
}

const TagUI = ({name}: Props) => {
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
    <Tag
      onClick={() => {
        handleTagSearch(name)
      }}
    >
      {name}
    </Tag>
  )
}

export default TagUI

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 50px;
  padding: 0px 12px;
  border-radius: 15px;
  background-color: #eee;
  color: #A9A9F5;
  font-weight: 600;
  margin-right: 0.5rem;
  cursor: pointer;
`